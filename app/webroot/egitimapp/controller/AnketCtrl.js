Ext.define('Egitim.controller.AnketCtrl', {
	extend: 'Ext.app.Controller',
	models: ['AnketTanimlama', 'AnketTanim'],
	views: [ 'admin.AnketTanimList', 'admin.AnketTanimPanel'],
	stores: ['AnketTanim', 'AnketTanimSoru'],
	refs:[{
		ref: 'anketTanimPanel',
		selector: 'ankettanimpanel'
	}, {
		ref: 'anketTanimSoruForm',
		selector: 'ankettanimsoruform'
	}, {
		ref: 'anketTanimList',
		selector: 'ankettanimlist'
	}],
	init: function() {
		
		this.control({
			'ankettanimlist': {
				guncelleankettanim: this.onGosterAnketTanim,
				afterrender: function (grid) {
					grid.getStore().load();
				}
			},
			'ankettanimlist [tip="s"]': {
				specialkey: this.onAnketTanimListSearch
			},
			
			'ankettanimlist button[action=yeni]': {
				click: function (){
					this._onGosterAnketTanim(null, null, true);
				}
			},
			'ankettanimform button[action=tamam]': {
				click: this.onTamamAnketForm
			},
			'ankettanimpanel ankettanimform': {
				afterrender: this.onAfterAnketTanimForm
			},
			'ankettanimpanel #sorugrid': {
				afterrender: function (grid) {
					if (!Ext.isEmpty(grid.atId)) {
						grid.getStore().load();
					}
				}
			},
			'ankettanimpanel #sorugrid button[action=yenisoru]': {
				click: this.onYeniAnketTanimSoru
			},
			'ankettanimsoruform button[action=tamam]': {
				click: this.onTamamAnketTanimSoru
			},
			'ankettanimpanel': {
				silankettanimsoru: this.onSilATS,
				guncelleankettanimsoru: this.onGuncelleATS
			},
			'#anketformu button[action=tamam]' : {
				click: this.onTamamAnketFormu
			}
		});
	},
	
	onTamamAnketFormu: function (btn){
		var formPanel = btn.up('form'); 
		if (formPanel.isOnIzleme()) {
			return;
		}
		var form = formPanel.getForm();
		if (form.isValid()) {
			form.submit({
				url: 'ankets/create',
				submitEmptyText: false,
				success: function(form, action) {
					var msg = action.result.msg;
					btn.up('form').showMessage (1, msg);
					Egitim.lib.Utility.infoMessage(msg, function () {
					});
					
				},
				failure: function(form, action) {
					btn.up('form').showMessage (0, action.result.msg);
				}
			});
		}
		
	},
	
	onGuncelleATS: function (grid, rec) {
		var id = rec.get('id');
		this.getAnketTanimSoruForm().load({
			url: 'admins/loadAnketTanimSoru/' + id,
			success: function (form, action) {
				var secenekGrid = form.owner.down('#secenekler');
				secenekGrid.hide();
				if (!Ext.isEmpty(action.result.data.soru_data)) {
					secenekGrid.show();
					secenekGrid.getStore().loadData(Ext.JSON.decode(action.result.data.soru_data));
				}
				form.findField('rank').setVisible (action.result.data.soru_tipi === 'K');
			}
		});
	},
	
	onAnketTanimListSearch: function (field, e){
		if (e.getKey() == e.ENTER) {
			var form = field.up('form').getForm();
			this.getAnketTanimList().getStore().load({
				params: form.getValues()
			});
		}
	},
	
	onYeniAnketTanimSoru: function (but) {
		var form = this.getAnketTanimSoruForm ();
		form.temizle();
		form.getForm().findField('id').setValue(null);
	},
	
	onTamamAnketTanimSoru: function (but){
		var formPanel = but.up('form');
		var form = formPanel.getForm();
		var atPanel = this.getAnketTanimPanel();
		
		var data = [];
		var soruSeceneklerStore = formPanel.down('#secenekler').getStore();
		for (var i=0; i<soruSeceneklerStore.getCount(); i++) {
			var rec = soruSeceneklerStore.getAt(i);
			data[i] = {
				soru: rec.get('soru'),
				id: Ext.id()
			};
		}
		if (data.length > 0) {
			form.findField('soru_data').setValue(Ext.JSON.encode(data));			
		}
		
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
						atPanel.down('#sorugrid').getStore().load();
					});
					
				},
				failure: function(form, action) {
					but.up('form').showMessage (0, action.result.msg);
				}
			});
		}
	},
	
	onAfterAnketTanimForm: function (form){
		var atPanel = this.getAnketTanimPanel();
		if (!Ext.isEmpty(form.atId)) {
			form.getForm().load({
				waitMsg: 'Yükleniyor',
				url: 'admins/loadAnketTanim/' + form.atId,
				method: 'POST',
				success: function (form, action) {
					atPanel.setSoruPanelEnable();
				}
			});
		}
	},
	
	onTamamAnketForm: function (but) {
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
	
	onGosterAnketTanim: function (grid, rec) {
		var atId = rec.get('id');
		this._onGosterAnketTanim(atId, rec.get('kod'), false);
	},
	
	/**
	 * 
	 * @param atId
	 * @param kod
	 * @param yeni true ise yeni form
	 */
	_onGosterAnketTanim: function (atId, kod, yeni){
		var title = yeni === true ? 'Anket Tanımı' : ('Anket Tanımı[' + kod + ']');
		Ext.create('Ext.window.Window', {
			title: title,
			modal: true,
			height: 530,
			width: 700,
			layout: 'fit',
			iconCls: 'anket-tanim',
			autoScroll: true,
			maximizable: true,
			items: {
				xtype: 'ankettanimpanel',
				atId: atId,
				header: false,
				border: false
			}
		}).show();
	},
	
	onSilATS: function (grid, record) {
		var id = record.get('id'),
			text = record.get('soru_metin');
		
		Ext.Msg.confirm('Onay', text + ' Silinecek. Onaylıyor musunuz?', function(button) {
		    if (button === 'yes') {
		    	Egitim.lib.Utility.ajaxRequest({
		    		url: 'admins/deleteAnketTanimSoru/' + id,
					successFn: function () {
						grid.getStore().load();
					}
				});
		    }
		});		
	}
});