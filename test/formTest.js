/**
 * Created by Rene on 20.04.2014.
 */
(function (QUnit) {
    QUnit.test('Test', function () {
        ok(true, 'True');

        var ray = [{}];

        strictEqual(true, init(), 'True');
    });

    function init () {
        var comp = new rk.Form('#wrapper', 'test');
        var fieldSet = new rk.FieldSet();

        var input = new rk.Controls.Input();

        fieldSet.add(input);

        comp.add(fieldSet);
        var result = comp;

        var ray = result.save();
        if (Array.isArray(ray) && ray[0] instanceof Object)
            return true;
    }

})(QUnit);
