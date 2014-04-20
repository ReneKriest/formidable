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
    var input2 = new rk.Controls.Input();

    // Spread-Operator bzw. übeladen auf Array [input1, input2]
    fieldSet.add(input1);
    fieldSet.add(input2);

    form.add(fieldSet);

    var select = new rk.Controls.Select();
    form.add(select);
    form.add(new rk.Controls.Select({
        birthDay: false,
        birthMonth: true,
        birthYear: false
    }));
    form.add(new rk.Controls.Select({
        birthDay: false,
        birthMonth: false,
        birthYear: true
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
});
