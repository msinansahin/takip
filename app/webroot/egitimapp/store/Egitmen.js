Ext.define('Egitim.store.Egitmen', {
    extend: 'Ext.data.Store',
    requires: 'Egitim.model.Egitmen',
    model: 'Egitim.model.Egitmen',
	pageSize: 20,
	remoteSort: true,
    // Overriding the model's default proxy
    proxy: {
        type: 'ajax',
        url: 'egitmens/listEgitmen',
        reader: {
            type: 'json',
            root: 'results'
        }
    }
});