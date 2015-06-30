Ext.define('Egitim.controller.MenuCtrl', {
	extend: 'Ext.app.Controller',
	views: ['UserMenu'],
	stores: ['MainMenu', 'Menu'],
	models: ['MainMenu', 'Menu'],
	refs: [{
		ref: 'navigationPanel',
		selector: 'navigationpanel'
	}, {
		ref: 'recentlyPlayedScroller',
		selector: 'recentlyplayedscroller'
	}],
	init: function() {
		
		this.control({
			'usermenu': {
				beforerender: this.onUserMenuRender,
				//selectionchange: this.onMenuSelected
				itemclick: this.onMenuSelected
			},
			'navigationpanel': {
				afterrender: this.onNavigationRender
			},
			'paroladegistirform button[action=tamam]': {
				click: this.onParolaDegistir
			}
		});
	},
	
	onParolaDegistir: function (but){
		var form = but.up('form').getForm();
		if (form.isValid()) {
			form.submit({
				success: function(form, action) {
					but.up('form').showMessage (1, action.result.msg);
				},
				failure: function(form, action) {
					but.up('form').showMessage (0, action.result.msg);
				}
			});
		}
	},
	
	onNavigationRender: function (navPanel){
		this.getMainMenuStore().load({
			scope: this,
			callback: function(records, operation, success) {
				for (var i = 0; i < records.length; i++) {
					var rec = records[i];
					navPanel.add({
						title: rec.get('title'),
						iconCls: rec.get('iconCls'),
						defaults: {
							 autoScroll:true
						},
						items: [{
							xtype: 'usermenu',
							autoScroll: true,
							store: Ext.create('Ext.data.Store', {
								 model: 'Egitim.model.Menu',
								 data : rec.get('items')
							})
						}]
					});
				}				
			}
		});
	},
	
	onUserMenuRender: function () {
		/*
		this.getUserMenuStore().load({
			callback: function(records, operation, success) {
				debugger;
				alert (1);
			}
		});
		*/
	},
	
	onMenuSelected: function(dataviewmodel){
		var selected = dataviewmodel.getSelectionModel().getLastSelected(),
			xtype = selected.get('xtype'),
			id = selected.get('id'),
			title = selected.get('title'),
			modal = selected.get('modal'),
			iconCls = selected.get('iconCls'),
			mainTabPanel = Ext.getCmp('maintabpanel');
		//mainTabPanel.removeAll(false);
		//debugger;
		if (modal === true) {
			Ext.create('Ext.window.Window', {
				title: title,
				modal: true,
				height: 500,
				width: 600,
				layout: 'fit',
				maximizable: true,
				iconCls: iconCls,
				items: {
					xtype: xtype,
					border: false
				}
			}).show();
		} else {
			var tab = mainTabPanel.getComponent(id);
			if (!tab) {
				tab = mainTabPanel.add({
					id: id,
					closable: true,
					xtype: xtype,
					iconCls: iconCls,
					title: title
				});
			}
			//mainTabPanel.layout.setActiveItem(id);

			mainTabPanel.setActiveTab(tab);			
		}
		
    }
});