Ext.define('Egitim.view.EgitimIcerikForm', {
	extend: 'Egitim.lib.FormPanel',
    title: 'Eğitim İçeriği (Eğitmen)',
	alias: 'widget.egitimicerikform',
	egitimId: '',
	egitmenId: '',
    readonly: !YETKI.isEgitimIcerikAuth(),
	bodyPadding: '10',
 	style: {borderColor:'#000000', borderStyle:'solid', borderWidth:'0px', padding: '10px'},
 	layout: 'vbox',
 	url: 'egitims/saveEgitimIcerik',
 	defaults: {
 		anchor: '90%',
 		width: '95%'
 	},
 	fieldDefaults: {
        labelAlign: 'top',
        labelWidth: 100,
        labelStyle: 'font-weight:bold'
    },
 	items: [{
		xtype: 'textfield',
		name: 'alt_baslik',
		allowBlank: false,
		fieldLabel: 'Alt Başlık'
	}, {
		xtype: 'htmleditor',
		name: 'aciklama',
		allowBlank: false,
		fieldLabel: 'Açıklama',
		flex: 1
	}, {
		xtype: 'hidden',
		name: 'egitmen_id'
	}, {
		xtype: 'hidden',
		name: 'egitim_id'
	}],
	
	/**
	 * Seçilen egitmenin bilgilerine göre form düzenlenir<br>
	 * Title, egitmen_id gibi
	 */
	yukleByEgitmen: function (egitmen, egitimId) {
		this.getForm().findField('egitmen_id').setValue (egitmen.get('id'));
		this.getForm().findField('egitim_id').setValue (egitimId);
		this.setTitle (egitmen.get('adSoyad'));
	},
	temizle: function (){
		this.getForm().findField('egitmen_id').setValue (null);
		this.getForm().findField('egitim_id').setValue (null);
		this.setTitle ('Eğitim İçeriği (Eğitmen)');
		this.getForm().reset();
	}
});