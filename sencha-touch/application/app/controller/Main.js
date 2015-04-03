Ext.define('SenchaTouchExample.controller.Main', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
        }
    },
    init: function(application) {
        Ext.getStore('nodeStore').on({
            scope: this,

            beforeload: this.onBeforeStoreLoad,
            load: this.onStoreLoad
        });
    },
    onBeforeStoreLoad: function() {
        //this.getRefreshButton().setDisabled(true);
    },

    onStoreLoad: function() {
        //this.getRefreshButton().setDisabled(false);
    }

});
