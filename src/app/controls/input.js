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
        // input control = template + default settings
        // TODO: $elemet = $(template(settings)) ?
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

            var methodNamesArray = Object.keys(rk.validation); // TODO: DepInjection --> rk.validation als validation Obj reinreichen
            if (methodNamesArray.indexOf(this.settings.validationType) === -1)
                throw new Error ('Method not found!')   // TODO: String in CONFIG

            var inputValue = this.getValue();
            // Calling a method dynamically with bracket notation
            if (!(rk.validation[this.settings.validationType](inputValue))) {
                alert('Fehler!');
            }
        }
    };
    InputControl.prototype = Object.create(InputControlMethods);

    rk.Controls = rk.Controls || {};
    rk.Controls.Input = InputControl;
})();
