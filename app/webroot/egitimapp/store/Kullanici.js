Ext.define('Egitim.store.Kullanici', {
    extend: 'Ext.data.Store',
    requires: 'Egitim.model.Kullanici',
    model: 'Egitim.model.Kullanici',
    pageSize: PAGE_SIZE,
	remoteSort: true,
    // Overriding the model's default proxy
    proxy: {
        type: 'ajax',
        url: 'kullanicis/listKullanici',
        reader: {
            type: 'json',
            root: 'results'
        }
    }
});