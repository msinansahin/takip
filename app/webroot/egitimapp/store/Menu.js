Ext.define('Egitim.store.Menu', {
    extend: 'Ext.data.Store',
    requires: 'Egitim.model.Menu',
    model: 'Egitim.model.Menu',

    // Overriding the model's default proxy
    proxy: {
        type: 'ajax',
        reader: {
            type: 'json',
            root: 'results'
        }
    }
});