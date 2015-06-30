Ext.define('Egitim.view.EgitimDokumanList', {
    extend: 'Egitim.lib.GridPanel',
    alias: 'widget.egitimdokumanlist',
    //store: 'Egitmen',
    readonly: !YETKI.isEgitimDokumanAuth(),
	
	initComponent: function (){		
		var me = this;
		
		me.columns = [
			  { text: 'Kod',  dataIndex: 'kod'},
	          { text: 'Başlık',  dataIndex: 'baslik', flex: 1},
	          { text: 'Tür',  dataIndex: 'tur'},
	          { text: LBL_OLUSTURULDU, dataIndex: 'created'},
	          {
	              xtype:'actioncolumn',
	              width:80,
	              items: [{
	                  icon: 'egitimapp/resources/icons/edit.png',  // Use a URL in the icon config
	                  tooltip: LBL_GUNCELLE,
	                  handler: function(grid, rowIndex, colIndex) {
	                      var rec = grid.getStore().getAt(rowIndex);
	                      grid.up('egitimdokumanlist').fireEvent('guncelledokuman', grid, rec);
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
	                      grid.up('egitimdokumanlist').fireEvent('sildokuman', grid, rec);
	                  },
	                  getClass: function (v, md, record){
	                	  if (me.readonly) {
	                		  return 'hidden';
	                	  }
	                	  return '';
	                  }
	              },{
	                  icon: 'egitimapp/resources/icons/download.png',
	                  tooltip: 'İndir',
	                  handler: function(grid, rowIndex, colIndex) {
	                	  //bunun görünürlüğü record'da indirilebilire göre değişecek ROL'e göre
	                      var rec = grid.getStore().getAt(rowIndex);
	                      grid.up('egitimdokumanlist').fireEvent('indirdokuman', grid, rec);
	                  },
	                  getClass: function (v, md, record){
	                	  if (!YETKI.isEgitimDokumanIndirilebilirAuth()) { //Eğer kullanıcı bazında indirilebilir yetkisin yoksa,
	                		  //kayıttaki indirilebilir alanına bak
		                	  return record.get('indirilebilir') == true  ? '' : 'hidden';	                		  
	                	  }
	                  }
	              }]
	          }		
	      ];
		
		me.store = Ext.create('Egitim.store.EgitimDokumaniStore', {
			egitimId: this.egitimId
		});
		
		this.dockedItems = [{
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
	        store: me.store,
	        dock: 'bottom',
	        displayInfo: true
	    }];
		
        me.callParent();
		me.addEvents('sildokuman', 'guncelledokuman', 'gordokuman', 'indirdokuman');
	}
    
});