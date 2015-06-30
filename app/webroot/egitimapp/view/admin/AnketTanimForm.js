Ext.define('Egitim.view.admin.AnketTanimForm', {
	extend: 'Egitim.lib.FormPanel',
    title: LBL_EGITMEN,
	alias: 'widget.ankettanimform',
	requires: [],

    // The form will submit an AJAX request to this URL when submitted
    url: 'admins/saveAnketTanim',
    autoScroll: true,
	
    initComponent: function () {
    	this.items = [{
    		xtype: 'textfield',
    		fieldLabel: 'Kodu',
    	    msgTarget: 'side',
    	    name: 'kod',
    		emptyText: 'Anketin kodunu giriniz',
    		allowBlank: false,
    		inputWidth: 150
    	}, {
    		xtype: 'textfield',
    		name: 'baslik',
    		fieldLabel: 'Başlık',
    		allowBlank: false
    	}, {
    		xtype: 'textarea',
    		name: 'aciklama',
    		fieldLabel: 'Açıklama',
    		allowBlank: false
    	},{
            name: 'id',
    		xtype: 'hidden'
        }];
    	
    	this.callParent(arguments);
    }
});