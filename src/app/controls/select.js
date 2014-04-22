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
            template;

        // Static value/Memoization Pattern
        // Prevents double usage of IDs
        if (!SelectControl.id)
            SelectControl.id = 0;

        // Define constant values:
        // No single var pattern here due to Visual Studio suckage ;)
        this.CONFIG = {
            TEMPLATE: {
                SELECT: '#template_control_select',
                BIRTHDAY: '#template_control_select_birthday',
                BIRTHMONTH: '#template_control_select_birthmonth',
                BIRTHYEAR: '#template_control_select_birthyear'
            },
            ERROR_CLASS: 'rk_error',
            EXCEPTIONS: {
                VALIDATION_METHOD_NOT_FOUND: 'Method not found!'
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
            birthYear: false,

            validationType: null
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
            templateHtml = $(this.CONFIG.TEMPLATE.SELECT).html();
            template = Handlebars.compile(templateHtml);
        } else {
            // Birthday
            if (settings.birthDay) {
                templateHtml = $(this.CONFIG.TEMPLATE.BIRTHDAY).html();
                template = Handlebars.compile(templateHtml);
            }
            if (settings.birthMonth) {
                templateHtml = $(this.CONFIG.TEMPLATE.BIRTHMONTH).html();
                template = Handlebars.compile(templateHtml);
            }
            if (settings.birthYear) {
                templateHtml = $(this.CONFIG.TEMPLATE.BIRTHYEAR).html();
                template = Handlebars.compile(templateHtml);
            }
        }
        this.$element = $(template(settings));
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
                    day;
                for (day = 1; day <= 31; day++) {
                    days.push(day);
                }
                var templateHtml = $('#template_control_select_birthday_options').html(),
                    template = Handlebars.compile(templateHtml);

                return template(days);
            },
            createMonths: function () {
                var months = [],
                    month;
                for (month = 1; month <= 12; month++) {
                    months.push(month);
                }
                var templateHtml = $('#template_control_select_birthday_options').html(),
                    template = Handlebars.compile(templateHtml);

                return template(months);
            },
            createYears: function () {
                var years = [],
                    year;
                for (year = 2013; year >= 1950; year--) {
                    years.push(year);
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
            return this.$element;
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
        },
        showError: function () {
            this.getElement().addClass(this.CONFIG.ERROR_CLASS);
        },
        hideError: function () {
            this.getElement().removeClass(this.CONFIG.ERROR_CLASS);
        },
        isValid: null,
        validate: function () {
            if (!this.settings.validationType)
                return;

            var inputValue = this.getValue(),
                methodNamesArray = Object.keys(rk.validation); // TODO: DepInjection --> rk.validation als validation Obj reinreichen, bzw. die Keys selbst als Dict reinreichen

            // Check if desired validation method is available and fail miserably in case of false type invocation
            if (methodNamesArray.indexOf(this.settings.validationType) === -1)
                throw new Error (this.CONFIG.EXCEPTIONS.VALIDATION_METHOD_NOT_FOUND);

            // Calling a method dynamically with bracket notation
            if (!(rk.validation[this.settings.validationType](inputValue))) {
                this.isValid = false;
                this.showError();
            } else {
                this.isValid = true;
                this.hideError();
            }
        }
    };
    SelectControl.prototype = Object.create(SelectControlMethods);

    rk.Controls = rk.Controls || {};
    rk.Controls.Select = SelectControl;
})();
