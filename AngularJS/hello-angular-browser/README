# Hello World AngularJS

This directory provides a simple browser application that connects to the Cloud CMS Sample Project on your
tenant and pulls back a list of repositories.  It is based off of the [root]/helloworld-browser in this repository.

You can use this project as a way to test out a simple AngularJS-based HTML web page connecting to Cloud CMS.

## Sample #1 (index.html)

The first sample connects to Cloud CMS using a local proxy.  The proxy is started using Grunt and the
Grunt Connect proxy module.  The proxy starts up at the /proxy URI.  Any URL that starts with /proxy will be forwarded
to the api.cloudcms.com server.  The proxy allows your web app to provide a "same domain" endpoint for XHR/Ajax
connections that originate in the browser.

In production, you will likely want to use Apache or Nginx as a production proxy.

## How to launch the web server

Simply do:

    npm install
    npm start


Look up authentication and application information at https://[your-sub-domain].cloudcms.net/#/developers
and add them to `./GITANA_CREDENTIALS.js`.

And then point your browser to:

    http://localhost:3000/index.html

## Cookies

Some browsers have cookie-related restrictions to using localhost.  For example, Google Chrome does not
persist cookies on the localhost domain.  If you want to see images or other static resources loaded
from Cloud CMS, edit your /etc/hostsfile and set an alternative domain name, such as:

    http://testserver:3000/index.html

## additional notes
 normally in a production environment, credentials would be handled by a supporting server, not directly in the
 browser.  If you intend to use this example as a starting point, you should remove the GITANA_CREDENTIALS.js
 file and authenticate with CloudCMS a different way.
