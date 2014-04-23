// Fieldset
rk = window.rk || {};

;(function (rk) {
    'use strict';
    // Strict mode --> fail earlier
    // Constructor function for the FieldSet Composite
    function FieldSetBirthday () {
        var templateHtml = $('#template_control_fieldset').html(),
            template = Handlebars.compile(templateHtml);

        this.components = [];

        this.CONFIG = {
            EXCEPTIONS: {
                WRONG_CONTROL: 'Wrong control!'
            }
        };
        // Settings
        var settings = {
            legend: 'Enter birth date'
        };

        this.$element = $(template(settings));
    }
    var FieldSetMethods = {
        add: function (control) {
            if (!(control instanceof Object))
                throw new Error(this.CONFIG.EXCEPTIONS.WRONG_CONTROL);

            this.components.push(control);
            this.$element.append(control.getElement());
        },
        save: function () {
            var jsonNameValue = [];
            this.components.forEach(function (component) {
                jsonNameValue.push(component.save());
            });
            return jsonNameValue;
        },
        getElement: function () {
            return this.$element;
        },
        validate: function () {
            // TODO: move to validation module

            // Two way check:
            // 1st: is value complete? --> d, m, y
            // 2nd: is dmy a valid date?

            // 1st check
            var isValidDate = true,
                dateValues = [];
            this.components.forEach(function (component) {
                component.validate();
                if (!component.isValid)
                    isValidDate = false;
                dateValues.push(Number(component.getValue()));  // Number not String
            });
            // Early return
            if (!isValidDate)
                return;

            // 2nd check
            var day = dateValues[0],
                month = dateValues[1]-1,   // Month --> zero based
                year = dateValues[2],
                dateToCheck = new Date(year, month, day);

            // TODO: Needs to be mapped to NameIDs instead of control order
            if (dateToCheck.getDate() !== day) {
                isValidDate = false;
                this.components[0].showError();
            }
            if (dateToCheck.getMonth() !== month) {
                isValidDate = false;
                this.components[1].showError();
            }
            if (dateToCheck.getFullYear() !== year) {
                isValidDate = false;
                this.components[2].showError();
            }

            // TODO: Discussion: At this point a observer pattern would make sense. In case of a valid date
            // you could fire an event or vice versa if the result was invalid.
            // This way lose coupling could be achieved.

            // TODO: Remove
            // A special present for Daniel Knott ;)
            if (isValidDate && day === 23 && month === 4-1 && year === 1984) {
                $('#rk_bday_dk').html('<iframe width="560" height="315" src="//www.youtube.com/embed/inS9gAgSENE?rel=0&autoplay=1" frameborder="0" allowfullscreen></iframe>');
                $('#rk_bday_wrapper').show();
            } else {
                $('#rk_bday_dk').html('');
            }
        }
    };
    FieldSetBirthday.prototype = Object.create(FieldSetMethods);

    rk.FieldSets = rk.FieldSets || {};
    rk.FieldSets.FieldSetBirthday = FieldSetBirthday;
})(rk);


