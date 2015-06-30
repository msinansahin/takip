Ext.define('Egitim.view.CenterPanel', {
	extend : 'Ext.panel.Panel',
	alias: 'widget.centerpanel',
	layout: 'border',
	requires: ['Egitim.view.proje.ProjeBilgiView'],
	initComponent: function () {
		var items = null;
		if (YETKI.isKatilimci() || YETKI.isKurumYoneticisi()) {
			items = [{
				xtype: 'projebilgiview',
				html: 'Proje Bilgisi',
				region: 'center',
				style: 'background: #FFFFFF'
			},{
				xtype: 'panel',
				html: 'Abc',
				region: 'east',
				hidden: true
			},{
				xtype: 'panel',
				split: true,
				hidden: true,
				region: 'south',
				items: [  Ext.create('Ext.slider.Single', {
			        //renderTo: 'custom-slider',
			        hideLabel: false,
			        padding: 10,
			        width: '90%',
			        increment: 50,
			        minValue: 0,
			        maxValue: 100
			    })]
			}];
		} else if (YETKI.isAdmin()) {
			this.layout = 'anchor';
			this.style = {
	            padding: '10px'
	        },
			items = [{
                xtype: 'button',
                iconCls: 'proje',
                text: 'Proje Listesi',
                handler: function () {
                	var mainTabPanel = Ext.getCmp('maintabpanel');
                	var id = 'menuidPL';
	     			var tab = mainTabPanel.getComponent(id);
	     			if (!tab) {
	     				tab = mainTabPanel.add({
	     					id: id,
	     					closable: true,
	     					xtype: 'projelist',
	     					iconCls: 'proje',
	     					title: 'Proje Listesi'
	     				});
	     			}
	     			mainTabPanel.setActiveTab(tab);			
                }
            }];
		}
		
		
		this.items = items;
		
		this.callParent(arguments);
	}
		
});