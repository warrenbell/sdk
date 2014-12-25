module.exports = function()
{
    var r = {};

    r.uninstalls = function(installer)
    {
        // clean things up
        installer.removeContentInstances("wcm:page");
        installer.removeContentPackage("_common");
        installer.removeContentPackage("catalog");
        installer.removeContentPackage("guide");
    };

    r.installs = function(installer)
    {
        installer.addContentPackage("_common");
        installer.addContentPackage("catalog");
        installer.addContentPackage("guide");
    };

    return r;
}();