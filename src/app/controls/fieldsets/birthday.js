// Fieldset
rk = window.rk || {};

;(function (rk) {
    'use strict';

    function FieldSetBirthday (wrapper, id) {
        // if isBirthtday
        this.components = [];
        var templateHtml = $('#template_control_fieldset').html(),
            template = Handlebars.compile(templateHtml);

        // Settings
        var settings = {
            legend: 'Feldsetzung'
        };

        this.$element = $(template(settings));
        this.id = id;
    }
    var FieldSetMethods = {
        add: function (control) {
            // Factory would lead to better results
            // control instanceof rk.Controls.Input
            if (!(control instanceof Object))
                throw new Error('Wrong Instance');

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
            var isValid = false,
                dateValues = [];
            this.components.forEach(function (component) {
                component.validate();
                isValid = component.isValid;
                dateValues.push(Number(component.getValue()));
            })
            // Two way check:
            // 1st: is value complete? --> d, m, y
            // 2nd: is dmy a valid date?

            // 1st check
            if (!isValid)
                return;

            // TODO: selects auf NameIDs mappen, statt von einer Reihenfolge auszugehen (Convention)
            // TODO: Select --> this.ctrName = birthday --> getChildByName()
            // 2nd check
            var day = dateValues[0],
                month = dateValues[1]-1,   // Month --> zero based
                year = dateValues[2];

            var dateToCheck = new Date(year, month, day),
                validDate = true;

            if (dateToCheck.getDate() !== day) {
                validDate = false;
                this.components[0].showError();
            }
            if (dateToCheck.getMonth() !== month) {
                validDate = false;
                this.components[1].showError();
            }
            if (dateToCheck.getFullYear() !== year) {
                validDate = false;
                this.components[2].showError();
            }

            if (validDate)
                alert('Valid!');
        }
    };
    FieldSetBirthday.prototype = Object.create(FieldSetMethods);

    rk.FieldSetBirthday = FieldSetBirthday;
})(rk);


