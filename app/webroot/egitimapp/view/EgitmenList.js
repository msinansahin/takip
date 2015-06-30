var imageTplEgitmenEgitim = new Ext.XTemplate(
		'<div>',
		'<tpl for=".">',
		'<li>{baslik}',
		'</tpl>',
		'</div>'
	);

Ext.define('Egitim.view.EgitmenList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.egitmenlist',
    store: 'Egitmen',
    
	initComponent: function (){		
		var me = this;

		function renderEgitim(v) {
			//[{id:2, baslik:Liderlik 1, kod:  src:egitimapp/resources/images/egitim_big.png},…]
			return imageTplEgitmenEgitim.apply(v);
		}
		
		this.columns = [
		  	    { text: 'Kod',  dataIndex: 'kod'},
		          { text: LBL_AD,  dataIndex: 'ad', flex: 1},
		          { text: LBL_SOYAD,  dataIndex: 'soyad', flex: 2},
		          { text: 'Eğitimler', dataIndex: 'egitimler', flex: 3, sortable: false, renderer: renderEgitim },
		          { text: LBL_OLUSTURULDU, dataIndex: 'created', renderer: Egitim.lib.Utility.rendererTarih},
		  		{
		              xtype:'actioncolumn',
		              width:50,
		              items: [{
		                  icon: 'egitimapp/resources/icons/edit.png',  // Use a URL in the icon config
		                  tooltip: LBL_GUNCELLE,
		                  handler: function(grid, rowIndex, colIndex) {
		                      var rec = grid.getStore().getAt(rowIndex);
		  					grid.up('egitmenlist').fireEvent('guncelleegitmen', grid, rec);
		                  }
		              },{
		                  icon: 'egitimapp/resources/icons/delete.gif',
		                  tooltip: LBL_SIL,
		                  handler: function(grid, rowIndex, colIndex) {
		                      var rec = grid.getStore().getAt(rowIndex);
		  					grid.up('egitmenlist').fireEvent('silegitmen', grid, rec);
		                  }
		              }]
		          }		
		      ];
		
        me.callParent();
		me.addEvents('silegitmen', 'guncelleegitmen');

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
							fieldLabel: 'Ad',
							name: 'ad',
							itemId: 'search'
						}]
                    }]
                },{
        xtype: 'pagingtoolbar',
        store: 'Egitmen',
        dock: 'bottom',
        displayInfo: true
    }]
	
    
});