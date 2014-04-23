// Fieldset
rk = window.rk || {};

;(function (rk) {
    'use strict';
    // Strict mode --> fail earlier
    // Constructor function for the FieldSet Composite
    function FieldSet() {
        this.CONFIG = {
            FIELDSET_TEMPLATE: '#template_control_fieldset',
            EXCEPTIONS: {
                WRONG_CONTROL: 'Wrong control!'
            }
        };

        // Settings
        var settings = {
            legend: 'Enter data'
        };

        var templateHtml = $(this.CONFIG.FIELDSET_TEMPLATE).html(),
            template = Handlebars.compile(templateHtml);

        this.$element = $(template(settings));
        // Container for the composite/leaves
        this.components = [];
    }
    var FieldSetMethods = {
        add: function (control) {
            // Factory would lead to better results
            // control instanceof rk.Controls.Input
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
            this.components.forEach(function (component) {
                component.validate();
            })
        }
    };
    FieldSet.prototype = Object.create(FieldSetMethods);

    rk.FieldSets = rk.FieldSets || {};
    rk.FieldSets.Default = FieldSet;
})(rk);


