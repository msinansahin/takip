Ext.define('Egitim.store.AnketGenelSonuc', {
    extend: 'Ext.data.Store',
    requires: 'Egitim.model.AnketGenelSonuc',
    model: 'Egitim.model.AnketGenelSonuc',
    pageSize: 999,
	remoteSort: true,

	constructor: function(config) {
		config = config || {};
		this.proxy = {
	        type: 'ajax',
	        url: 'ankets/viewGenelSonuc',
	        reader: {
	            type: 'json',
	            root: 'results'
	        }, 
	        extraParams: {
	            projeId: config.projeId,
	            anketTanimId: config.anketTanimId
	        }
	    };
		this.callParent(arguments);
	}
});