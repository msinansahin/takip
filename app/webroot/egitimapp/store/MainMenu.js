Ext.define('Egitim.store.MainMenu', {
    extend: 'Ext.data.Store',
    requires: ['Egitim.model.MainMenu'],
    model: 'Egitim.model.MainMenu',

    // Overriding the model's default proxy
    proxy: {
        type: 'ajax',
        url: 'menus/',
        reader: {
            type: 'json',
            root: 'results'
        }
    }
});