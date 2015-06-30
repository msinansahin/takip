Ext.define('Egitim.controller.AdminCtrl', {
	extend: 'Ext.app.Controller',
	models: ['ToplantiTutanagi', 'Kullanici', 'GunlukRapor'],
	views: ['admin.ToplantiTutanagiForm', 'admin.ToplantiTutanagiList', 
	        'admin.GunlukRaporForm', 'admin.GunlukRaporList',
	        'admin.KullaniciList','ToplantiTutanagiView', 'GunlukRaporView', 'admin.AnketSonucPanel'],
	stores: ['ToplantiTutanagi','Kullanici', 'GunlukRapor'],
	refs:[{
		ref: 'toplantiTutanagiForm',
		selector: 'toplantitutanagiform'
	}, {
		ref: 'toplantiTutanagiList',
		selector: 'toplantitutanagilist'
	}, {
		ref: 'kullaniciList',
		selector: 'kullanicilist'
	}, {
		ref: 'gunlukRaporForm',
		selector: 'gunlukraporform'
	},{
		ref: 'gunlukRaporList',
		selector: 'gunlukraporlist'
	}, {
		ref: 'anketGenelSonucList',
		selector: 'anketgenelsonuclist'
	}, {
		ref: 'anketSonucSorguPanel',
		selector: 'anketsonucsorgupanel'
	}],
	init: function() {
		
		this.control({
			'toplantitutanagiform button[action=tamam]': {
				click: this.onTamamTT
			},
			'toplantitutanagiform': {
				afterrender: this.onGosterTTForm
			},
			'toplantitutanagiform [act="dokumangor"]': {
				click: this.onDokumanGor
			},
			'toplantitutanagilist': {
				afterrender: function (){
					this.getToplantiTutanagiList().getStore().load();
				},
				guncelletoplantitutanagi: this.onGuncelleTT,
				siltoplantitutanagi: this.onSilTT,
				itemdblclick: function (grid, rec){
					this.onGuncelleTT(grid, rec);
				},
				gortoplantitutanagi: function (grid, rec){
					this.onGuncelleTT(grid, rec, true);
				}
			},
			'toplantitutanagilist [tip="s"]': {
				specialkey: this.onTTListSearch
			},
			'kullanicilist': {
				afterrender: function (list) {
					list.getStore().load();
				}
			},
			'kullanicilist [tip="s"]': {
				specialkey: this.onKullaniciListSearch
			},
			'kullanicilist button[action=aktif]': {
				click: this.onKullaniciDurumDegistir
			},
			'kullanicilist button[action=pasif]': {
				click: this.onKullaniciDurumDegistir
			},
			'gunlukraporform': {
				afterrender: this.onGosterGRForm
			},
			'gunlukraporform [act="dokumangor"]': {
				click: this.onDokumanGorGR
			},
			'gunlukraporlist': {
				afterrender: function (grid){
					grid.getStore().load();
				},
				guncellegunlukrapor: this.onGuncelleGR,
				itemdblclick: function (grid, rec){
					this.onGuncelleGR(grid, rec);
				},
				silgunlukrapor: this.onSilGR,
				gorgunlukrapor: function (grid, rec){
					this.onGuncelleGR(grid, rec, true);
				}
			},
			'gunlukraporlist button[action=yenigunlukrapor]': {
				click: this.onGunlukRapor
			},
			'gunlukraporform button[action=tamam]': {
				click: this.onTamamGR
			},
			'anketsonucsorgupanel button[action=anketgenelsonucgoster]': {
				click: this.onAnketGenelSonucGoster
			},
			
			'anketgenelsonuclist': {
				anketgrafikgoster: this.onAnketGrafikGoster,
				anketaciklamalarigor: this.onAnketAciklamalariGor
			}
		});
	},
	
	onAnketAciklamalariGor: function (btn) {
		var sorguPanel = this.getAnketSonucSorguPanel();
		var projeId = sorguPanel.down('projecombo').getValue();
		var anketTanimId = sorguPanel.down('anketcombo').getValue();
		if (Ext.isEmpty(projeId) || Ext.isEmpty(anketTanimId)) {
			return;
		}
		var store1 = Ext.create('Ext.data.Store', {
	        fields: ['soru', 'metinVeri'],
	        proxy: {
	            type: 'ajax',
	            url: 'ankets/viewAnketMetinVerileriToplu',
	            reader: {
	                type: 'json',
	                root: 'results'
	            }
	        }
	    });
		store1.load({
			params: {
				anketTanimId: anketTanimId,
				projeId: projeId
			}
		});
		
		var imageTpl = new Ext.XTemplate(
			    '<tpl for=".">',
			        '<li><div>',
			          '<span><b>{soru}</b></span>',
			          '<br/><span>{metinVeri}</span>',
			        '</div><br>',
			    '</tpl>'
			);
		
		Ext.widget('window', {
			modal: true,
	        width: 500,
	        height: 500,
	        padding: 10,
			title: 'Girilen metinsel açıklamalar',
			items: [
				Ext.create('Ext.view.View', {
				    store: store1,
				    tpl: imageTpl
				})
			]
		}).show();
	},
	
	onAnketGrafikGoster: function (grid, rec){
		var store1 = Ext.create('Ext.data.Store', {
	        fields: ['soru', 'deger'],
	        proxy: {
	            type: 'ajax',
	            url: 'ankets/viewAnketGrafik',
	            reader: {
	                type: 'json',
	                root: 'results'
	            }
	        }
	        //data: generateData()
	    });
		
		store1.load({
			params: {
				anketTanimId: rec.get('anket_tanim_id'),
				anahtar: rec.get('id'),
				soruData: rec.get('soru_data'),
				soruTipi: rec.get('soruTipi')
			}
		});
		
		//store1.loadData(generateData(6, 20));
		Ext.widget('window', {
			modal: true,
			title: rec.get('soru'),
			items: [{
				xtype: 'label',
				html :'Cevaplayan Kişi Sayısı: ' + rec.get('cevaplamaSayisi') + '<br>'
			}, Ext.create('Ext.chart.Chart', {
		        xtype: 'chart',
		        animate: true,
		        store: store1,
		        shadow: true,
		        legend: {
		            position: 'right'
		        },
		        width: 500,
		        height: 500,
		        insetPadding: 10,
		        theme: 'Base:gradients',
		        series: [{
		            type: 'pie',
		            field: 'deger',
		            showInLegend: true,
		            //donut: donut,
		            tips: {
		                trackMouse: true,
		                renderer: function(storeItem, item) {
		                    //calculate percentage.
		                    var total = 0;
		                    store1.each(function(rec) {
		                        total += rec.get('deger');
		                    });
		                    this.setTitle("" + Math.round(storeItem.get('deger') / total * 100) + '%');
		                }
		            },
		            highlight: {
		                segment: {
		                    margin: 20
		                }
		            },
		            label: {
		                field: 'soru',
		                display: 'rotate',
		                contrast: true,
		                font: '18px Arial'
		            }
		        }]
		    })]
		}).show();
		
	},
	
	onAnketGenelSonucGoster: function (btn) {
		var sorguPanel = this.getAnketSonucSorguPanel();
		var projeId = sorguPanel.down('projecombo').getValue();
		var anketTanimId = sorguPanel.down('anketcombo').getValue();
		var list = this.getAnketGenelSonucList();
		var store = list.getStore();
		if (Ext.isEmpty(projeId) || Ext.isEmpty(anketTanimId)) {
			store.getProxy().extraParams = {};
			store.removeAll();
			return;
		}
		store.getProxy().extraParams = {
			projeId: projeId,
            anketTanimId: anketTanimId
		};
		store.load();
	},
	
	onGunlukRapor: function (btn) {
		//var readonly = !YETKI.isGRAuth();
		Ext.create('Ext.window.Window', {
			title: 'Günlük Rapor',
			modal: true,
			height: 530,
			width: 700,
			layout: 'fit',
			iconCls: 'gunluk-rapor',
			autoScroll: true,
			maximizable: true,
			items: {
				xtype: 'gunlukraporform',
				header: false,
				border: false
			}
		}).show();

	},
	
	onKullaniciDurumDegistir: function (but) {
		var kullaniciList = this.getKullaniciList(),
			aktif = but.action === 'aktif' ? true : false,
			kulIds = this.getSelectedKullanicis();
	
		if (Ext.isEmpty(kulIds)) {
			return;
		}
		
		Egitim.lib.Utility.ajaxRequest ({
			url: 'kullanicis/durumDegistir',
			params: {
				aktif: aktif,
				kulIds: kulIds
			},
			successFn: function (){
				kullaniciList.getSelectionModel().deselectAll();
				kullaniciList.getStore().load();
			}
		});		
	},
	
	onTTListSearch: function (field, e) {
		if (e.getKey() == e.ENTER) {
			var form = field.up('form').getForm();
			this.getToplantiTutanagiList().getStore().load({
				params: form.getValues()
			});
		}
	},
	
	onKullaniciListSearch: function (field, e) {
		if (e.getKey() == e.ENTER) {
			var form = field.up('form').getForm();
			this.getKullaniciList().getStore().load({
				params: form.getValues()
			});
		}
	},
	
	onGuncelleTT: function (grid, record, readonly){
		if (Ext.isEmpty(readonly)) {
			readonly = !YETKI.isTTAuth();
		}
		var ttId = record.get('id'),
			konu = record.get('konu');
		Ext.create('Ext.window.Window', {
			title: Ext.String.format('Toplantı Tutanağı [{0}] [{1}]', ttId, konu),
			modal: true,
			height: 530,
			width: 700,
			layout: 'fit',
			iconCls: 'tt',
			autoScroll: true,
			maximizable: true,
			items: {
				xtype: readonly === true? 'toplantitutanagiview' : 'toplantitutanagiform',
				ttId: ttId,
				readonly: readonly,
				title: '',
				border: false
			}
		}).show();
	},
	onGuncelleGR: function (grid, record, readonly){
		if (Ext.isEmpty(readonly)) {
			readonly = !YETKI.isGRAuth();
		}
		//TODO kullanıcının güncellem yettkisine bak
		
		var grId = record.get('id'),
			konu = record.get('konu');
		Ext.create('Ext.window.Window', {
			title: Ext.String.format('Günlük Rapor [{0}] [{1}]', grId, konu),
			modal: true,
			height: 530,
			width: 700,
			layout: 'fit',
			iconCls: 'gunluk-rapor',
			autoScroll: true,
			maximizable: true,
			items: {
				xtype: readonly === true? 'gunlukraporview' : 'gunlukraporform',
				grId: grId,
				readonly: readonly,
				header: false,
				border: false
			}
		}).show();
	},
	
	onSilTT: function (grid, record){
		var id = record.get('id'),
			text = record.get('konu'),
			me = this;
		
		Ext.Msg.confirm('Onay', text + ' Silinecek. Onaylıyor musunuz?', function(button) {
		    if (button === 'yes') {
		    	Egitim.lib.Utility.ajaxRequest({
		    		url: 'admins/deleteToplantiTutanagi/' + id,
					successFn: function () {
						me.getToplantiTutanagiList().getStore().load();
					}
				});
		    }
		});
	},
	
	onSilGR: function (grid, record){
		var id = record.get('id'),
			text = record.get('konu'),
			me = this;
		//TODO kullanıcı silebilir mi kontrolü yap
		Ext.Msg.confirm('Onay', text + ' Silinecek. Onaylıyor musunuz?', function(button) {
		    if (button === 'yes') {
		    	Egitim.lib.Utility.ajaxRequest({
		    		url: 'admins/deleteGunlukRapor/' + id,
					successFn: function () {
						me.getGunlukRaporList().getStore().load();
					}
				});
		    }
		});
	},
	
	onTamamTT: function (but){
		var formPanel = but.up('form');
		var form = formPanel.getForm();
		if (form.isValid()) {
			form.submit({
				success: function(form, action) {
					var msg = action.result.msg;
					but.up('form').showMessage (1, msg);
					Egitim.lib.Utility.infoMessage(msg, function () {
						if (!formPanel.isGuncelleme()) {
							formPanel.temizle();						
						}
					});
					
				},
				failure: function(form, action) {
					but.up('form').showMessage (0, action.result.msg);
				}
			});
		}	
	},
	
	onTamamGR: function (but){
		var formPanel = but.up('form');
		var form = formPanel.getForm();
		var grList = this.getGunlukRaporList();
		if (form.isValid()) {
			form.submit({
				success: function(form, action) {
					var msg = action.result.msg;
					but.up('form').showMessage (1, msg);
					Egitim.lib.Utility.infoMessage(msg, function () {
						if (!formPanel.isGuncelleme()) {
							formPanel.temizle();						
						}
						
					});
					grList.getStore().load();
				},
				failure: function(form, action) {
					but.up('form').showMessage (0, action.result.msg);
				}
			});
		}	
	},
	
	onAfterRender: function () {
		this.getEgitimStore().load();
	},
	
	onGosterTTForm: function (form){
		var ttId = '';
		if (!Ext.isEmpty(form.ttId)) {
			ttId = form.ttId;
		}
		if (!Ext.isEmpty(ttId)) {
			form.getForm().findField('proje_id').getStore().load({
				callback: function () {
					form.load({
						waitMsg: 'Yükleniyor',
						url: 'admins/loadToplantiTutanagi/' + ttId,
						method: 'POST',
						success: function (form, action) {
							var dokuman_media_id = action.result.data.dokuman_media_id;
							form.owner.down('#dokumangor').setVisible(!Ext.isEmpty(dokuman_media_id));
						}
					});					
				}
			});
		}
	},
	
	onGosterGRForm: function (form){
		var grId = '';
		if (!Ext.isEmpty(form.grId)) {
			grId = form.grId;
		}
		if (!Ext.isEmpty(grId)) {
			form.getForm().findField('proje_id').getStore().load({
				callback: function () {
					form.load({
						waitMsg: 'Yükleniyor',
						url: 'admins/loadGunlukRapor/' + grId,
						method: 'POST',
						success: function (form, action) {
							var dokuman_media_id = action.result.data.dokuman_media_id;
							form.owner.down('#dokumangor').setVisible(!Ext.isEmpty(dokuman_media_id));
						}
					});					
				}
			});
		}
	},
	
	onDokumanGor: function () {
		var ttId = this.getToplantiTutanagiForm().ttId;
		document.getElementById('downloadFrame').src = 'admins/downloadTTDokuman/' + ttId;
	},
	
	onDokumanGorGR: function () {
		var grId = this.getGunlukRaporForm().grId;
		document.getElementById('downloadFrame').src = 'admins/downloadGRDokuman/' + grId;
	},
	
	/**
	 * Seçilen kullanıcı listesini 1,2,3, şeklinde döner<br>
	 * Hiç seçilmediği durumda "" döner
	 */
	getSelectedKullanicis: function () {
		var kulIds = "",
			kullaniciList = this.getKullaniciList(),
			secilenler = kullaniciList.getSelectionModel().getSelection();
		
		for ( var i = 0; i < secilenler.length; i++) {
			var kat = secilenler[i];
			kulIds += kat.get('id') + ',';
		}
		return kulIds;
	}
});