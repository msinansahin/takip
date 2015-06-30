Ext.define('Egitim.view.admin.AnketTanimPanel', {
	extend :'Ext.panel.Panel',
	alias: 'widget.ankettanimpanel',
	uses: ['Egitim.model.AnketTanimlama', 'Egitim.view.tanimlar.AnketSoruTipiCombo', 
	       'Egitim.model.AnketTanimSoru',
	       'Egitim.view.admin.AnketTanimForm', 'Egitim.view.admin.AnketTanimSoruForm'],
	layout: 'border',
	atId: '',
    defaults: {
        style: {
            padding: '2px'
        }
    },
    
    statics: {
    	abc: function (){
    		alert(1);
    	}
    },
    
    setSoruPanelEnable: function (){
    	this.down('#sorupanel').setDisabled(false);
    	this.down('#sorugrid').setDisabled(false);
    },
    
	initComponent: function () {
		var atsStore = Ext.create('Egitim.store.AnketTanimSoru', {
			atId: this.atId
		});
		var me = this;
		this.items = [{
			xtype: 'ankettanimform',
			title: 'Başlık Bilgileri',
			atId: this.atId,
			collapsible: true,
			region: 'north'
		}, {
			xtype: 'ankettanimsoruform',
			region: 'west',
			width: '50%',
			disabled: true,
			kapatGoster: false,
			itemId: 'sorupanel',
			atId: this.atId
		}, {
			region: 'center',
			xtype: 'grid',
			disabled: true,
			itemId: 'sorugrid',
			title: 'Sorular',
			atId: this.atId,
			store: atsStore,
			columns: [{
				text: 'Soru',
				dataIndex: 'soru_metin',
				flex: 1
			}, {
				text: 'Soru Tipi',
				dataIndex: 'soru_tipi'
			},{
	              xtype:'actioncolumn',
	              width:50,
	              items: [{
	                  icon: 'egitimapp/resources/icons/delete.gif',
	                  tooltip: LBL_SIL,
	                  handler: function(grid, rowIndex, colIndex) {
	                      var rec = grid.getStore().getAt(rowIndex);
	  					grid.up('ankettanimpanel').fireEvent('silankettanimsoru', grid, rec);
	                  }
	              },{
	                  icon: 'egitimapp/resources/icons/edit.png',
	                  tooltip: 'Güncelle',
	                  handler: function(grid, rowIndex, colIndex) {
	                      var rec = grid.getStore().getAt(rowIndex);
	  					grid.up('ankettanimpanel').fireEvent('guncelleankettanimsoru', grid, rec);
	                  }
	              }]
	        }],
			dockedItems: [{
				dock: 'top',
				xtype: 'toolbar',
				items: [{
					xtype: 'button',
					iconCls: 'yeni',
					action: 'yenisoru',
					tooltip: 'Yeni soru'
				},{
					xtype:'button',
					text: 'Ön izleme',
					handler: function (){
						Egitim.view.admin.AnketTanimPanel.anketFormuYarat(me.atId);
					}
				}]
			},{
		        xtype: 'pagingtoolbar',
		        store: atsStore,
		        dock: 'bottom',
		        displayInfo: true
		    }]
		}];		
		this.addEvents('silankettanimsoru', 'guncelleankettanimsoru');
		this.callParent(arguments);
	}
	
});

