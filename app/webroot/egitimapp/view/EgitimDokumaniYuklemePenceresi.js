Ext.define('Egitim.view.EgitimDokumaniYuklemePenceresi', {
	extend: 'Ext.window.Window',
	alias: 'widget.egitimdokumaniyuklemepenceresi',
	requires: ['Egitim.view.EgitimDokumaniYuklemeForm'],
	height: 300,
	width: 400,
	egitimId: '',
	layout: 'fit',
    title: 'Doküman Yükleme Penceresi',
	
	initComponent: function (){
		var me = this;
		me.items = [{
			xtype: 'egitimdokumaniyuklemeform',
			egitimId: this.egitimId
		}];
		me.callParent(arguments);
	}
})