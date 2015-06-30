Ext.define('Egitim.view.uyg.UygEgitimDokumaniYuklemeForm', {
	extend: 'Egitim.lib.FormPanel',
	alias: 'widget.uygegitimdokumaniyuklemeform',
	bodyPadding: 5,
    layout: 'anchor',
    defaults: {
        anchor: '100%'
    },
    url: 'egitims/saveUygEgitimDokuman',
    defaultType: 'textfield',
    uygegitimdokumaniId: null,
    
    initComponent: function () {
    	var me = this;
        this.items = [{
        	xtype: 'textfield',
        	fieldLabel: 'Kod',
        	name: 'kod',
        	allowBlank: false
        }, {
        	xtype: 'textfield',
        	fieldLabel: 'Başlık',
        	name: 'baslik',
        	allowBlank: false
        }, {
        	xtype: 'textarea',
        	fieldLabel: 'Açıklama',
        	name: 'aciklama'
        },{
        	xtype: 'checkbox',
        	fieldLabel: 'İndirilebilir',
        	name: 'indirilebilir',
        	checked: true
        },{
        	xtype: 'fieldcontainer',
        	layout: 'hbox',
        	items: [{
            	xtype: 'filefield',
                //name: 'dokumandata',
            	name: 'data[UygEgitimDokumani][dokuman]',
                fieldLabel: 'Dosya',
                anchor: '100%',
                buttonText: 'Seç'
            }/*,{
            	xtype: 'button',
            	text: 'CV Gör',
            	itemId: 'cvgor',
            	action: 'cvgor',
            	flex: 1,
            	hidden: true
            }*/]
        },{
            name: 'egitim_id',
    		xtype: 'hidden',
    		value: this.egitimId
        },{
            name: 'egitmen_id',
    		xtype: 'hidden'
        },{
            name: 'proje_id',
    		xtype: 'hidden',
    		value: this.projeId
        },{
            name: 'id',
    		xtype: 'hidden',
    		value: this.uygegitimdokumaniId
        }];
        me.callParent(arguments);
        
        if (!Ext.isEmpty(this.uygegitimdokumaniId)) {
        	me.on('afterrender', function () {
        		me.load({
    				waitMsg: 'Yükleniyor',
    				url: 'egitims/loadUygEgitimDokuman/' + this.uygegitimdokumaniId,
    				method: 'POST'
    			});
        	});
        }
    }

});