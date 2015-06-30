Ext.define('Egitim.store.ProjeAnketStore', {
	extend: 'Ext.data.Store',
    model: 'Egitim.model.ImageAnket',
    autoLoad: false,
    constructor: function (config){
    	config = config || {
    		projeId: ''
    	};
    	Ext.apply(this, config);
    	this.proxy = {
            type: 'ajax',
            url: 'projes/listProjeAnket',
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

