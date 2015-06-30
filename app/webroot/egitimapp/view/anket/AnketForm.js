Ext.define('Egitim.view.anket.AnketForm', {
	extend: 'Ext.form.Panel',
	alias: 'widget.anketform',
	items: [{
		xtype: 'label',
		html: '<h>Eğitim bitiminde anketlerinizi hazırlanacaktır</h>'
	}],
	
	initComponent: function () {
		this.items = [Ext.create('Ext.Component', {
			loader: {
				url: 'ankets/view',
		        autoLoad: true,
		        loadMask: 'Yükleniyor'
			}
		})];
		
		this.callParent(arguments);
	}
	
});