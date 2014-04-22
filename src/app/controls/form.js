// Forms

rk = window.rk || {};

// method
// action

;(function (rk) {
    'use strict';

    function Form(wrapper, id) {
        this.components = [];

        var settings = {
            id: id,
            name: 'test',
            action: '',
            method: ''
        };
        // Handlebars
        var templateHtml = $('#template_form').html(),
            template = Handlebars.compile(templateHtml);

        this.formElement = template(settings);
        // Settings
        $(wrapper).append(this.formElement);

        this.$element = $('#' + id);
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


