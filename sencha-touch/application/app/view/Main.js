Ext.define('SenchaTouchExample.view.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'main',
    requires: [
        'Ext.TitleBar'
    ],
    config: {
        tabBarPosition: 'bottom',
        fullscreen:true,

        items: [
            {
                title: 'Welcome',
                iconCls: 'home',

                styleHtmlContent: true,
                scrollable: true,

                items: {
                    docked: 'top',
                    xtype: 'titlebar',
                    title: 'Welcome to Sencha Touch 2'
                },

                html: [
                    "You've just generated a new Sencha Touch 2 project. What you're looking at right now is the ",
                    "contents of <a target='_blank' href=\"app/view/Main.js\">app/view/Main.js</a> - edit that file ",
                    "and refresh to change what's rendered here."
                ].join("")
            },
            {
                xtype: 'nestedlist',
                title: 'Cupcakes',
                iconCls: 'star',
                displayField: 'title',
                layout: 'fit',
                store: 'SenchaTouchExample.store.Node',
                onLoad: function() {
                    var me = this,
                        store = me.getStore();

                    me.callParent(arguments);

                    if (store.getCount() === 0 && store.isLoaded()) {
                        me.setMasked({
                            xtype: 'loadmask',
                            indicator: false,
                            message: 'Error'
                        });
                    }
                },
                detailCard: {
                    xtype: 'panel',
                    scrollable: true,
                    styleHtmlContent: true
                },

                listeners: {
                    activate: 'onActivate',
                    itemtap: function(nestedList, list, index, element, data) {

                        console.log(this,data,list);
                        this.getDetailCard().setHtml(post.get('content'));
                    }
                },}
        ]
    },

    onActivate: function(me, container) {
        console.log('test');
        new Gitana().connect({
            "clientKey": "54f27409-d728-4093-b16a-f6f42d8dd6ff",
            "clientSecret": "qJ3xN9d/WmGsgofnSp2KHrE9lKbnpWP1jlA/HdZL9meBzjVQNZSBsWjxePeURJw4/7I/VWAHEdQOCDc+WhW+Imuni9oyEl0xjVk++LIjpZ0=",
            "username": "44d5859a-c495-4d80-9dec-1cbccccdf971",
            "password": "h6+0nyZWAIqBiBu/+4oUcu8XZt8FJCNZFoyptUoVd6bLGTQaNkbOQltWISrNTrHHB/h6SOYyeLuIyHfB3njSOJpupX8425oTtkdDqYFOlC4=",
            "baseURL": "/proxy",
            "application": "f9f39a0298514e087461"
        }).then(function() {
            var authInfo = this.getDriver().getAuthInfo();
            var name = authInfo.getPrincipalName();
            console.log(name);
            me.innerItems[0].setHtml('Hello ' + name + '! Welcome to Cloud CMS!');
        });
    }
});
