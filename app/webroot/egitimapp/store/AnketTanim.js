Ext.define('Egitim.store.AnketTanim', {
    extend: 'Ext.data.Store',
    requires: 'Egitim.model.AnketTanim',
    model: 'Egitim.model.AnketTanim',
    pageSize: PAGE_SIZE,
	remoteSort: true,
    // Overriding the model's default proxy
    proxy: {
        type: 'ajax',
        url: 'admins/listAnketTanim',
        reader: {
            type: 'json',
            root: 'results'
        }
    }
});