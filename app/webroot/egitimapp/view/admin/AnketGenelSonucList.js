Ext.define('Egitim.view.admin.AnketGenelSonucList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.anketgenelsonuclist',
    requires: ['Egitim.store.AnketGenelSonuc'],
	
	initComponent: function (){		
		var me = this;
		this.columns = [
		          { text: 'Soru',  dataIndex: 'soru', flex: 6},
		          { text: 'Cevaplama Sayısı',  dataIndex: 'cevaplamaSayisi', flex: 1},
		          {
		              xtype:'actioncolumn',
		              width:80,
		              items: [{
		                  icon: 'egitimapp/resources/icons/edit.png',  // Use a URL in the icon config
		                  tooltip: 'Grafik Göster',
		                  handler: function(grid, rowIndex, colIndex) {
		                	  var rec = grid.getStore().getAt(rowIndex);
		                	  grid.up('anketgenelsonuclist').fireEvent('anketgrafikgoster', grid, rec);
		                  }
		              }]
		          }
		      ];
		this.store = Ext.create('Egitim.store.AnketGenelSonuc');
		this.dockedItems = [{
		            dock: 'top',
		            xtype: 'toolbar',
		            items: [{
		                xtype: 'button',
		                text: 'Açıklamaları Gör',
		                handler: function (btn) {
		                	btn.up('grid').fireEvent('anketaciklamalarigor', btn);
		                }
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
							fieldLabel: 'Soru',
							name: 'soru',
							tip: 's'
						}]
		            }]
		        },{
			xtype: 'pagingtoolbar',
			store: this.store,
			dock: 'bottom',
			displayInfo: true
		}];
		
        me.callParent(arguments);
		me.addEvents('anketgrafikgoster', 'anketaciklamalarigor');
	}
});