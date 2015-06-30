Ext.define('Egitim.view.ToplantiTutanagiView',{
	extend: 'Ext.Component',
	alias: 'widget.toplantitutanagiview',
    
	initComponent: function () {
		this.loader = {
	        url: 'admins/viewToplantiTutanagi/' + this.ttId,
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