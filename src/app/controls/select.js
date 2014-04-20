/**
 * Created by Rene on 20.04.2014.
 */
rk = window.rk || {};

;(function () {
    'use strict';
    // Controls
    function SelectControl (settings) {
        // Static value/Memoization Pattern
        // Prevents double usage of IDs
        if (!SelectControl.id)
            SelectControl.id = 0;

        // Defaults:
        var defaultSettings = {
                id: 'rk_select',
                placeholder: 'Text',
                label: 'Label für den Text:',

//                values: [
//                    {'city_1': 'Frankfurt'},
//                    {'city_2': 'Wiesbaden'}
//                ],
                values: null,

                birthDay: true,
                birthMonth: false,
                birthYear: false
            },
        // TODO: _templateHtml --> private
        // TODO: _templateHtml --> private END

        // Merge the default settings with injected settings
        settings = $.extend(defaultSettings, settings);
        settings.id = settings.id + SelectControl.id;
        settings.name = settings.name + SelectControl.id;
        SelectControl.id++;

        this.settings = settings;
        this.id = settings.id;

        var templateHtml,
            template;
        var day,
            month,
            year;

        if (settings.values) {
            templateHtml = $('#template_control_select').html();
            template = Handlebars.compile(templateHtml);

            var values = {
                name: settings.name,
                keyValues: settings.values
            };
            this.element = template(values);
        } else {
            // TODO: function --> registerHelper for day || month || year
            if (settings.birthDay) {
                templateHtml = $('#template_control_select_birthday').html();
                template = Handlebars.compile(templateHtml);

                Handlebars.registerHelper('birthDay', function() {
                    var str = '';
                    for (day=1; day<=31; day++) {
                        str += '<option value="' + day +'">' + day + '</option>';
                    }
                    return str;
                });
            }
            if (settings.birthMonth) {
                templateHtml = $('#template_control_select_birthmonth').html();
                template = Handlebars.compile(templateHtml);

                Handlebars.registerHelper('birthMonth', function() {
                    var str = '';
                    for (month=1; month<=12; month++) {
                        str += '<option value="' + month +'">' + month + '</option>';
                    }
                    return str;
                });
            }
            if (settings.birthYear) {
                templateHtml = $('#template_control_select_birthyear').html();
                template = Handlebars.compile(templateHtml);

                Handlebars.registerHelper('birthYear', function() {
                    var str = '';
                    for (year=2013; year>=1950; year--) {
                        str += '<option value="' + year +'">' + year + '</option>';
                    }
                    return str;
                });
            }
            this.element = template(settings);
        }
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
