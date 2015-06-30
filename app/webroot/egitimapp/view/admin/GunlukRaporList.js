Ext.define('Egitim.view.admin.GunlukRaporList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.gunlukraporlist',
    store: 'GunlukRapor',
	
	initComponent: function (){		
		var me = this;
		me.readonly = !YETKI.isGRAuth();
		
		this.columns = [
		          { text: 'Tarih',  dataIndex: 'tarih', renderer: Egitim.lib.Utility.rendererTarih},
		          { text: 'Konu',  dataIndex: 'konu', flex: 1},
		          { text: LBL_OLUSTURULDU, dataIndex: 'created', renderer: Egitim.lib.Utility.rendererTarih},
		  		{
		              xtype:'actioncolumn',
		              width:80,
		              items: [Egitim.lib.Utility.createActionColumnGor({
		              		xtype: 'gunlukraporlist',
		              		event: 'gorgunlukrapor'
		              	}), {
		                  icon: 'egitimapp/resources/icons/edit.png',  // Use a URL in the icon config
		                  tooltip: LBL_GUNCELLE,
		                  handler: function(grid, rowIndex, colIndex) {
		                      var rec = grid.getStore().getAt(rowIndex);
		  					grid.up('gunlukraporlist').fireEvent('guncellegunlukrapor', grid, rec);
		                  },
		                  getClass: function (v, md, record){
		                	  if (me.readonly) {
		                		  return 'hidden';
		                	  }
		                	  return '';
		                  }
		              },{
		                  icon: 'egitimapp/resources/icons/delete.gif',
		                  tooltip: LBL_SIL,
		                  handler: function(grid, rowIndex, colIndex) {
		                      var rec = grid.getStore().getAt(rowIndex);
		  					grid.up('gunlukraporlist').fireEvent('silgunlukrapor', grid, rec);
		                  },
		                  getClass: function (v, md, record){
		                	  if (me.readonly) {
		                		  return 'hidden';
		                	  }
		                	  return '';
		                  }
		              }]
		          }		
		      ];
		
        me.callParent();
		me.addEvents('silgunlukrapor', 'guncellegunlukrapor');
	},
	
	dockedItems: [{
                    dock: 'top',
                    xtype: 'toolbar',
                    items: [{
                    	iconCls: 'yeni',
                    	tooltip: 'Yeni Günlük Rapor',
                    	action: 'yenigunlukrapor',
                    	hidden: !YETKI.isGRAuth()
                    },{
                        xtype: 'arabutton'
                    }, {
                        xtype: 'form',
						itemId: 'searchform',
						layout: 'vbox',
						border: false,
						hidden: true,
						defaultType: 'textfield',
						items: [{
							fieldLabel: 'Tarih',
							xtype: 'egitimdate',
							name: 'tarih',
							tip: 's'
						}, {
							fieldLabel: 'Konu',
							name: 'konu',
							tip: 's'
						}]
                    }]
                },{
        xtype: 'pagingtoolbar',
        store: 'GunlukRapor',
        dock: 'bottom',
        displayInfo: true
    }]
    
});