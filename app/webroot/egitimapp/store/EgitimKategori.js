Ext.define('Egitim.store.EgitimKategori', {
    extend: 'Ext.data.Store',
    fields: ['key', 'name', 'leaf'],
    storeId: 'egitimkategoriforcombostore',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'tanimlars/listEgitimKategoriForCombo',
        reader: {
            type: 'json',
            root: 'results'
        }
    }
});