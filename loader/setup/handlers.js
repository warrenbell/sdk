module.exports = function()
{
    var r = {};

    r.uninstalls = function(installer)
    {
        /*
        // product catalog (cupcakes)
        installer.removeContent("catalog:product");
        installer.removeContent("catalog:article");
        installer.removeContentAtPath("/Samples/Products");
        */

        installer.removeContentPackage("catalog");
        installer.removeContentPackage("guide");
    };

    r.installs = function(installer)
    {
        /*
        // product catalog (cupcakes)
        installer.addContent({
            "title": "Catalog Product",
            "_qname": "catalog:product",
            "_type": "d:type"
        });
        installer.addContent({
            "title": "Catalog Article",
            "_qname": "catalog:article",
            "_type": "d:type"
        });
        installer.addContent({
            "_type": "catalog:product",
            "title": "Cupcake #1"
        }, {
            "parentFolderPath": "/Samples/Catalog/Products"
        });
        installer.addContent({
            "_type": "catalog:article",
            "title": "Article #1"
        }, {
            "parentFolderPath": "/Samples/Catalog/Articles"
        });
        */

        installer.addContentPackage("catalog");
        installer.addContentPackage("guide");
    };

    return r;
}();