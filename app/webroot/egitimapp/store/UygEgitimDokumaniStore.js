Ext.define('Egitim.store.UygEgitimDokumaniStore', {
	extend: 'Ext.data.Store',
    model: 'Egitim.model.EgitimDokumaniModel',
    autoLoad: false,
    constructor: function (config){
    	config = config || {
    		egitimId: ''
    	};
    	this.proxy = {
            type: 'ajax',
            url: 'egitims/listUygEgitimDokuman',
            reader: {
                type: 'json',
                root: 'results'
            },
            extraParams: {
            	egitimId: config.egitimId,
            	projeId: config.projeId 
            }
        };    	
    	
    	this.callParent(arguments);
    }
});

