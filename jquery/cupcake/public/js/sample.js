// TODO: create an application in Cloud CMS and add your application's API keys here
var config = {
    "clientKey": "",
    "clientSecret": "",
    "username": "",
    "password": "",
    "application": ""
};

// connect and build up the DOM
$(document).ready(function() {

    // use our /proxy to avoid CORS issues in all browsers
    config.baseURL = "/proxy";

    // connect to cloud cms
    Gitana.connect(config, function(err) {

        var html = "<table class='products'>";

        this.datastore("content").readBranch("master").queryNodes({
            "_type": "catalog:product"
        }).each(function() {

            html += "<tr>";

            // image
            html += "<td class='preview'>";
            html += "<img src='/proxy" + this.getUri() + "/attachments/default'>";
            html += "</td>";
            html += "<td class='info'>";
            html += "<h3>" + this.title + "</h3>";
            html += "<p>" + this.body + "</p>";
            html += "</td>";
            html += "</tr>";

        }).then(function() {

            html += "</table>";

            $("#content").append(html);
        });

    });

});
