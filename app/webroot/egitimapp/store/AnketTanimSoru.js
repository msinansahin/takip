Ext.define('Egitim.store.AnketTanimSoru', {
    extend: 'Ext.data.Store',
    requires: 'Egitim.model.AnketTanimSoru',
    model: 'Egitim.model.AnketTanimSoru',
    pageSize: 40,
	remoteSort: true,

	constructor: function(config) {
		this.proxy = {
	        type: 'ajax',
	        url: 'admins/listAnketTanimSoru',
	        reader: {
	            type: 'json',
	            root: 'results'
	        }, 
	        extraParams: {
	            atId: config.atId
	        }
	    };
		this.callParent(arguments);
	}
});