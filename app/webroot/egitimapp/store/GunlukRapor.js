Ext.define('Egitim.store.GunlukRapor', {
    extend: 'Ext.data.Store',
    requires: 'Egitim.model.GunlukRapor',
    model: 'Egitim.model.GunlukRapor',
    pageSize: PAGE_SIZE,
	remoteSort: true,
    // Overriding the model's default proxy
    proxy: {
        type: 'ajax',
        url: 'admins/listGunlukRapor',
        reader: {
            type: 'json',
            root: 'results'
        }
    }
});