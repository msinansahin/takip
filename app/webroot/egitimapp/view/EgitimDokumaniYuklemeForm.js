Ext.define('Egitim.view.EgitimDokumaniYuklemeForm', {
	extend: 'Egitim.lib.FormPanel',
	alias: 'widget.egitimdokumaniyuklemeform',
	bodyPadding: 5,
    layout: 'anchor',
    defaults: {
        anchor: '100%'
    },
    url: 'egitims/saveEgitimDokuman',
    defaultType: 'textfield',
    
    initComponent: function () {
    	var me = this;
        this.items = [{
        	xtype: 'textfield',
        	fieldLabel: 'Kod',
        	name: 'kod'
        }, {
        	xtype: 'textfield',
        	fieldLabel: 'Başlık',
        	name: 'baslik'
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
            	name: 'data[EgitimDokumani][dokuman]',
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
            name: 'id',
    		xtype: 'hidden'
        }];
        me.callParent(arguments);
    }

});