Ext.define('Egitim.view.EgitmenForm', {
	extend: 'Egitim.lib.FormPanel',
    title: LBL_EGITMEN,
	alias: 'widget.egitmenform',
	requires: ['Egitim.lib.SimpleLink'],
    // The form will submit an AJAX request to this URL when submitted
    url: 'egitmens/save',
    autoScroll: true,
	egitmenId: '',
	
	initComponent: function (){
		
		this.addEvents();
		this.callParent(arguments);
	},
	
	items: [{
        xtype:'fieldset',
        columnWidth: 0.5,
        title: '',
        border: false,
        collapsible: false,
        defaults: {anchor: '100%'},
        layout: 'column',
        items :[{
    		xtype: 'textfield',
    		fieldLabel: 'Kodu',
    	    msgTarget: 'side',
    	    name: 'kod',
    		emptyText: 'Eğitmen kodu giriniz',
    		allowBlank: false,
    		inputWidth: 150
    	}]
	}, {
	        xtype:'fieldset',
	        columnWidth: 0.5,
	        title: '',
	        border: false,
	        collapsible: false,
	        defaults: {anchor: '100%'},
	        layout: 'column',
	        items :[{
	        	columnWidth: 0.5,
	        	xtype: 'container',
	        	layout: 'form',
		        defaultType: 'textfield',
	        	items: [{
	        		fieldLabel: 'Ad',
	        		name: 'ad',
	        		emptyText: 'Adı giriniz',
	        		allowBlank: false
	        	},{
	        		fieldLabel: 'Soyad',
	        		name: 'soyad',
	        		emptyText: 'Soyadı giriniz',
	        		allowBlank: false
	        	},{
	        		xtype: 'datefield',
	        		name : 'dogumTarihi',
	        		fieldLabel: 'D.Tarihi',
	        		emptyText: 'Doğum Tarihini giriniz',
	        		format: 'Y-m-d',
	        		allowBlank: false
	        	},{
	        		xtype: 'combo',
	        		name: 'cinsiyet',
	        		allowBlank: false,
	        		fieldLabel: 'Cinsiyet',
	        		width: 200,
	        	    typeAhead: true,
	        	    inputWidth: 150,
	        	    editable: false,
	        		queryMode: 'local',
	        		displayField: 'value',
	        		valueField: 'key',
	        		store: Ext.create('Ext.data.Store', {
	        		    fields: ['key', 'value'],
	        		    data : [
	        		        {"key":"K", "value":"Kadın"},
	        		        {"key":"E", "value":"Erkek"}
	        		    ]
	        		})
	        	}]
	        }, {
	        	columnWidth: 0.5,
	        	xtype: 'container',
	        	layout: 'form',
	        	padding: '0 0 0 10',
	        	items: [{
	        		xtype: 'textfield',
	        		fieldLabel: 'Tel',
	        		name: 'tel',
	        		emptyText: 'Telefon giriniz',
	        		allowBlank: false
	        		
	        	},{
	        		xtype: 'textfield',
	        		name: 'mobil',
	        		fieldLabel: 'Mobil'
	        	},{
	        		xtype: 'textfield',
	        		name: 'eposta',
	        		emptyText: 'E-posta giriniz',
	        		fieldLabel: 'E-Posta',
	        		vtype: 'email',
	        		allowBlank: false
	        	}]
	        }]
	    },{
	        xtype:'fieldset',
	        columnWidth: 0.5,
	        title: 'Adres',
	        collapsible: false,
	        defaultType: 'textfield',
	        defaults: {anchor: '100%'},
	        layout: 'column',
	        items :[{
	        	columnWidth: 0.5,
	        	xtype: 'container',
	        	layout: 'form',
	        	items: [{
	        		xtype: 'textfield',
	        		fieldLabel: 'Sokak'
	        	},{
	        		xtype: 'textfield',
	        		fieldLabel: 'Cadde'
	        	}]
	        }, {
	        	columnWidth: 0.5,
	        	xtype: 'container',
	        	layout: 'form',
	        	padding: '0 0 0 10',
	        	items: [{
	        		xtype: 'textfield',
	        		fieldLabel: 'Ülke'
	        	},{
	        		xtype: 'textfield',
	        		fieldLabel: 'İl'
	        	},{
	        		xtype: 'textfield',
	        		fieldLabel: 'İlçe'
	        	}]
	        }]
    },
    {
        name: 'web',
        xtype: 'textfield',
        fieldLabel: 'Web Url'
    },{
    	xtype: 'fieldcontainer',
    	layout: 'hbox',
    	style :'width: 300px',
    	width: 500,
    	items: [{
        	xtype: 'filefield',
            name: 'cvdata',
            fieldLabel: 'CV',
            hidden: false,
        	width: 400,
            //anchor: '100%',
            buttonText: 'CV Seçin'
        },{
        	xtype: 'simplelink',
            text: 'Özgeçmiş Gör',
            itemId: 'cvgor',
            act: 'cvgor',
	        hidden: true,
	        margin: '3 0 0 10',
            cls: 'cv-download'
        }/*{
			fieldLabel: 'Özgeçmişi Gör',
		    xtype: 'box',
	        cls: 'cv-download',
	        itemId: 'cvgor',
	        hidden: true,
	        //padding: '0 0 20 00',
	        margin: '3 0 0 10',
		    autoEl: {
		        tag: 'a',
		        href: '#',
		        onclick: "Egitim.view.EgitmenForm.cvgor();",
		        html: 'Özgeçmişi Gör'
		    }
		}*//*,{
        	xtype: 'button',
        	text: 'CV Gör',
        	itemId: 'cvgor',
        	action: 'cvgor',
        	hidden: true
        }*/]
    },{
        name: 'id',
		xtype: 'hidden'
    }]
});