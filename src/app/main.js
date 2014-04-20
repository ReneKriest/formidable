/**
 * Created by Rene on 20.04.2014.
 */
$(document).ready(function () {
    var form = {
        settings: {
            wrapper: 'example'
        },
        form: {
            fieldset: {
                input: {
                    //
                },
                select: {
                    //
                }
            }
        }
    };
    var comp = new rk.Form('#wrapper', 'test');
    var input = new rk.Controls.Input();
    comp.add(input);
});
