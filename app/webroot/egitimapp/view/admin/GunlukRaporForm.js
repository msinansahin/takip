Ext.define('Egitim.view.admin.GunlukRaporForm', {
	extend: 'Egitim.lib.FormPanel',
    title: 'Günlük Rapor',
    iconCls: 'gunluk-rapor',
	alias: 'widget.gunlukraporform',
	requires: ['Egitim.lib.SimpleLink', 'Egitim.view.tanimlar.ProjeCombo'],

    // The form will submit an AJAX request to this URL when submitted
    url: 'admins/saveGunlukRapor',
    autoScroll: true,
    grId: '',
	
    initComponent: function () {
    	this.items = [{
            xtype:'fieldset',
            columnWidth: 0.5,
            title: '',
            border: false,
            collapsible: false,
            defaults: {anchor: '100%'},
            items :[{
    			fieldLabel: 'Proje',
    			xtype: 'projecombo',
    			name: 'proje_id',
    		    inputWidth: 300
    		},{
        		xtype: 'egitimdate',
        		fieldLabel: 'Tarih',
        	    name: 'tarih',
        		allowBlank: false,
        		inputWidth: 150
        	}]
    	}, {
    		xtype: 'textfield',
    		name: 'konu',
    		fieldLabel: 'Konu',
    		allowBlank: false
    	}, {
    		xtype: 'htmleditor',
    		name: 'aciklama',
    		fieldLabel: 'Açıklama'
    	}, {
        	xtype: 'fieldcontainer',
        	layout: 'hbox',
        	width: 500,
        	items: [{
            	xtype: 'filefield',
                name: 'dokumandata',
                fieldLabel: 'Doküman',
                width: 400,
                //anchor: '100%',
                buttonText: 'Seç'
            },{
            	xtype: 'simplelink',
                text: 'Dokümanı Gör',
                itemId: 'dokumangor',
                act: 'dokumangor',
    	        hidden: true,
    	        margin: '3 0 0 10',
                cls: 'dokuman-download'
            }]
        },{
            name: 'id',
    		xtype: 'hidden'
        }];
    	
    	if (this.readonly === true) {
    		Egitim.lib.Utility.makeFormViewable(this.items);
    	}
    		
    	this.callParent(arguments);
    	
    }
});