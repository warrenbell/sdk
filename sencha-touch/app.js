/*
    This file is generated and updated by Sencha Cmd. You can edit this file as
    needed for your application, but these edits will have to be merged by
    Sencha Cmd when it performs code generation tasks such as generating new
    models, controllers or views and when running "sencha app upgrade".

    Ideally changes to this file would be limited and most work would be done
    in other places (such as Controllers). If Sencha Cmd cannot merge your
    changes and its generated code, it will produce a "merge conflict" that you
    will need to resolve manually.
*/

//Ext.application({
    //name: 'SenchaTouchExample',
    ////views: ['Main'],
    ////models: ['NodeModel'],
    ////stores: ['Node'],
    ////controllers: ['Main'],
    //launch: function() {
        //console.log('launching');

        //Ext.create('SenchaTouchExample.view.Main');



// connect to cloudCMS.  CONNECTION_CREDENTIALS is a global stored t
// separate credentials from this file (./public/GITANA_CREDENTIALS.js) For demo purposes only.
// You should not make credentials available to the browser directly
// in production.


Ext.application({
    name: 'GitanaExample',

    launch: function() {

        var store = Ext.create('Ext.data.Store', {
            storeId: 'Store',
            fields: ['title', 'headline', 'summary', 'body'],
            //root: {
                //leaf: false
            //}
            //proxy: {
                //type: 'jsonp',
                //url: 'https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&q=http://feeds.feedburner.com/SenchaBlog',
                //reader: {
                    //type: 'json',
                    //rootProperty: 'responseData.feed.entries'
                //}
            //}
        });

        var panel = Ext.create("Ext.tab.Panel", {
            fullscreen: true,
            tabBarPosition: 'bottom',

            items: [
                {
                    xtype: 'list',
                    title: 'Cupcakes',

                    iconCls: 'star',
                    displayField: 'title',

                    store: 'Store',
                    itemTpl: '{title}',
                    //tpl: [
                        //'<div class="product-info-header">',
                                //'<img src={image} width="100px" height="100px"/>',
                                //'<h3>foobar{name}</h3>',
                                //'<h4>Price: {price}</h4>',
                                //'<h4>Seller: {sellerUsername}</h4>',
                        //'</div>',
                    //],
                    //detailCard: {
                        //xtype: 'panel',
                        //scrollable: true,
                        //styleHtmlContent: true
                    //},

                    //listeners: {


                        //itemtap: function(nestedList, list, index, element, post) {
                            //this.getDetailCard().setHtml(post.get('content'));
                        //}
                    //}
                },
                // this is the new item
                {
                    title: 'Contact',
                    iconCls: 'user',
                    xtype: 'formpanel',
                    url: '',
                    layout: 'vbox',

                    items: [
                        {
                            xtype: 'fieldset',
                            title: 'Contact Us',
                            instructions: '(email address is optional)',
                            height: 285,
                            items: [
                                {
                                    xtype: 'textfield',
                                    label: 'Name'
                                },
                                {
                                    xtype: 'emailfield',
                                    label: 'Email'
                                },
                                {
                                    xtype: 'textareafield',
                                    label: 'Message'
                                }
                            ]
                        },
                        {
                            xtype: 'button',
                            text: 'Send',
                            ui: 'confirm',
                            handler: function() {
                                this.up('formpanel').submit();
                            }
                        }
                    ]
                }
            ]
        });

        var query = {"_type":"catalog:product"};
        Gitana.connect(CONNECTION_CREDENTIALS, function(err) {

            if (err) {
                //var errorPrefix = "Failed to connect to CloudCMS:";
                //this.notification = errorPrefix + err.toString();
                console.log("Failed to connect to Cloud CMS: " + err);
                return;
            }

            // "content" is a repository allocated to this Cloud CMS application's stack
            this.datastore("content")
            .trap(function(err) {
                // if anything downstream on this chain throws, this trap function will catch it
                console.error("Could not connect to CloudCMS: " + err.message);
                return false;
            })
            .readBranch("master")
            .queryNodes(query).then(function () {

                // note that since we define fields above.
                var store = Ext.StoreMgr.get('Store');
                console.log(store);
                console.log(this.asArray());
                store.add(this.asArray());
                store.sync();
            });
            GLOBAL = store;
        });
    }
});
