$(document).ready(function() {

    var handler = function() {
        $("A").insight();
    };

    $(document).bind('pagechange', handler);
    handler();
});
