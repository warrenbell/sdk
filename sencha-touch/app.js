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

/*TODO:  if this were a real MVC style application, we would be configuring
 * most this in controller, store, view , model.*/
//Ext.application({
    //name: 'SenchaTouchExample',
    ////views: ['Main'],
    ////models: ['NodeModel'],
    ////stores: ['Node'],
    ////controllers: ['Main'],
    //launch: function() {
        //console.log('launching');

        //Ext.create('SenchaTouchExample.view.Main');

Ext.application({
    name: 'GitanaExample',

    launch: function() {

        var store = Ext.create('Ext.data.Store', {
            storeId: 'Store',
            fields: ['title', 'headline', 'summary', 'body', 'fullImageUri'],
            //'getUri','getRepositoryId','getBranchId','getId', 'get', ]
            // before locally creating the uri path at store build time
            // tried exposing methos as fields on the store.  Yikes.
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
                    itemTpl:
                        '<div>' +
                            '<h2 style="font-weight:bold;font-size:120%">{title}</h2>' +
                             '<span style="font-size:90%;color:gray">{headline}</span>' +
                        '</div>',
                    listeners: {

                        /**
                         * declare an event for tapping one of the items in our list.
                         */
                        itemtap: function(uiList, list, index, element, node) {
                            var popup = new Ext.Panel({
                                fullscreen:true,
                                centered: true,
                                modal: true,
                                scrollable : {
                                    direction     : 'vertical',
                                    directionLock : true
                                },
                                width: "80%",
                                height: "90%",
                                data: element.data, // <-- this tells the
                                                    // template what "data"
                                                    // to use for interpolation.

                                // please forgive all the inline styles...
                                tpl: "<div>" +
                                        "<div style='width:100%;height:50%'>" +
                                            "<div style='display:inline-block;padding:20px;width:296px;text-align:center'>" +
                                                "<img src='{fullImageUri}' />" +
                                            "</div>" +
                                            "<div style='display:inline-block;padding:20px;width:auto'>" +
                                                "<h1 style='font-size:220%'>{title}</h1>" +
                                                "<h3 style='font-size:160%;color:#666'>{headline}</h3>" +
                                            "</div>" +
                                        "</div>" +
                                        "<div style='height:50%'>" +
                                            "<p style='padding:20px;font-size:120%'>{summary}</p></div>" +
                                        "</div>" +
                                     "</div>",
                                items: [{
                                    docked:'top',
                                    xtype: 'toolbar',
                                    items: [{
                                        xtype: 'spacer'
                                    },{
                                        text: 'Close',
                                        handler: function(){
                                            popup.hide();
                                        }
                                    }]
                                }]
                            });

                            // display the panel we just created
                            popup.show();
                        }
                    }
                },
                // Some demo material from sencha-touch website below. No effect.
                {
                    title: 'Contact',
                    iconCls: 'user',
                    xtype: 'formpanel',
                    url: '',
                    layout: 'vbox',

                    items: [
                        {
                            xtype: 'fieldset',
                            title: 'Contact Us Re: Cupcakes',
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


        // connect to cloudCMS.  CONNECTION_CREDENTIALS is a global stored t
        // separate credentials from this file (./public/GITANA_CREDENTIALS.js) For demo purposes only.
        // You should not make credentials available to the browser directly
        // in production.

        var query = {"_type":"catalog:product"};
        // TODO: get this out of the launch method so
        // it's running async with startup.
        Gitana.connect(CONNECTION_CREDENTIALS, function(err) {

            if (err) {
                console.error("Failed to connect to Cloud CMS: " + err);
                return;
            }

            // "content" is a repository allocated
            // to this Cloud CMS application's stack
            this.datastore("content")
            .trap(function(err) {
                // if anything downstream on this
                // chain throws, this trap function will catch it
                console.error("Could not connect to CloudCMS: " +
                        err.message);
                return false;
            })
            .readBranch("master")
            .queryNodes(query).then(function () {

                // note that since we define fields above.
                var store = Ext.StoreMgr.get('Store');

                // TODO: I believe we can do something like
                // `nodes.each(function(){});` before doing
                // asArray() whne we send them to the
                // sencha store.
                var nodes = this.asArray();

                // since we have some issues retaining
                // context once these nodes are in sencha-land,
                // we hack on a uri to the image here.
                for(var x =0; x < nodes.length; x++) {
                    console.log(nodes[x]);
                    nodes[x].fullImageUri =
                        "/proxy" +
                        nodes[x].getUri() +
                        "/preview/helloCloudcms_256" +
                        "?mimetype=image/jpeg&size=256&attachment=default";
                }
                // here's where we return to interacting with sencha.
                // We've executed our query and gotten a set of nodes
                // using the Gitana driver.  Now we add those nodes
                // to the store that we got just above this.
                store.add(nodes);

                // once we've added the nodes, we have to tell the
                // store we're done making changes, by telling it
                // to sync what changes we've made.
                store.sync();
            });
        });
    }
});
