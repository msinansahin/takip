Ext.define('Egitim.view.admin.AnketSonucPanel', {
	extend :'Ext.container.Container',
	alias: 'widget.anketsonucpanel',
	uses: ['Egitim.view.admin.AnketSonucSorguPanel', 'Egitim.view.admin.AnketGenelSonucList'],
	layout: 'border',
	padding: 0,
	
	initComponent: function () {
		
		this.items = [{
			xtype: 'anketsonucsorgupanel',
			region:'north',
			height: 50
		},{
			xtype: 'anketgenelsonuclist',
			title: 'Toplu Sonuçlar',
			region:'center'
		}];
		
		this.callParent(arguments);
	}
	
});