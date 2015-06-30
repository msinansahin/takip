Ext.define('Egitim.view.admin.AnketTanimList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.ankettanimlist',
    requires: ['Egitim.store.AnketTanim'],
    store: 'AnketTanim',
	
	initComponent: function (){		
		var me = this;
		me.selModel = {
			    selType: 'checkboxmodel'
			    , mode: 'MULTI'
			};	
		this.columns = [
		          { text: 'Kod',  dataIndex: 'kod'},
		          { text: 'Başlık',  dataIndex: 'baslik', flex: 1},
		          { text: LBL_OLUSTURULDU, dataIndex: 'created', renderer: Egitim.lib.Utility.rendererTarih}
		          ,{
		              xtype:'actioncolumn',
		              width:80,
		              items: [{
		                  icon: 'egitimapp/resources/icons/edit.png',  // Use a URL in the icon config
		                  tooltip: LBL_GUNCELLE,
		                  handler: function(grid, rowIndex, colIndex) {
		                      var rec = grid.getStore().getAt(rowIndex);
		  					grid.up('ankettanimlist').fireEvent('guncelleankettanim', grid, rec);
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
		  					grid.up('ankettanimlist').fireEvent('silankettanim', grid, rec);
		                  },
		                  getClass: function (v, md, record){
		                	  if (me.readonly) {
		                		  return 'hidden';
		                	  }
		                	  return '';
		                  }
		              },{
		                  icon: 'egitimapp/resources/icons/add.gif',
		                  tooltip: 'Ekle',
		                  handler: function(grid, rowIndex, colIndex) {
		                      var rec = grid.getStore().getAt(rowIndex);
		                      grid.up('ankettanimlist').fireEvent('secildi', grid, rec);
		                  },
		                  getClass: function (v, md, record){
		                	  if (me.readonly) {
		                		  return 'hidden';
		                	  }
		                	  return this.up('ankettanimlist').selectable ? '' : 'hidden';
		                  }
		              }]
		          }
		      ];
		
        me.callParent();
		me.addEvents('guncelleankettanim');
	},
	
	dockedItems: [{
                    dock: 'top',
                    xtype: 'toolbar',
                    items: [{
                    	iconCls: 'yeni',
                    	action: 'yeni'
                    }, {
                        xtype: 'arabutton'
                    }, {
                        xtype: 'form',
						itemId: 'searchform',
						layout: 'vbox',
						border: false,
						hidden: true,
						defaultType: 'textfield',
						items: [ {
							fieldLabel: 'Başlık',
							name: 'baslik',
							tip: 's'
						}]
                    }]
                },{
        xtype: 'pagingtoolbar',
        store: 'AnketTanim',
        dock: 'bottom',
        displayInfo: true
    }]
    
});