Ext.define('Egitim.store.Katilimci', {
    extend: 'Ext.data.Store',
    requires: 'Egitim.model.Katilimci',
    model: 'Egitim.model.Katilimci',
	pageSize: PAGE_SIZE,
	remoteSort: true,
	groupField: 'grup',
	
	constructor: function(config) {
		this.proxy = {
	        type: 'ajax',
	        url: 'katilimcis/listKatilimci',
	        reader: {
	            type: 'json',
	            root: 'results'
	        }, 
	        extraParams: {
	            projeId: config.projeId,
	            userOlanlar: config.userOlanlar
	        }
	    };
		this.callParent(arguments);
	}
});