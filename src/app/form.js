// Forms

rk = window.rk || {};

(function (rk) {
    // Form, statt CForm
    function Form(wrapper, id) {

        this.formComponents = [];
        // Handlebars
        this.formElement = $('<form id="' + id + '">');

        $(wrapper).append(this.formElement);

        this.element = $('#' + id);
        console.log(this.element);
        this.id = id;
    }

    FormMethods = {
        add: function (control) {
            this.formComponents.push(control);
            this.element.append(control.getElement());
        },
        getElement: function (elem) {
            return this.formComponents[elem];
        },
        save: function () {
            this.formComponents.forEach(function (control) {
                control.save();
            });
        },
        getElement: function () {
            return this.element;
        }
    }

    Form.prototype = Object.create(FormMethods);

    // Controls
    function InputControl (id) {
        this.id = id;
        this.element;

        // Handlebars
        this.inputControl = $('<input id="' + id + '">');   // type=text etc.

        this.element = this.inputControl;
    }

    InputControlMethods = {
        getElement: function () {
            return this.element;
        },
        getValue: function () {
            return this.element.val();
        }
    }

    InputControl.prototype = Object.create(InputControlMethods);

    rk.Composite = Form;
    rk.Input = InputControl;

})(rk);


$(document).ready(function () {
    var form = {
        settings: {
            wrapper: 'example'
        },
        form: {
            fieldset: {
                input: {
                    //
                },
                select: {
                    //
                }
            }
        }
    };
    var comp = new rk.Composite('#wrapper', 'test');
    var input = new rk.Input();
    comp.add(input);
});
