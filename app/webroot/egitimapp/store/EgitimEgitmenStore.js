/**
 * Eğitimi verecek eğitmenleri listeler
 */
Ext.define('Egitim.store.EgitimEgitmenStore', {
	extend: 'Ext.data.Store',
    model: 'Egitim.model.ImageEgitmen',
    autoLoad: false,
    constructor: function (config){
    	config = config || {
    		projeId: ''
    	};
    	this.proxy = {
            type: 'ajax',
            url: 'egitmens/listEgitimEgitmen',
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

