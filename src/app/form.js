// Forms

rk = window.rk || {};

// method
// action

;(function (rk) {
    'use strict';

    function Form(wrapper, id) {
        this.components = [];
        // Handlebars
        this.formElement = $('<form id="' + id + '">');
        // Settings
        $(wrapper).append(this.formElement);

        this.element = $('#' + id);
        this.id = id;
    }
    var FormMethods = {
        add: function (control) {
            // Factory would lead to better results
            // control instanceof rk.Controls.Input
            if (!(control instanceof Object))
                throw new Error('Wrong Instance');

            this.components.push(control);
            this.element.append(control.getElement());
        },
        save: function () {
            var jsonNameValue = [];
            this.components.forEach(function (component) {
                // no arrays in arrays:
                var values = component.save();
                if (Array.isArray(values))
                    jsonNameValue = jsonNameValue.concat(values);
                else
                    jsonNameValue.push();
            });
            return jsonNameValue;
        },
        getElement: function () {
            return this.element;
        }
    };
    Form.prototype = Object.create(FormMethods);

    rk.Form = Form;
})(rk);


