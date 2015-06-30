Ext.define('Egitim.controller.EgitmenCtrl', {
	extend: 'Ext.app.Controller',
	models: ['Egitim'],
	views: ['EgitmenForm', 'EgitmenList', 'EgitmenPanel', 'EgitmenEgitimPanel', 'EgitmenEgitimView'],
	stores: ['Egitmen'],
	refs: [{
		ref: 'egitmenEgitimView',
		selector: 'egitmenegitimview'
	}, {
		ref: 'egitmenPanel',
		selector: 'egitmenpanel'		
	}],
	init: function() {
		
		this.control({
			/*
			'usermenu': {
				beforerender: this.onUserMenuRender
			},
			*/
			'egitmenlist': {
				afterrender: this.onAfterRender,
				silegitmen: this.onSilEgitmen,
				guncelleegitmen: this.onGuncelleEgitmen,
				itemdblclick: function (grid, rec){
					this.onGuncelleEgitmen(grid, rec);
				}
			},
			'egitmenlist #search': {
				specialkey: this.onEgitmenListSearch
			},
			'egitmenform': {
				afterrender: this.onGosterEgitmen
			},
			'egitmenform button[action=tamam]': {
				click: this.onTamamEgitmen
			},
			'egitmenform [act="cvgor"]': {
				click: this.onCVGor
			},
			'egitmenegitimpanel button[action=tamamegitim]': {
				click: this.onTamamEgitim
			},
			'egitmenegitimpanel button[action=silegitim]': {
				click: this.onSilEgitim
			},
			'egitmenegitimview': {
				afterrender: this.onEgitmenEgitimViewRender
			}
		});
	},
	
	onCVGor: function () {
		var egitmenId = this.getEgitmenPanel().egitmenId;
		document.getElementById('downloadFrame').src = 'egitmens/downloadCV/' + egitmenId;
		//alert(egitmenId);
	},
	
	onEgitmenEgitimViewRender: function (view){
		var egitmenId = this.getEgitmenPanel().egitmenId;
		view.getStore().load({
			params: {
				id: egitmenId
			}
		});
	},
	
	onSilEgitim: function (){
		var view = this.getEgitmenEgitimView(),
			st = view.getStore(),
			selections = view.getSelectionModel().getSelection();
		if (Ext.isEmpty(selections)) {
			return;
		}
		st.remove(selections);
	},
	
	/**
	 * Önceden eğitmenin kaydedilmiş olması yani egitimId'nin dolu olması gerekir
	 */
	onTamamEgitim: function (){
		var view = this.getEgitmenEgitimView(),
			st = view.getStore();
			models = st.getRange(0, st.getCount()); 
		
		//alert(models.length);
		var egitimIds = '';
		for ( var i = 0; i < models.length; i++) {
			egitimIds += models[i].get('id') + ',';
		}
		
		var egitmenId = this.getEgitmenPanel().egitmenId;

		Egitim.lib.Utility.waitMessage();
		Ext.Ajax.request({
			url: 'egitmens/saveEgitim?egitmenId=' + egitmenId + '&egitimIds=' + egitimIds,
			success: function(response){
				Ext.MessageBox.hide();
				var msg = Ext.JSON.decode(response.responseText).msg;
				Egitim.lib.Utility.infoMessage(msg);
			},
			failure: function (response){
				alert(response);
			}
		});
	},
	
	onEgitmenListSearch: function (field, e){
		if (e.getKey() == e.ENTER) {
			var form = field.up('form').getForm();
			//form.submit();
			//alert(form.getValues());
			this.getEgitmenStore().load({
				params: form.getValues()
			});
		}
	},
	
	onUserMenuRender: function () {
		
	},
	
	onSilEgitmen: function (grid, record) {
		var egitmenId = record.get('id'),
			text = record.getAdSoyad(),
			me = this;
		
		Ext.Msg.confirm('Onay', text + ' Silinecek. Onaylıyor musunuz?', function(button) {
		    if (button === 'yes') {
		    	Egitim.lib.Utility.ajaxRequest({
		    		url: 'egitmens/delete/' + egitmenId,
					successFn: function () {
						me.getEgitmenStore().load();
					}
				});
		    }
		});
	},
	
	onTamamEgitmen: function (but){
		var formPanel = but.up('form'),
			form = formPanel.getForm();
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
	
	onGuncelleEgitmen: function (grid, record) {
		debugger;
		var egitmenId = record.get('id'),
			adSoyad = record.getAdSoyad(),
			kod = record.get('kod');
		Ext.create('Ext.window.Window', {
			title: Ext.String.format('Eğitmen [{0}] - {1}', kod, adSoyad),
			modal: true,
			height: 500,
			width: 600,
			layout: 'fit',
			maximizable: true,
			items: {  // Let's put an empty grid in just to illustrate fit layout
				xtype: 'egitmenpanel', //'egitmenform',
				egitmenId: egitmenId,
				title: '',
				border: false
			}
		}).show();
	},
	
	onAfterRender: function () {
		this.getEgitmenStore().load();
	},
	
	onGosterEgitmen: function (egitmenForm){
		var egitmenId = egitmenForm.up('tabpanel') ? egitmenForm.up('tabpanel').egitmenId : '';
		if (!Ext.isEmpty(egitmenId)) {
			egitmenForm.egitmenId = egitmenId;
			egitmenForm.load({
				waitMsg: 'Yükleniyor',
				url: 'egitmens/load/' + egitmenId,
				method: 'POST',
				success: function (form, action) {
					var cv_media_id = action.result.data.cv_media_id;
					form.owner.down('#cvgor').setVisible(!Ext.isEmpty(cv_media_id));
				}
			});
		}
	}
});