Egitim.view.admin.AnketTanimPanel.anketFormuYarat = function (atId, dolduruluyor) {
	if (Ext.isEmpty(dolduruluyor)) {
		dolduruluyor = false;
	}
	
	var baslikTpl = new Ext.XTemplate(
		'<table class="view">',
			'<tr>',
				'<td rowspan="2"><div class="anket-big-menu"></div></td>',
				'<td style="font-size: 20px; vertical-align: bottom;">',
					'{baslik}',
				'</td>',
			'</tr>',
			'<tr>',
				'<td style="font-size: 16px;">{aciklama}</td>',
			'</tr>',
		'</table>',
		'<br><br>'
	);

	function _afterRender (form) {
		var items = [];
		Ext.create('Egitim.store.AnketTanimSoru', {
			atId: this.atId,
			autoLoad: true,
			listeners: {
				load: function (st, records){
					var at = st.proxy.reader.jsonData.at;
					var namePre = 'veri.';
					form.up('window').setTitle ((dolduruluyor ? 'Anket: ' : 'Ön izleme: ') + at.baslik);
					form.add({
						xtype: 'label',
						html: baslikTpl.apply(at)
					});
					for (var i=0; i < records.length; i++) {
						var rec = records[i];
						var fieldLabel = '<b>' + rec.get('soru_metin') + '</b>';
						var soruId = rec.get('id');
						var altBilgi = rec.get('soru_alt_bilgi');
						if (!Ext.isEmpty(altBilgi)) {
							fieldLabel += '<br>' + '<i>' + altBilgi + '</i>';
						}
						var field = {
							fieldLabel: fieldLabel,
							name: namePre + 'f_' + soruId
						};

						var soruTipi = rec.get('soru_tipi');
						if (soruTipi === 'M') {
							field.xtype = 'textarea';
							field.labelAlign =  'top';
						} else if (soruTipi === 'EH') {
							Ext.apply(field, {
								bodyPadding: 10,
								xtype: 'radiogroup',
						        fieldLabel: fieldLabel,
						        // Arrange radio buttons into two columns, distributed vertically
						        columns: 1,
						        vertical: false,
						        items: [
						                { boxLabel: 'Evet', name: namePre +  'ehrb_' + soruId, inputValue: 'E'},
						                { boxLabel: 'Hayır', name: namePre + 'ehrb_' + soruId, inputValue: 'H'}
						        ]
							});
							/*
							Ext.apply(field, {
								xtype : 'combo',
								valueField: 'key',
								inputWidth: 150,
								displayField: 'name',
								store: Ext.create('Ext.data.Store', {
							        fields: ['key', 'name'],
							        data : [
							            {"key":"E", "name":"Evet"},
							            {"key":"H", "name":"Hayır"}
							        ]
							    })
							});
							*/
						} else if (soruTipi === 'S') {
							Ext.apply(field, {
						        xtype: 'radiogroup',
						        //fieldLabel: 'Two Columns',
						        // Arrange checkboxes into two columns, distributed vertically
						        labelAlign: 'top',
						        columns: 1,
						        vertical: true
						    });
							var csItems = [];
							var arr = Ext.JSON.decode(rec.get('soru_data'));
							for (var k=0; k<arr.length; k++) {
								csItems[k] = {
									boxLabel: arr[k].soru, 
									name: namePre + 'sb_' + soruId, 
									inputValue: arr[k].id
								};
							}
							field.items = csItems;
							/*
							Ext.apply(field, {
								xtype : 'combo',
								valueField: 'id',
								labelAlign: 'top',
								displayField: 'soru',
								store: Ext.create('Ext.data.Store', {
								    fields:['id', 'soru'],
								    data: Ext.JSON.decode(rec.get('soru_data'))
								})
							});
							*/
						} else if (soruTipi === 'CS') {
							Ext.apply(field, {
						        xtype: 'checkboxgroup',
						        //fieldLabel: 'Two Columns',
						        // Arrange checkboxes into two columns, distributed vertically
						        labelAlign: 'top',
						        columns: 1,
						        vertical: true
						    });
							var csItems = [];
							var arr = Ext.JSON.decode(rec.get('soru_data'));
							for (var k=0; k<arr.length; k++) {
								csItems[k] = {
									boxLabel: arr[k].soru, 
									name: namePre + 'cb_' + soruId, 
									inputValue: arr[k].id
								};
							}
							field.items = csItems;
						}  else if (soruTipi === 'K') {
							form.add({
								xtype: 'label',
								html: fieldLabel
							});	
							Ext.apply(field, {
						        xtype: 'fieldset',
						        fieldLabel: 'Two Columns',
						        defaults: {
						        	labelWidth: 400,
						        	labelAlign: 'left'
						        }
						        // Arrange checkboxes into two columns, distributed vertically
						        //labelAlign: 'top',
						    });
							var kItems = [];
							var arr = Ext.JSON.decode(rec.get('soru_data'));
							for (var k=0; k<arr.length; k++) {
								kItems[k] = {
									xtype: 'radiogroup', 
									fieldLabel: arr[k].soru,
									columns: rec.get('rank'),
									vertical: false
								};
								var rgItems = [];
								for (var j = 0; j < rec.get('rank'); j++) {
									rgItems[j] = {
										boxLabel: j + 1,
										name: namePre + 'krb_' + soruId + '-' + arr[k].id,
										inputValue: j + 1
									};
								}
								kItems[k].items = rgItems;
							}
							field.items = kItems;
						}
						items[i] = field;
						form.add(field);
						if (i + 1 < records.length ) {
							form.add({
								xtype: 'label',
								html: '<hr><br>'
							});							
						}
					}
				}
			}
		});		
	}
	
	Ext.create('Ext.window.Window', {
		title: dolduruluyor ? 'Anket...' : 'Ön izleme...',
		modal: true,
		height: 530,
		width: 700,
		layout: 'fit',
		iconCls: 'anket',
		autoScroll: true,
		maximizable: true,
		items: {
			xtype: 'libform',
			autoScroll: true,
			itemId: 'anketformu',
			oi: !dolduruluyor,
			atId: atId,
			bodyPadding: 10,
		    layout: 'anchor',
		    requires: ['Egitim.lib.LabelRequired'],
		    plugins : [{ptype:"formlabelrequired"}],
		    defaults: {
		        anchor: '100%'
		    },
			fieldDefaults: {
				labelSeparator: '',
				labelAlign: 'top'
				//labelStyle: 'font-weight:bold'
			},
			header: false,
			border: false,
			listeners: {
				afterrender: _afterRender
			},
			isOnIzleme: function (){
				return this.oi;
			},
			items: [{
				xtype: 'hidden',
				name: 'anket_tanim_id',
				value: atId
			}]
		}
	}).show();
	
};