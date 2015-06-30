Ext.define('Egitim.view.EgitimBilgiView',{
	extend: 'Ext.Component',
	alias: 'widget.egitimbilgiview',
	egitimId: '',
	
	initComponent: function () {
		
	    this.loader = {
	        url: 'egitims/view/' + this.egitimId,
	        autoLoad: false,
	        loadMask: 'Yükleniyor'
	    },
		
		this.callParent(arguments);
	},
	
    listeners: {
    	afterrender: function (comp){
    		comp.getLoader().load({
    			params: {
    				id:  comp.egitimId
    			}
    		});
    	}
    }
	
});