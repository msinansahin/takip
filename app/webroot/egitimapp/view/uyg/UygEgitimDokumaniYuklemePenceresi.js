Ext.define('Egitim.view.uyg.UygEgitimDokumaniYuklemePenceresi', {
	extend: 'Ext.window.Window',
	alias: 'widget.uygegitimdokumaniyuklemepenceresi',
	requires: ['Egitim.view.uyg.UygEgitimDokumaniYuklemeForm'],
	height: 300,
	width: 400,
	egitimId: '',
	layout: 'fit',
    title: 'Uyg Medya Yükleme Penceresi',
    uygegitimdokumaniId: null,
	
	initComponent: function (){
		var me = this;
		me.items = [{
			xtype: 'uygegitimdokumaniyuklemeform',
			projeId: this.projeId,
			egitimId: this.egitimId,
			uygegitimdokumaniId: me.uygegitimdokumaniId
		}];
		me.callParent(arguments);
	}
});