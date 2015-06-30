Ext.define('Egitim.view.proje.ProjeList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.projelist',
    store: 'Proje',
	
	initComponent: function (){		
		var me = this;
        me.callParent();
		me.addEvents('silproje', 'guncelleproje');
	},
	
	dockedItems: [{
                    dock: 'top',
                    xtype: 'toolbar',
                    items: [{
                        xtype: 'arabutton'
                    }, {
                        xtype: 'form',
						itemId: 'searchform',
						layout: 'hbox',
						border: false,
						hidden: true,
						defaultType: 'textfield',
						items: [{
							fieldLabel: 'Başlık',
							name: 'baslik',
							itemId: 'search'
						}]
                    }]
                },{
        xtype: 'pagingtoolbar',
        store: 'Proje',
        dock: 'bottom',
        displayInfo: true
    }],
	
	columns: [
	    { text: 'Kodu',  dataIndex: 'kod'},
        { text: 'Başlık',  dataIndex: 'baslik', flex: 1},
        { text: LBL_OLUSTURULDU, dataIndex: 'created'},
		{
            xtype:'actioncolumn',
            width: 80,
            items: [{
                icon: 'egitimapp/resources/icons/edit.png',  // Use a URL in the icon config
                tooltip: LBL_GUNCELLE,
                handler: function(grid, rowIndex, colIndex) {
                    var rec = grid.getStore().getAt(rowIndex);
					grid.up('projelist').fireEvent('guncelleproje', grid, rec);
                },
                getClass: function (v, md, record){
              	  if (!YETKI.isProjeAuth()) {
              		  return 'hidden';
              	  }
              	  return '';
                }
            },{
                icon: 'egitimapp/resources/icons/delete.gif',
                tooltip: LBL_SIL,
                handler: function(grid, rowIndex, colIndex) {
                    var rec = grid.getStore().getAt(rowIndex);
					grid.up('projelist').fireEvent('silproje', grid, rec);
                },
                getClass: function (v, md, record){
              	  if (!YETKI.isProjeAuth()) {
              		  return 'hidden';
              	  }
              	  return '';
                }
            },{
                icon: 'egitimapp/resources/icons/upload.png',
                tooltip: 'Media yükle',
                handler: function(grid, rowIndex, colIndex) {
                    var rec = grid.getStore().getAt(rowIndex);
					grid.up('projelist').fireEvent('mediayukleproje', grid, rec);
                },
                getClass: function (v, md, record){
              	  /*
                  if (!YETKI.isProjeAuth()) {
              		  return 'hidden';
              	  }
              	  */
              	  return '';
              	  
                }
            }]
        }		
    ]
    
});