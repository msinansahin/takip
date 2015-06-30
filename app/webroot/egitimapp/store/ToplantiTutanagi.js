Ext.define('Egitim.store.ToplantiTutanagi', {
    extend: 'Ext.data.Store',
    requires: 'Egitim.model.ToplantiTutanagi',
    model: 'Egitim.model.ToplantiTutanagi',
	pageSize: 10,
	remoteSort: true,
    // Overriding the model's default proxy
    proxy: {
        type: 'ajax',
        url: 'admins/listToplantiTutanagi',
        reader: {
            type: 'json',
            root: 'results'
        }
    }
});