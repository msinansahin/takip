Ext.define('Egitim.view.admin.AnketSonucSorguPanel', {
	extend :'Ext.panel.Panel',
	alias: 'widget.anketsonucsorgupanel',
	uses: ['Egitim.view.tanimlar.AnketCombo'],
	layout: 'form',
    defaults: {
        style: {
            padding: '2px'
        }
    },
    
	initComponent: function () {
		this.callParent(arguments);
	},
	
	items: [{
		xtype: 'fieldcontainer',
		fieldLabel: 'Proje/Anket',
		layout: 'hbox',
		items: [{
			fieldLabel :'',
			xtype:'projecombo',
			listeners: {
				select: function (combo, recs) {
					if (recs.length > 0) {
						var rec = recs[0];
						var ac = combo.up('fieldcontainer').down('anketcombo');
						ac.setValue(null);
						ac.getStore().load({
							params: {
								id: rec.get('id')
							}
						});
					}
				}
			}
		}, {
			xtype: 'label', html: '&nbsp;&nbsp;&nbsp;'
		}, {
			fieldLabel :'',
			xtype:'anketcombo'
		}, {
			xtype: 'label', html: '&nbsp;&nbsp;'
		}, {
			xtype: 'button',
			text: 'Göster',
			action: 'anketgenelsonucgoster'
		}]
	}]
	
});