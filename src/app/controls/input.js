/**
 * Created by Rene on 20.04.2014.
 */
rk = window.rk || {};

;(function () {
    'use strict';
    // Controls
    function InputControl (settings) {
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
        defaultSettings = $.extend(defaultSettings, settings);
        this.settings = defaultSettings;
        this.id = defaultSettings.id;
        // input control = template + default settings
        this.element = template(defaultSettings);
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
        appendElement: function (formElement) {
            formElement.append(this.getElement());
        },
        save: function () {
            return {
                'name': this.settings.name,
                'value': this.getNode().val()
            }
        }
    };
    InputControl.prototype = Object.create(InputControlMethods);

    rk.Controls = rk.Controls || {};
    rk.Controls.Input = InputControl;
})();
