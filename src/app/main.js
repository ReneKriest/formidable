rk = window.rk || {};

rk.main = {
    formActivation: function () {
        // Instance of Form
        var form = new rk.Form({
            wrapper: '#rk_form_wrapper',
            id: 'rk_form_element'
        });

        // Default FieldSet
        var fieldSetTop = new rk.FieldSets.Default({
            legend: 'Enter data'
        });
        fieldSetTop.add(new rk.Controls.Input({
            label: 'Enter an integer: '
        }));
        fieldSetTop.add(new rk.Controls.Input({
            label: 'Enter an email address: ',
            placeholder: 'Email',
            validationType: 'email'
        }));
        form.add(fieldSetTop);

        // Birthday FieldSet
        var birthdayFieldSet = new rk.FieldSets.FieldSetBirthday({
            legend: 'Enter birth date'
        }, rk.enums.birthdate);
        birthdayFieldSet.add(new rk.Controls.Select({
            label: 'Day: ',
            birthDay: true,
            values: null,

            validationType: 'integer'
        }, rk.enums.birthdate))
            .add(new rk.Controls.Select({
            label: 'Month: ',
            birthMonth: true,
            values: null,

            validationType: 'integer'
        }, rk.enums.birthdate))
            .add(new rk.Controls.Select({
            label: 'Year: ',
            birthYear: true,
            values: null,

            validationType: 'integer'
        }, rk.enums.birthdate));
        form.add(birthdayFieldSet);

        var fieldSetBottom = new rk.FieldSets.Default();
        fieldSetBottom.add(new rk.Controls.Select({
            label: 'Select city: ',
            values: [
                {'Frankfurt': 'Frankfurt'},
                {'Wiesbaden': 'Wiesbaden'},
                {'Mainz': 'Mainz'},
                {'Braunschweig': 'Braunschweig'},
                {'Nürnberg': 'Nürnberg'},
                {'Hamburg': 'Hamburg'}
            ],

            birthDay: false,
            birthMonth: false,
            birthYear: false,

            validationType: 'string'
        }));
        form.add(fieldSetBottom);

        rk.formObject = form;
    },
    // Controlers in the sense of MVC
    formEventHandler: function () {
        // In case of many event handlers/performance considerations: use event delegation
        // However a dispatcher is overkill for only 2 buttons ;)
        $('.rk_form_button_validate').on('click', function (e) {
            rk.formObject.validate();
        });
        $('.rk_form_button_save').on('click', function (e) {
            var result = rk.formObject.save();
            $('#rk_form_result').text(result);
        });
        $('.rk_form_button_clear').on('click', function (e) {
            $('#rk_form_result').text('');
        });
    }
};

// Document ready
$(document).ready(function () {
    $('#rk_bday_wrapper').hide();
    rk.main.formActivation();
    rk.main.formEventHandler();
});
