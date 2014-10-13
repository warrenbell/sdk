var f = function() {

    var r = {};

    var packageUninstall = function(installer)
    {
        // remove old things
        installer.removeContent("sample:article");
        installer.removeContent("sample:product");
        installer.removeContent("sample:biography");
    };

    var packageInstall = function(installer)
    {
        // add sample:article
        installer.addContent({
            "title": "Article",
            "_qname": "sample:article",
            "_type": "d:type"
        });

        // add sample:product
        installer.addContent({
            "title": "Product",
            "_qname": "sample:product",
            "_type": "d:type"
        });

        // add sample:biography
        installer.addContent({
            "title": "Biography",
            "_qname": "sample:biography",
            "_type": "d:type"
        });

        // biographies
        installer.addContent({
            "_type": "sample:biography",
            "_filepath": "/Biographies/Joe Smith",
            "title": "Joe Smith",
            "name": "Joe Smith",
            "headline": "A reckless player",
            "bio": "Joe was born in 1976 in the town of Greenfield, Wisconsin.  He was a bright young man with a hopeful future.  Or was it the other way around..."
        });
    };

    r.uninstall = function(installer, callback)
    {
        packageUninstall(installer);

        installer.execute(function(err, results) {
            callback(err, results);
        });
    };

    r.install = function(installer, callback)
    {
        packageUninstall(installer);
        packageInstall(installer);

        installer.execute(function(err, results) {
            callback(err, results);
        });
    };

    return r;
};

module.exports = f();