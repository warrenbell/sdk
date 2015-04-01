Ext.define('SenchaTouchExample.store.Node', {
    extend: 'Ext.data.Store',
    requires: ['SenchaTouchExample.model.NodeModel'],
    config: {
        model: 'SenchaTouchExample.model.NodeModel',
        storeId:'nodeStore',
//        proxy: 'SenchaTouchExample.proxy.Gitana',
        reader: {
            type: 'json'
        }


    },

});
Ext.define('SenchaTouchExample.proxy.Gitana', {
    extend: 'Ext.data.proxy.Proxy',

});
