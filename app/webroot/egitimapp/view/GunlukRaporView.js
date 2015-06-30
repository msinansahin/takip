Ext.define('Egitim.view.GunlukRaporView',{
	extend: 'Ext.Component',
	alias: 'widget.gunlukraporview',
    
	initComponent: function () {
		this.loader = {
	        url: 'admins/viewGunlukRapor/' + this.grId,
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