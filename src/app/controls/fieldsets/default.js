// Fieldset
rk = window.rk || {};

;(function (rk) {
    'use strict';
    // Strict mode --> fail earlier

    // Constructor function for the FieldSet Composite
    function FieldSet(wrapper, id) {
        // Container for the composite/leaves
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
            this.components.forEach(function (component) {
                component.validate();
            })
        }
    };
    FieldSet.prototype = Object.create(FieldSetMethods);

    rk.FieldSets = rk.FieldSets || {};
    rk.FieldSets.Default = FieldSet;
})(rk);


