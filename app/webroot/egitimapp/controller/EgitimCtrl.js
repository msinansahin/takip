﻿Ext.define('Egitim.controller.EgitimCtrl', {
	extend: 'Ext.app.Controller',
	models: ['Egitim'],
	views: ['EgitimForm', 'EgitimList','tanimlar.SureFormatCombo', 'tanimlar.EgitimSekliCombo'
	        ,'EgitimPanel', 'EgitimIcerikPanel', 'EgitimEgitmenView', 'EgitimIcerikForm',
	        'EgitimDokumanlarPanel'],
	stores: ['Egitim','EgitimKategori','EgitimDokumaniStore'],
	refs:[{
		ref: 'egitimKategoriCombo',
		selector: 'egitimkategoricombo'
	}, {
		ref: 'egitimPanel',
		selector: 'egitimpanel'		
	}, {
		ref: 'egitimIcerikForm',
		selector: 'egitimicerikform'
	}, {
		ref: 'egitimDokumanList',
		selector: 'egitimdokumanlist'
	}],
	init: function() {
		
		this.control({
			'usermenu': {
				beforerender: this.onUserMenuRender
			},
			'egitimlist': {
				afterrender: this.onAfterRender,
				silegitim: this.onSilEgitim,
				guncelleegitim: this.onGuncelleEgitim,
				itemdblclick: function (grid, rec, e){
					//e.preventDefault();
					this.onGuncelleEgitim(grid, rec);
				},
				goregitim: function (grid, rec){
					this.onGuncelleEgitim(grid, rec, true);
				}
			},
			'egitimlist #search': {
				specialkey: this.onEgitimListSearch
			},
			'egitimform': {
				afterrender: this.onGosterEgitim,
				beforerender: this.onBeforeGosterEgitim
			},
			'egitimform button[action=tamam]': {
				click: this.onTamamEgitim
			},
			'egitimegitmenview': {
				afterrender: this.onEgitimEgitmenViewRender,
				selectionchange: this.onEgitmenIcerikGoster
			},
			
			'egitimicerikform button[action=tamam]': {
				click: this.onTamamEgitimIcerik
			},
			'egitimdokumanyuklepanel button[action=yuklepencereac]': {
				click: this.onAcEgitimDokumanYuklePencere
			},
			'egitimdokumaniyuklemeform button[action=tamam]': {
				click: this.onTamamEgitimDokumaniYuklemeForm
			},
			'egitimdokumanlist': {
				afterrender: this.onBeforeGosterEgitimDokumanList,
				indirdokuman: this.onIndirDokuman,
				sildokuman: this.onSilDokuman
			}
		});
	},
	
	onSilDokuman: function (grid, rec) {
		var mediaId = rec.get('id'),
			text = rec.get('baslik'),
			kod = rec.get('kod');
	
		Ext.Msg.confirm('Onay', '[' + kod + '] ' + text + ' silinecek. Onaylıyor musunuz?', function(button) {
		    if (button === 'yes') {
		    	Egitim.lib.Utility.ajaxRequest({
					url: 'egitims/deleteEgitimDokuman/' + mediaId,
					successFn: function () {
						grid.getStore().load();
					}
				});
		    }
		});
	},
	
	onIndirDokuman: function (grid, rec) {
		var mediaId = rec.get('id');
		document.getElementById('downloadFrame').src = 'egitims/downloadDokuman/' + mediaId;
	},
	
	onBeforeGosterEgitimDokumanList: function () {
		var egitimId = this.getEgitimPanel().egitimId,
			store = this.getEgitimDokumanList().getStore();
		store.getProxy().extraParams = {
			egitimId: egitimId
		};		
		store.load();
	},
	
	onTamamEgitimDokumaniYuklemeForm: function (but) {
		var form = but.up('form').getForm();
		var me = this;
		if (form.isValid()) {
			form.submit({
				success: function(form, action) {
					but.up('form').showMessage (1, action.result.msg);
					me.getEgitimDokumanList().getStore().load();
				},
				failure: function(form, action) {
					but.up('form').showMessage (0, action.result.msg);
				}
			});
		}
	},
	
	onAcEgitimDokumanYuklePencere: function (but) {
		var egitimId = this.getEgitimPanel().egitimId;
		Ext.widget('egitimdokumaniyuklemepenceresi', {
			egitimId: egitimId,
			modal: true
		}).show();
	},
	
	onTamamEgitimIcerik: function (but){
		var icerikForm = this.getEgitimIcerikForm();
		//alert(icerikForm.getForm().findField('egitmen_id').getValue());
		var form = but.up('form').getForm();
		if (form.isValid()) {
			form.submit({
				success: function(form, action) {
					but.up('form').showMessage (1, action.result.msg);
				},
				failure: function(form, action) {
					but.up('form').showMessage (0, action.result.msg);
				}
			});
		}	
	},
	
	onEgitmenIcerikGoster: function (view, selected, eOpts) {
		var icerikForm = this.getEgitimIcerikForm();
		var egitimId = this.getEgitimPanel().egitimId;

		if (selected && selected.length > 0) {
			
			icerikForm.load({
				waitMsg: 'Yükleniyor',
				url: 'egitims/loadEgitimIcerik/' + selected[0].get('id')  + '/'+ egitimId,
				method: 'POST'
			});
			
			icerikForm.yukleByEgitmen(selected[0], egitimId);
		} else {
			icerikForm.temizle ();
		}
	},
	
	onEgitimEgitmenViewRender: function (view) {
		var egitimId = this.getEgitimPanel().egitimId;
		view.getStore().load({
			params: {
				egitimId: egitimId
			}
		});

	},
	
	onBeforeGosterEgitim: function () {
		this.getEgitimKategoriCombo().getStore().load();
	},
	
	onEgitimListSearch: function (field, e){
		if (e.getKey() == e.ENTER) {
			var form = field.up('form').getForm();
			//form.submit();
			//alert(form.getValues());
			this.getEgitimStore().load({
				params: form.getValues()
			});
		}
	},
	
	onUserMenuRender: function () {
		
	},
	
	onSilEgitim: function (grid, record) {
		var egitimId = record.get('id'),
			text = record.get('baslik'),
			me = this;
		
		Ext.Msg.confirm('Onay', text + ' Silinecek. Onaylıyor musunuz?', function(button) {
		    if (button === 'yes') {
		    	Egitim.lib.Utility.ajaxRequest({
		    		url: 'egitims/delete/' + egitimId,
					successFn: function () {
						me.getEgitimStore().load();
					}
				});
		    }
		});
	},
	
	onTamamEgitim: function (but){
		var formPanel = but.up('form'),
			form = formPanel.getForm();
		if (form.isValid()) {
			form.submit({
				submitEmptyText: false,
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
	
	onGuncelleEgitim: function (grid, record, readonly) {
		if (Ext.isEmpty(readonly)) {
			readonly = !YETKI.isEgitimAuth();
		}
		var egitimId = record.get('id'),
			kod = record.get('kod');
		Ext.create('Ext.window.Window', {
			title: Ext.String.format('Eğitim [{0}] [{1}]', egitimId, kod),
			modal: true,
			height: 400,
			width: 600,
			layout: 'fit',
			maximizable: true,
			items: {
				//xtype: 'egitimform',
				xtype: 'egitimpanel',
				egitimId: egitimId,
				readonly: readonly,
				title: '',
				border: false
			}
		}).show();
	},
	
	onAfterRender: function () {
		this.getEgitimStore().load();
	},
	
	onGosterEgitim: function (egitimForm){
		var egitimId = '';
		if (Ext.isEmpty(egitimForm.up('egitimpanel'))) {
			egitimId = egitimForm.egitimId;
		} else {
			egitimId = egitimForm.up('egitimpanel').egitimId;
		}
		egitimForm.egitimId = egitimId;

		egitimForm.getEl().mask('Yükleniyor');
		egitimForm.getForm().findField('kategori').getStore().load({
			callback: function (){
				if (!Ext.isEmpty(egitimId)) {
					egitimForm.load({
						url: 'egitims/load/' + egitimId,
						method: 'POST',
						success:function (){
							egitimForm.getEl().unmask();
						},
						failure:function (){
							alert('hata');
							egitimForm.getEl().unmask();
						}
					});
				} else {
					egitimForm.getEl().unmask();					
				}
			}
		});
		
		
	}
});