Ext.define('Egitim.store.Proje', {
    extend: 'Ext.data.Store',
    requires: 'Egitim.model.Proje',
    model: 'Egitim.model.Proje',
	pageSize: 10,
	remoteSort: true,
    // Overriding the model's default proxy
    proxy: {
        type: 'ajax',
        url: 'projes/listProje',
        reader: {
            type: 'json',
            root: 'results'
        }
    }
});