Ext.define('Egitim.view.tanimlar.ParolaDegistirForm', {
	extend: 'Egitim.lib.FormPanel',
    title: 'Parola Değiştir',
	alias: 'widget.paroladegistirform',
	
	url: 'kullanicis/changePassword',
	
	defaults: {
		xtype: 'textfield',
		inputType: 'password',
		allowBlank: false
	},
	
	initComponent: function (){
		
		this.on('beforeaction', function( form, action, eOpts ) {
			var p1 = form.findField ('yeni_parola');
			var p2 = form.findField ('yeni_parola_tekrar');
			if (p1.getValue() !== p2.getValue()) {
				p1.markInvalid( 'Parolalar aynı değil' );
				p2.markInvalid( 'Parolalar aynı değil' );
				return false;
			}
			return true;
		});
		this.callParent(arguments);
	},
	
	items: [{
		fieldLabel: 'Mevcut Parola',
		name: 'mevcut_parola'
	},{
		fieldLabel: 'Yeni Parola',
		name: 'yeni_parola'
	},{
		fieldLabel: 'Yeni Parola (Tekrar)',
		name: 'yeni_parola_tekrar'
	}]
});