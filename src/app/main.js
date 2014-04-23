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
    var form = new rk.Form('#rk_form_wrapper', 'test');
    var fieldSet = new rk.FieldSets.Default();

    var input1 = new rk.Controls.Input();
    var input2 = new rk.Controls.Input({
        validationType: 'email'
    });

    // Spread-Operator bzw. überladen auf Array [input1, input2]
    fieldSet.add(input1);
    fieldSet.add(input2);

    form.add(fieldSet);

    var bdayFieldset = new rk.FieldSets.FieldSetBirthday();

    bdayFieldset.add(new rk.Controls.Select({
        label: 'Day: ',
        birthDay: true,
        values: null,

        validationType: 'integer'
    }));
    bdayFieldset.add(new rk.Controls.Select({
        label: 'Month: ',
        birthMonth: true,
        values: null,

        validationType: 'integer'
    }));
    bdayFieldset.add(new rk.Controls.Select({
        label: 'Year: ',
        birthYear: true,
        values: null,

        validationType: 'integer'
    }));

    form.add(bdayFieldset);
    form.add(new rk.Controls.Select({
        label: 'Select city: ',
        values: [
            {'Frankfurt': 'Frankfurt'},
            {'Wiesbaden': 'Wiesbaden'}
        ],

        birthDay: false,
        birthMonth: false,
        birthYear: false,

        validationType: 'string'
    }));
    rk.check = form;

    formEventHandler();

    function formEventHandler() {
        // In case of many event handlers/performance considerations: use event delegation
        // However a dispatcher is overkill for only 2 buttons ;)
        $('.rk_form_button_validate').on('click', function (e) {
            rk.check.validate();
        });
        $('.rk_form_button_save').on('click', function (e) {
            var result = rk.check.save();
            $('#rk_form_result').text(result);
        });
    }
});
