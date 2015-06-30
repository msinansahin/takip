Ext.define('Egitim.view.KatilimciList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.katilimcilist',
    title: 'Proje Katılımcıları',
    store: 'Katilimci',
    enableGroupingMenu: false,
    requires: ['Egitim.view.tanimlar.ProjeCombo'],
	projeId: '',
	pageSize: PAGE_SIZE,
	
	initComponent: function (){		
		var me = this;
		var genel = Ext.isEmpty(me.projeId);
		if (YETKI.isKurumYoneticisi()){
			me.projeId = YETKI.projeId;
			genel = false;
		}
		
		if (YETKI.isProjeKatilimciAuth()) {
			me.selModel = {
				    checkOnly: true,
				    selType: 'checkboxmodel',
				    preventFocus:true,
				    mode: 'MULTI'
				};			
		}
		
		me.store = Ext.create('Egitim.store.Katilimci', {
			projeId: me.projeId,
			userOlanlar: this.userOlanlar,
			pageSize: this.pageSize
		});
		
		if (!genel) {
			me.features = [{
				ftype:'grouping',
				groupHeaderTpl: '{name}: <font color="red">{rows.length}</font>',
				id: 'katilimciGrupGrouping'
			}];
		}
		
		me.dockedItems = [{
	        dock: 'top',
	        xtype: 'toolbar',
	        items: [{
	        	xtype: 'button',
	        	iconCls: 'grup',
	        	action: 'grupla',
	        	hidden: genel || !YETKI.isProjeKatilimciAuth(),
	        	tooltip: 'Seçilenleri gruplandır',
	        	handler: function () {
					this.up('panel').down('#grupadi').setVisible(true);
				}
	        },{
	        	xtype: 'textfield',
	        	itemId: 'grupadi',
	        	hidden: genel || !YETKI.isProjeKatilimciAuth(),
	        	hidden: true,
	        	emptyText: 'Grup ismi giriniz'
	        },'-',{
	        	xtype: 'button',
	        	iconCls: 'aktif',
	        	hidden: !YETKI.isProjeKatilimciAuth(),
	        	tooltip: 'Seçilenleri onayla',
	        	action: 'aktif'
	        },{
	        	xtype: 'button',
	        	iconCls: 'pasif',
	        	hidden: !YETKI.isProjeKatilimciAuth(),
	        	tooltip: 'Seçilenleri pasif yap. İlgili sistem kullanıcısını pasif yapar.',
	        	action: 'pasif'
	        },{
	        	xtype: 'button',
	        	iconCls: 'cikart',
	        	hidden: !YETKI.isProjeKatilimciAuth(),
	        	tooltip: 'Seçilenleri projeden çıkarır.',
	        	action: 'cikart'
	        },{
	        	xtype: 'button',
	        	iconCls: 'ky-do',
	        	hidden: !YETKI.isProjeKatilimciAuth() || !this.projeSecili,
	        	tooltip: 'Seçilenleri Kurum Yöneticisi yap',
	        	action: 'ky-do'
	        },{
	        	xtype: 'button',
	        	iconCls: 'ky-undo',
	        	hidden: !YETKI.isProjeKatilimciAuth() || !this.projeSecili,
	        	tooltip: 'Seçilenleri Kurum Yöneticiliğinden çıkar',
	        	action: 'ky-undo'
	        },{
	            xtype: 'arabutton'
	        }, {
	            xtype: 'form',
				itemId: 'searchform',
				layout: 'vbox',
				border: false,
				hidden: true,
				defaultType: 'textfield',
				defaults: {
					labelWidth: 100
				},
				items: [{
					fieldLabel: 'Ad',
					name: 'ad',
					tip: 's'
				},{
					fieldLabel: 'Soyad',
					name: 'soyad',
					tip: 's'
				},{
					fieldLabel: 'E-Posta',
					name: 'eposta',
					tip: 's'
				},{
					fieldLabel: 'Grup',
					name: 'grup',
					tip: 's'
				},{
					xtype: 'fieldcontainer',
					hidden: !genel || !YETKI.isAdmin(),
					layout: 'hbox',
					items: [{
						fieldLabel: 'Proje',
						xtype: 'projecombo',
						name: 'projeId',
						value: !genel ? me.projeId : '',
						tip: 's'
					}, {
						xtype: 'button',
						iconCls: 'temizle',
						tooltip: 'Temizle',
						handler: function (but){
							but.up('form').getForm().findField('projeId').setValue(null);
						}
					}]
				}]
	        }, '->', !genel ? {
	        	text: 'Gruplandır',
	            enableToggle: true,
	            pressed: true,
	            toggleHandler: function (but, state) {
	            	if (state === true) {
		            	but.up('grid').groupingFeature.enable();	            		
	            	} else {
		            	but.up('grid').groupingFeature.disable();	            		
	            	}
	            }
	        }: {xtype: 'label',text: ''}, !genel ? {
	        	text: 'Gruplar',
	            enableToggle: true,
	            toggleHandler: function (but, state) {
	            	if (state === true) {
		            	but.up('grid').groupingFeature.collapseAll();	            		
	            	} else {
		            	but.up('grid').groupingFeature.expandAll();	            		
	            	}
	            }
	        }: {xtype: 'label',text: ''}]
	    },{
	        xtype: 'pagingtoolbar',
	        store: me.store,
	        dock: 'bottom',
	        displayInfo: true
	    }];
		
		this.viewConfig = {
		    getRowClass: function(record){
		        var kyDurumu = record.get('ky_durumu');
		        if (kyDurumu === true) {
		        	return 'row-bold';
		        }
		        return 'row-bold';
		    }
        };
		
        me.columns = [
                  { text: 'Ad',  dataIndex: 'ad', flex: 1},
                  { text: 'Soyad', dataIndex: 'soyad', flex: 1 },
                  { text: 'E-Posta', dataIndex: 'eposta' },
                  { text: 'Tel', dataIndex: 'tel' },
                  { text: 'Onay', dataIndex: 'onay', renderer: function (v){return v?'Evet':'Hayır';} },
                  { text: 'Kur.Yön.', dataIndex: 'ky_durumu', renderer: function (v){return v?'Evet':'';} },
                  { text: 'Oluşturuldu', dataIndex: 'created', renderer: Egitim.lib.Utility.rendererTarih},
          		  {
                      xtype:'actioncolumn',
                      width:120,
                      items: [{
                          icon: 'egitimapp/resources/icons/edit.png',  // Use a URL in the icon config
                          tooltip: LBL_GUNCELLE,
                          handler: function(grid, rowIndex, colIndex) {
                              var rec = grid.getStore().getAt(rowIndex);
          					grid.up('katilimcilist').fireEvent('guncellekatilimci', grid, rec);
                          },
                          getClass: function (v, md, record){
                        	  if (!YETKI.isProjeKatilimciAuth()) {
                        		  return 'hidden';
                        	  }

                        	  return this.up('katilimcilist').selectable ? 'hidden' : '';
                          }
                      },{
                          icon: 'egitimapp/resources/icons/delete.gif',
                          tooltip: 'Sil',
                          handler: function(grid, rowIndex, colIndex) {
                              var rec = grid.getStore().getAt(rowIndex);
          					grid.up('katilimcilist').fireEvent('silkatilimci', grid, rec);
                          },
                          getClass: function (v, md, record){
                        	  if (!YETKI.isProjeKatilimciAuth()) {
                        		  return 'hidden';
                        	  }
                          	  return this.up('katilimcilist').selectable ? 'hidden' : '';
                          }
                      }]
                  }		
              ];
              if (YETKI.isProjeKatilimciAuth()) {
			Ext.Array.insert(me.columns, 0, [{ text: 'Grup',  dataIndex: 'grup', sortable: false/*, hidden: !genel*/}]);              
              }
	
	        
	        if (genel) {
	        	//Ext.Array.insert(me.columns, 0, [{ text: 'Grup',  dataIndex: 'grup'}]);
	        	Ext.Array.insert(me.columns, 0, [{ text: 'Proje',  dataIndex: 'proje_kod'}]);
	        }
	        
	        me.callParent();
	        
	        if (!genel) {
	            this.groupingFeature = this.view.getFeature('katilimciGrupGrouping');        	
	        }

		me.addEvents('gorkatilimci', 'silkatilimci', 'guncellekatilimci');
	},
	
	selectable: false //seçim içinse true
	
    
});