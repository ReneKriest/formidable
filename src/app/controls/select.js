/**
 * Created by Rene on 20.04.2014.
 */
rk = window.rk || {};

;(function () {
    'use strict';
    // Controls
    function SelectControl (settings) {
        // Defaults:
        var defaultSettings = {
                id: 'rk_input',
                placeholder: 'Text',
                label: 'Label für den Text:'
            },
            templateHtml = $('#template_control_input').html(),
            template = Handlebars.compile(templateHtml);


        // Merge the default settings with injected settings
        defaultSettings = $.extend(defaultSettings, settings);

        this.id = defaultSettings.id;
        // input control = template + default settings
        this.selectControl = template(defaultSettings);
        // TODO: ?
        this.element = this.inputControl;
        // TODO END
    }

    var SelectControlMethods = {
        getElement: function () {
            return this.element;
        },
        getNode: function () {
            return $('#' + this.id);
        },
        getValue: function () {
            return this.element.val();
        }
    };
    SelectControl.prototype = Object.create(SelectControlMethods);

    rk.Controls = rk.Controls || {};
    rk.Controls.Select = SelectControl;
})();
