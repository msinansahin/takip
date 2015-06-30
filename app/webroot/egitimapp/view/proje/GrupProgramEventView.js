Ext.define('Egitim.view.proje.GrupProgramEventView',{
	extend: 'Ext.Component',
	alias: 'widget.grupprogrameventview',
    
	initComponent: function () {
		this.loader = {
	        url: 'projes/grupProgramEventView/' + this.eventId,
	        autoLoad: false,
	        loadMask: 'Yükleniyor'
	    };
		
		this.callParent(arguments);
	},
	
    listeners: {
    	afterrender: function (comp){
    		comp.getLoader().load();
    	}
    }
	
});