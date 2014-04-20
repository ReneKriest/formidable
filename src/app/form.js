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
            this.formComponents.push(control);
            // this.appendControl()
            this.element.append(control.getElement());
        },
//        getElement: function (elem) {
//            return this.formComponents[elem];
//        },
        save: function () {
            this.formComponents.forEach(function (control) {
                control.save();
            });
        },
        getElement: function () {
            return this.element;
        }
    };
    Form.prototype = Object.create(FormMethods);

    rk.Form = Form;
})(rk);


