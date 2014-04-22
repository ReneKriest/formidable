/**
 * Created by Rene on 20.04.2014.
 */
rk = window.rk || {};

;(function () {
    'use strict';
    // Controls
    function InputControl (settings) {
        // Static value/Memoization Pattern
        // Prevents double usage of IDs
        // Alternative: Closure
        if (!InputControl.id)
            InputControl.id = 0;

        this.CONFIG = {
            ERROR_CLASS: 'rk_error',
            EXCEPTIONS: {
                VALIDATION_METHOD_NOT_FOUND: 'Method not found!'
            }
        };
        // Defaults:
        var defaultSettings = {
            id: 'rk_input',
            name: 'rk_input',
            placeholder: 'Text',
            label: 'Label für den Text:',

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
        // input control = template + default settings as a jQuery object
        this.$element = $(template(settings));
    }

    var InputControlMethods = {
        getElement: function () {
            return this.$element;
        },
        getNode: function () {
            return $('#' + this.id);
        },
        getValue: function () {
            return this.getNode().val();
        },
        save: function () {
            // return {this.settings.name: this.getValue()}
            return {
                'name': this.settings.name,
                'value': this.getValue()   // TODO: Escapen
            }
        },
        validate: function () {
            if (!this.settings.validationType)
                return;

            var inputValue = this.getValue(),
                $element = this.getElement(),
                methodNamesArray = Object.keys(rk.validation); // TODO: DepInjection --> rk.validation als validation Obj reinreichen, bzw. die Keys selbst als Dict reinreichen

            // Check if desired validation method is available and fail miserably in case of false type invocation
            if (methodNamesArray.indexOf(this.settings.validationType) === -1)
                throw new Error (this.CONFIG.EXCEPTIONS.VALIDATION_METHOD_NOT_FOUND);

            // Calling a method dynamically with bracket notation
            if (!(rk.validation[this.settings.validationType](inputValue))) {
                $element.addClass(this.CONFIG.ERROR_CLASS);
            } else {
                $element.removeClass(this.CONFIG.ERROR_CLASS);
            }
        }
    };

    // Prototype
    InputControl.prototype = Object.create(InputControlMethods);

    rk.Controls = rk.Controls || {};
    rk.Controls.Input = InputControl;
})();
