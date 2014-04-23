// Forms

rk = window.rk || {};

;(function (rk) {
    'use strict';
    // Strict mode --> fail earlier
    // Constructor function for the Form Composite
    function Form(settings) {
        this.CONFIG = {
            FORM_TEMPLATE: '#template_form',
            EXCEPTIONS: {
                WRONG_CONTROL: 'Wrong control!'
            }
        };

        var defaultSettings = {
                wrapper: '#rk_form_wrapper',
                id: 'rk_form',
                name: 'rk_form_name',
                action: '#',
                method: ''
            },
            templateHtml = $(this.CONFIG.FORM_TEMPLATE).html(),
            template = Handlebars.compile(templateHtml);

        // Merge the default settings with injected settings
        settings = $.extend(defaultSettings, settings);

        // Convention: $element --> jQuery object
        this.$element = $(template(settings));
        $(settings.wrapper).append(this.$element);
        // Container for the composite/leaves
        this.components = [];
        this.id = settings.id;
    }

    // Prototype methods
    var FormMethods = {
        getElement: function () {
            return this.$element;
        },
        add: function (control) {
            if (!(control instanceof Object))
                throw new Error(this.CONFIG.EXCEPTIONS.WRONG_CONTROL);

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
        validate: function () {
            this.components.forEach(function (component) {
                component.validate();
            })
        }
    };

    Form.prototype = Object.create(FormMethods);

    rk.Form = Form;
})(rk);


