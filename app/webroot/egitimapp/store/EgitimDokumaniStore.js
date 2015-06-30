Ext.define('Egitim.store.EgitimDokumaniStore', {
	extend: 'Ext.data.Store',
    model: 'Egitim.model.EgitimDokumaniModel',
    autoLoad: false,
    constructor: function (config){
    	config = config || {
    		egitimId: ''
    	};
    	this.proxy = {
            type: 'ajax',
            url: 'egitims/listEgitimDokuman',
            reader: {
                type: 'json',
                root: 'results'
            },
            extraParams: {
            	egitimId: config.egitimId 
            }
        };    	
    	
    	this.callParent(arguments);
    }
});

