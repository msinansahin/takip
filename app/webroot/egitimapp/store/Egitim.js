Ext.define('Egitim.store.Egitim', {
    extend: 'Ext.data.Store',
    requires: 'Egitim.model.Egitim',
    model: 'Egitim.model.Egitim',
	pageSize: PAGE_SIZE,
	remoteSort: true,

	constructor: function(config) {
		this.proxy = {
	        type: 'ajax',
	        url: 'egitims/listEgitim',
	        reader: {
	            type: 'json',
	            root: 'results'
	        }, 
	        extraParams: {
	            projeId: config.projeId
	        }
	    };
		this.callParent(arguments);
	}
});