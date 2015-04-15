# Hello world Sencha Touch

You can use this project as a way to test out a simple sencha-touch HTML web
page connecting to Cloud CMS.  This example provides a simple browser
application that connects to the Cloud CMS Sample Project on your tenant and
pulls back a list of repositories.


## Filesystem structure

    sencha-touch
        |-- application
        |   |-- app
        |   |-- build
        |   |-- packages
        |   |-- resources
        |   |-- .sencha
        |   |-- touch
        |   |-- app.js
        |   |-- app.json
        |
        |-- bower_components
        |
        |-- node_modules


### sencha-touch/

The root folder of this project contains setup and utilities specific to getting
this demo to work in a local environment with [Grunt](http://gruntjs.com/) and
providing the Gitana JS driver through [Bower](http://bower.io/).


### applications/

This folder is the actual Sencha application.  It follows the structure of a
typical Sencha application that is generated using Sencha Cmd (see below)
It contains more files than are listed in the tree above, but `app.js` and
`app.json` contain all the code that was changed to build this demo.


## How to launch the web server

From the `sencha-touch/` directory Simply do:

    npm install
    npm start

Look up authentication and application information at
`https://[your-sub-domain].cloudcms.net/#/developers` (click on gitana.json)
and add them to `./application/GITANA_CREDENTIALS.js`.  Be sure not to replace `baseUr:"/proxy"`

And then point your browser to:

    http://localhost:3000/index.html

If you have trouble loading images see **Cookies** below.


## Reaching CloudCMS with a local proxy

In order to connect to Cloud CMS, the demo should be run using a local proxy.
The proxy is started using Grunt and the Grunt Connect proxy module.  The
proxy starts up at the /proxy URI.  Any URL that starts with /proxy will be
forwarded to the api.cloudcms.com server.  The proxy allows your web app to
provide a "same domain" endpoint for XHR/Ajax connections that originate
in the browser.  In production, you will likely want to use Apache or Nginx
as a proxy.


## Cookies

Some browsers have cookie-related restrictions to using localhost.  For
example, Google Chrome does not persist cookies on the localhost domain.  If
you want to see images or other static resources loaded from Cloud CMS, edit
your /etc/hosts file and set an alternative domain name, such as:

    http://testserver:3000/index.html


## Sencha Cmd

Sencha applications are best created using the Sencha Cmd command-line tool.
More info on [downloading](1) and [installing](2)
the tool can be found elsewhere.

In order to run this demo, you do not need to install Sencha Cmd, however,
if you need to make changes to app.json during experimentation (edit and  run
`sencha app refresh`), or would like to see a production
build (`sencha app build`), you'll need to have the tool installed.


## additional notes

Normally in a production environment, credentials would be handled by a
supporting server, not directly in the browser.  If you intend to use this
example as a starting point, you should remove the `GITANA_CREDENTIALS.js`
file and authenticate with CloudCMS a different way.

This demo was build on top of the example [getting started scenario](3).
In a full development environment, your app will likely be split into more
files using Sencha's [app/filesystem conventions](4).

[1]: https://www.sencha.com/products/sencha-cmd/download
[2]: http://docs.sencha.com/cmd/5.x/intro_to_cmd.html
[3]: http://docs.sencha.com/touch/2.4/getting_started/building_your_first_app.html
[4]: http://docs.sencha.com/touch/2.4/core_concepts/about_applications.html
