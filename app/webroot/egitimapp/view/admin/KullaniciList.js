Ext.define('Egitim.view.admin.KullaniciList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.kullanicilist',
    store: 'Kullanici',
	
	initComponent: function (){		
		var me = this;
		me.selModel = {
			    selType: 'checkboxmodel'
			    , mode: 'MULTI'
			};	
		this.columns = [
		          { text: 'Kullanıcı Adı',  dataIndex: 'username',flex: 1},
		          { text: 'Rol',  dataIndex: 'rol', flex: 1},
		          { text: 'Durum',  dataIndex: 'aktif'},
		          { text: LBL_OLUSTURULDU, dataIndex: 'created', renderer: Egitim.lib.Utility.rendererTarih}
		          /*
		          ,{
		              xtype:'actioncolumn',
		              width:80,
		              items: [{
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
		          }	*/	
		      ];
		
        me.callParent();
		me.addEvents('guncellekullanici');
	},
	
	dockedItems: [{
                    dock: 'top',
                    xtype: 'toolbar',
                    items: [{
        	        	xtype: 'button',
        	        	iconCls: 'aktif',
        	        	tooltip: 'Seçilenleri aktif yapar',
        	        	action: 'aktif'
        	        },{
        	        	xtype: 'button',
        	        	iconCls: 'pasif',
        	        	tooltip: 'Seçilenleri pasif yap.',
        	        	action: 'pasif'
        	        },{
                        xtype: 'arabutton'
                    }, {
                        xtype: 'form',
						itemId: 'searchform',
						layout: 'vbox',
						border: false,
						hidden: true,
						defaultType: 'textfield',
						items: [ {
							fieldLabel: 'Kull.Adı',
							name: 'username',
							tip: 's'
						}]
                    }]
                },{
        xtype: 'pagingtoolbar',
        store: 'Kullanici',
        dock: 'bottom',
        displayInfo: true
    }]
    
});