# CloudCMS Hello-Ember

This folder contains a simple starter app using Ember JS -- build through the ember-cli utility.

## File structure
within the ember app, these are the specific files that were modified in order to integrate the CloudCMS driver:
<pre>
    |-- app
    |   |-- adapters
    |   |   `-- cupcake.js
    |   |-- app.js
    |   |-- models
    |   |   `-- cupcake.js
    |   |-- router.js
    |   |-- routes
    |   |   |-- cupcake.js
    |   |   `-- cupcakes.js
    |   |-- templates
    |   |   |-- application.hbs
    |   |   |-- cupcake.hbs
    |   |   `-- cupcakes.hbs
    |-- Brocfile.js
    |-- public
    |   |-- assets
    |   |   `--cloudcms
    |   |      `-- GITANA_CREDENTIALS.js
    |-- README.md
    |-- server
        `-- proxies
            `-- proxy.js

</pre>

## Prerequisites

You will need the following things properly installed on your computer.

* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)
* [Ember CLI](http://www.ember-cli.com/)

## Installation

* `npm install`
* `bower install`

## Running / Development

* `ember server`
* Visit your app at [http://localhost:4200](http://localhost:4200/).

## Further Reading / Useful Links

* [Cloud CMS docs](https://www.cloudcms.com/documentation.html)
* [ember.js](http://emberjs.com/)
* [ember-cli](http://www.ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
