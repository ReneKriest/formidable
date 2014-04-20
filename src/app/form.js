// Forms

rk = window.rk || {};

// method
// action

;(function (rk) {
    'use strict';

    function Form(wrapper, id) {
        this.formComponents = [];
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
                throw new Error('Wrong Instance')

            this.formComponents.push(control);
            control.appendElement(this.element);
        },
        save: function () {
            var jsonNameValue = [];
            this.formComponents.forEach(function (component) {
                jsonNameValue.push(component.save());
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


