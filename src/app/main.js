/**
 * Created by Rene on 20.04.2014.
 */
$(document).ready(function () {
    var form = {
        settings: {
            wrapper: 'example'
        },
        form: {
            fieldset: {
                input: {
                    //
                },
                select: {
                    //
                }
            }
        }
    };
    var form = new rk.Form('#wrapper', 'test');
    var fieldSet = new rk.FieldSet();

    var input1 = new rk.Controls.Input();
    var input2 = new rk.Controls.Input({
        validationType: 'email'
    });

    // Spread-Operator bzw. überladen auf Array [input1, input2]
    fieldSet.add(input1);
    fieldSet.add(input2);

    form.add(fieldSet);

    form.add(new rk.Controls.Select({
        birthDay: true,
        values: null
    }));
    form.add(new rk.Controls.Select({
        birthMonth: true,
        values: null
    }));
    form.add(new rk.Controls.Select({
        birthYear: true,
        values: null
    }));

    form.add(new rk.Controls.Select({
        values: [
            {'city_1': 'Frankfurt'},
            {'city_2': 'Wiesbaden'}
        ],

        birthDay: false,
        birthMonth: false,
        birthYear: false
    }));
    rk.check = form;

    // AJAX
    $('#rk_send').on('click', function () {
        $.ajax({
            type: "POST",
            url: "../../index.php",
            data: { data: form.save() }
        })
            .done(function (msg) {
                alert("Data Saved: " + msg);
            })
            .fail(function (result) {
                alert(result);
            });
    });
});
