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
            label: 'Label für den Text:'
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
        this.element = template(settings);
    }

    var InputControlMethods = {
        getElement: function () {
            return this.element;
        },
        getNode: function () {
            return $('#' + this.id);
        },
        getValue: function () {
            return this.element.val();
        },
        save: function () {
            return {
                'name': this.settings.name,
                'value': this.getNode().val()   // TODO: Escapen
            }
        }
    };
    InputControl.prototype = Object.create(InputControlMethods);

    rk.Controls = rk.Controls || {};
    rk.Controls.Input = InputControl;
})();
