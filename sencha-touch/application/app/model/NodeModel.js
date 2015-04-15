Ext.define('SenchaTouchExample.model.NodeModel', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            { name: 'title', type: 'string' },
            { name: 'headline', type: 'string' },
            { name: 'summary', type: 'string' }
        ]
    }
});
