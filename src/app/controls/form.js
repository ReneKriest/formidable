// Forms

rk = window.rk || {};

// method
// action

;(function (rk) {
    'use strict';
    // Strict mode --> fail earlier

    // Constructor function for the Form Composite
    // TODO: {id: ..., wrapper: ...}
    function Form(wrapper, id) {
        this.components = [];

        this.CONFIG = {
            FORM_TEMPLATE: '#template_form'
        };

        var settings = {
            id: id,
            name: 'test',
            action: '',
            method: ''
        };
        // Handlebar template
        var templateHtml = $(this.CONFIG.FORM_TEMPLATE).html(),
            template = Handlebars.compile(templateHtml);

        // Convention: $element --> jQuery object
        this.$element = $(template(settings));
        $(wrapper).append(this.$element);

        this.id = id;
    }

    // Prototype methods
    var FormMethods = {
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
                // no arrays in arrays:
                var values = component.save();
                if (Array.isArray(values))
                    jsonNameValue = jsonNameValue.concat(values);
                else
                    jsonNameValue.push(values);
            });
            return JSON.stringify(jsonNameValue);
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

    Form.prototype = Object.create(FormMethods);

    rk.Form = Form;
})(rk);


