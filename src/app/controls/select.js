/**
 * Created by Rene on 20.04.2014.
 */
rk = window.rk || {};

;(function () {
    // Strict mode --> fail earlier
    'use strict';
    // Controls
    function SelectControl (settings) {
        // Single var pattern:
        var templateHtml,
            template,
            templateValues;

        // Static value/Memoization Pattern
        // Prevents double usage of IDs
        if (!SelectControl.id)
            SelectControl.id = 0;

        // Define constant values:
        // No single var pattern here due to Visual Studio suckage ;)
        var CONFIG = {
            TEMPLATE: {
                SELECT: '#template_control_select',
                BIRTHDAY: '#template_control_select_birthday',
                BIRTHMONTH: '#template_control_select_birthmonth',
                BIRTHYEAR: '#template_control_select_birthyear'
            }
        };
        // Define defaults settings:
        var defaultSettings = {
            id: 'rk_select',
            placeholder: 'Text',
            label: 'Label für den Text:',
            name: 'rk_select',
            values: null,

            birthDay: false,
            birthMonth: false,
            birthYear: false
        };

        // Merge the default settings with injected settings
        settings = $.extend(defaultSettings, settings);
        settings.id = settings.id + SelectControl.id;
        settings.name = settings.name + SelectControl.id;
        SelectControl.id++;

        // Expose the settings object
        this.settings = settings;
        this.id = settings.id;

        handlebarHelperRegistration();

        // Normal Values
        if (settings.values) {
            templateHtml = $(CONFIG.TEMPLATE.SELECT).html();
            template = Handlebars.compile(templateHtml);
        } else {
            // Birthday
            if (settings.birthDay) {
                templateHtml = $(CONFIG.TEMPLATE.BIRTHDAY).html();
                template = Handlebars.compile(templateHtml);
            }
            if (settings.birthMonth) {
                templateHtml = $(CONFIG.TEMPLATE.BIRTHMONTH).html();
                template = Handlebars.compile(templateHtml);
            }
            if (settings.birthYear) {
                templateHtml = $(CONFIG.TEMPLATE.BIRTHYEAR).html();
                template = Handlebars.compile(templateHtml);
            }
        }
        this.element = template(settings);
    }

    // Handlebar Helper registration and configuration
    function handlebarHelperRegistration() {
        // Again: Static variable and an early return to prevent multiple registrations
        if (SelectControl.helperRegistered)
            return;

        SelectControl.helperRegistered = true;

        var handlebarHelper = {
            createDays: function () {
                var days = [],
                    day,
                    k;
                for (day = 1, k = 0; day <= 31; day++, k++) {
                    days[k] = day;
                }
                var templateHtml = $('#template_control_select_birthday_options').html(),
                    template = Handlebars.compile(templateHtml);

                return template(days);
            },
            createMonths: function () {
                var months = [],
                    month;
                for (month = 1; month <= 12; month++) {
                    months[month - 1] = month;
                }
                var templateHtml = $('#template_control_select_birthday_options').html(),
                    template = Handlebars.compile(templateHtml);

                return template(months);
            },
            createYears: function () {
                var years = [],
                    year,
                    k;
                for (year = 2013, k = 0; year >= 1950; year--, k++) {
                    years[k] = year;
                }
                var templateHtml = $('#template_control_select_birthday_options').html(),
                    template = Handlebars.compile(templateHtml);

                return template(years);
            }
        };

        Handlebars.registerHelper('birthDay', handlebarHelper.createDays);
        Handlebars.registerHelper('birthMonth', handlebarHelper.createMonths);
        Handlebars.registerHelper('birthYear', handlebarHelper.createYears);
    }

    // Prototype methods
    var SelectControlMethods = {
        getElement: function () {
            return this.element;
        },
        getNode: function () {
            return $('#' + this.id);
        },
        getValue: function () {
            return this.getNode().val();
        },
        save: function () {
            return {
                'name': this.settings.name,
                'value': this.getValue()       // TODO: Escapen
            }
        }
    };
    SelectControl.prototype = Object.create(SelectControlMethods);

    rk.Controls = rk.Controls || {};
    rk.Controls.Select = SelectControl;
})();
