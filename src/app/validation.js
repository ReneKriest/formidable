/**
 * Created by Rene on 21.04.2014.
 */

rk = window.rk || {};

(function (rk) {
    rk.validation = {
        number: function () {
            //
        },
        integer: function (intString) {
            return /^\d+$/.test(intString);
        },
        float: function () {
            return /^\d+$/.test(intString);
        },
        string: function (str) {
            return /^\w+$/.test(str);
        },
        email: function (emailString) {
            return /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/.test(emailString);
        }
    }
})(rk);