rk = window.rk || {};

;(function () {
    // Strict mode --> fail earlier
    'use strict';
    // Constructor function for the Input Control (leaf)
    function InputControl (settings) {
        // Static value/Memoization Pattern
        // Prevents double usage of IDs
        // Alternative: Closure
        if (!InputControl.id)
            InputControl.id = 0;

        this.CONFIG = {
            ERROR_CLASS: 'rk_control_error',
            EXCEPTIONS: {
                VALIDATION_METHOD_NOT_FOUND: 'Method not found!'
            }
        };
        // Defaults:
        var defaultSettings = {
                id: 'rk_input',
                name: 'rk_input',
                placeholder: 'Integer',
                label: 'Label:',

                validationType: 'integer'
            },
            templateHtml = $('#template_control_input').html(),
            template = Handlebars.compile(templateHtml);

        // Merge the default settings with injected settings
        settings = $.extend(defaultSettings, settings);
        settings.id = settings.id + InputControl.id;
        settings.name = settings.name + InputControl.id;
        InputControl.id++;

        this.settings = settings;
        this.id = settings.id;
        this.isValid = null;
        // input control = template + default settings as a jQuery object
        // Convention: $element --> jQuery object
        this.$element = $(template(settings));
    }

    // Prototype methods
    var InputControlMethods = {
        // label and input
        getElement: function () {
            return this.$element;
        },
        getInputNode: function () {
            return $('#' + this.id);
        },
        getValue: function () {
            return this.getInputNode().val();
        },
        save: function () {
            // return {this.settings.name: this.getValue()}
            return {
                'name': this.settings.name,
                'value': this.getValue()
            }
        },
        showError: function () {
            this.getInputNode().addClass(this.CONFIG.ERROR_CLASS);
        },
        hideError: function () {
            this.getInputNode().removeClass(this.CONFIG.ERROR_CLASS);
        },
        validate: function () {
            // Early return in case of no validation
            if (!this.settings.validationType)
                return;

            var inputValue = this.getValue(),
                methodNamesArray = Object.keys(rk.validation); // TODO: DepInjection --> rk.validation als validation Obj reinreichen, bzw. die Keys selbst als Dict reinreichen

            // Check if desired validation method is available and fail miserably in case of false type invocation
            if (methodNamesArray.indexOf(this.settings.validationType) === -1)
                throw new Error (this.CONFIG.EXCEPTIONS.VALIDATION_METHOD_NOT_FOUND);

            // Calling a method dynamically with bracket notation
            if (rk.validation[this.settings.validationType](inputValue)) {
                this.isValid = true;
                this.hideError();
            } else {
                this.isValid = false;
                this.showError();
            }
        }
    };

    // Prototype
    InputControl.prototype = Object.create(InputControlMethods);

    rk.Controls = rk.Controls || {};
    rk.Controls.Input = InputControl;
})();
