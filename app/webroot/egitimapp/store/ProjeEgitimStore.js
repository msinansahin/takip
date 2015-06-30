Ext.define('Egitim.store.ProjeEgitimStore', {
	extend: 'Ext.data.Store',
    model: 'Egitim.model.ImageEgitim',
    autoLoad: false,
    constructor: function (config){
    	config = config || {
    		projeId: ''
    	};
    	Ext.apply(this, config);
    	this.proxy = {
            type: 'ajax',
            url: 'projes/listProjeEgitim',
            reader: {
                type: 'json',
                root: 'results'
            },
            extraParams: {
            	id: config.projeId 
            }
        };    	
    	
    	this.callParent(arguments);
    }
});

