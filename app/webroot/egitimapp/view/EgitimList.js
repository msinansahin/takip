Ext.define('Egitim.view.EgitimList', {
    extend: 'Egitim.lib.GridPanel',
    alias: 'widget.egitimlist',
    requires: ['Egitim.view.tanimlar.EgitimKategoriCombo'],
    store: 'Egitim',
    readonly: !YETKI.isEgitimAuth(),

	initComponent: function (){		
		var me = this;
		
		me.columns = [
		          { text: 'Kod', dataIndex: 'kod' },
		          { text: 'Başlık',  dataIndex: 'baslik', flex: 1},
		          { text: 'Grup', dataIndex: 'kategori_adi'},
		          { text: 'Oluşturuldu', dataIndex: 'created', renderer: Egitim.lib.Utility.rendererTarih},
		  		{
		              xtype:'actioncolumn',
		              width:80,
		              items: [{
		                  icon: 'egitimapp/resources/icons/gor.png',
		                  tooltip: 'Gör',
		                  handler: function(grid, rowIndex, colIndex) {
		                      var rec = grid.getStore().getAt(rowIndex);
		                      grid.up('egitimlist').fireEvent('goregitim', grid, rec);
		                  }		              
		              },{
		                  icon: 'egitimapp/resources/icons/edit.png',  // Use a URL in the icon config
		                  tooltip: LBL_GUNCELLE,
		                  handler: function(grid, rowIndex, colIndex) {
		                      var rec = grid.getStore().getAt(rowIndex);
		  					grid.up('egitimlist').fireEvent('guncelleegitim', grid, rec);
		                  },
		                  getClass: function (v, md, record){
		                	  if (me.readonly) {
		                		  return 'hidden';
		                	  }
		                	  return this.up('egitimlist').selectable ? 'hidden' : '';
		                  }
		              },{
		                  icon: 'egitimapp/resources/icons/delete.gif',
		                  tooltip: 'Sil',
		                  handler: function(grid, rowIndex, colIndex) {
		                      var rec = grid.getStore().getAt(rowIndex);
		  					grid.up('egitimlist').fireEvent('silegitim', grid, rec);
		                  },
		                  getClass: function (v, md, record){
		                	  if (me.readonly) {
		                		  return 'hidden';
		                	  }
		                	  return this.up('egitimlist').selectable ? 'hidden' : '';
		                  }
		              },{
		                  icon: 'egitimapp/resources/icons/add.gif',
		                  tooltip: 'Ekle',
		                  handler: function(grid, rowIndex, colIndex) {
		                      var rec = grid.getStore().getAt(rowIndex);
		                      grid.up('egitimlist').fireEvent('secildi', grid, rec);
		                  },
		                  getClass: function (v, md, record){
		                	  if (me.readonly) {
		                		  return 'hidden';
		                	  }
		                	  return this.up('egitimlist').selectable ? '' : 'hidden';
		                  }
		              }]
		          }		
		      ];
		
        me.callParent();
		me.addEvents('silegitim', 'guncelleegitim', 'secildi', 'goregitim');

	},
	
	selectable: false, //seçim içinse true
	
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
				fieldLabel: LBL_BASLIK,
				name: 'baslik',
				itemId: 'search'
			}]
        }]
    },{
        xtype: 'pagingtoolbar',
        store: 'Egitim',
        dock: 'bottom',
        displayInfo: true
    }]
	
});