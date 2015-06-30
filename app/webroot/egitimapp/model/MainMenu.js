Ext.define('Egitim.model.MainMenu', {
    extend: 'Ext.data.Model',
    fields: ['title', 'iconCls', 'items'],
    proxy: {
        type: 'ajax',
        reader: {
            type: 'json',
            root: 'results'
        }
    }
});