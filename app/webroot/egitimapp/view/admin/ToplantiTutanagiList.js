Ext.define('Egitim.view.admin.ToplantiTutanagiList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.toplantitutanagilist',
    store: 'ToplantiTutanagi',
	
	initComponent: function (){		
		var me = this;
		me.readonly = !YETKI.isTTAuth();
		
		this.columns = [
		          { text: 'Tarih',  dataIndex: 'tarih', renderer: Egitim.lib.Utility.rendererTarih},
		          { text: 'Yer',  dataIndex: 'yer'},
		          { text: 'Konu',  dataIndex: 'konu', flex: 1},
		          { text: LBL_OLUSTURULDU, dataIndex: 'created', renderer: Egitim.lib.Utility.rendererTarih},
		  		{
		              xtype:'actioncolumn',
		              width:80,
		              items: [Egitim.lib.Utility.createActionColumnGor({
		              		xtype: 'toplantitutanagilist',
		              		event: 'gortoplantitutanagi'
		              	}), {
		                  icon: 'egitimapp/resources/icons/edit.png',  // Use a URL in the icon config
		                  tooltip: LBL_GUNCELLE,
		                  handler: function(grid, rowIndex, colIndex) {
		                      var rec = grid.getStore().getAt(rowIndex);
		  					grid.up('toplantitutanagilist').fireEvent('guncelletoplantitutanagi', grid, rec);
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
		  					grid.up('toplantitutanagilist').fireEvent('siltoplantitutanagi', grid, rec);
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
		me.addEvents('siltoplantitutanagi', 'guncelletoplantitutanagi');
	},
	
	dockedItems: [{
                    dock: 'top',
                    xtype: 'toolbar',
                    items: [{
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
        store: 'ToplantiTutanagi',
        dock: 'bottom',
        displayInfo: true
    }]
    
});