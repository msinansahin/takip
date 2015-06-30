/**
 * 
 */
Ext.define('Egitim.store.GrupProgramEventStore', {
    extend: 'Ext.data.Store',
    model: 'Egitim.model.EventModel',
    autoLoad: false,
    constructor: function (config){
    	config = config || {
    		projeId: '',
    		grup: ''
    	};
    	this.proxy = {
            type: 'ajax',
            url: 'projes/listGrupProgramEvent',
            reader: {
                type: 'json',
                root: 'evts'
            },
            extraParams: {
            	projeId: config.projeId,
            	grup: config.grup
            }
        };    	
    	
    	this.callParent(arguments);
    }
});

