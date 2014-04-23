rk = window.rk || {};

;(function () {
    // Strict mode --> fail earlier
    'use strict';
    // Constructor function for the Select Control (leaf)
    function SelectControl (settings, enumObjectBirthdate) {
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
            ERROR_CLASS: 'rk_control_error',
            EXCEPTIONS: {
                VALIDATION_METHOD_NOT_FOUND: 'Method not found!'
            }
        };

        // Single var pattern:
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
            },
            templateHtml,
            template;

        // Merge the default settings with injected settings
        settings = $.extend(defaultSettings, settings);
        settings.id = settings.id + SelectControl.id;
        settings.name = settings.name + SelectControl.id;
        SelectControl.id++;

        // Expose the settings object
        this.settings = settings;
        this.id = settings.id;
        this.isValid = null;
        this.controlName = '';

        handlebarHelperRegistration();

        // Normal Values
        if (settings.values) {
            templateHtml = $(this.CONFIG.TEMPLATE.SELECT).html();
            template = Handlebars.compile(templateHtml);
        } else {
            // Birthday
            if (settings.birthDay) {
                this.controlName = enumObjectBirthdate.DAY;
                templateHtml = $(this.CONFIG.TEMPLATE.BIRTHDAY).html();
                template = Handlebars.compile(templateHtml);
            }
            if (settings.birthMonth) {
                this.controlName = enumObjectBirthdate.MONTH;
                templateHtml = $(this.CONFIG.TEMPLATE.BIRTHMONTH).html();
                template = Handlebars.compile(templateHtml);
            }
            if (settings.birthYear) {
                this.controlName = enumObjectBirthdate.YEAR;
                templateHtml = $(this.CONFIG.TEMPLATE.BIRTHYEAR).html();
                template = Handlebars.compile(templateHtml);
            }
        }
        // Convention: $element --> jQuery object
        this.$element = $(template(settings));
    }

    // Handlebar Helper registration and configuration
    function handlebarHelperRegistration() {
        // Again: Static variable and an early return to prevent multiple registrations
        if (SelectControl.helperRegistered)
            return;

        SelectControl.helperRegistered = true;

        var CONFIG = {
            BIRTHDATE_OPTIONS_TEMPLATE: '#template_control_select_birthday_options',

            MIN_DAY_COUNT: 1,
            MAX_DAY_COUNT: 31,

            MIN_MONTH_COUNT: 1,
            MAX_MONTH_COUNT: 12,

            MIN_YEAR_COUNT: 1950,
            MAX_YEAR_COUNT: 2013
        };
        var handlebarHelper = {
            createDays: function () {
                var days = [],
                    day;
                for (day = CONFIG.MIN_DAY_COUNT; day <= CONFIG.MAX_DAY_COUNT; day++) {
                    days.push(day);
                }
                var templateHtml = $(CONFIG.BIRTHDATE_OPTIONS_TEMPLATE).html(),
                    template = Handlebars.compile(templateHtml);

                return template(days);
            },
            createMonths: function () {
                var months = [],
                    month;
                for (month = CONFIG.MIN_MONTH_COUNT; month <= CONFIG.MAX_MONTH_COUNT; month++) {
                    months.push(month);
                }
                var templateHtml = $(CONFIG.BIRTHDATE_OPTIONS_TEMPLATE).html(),
                    template = Handlebars.compile(templateHtml);

                return template(months);
            },
            createYears: function () {
                var years = [],
                    year;
                for (year = CONFIG.MAX_YEAR_COUNT; year >= CONFIG.MIN_YEAR_COUNT; year--) {
                    years.push(year);
                }
                var templateHtml = $(CONFIG.BIRTHDATE_OPTIONS_TEMPLATE).html(),
                    template = Handlebars.compile(templateHtml);

                return template(years);
            }
        };

        Handlebars.registerHelper('birthDay', handlebarHelper.createDays);
        Handlebars.registerHelper('birthMonth', handlebarHelper.createMonths);
        Handlebars.registerHelper('birthYear', handlebarHelper.createYears);
    }
    // Handlebar Helper registration and configuration END

    // Prototype methods
    var SelectControlMethods = {
        getElement: function () {
            return this.$element;
        },
        getSelectNode: function () {
            // TODO: Performance: caching
            return $('#' + this.id);
        },
        getValue: function () {
            return this.getSelectNode().val();
        },
        save: function () {
            return {
                'name': this.settings.name,
                'value': this.getValue()
            }
        },
        showError: function () {
            this.getSelectNode().addClass(this.CONFIG.ERROR_CLASS);
        },
        hideError: function () {
            this.getSelectNode().removeClass(this.CONFIG.ERROR_CLASS);
        },
        validate: function () {
            // Early return in case of no validation
            if (!this.settings.validationType)
                return;

            var inputValue = this.getValue(),
                methodNamesArray = Object.keys(rk.validation);

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
    SelectControl.prototype = Object.create(SelectControlMethods);

    rk.Controls = rk.Controls || {};
    rk.Controls.Select = SelectControl;
})();
