Ext.define('Egitim.controller.KatilimciCtrl', {
	extend: 'Ext.app.Controller',
	views: ['KatilimciForm', 'KatilimciList', 'tanimlar.GorevCombo'],
	stores: ['Katilimci'],
	models: ['Katilimci'],
	projeId: '',
	refs: [{
		ref: 'katilimciForm',
		selector: 'katilimciform'
	},{
		ref: 'katilimciList',
		selector: 'katilimcilist'
	}],
	init: function() {
		this.control({
			'katilimciform button[action=tamam]': {
				click: this.onKaydetKatilimciForm
			},
			'katilimcilist [tip="s"]': {
				specialkey: this.onKatilimciListSearch
			},
			'katilimcilist': {
				silkatilimci: this.onSilKatilimci
			},
			
			'viewport #mevcutkullaniciformu button[action=yeni]' : {
				click: function (btn){
					btn.up('form').hide();
    	    		this.getKatilimciForm().show();
				}
			},
			
			'viewport #mevcutkullaniciformu button[action=tamam]' : {
				click: this.onMevcutKullaniciTamam
			}
		});
	},
	
	onMevcutKullaniciTamam: function (but) {
		var panel = but.up('form'),
			form = panel.getForm();
		if (form.isValid()) {
			but.setDisabled(true);
			Egitim.lib.Utility.waitMessage();
			form.submit({
				success: function(form, action) {
					var msg = action.result.msg;
					Ext.MessageBox.hide();
					Egitim.lib.Utility.infoMessage(msg, function () {
						var projeIdComp = form.findField('proje_id');
						var projeId = projeIdComp.getValue();
						form.reset();
						projeIdComp.setValue(projeId);
					});
					but.setDisabled(false);
				},
				failure: function(form, action) {
					Ext.MessageBox.hide();
					but.setDisabled(false);
					var msg = action.result.msg;
					Egitim.lib.Utility.errorMessage(msg);
				}
			});
		} else {
			Egitim.lib.Utility.errorMessage('Formda doldurmanız gereken alanlar var.');
		}
	},
	
	onSilKatilimci: function (grid, record){
		var katilimciId = record.get('id'),
			text = record.getAdSoyad(),
			me = this;
		
		Ext.Msg.confirm('Onay', text + ' Silinecek. Onaylıyor musunuz?', function(button) {
		    if (button === 'yes') {
		    	Egitim.lib.Utility.ajaxRequest({
		    		url: 'katilimcis/delete/' + katilimciId,
					successFn: function () {
						me.getKatilimciList().getStore().load();
					}
				});
		    }
		});
	},
	
	onKatilimciListSearch: function (field, e){
		if (e.getKey() == e.ENTER) {
			var form = field.up('form').getForm();
			this.getKatilimciList().getStore().load({
				params: form.getValues()
			});
		}
	},
	
	onKaydetKatilimciForm: function (but) {
		var formPanel = this.getKatilimciForm(),
			form = formPanel.getForm();
		
		if (form.isValid()) {
			if (Ext.isEmpty(form.findField('proje_id').getValue())) {
				if(formPanel.up('tabpanel') && formPanel.up('tabpanel').getProjeId) {
					form.findField('proje_id').setValue(formPanel.up('tabpanel').getProjeId());					
				}
			}
			but.setDisabled(true);
			form.submit({
				success: function(form, action) {
					var msg = action.result.msg;
					formPanel.showMessage (1, msg);
					Egitim.lib.Utility.infoMessage(msg, function () {
						if (!formPanel.isGuncelleme()) {
							formPanel.temizle(['proje_id']);
						}
					});
					but.setDisabled(false);
				},
				failure: function(form, action) {
					but.setDisabled(false);
					formPanel.showMessage (0, action.result.msg);
				}
			});
		} else {
			Egitim.lib.Utility.errorMessage('Formda doldurmanız gereken alanlar var.');
		}
	}
});