Ext.define('Egitim.controller.ProjeCtrl', {
	extend: 'Ext.app.Controller',
	views: ['proje.ProjeTabpanel', 
	        'proje.ProjeKatilimciPanel', 
	        'proje.ProjeForm', 
	        'proje.ProjeList', 
	        'proje.ProjeEgitimContainer',
	        'proje.ProjeGrupProgramContainer', 
	        'KatilimciForm', 
	        'proje.GrupProgramEventView',
	        'uyg.UygEgitimDokumanlarPanel', 
	        'Egitim.view.uyg.UygEgitimDokumanList'],
	stores: ['Proje', 'UygEgitimDokumaniStore'],
	models: ['Proje', 'Egitim.model.EventModel', 'Ext.calendar.data.EventModel'],
	refs: [{
		ref: 'projeEgitimView',
		selector: 'projeegitimview'
	}, {
		ref: 'projeTabPanel',
		selector: 'projetabpanel'
	}, {
		ref: 'katilimciListGrupAdi',
		selector: 'katilimcilist #grupadi'
	}, {
		ref: 'katilimciList',
		selector: 'katilimcilist'
	}, {
		ref: 'katilimciForm',
		selector: 'katilimciform'
	}, {
		ref: 'projeGrupView',
		selector: 'projegrupview'
	}, {
		ref: 'projeGrupProgramContainer',
		selector: 'projegrupprogramcontainer'
	}, {
		ref: 'projeList',
		selector: 'projelist'
	}, {
		ref: 'uygEgitimDokumanlarPanel',
		selector: 'uygegitimdokumanlarpanel'
	}, {
		ref: 'uygEgitimDokumanList',
		selector: 'uygegitimdokumanlist'
	}, {
		ref: 'projeAnketView',
		selector: 'projeanketview'
	}, {
		ref: 'projeAnketPanel',
		selector: 'projeanketpanel'
	}],
	init: function() {

		this.control({
			'projeform button[action=tamam]': {
				click: this.onTamamProje
			},
			'projelist': {
				afterrender: this.onProjeListListAfterRender,
				silproje: this.onSilProje,
				guncelleproje: this.onGuncelleProje,
				itemdblclick: function (grid, record){
					this.onGuncelleProje(grid, record, false);
				},
				mediayukleproje: function (grid, record){
					this.onGuncelleProje(grid, record, false, true);
				} 
			},
			'projelist #search': {
				specialkey: this.onProjeListSearch
			},
			'projeform': {
				afterrender: this.onGosterProjeForm
			},
			'projeegitimcontainer egitimlist': {
				secildi: this.onEgitimSecildi
			},
			'projeegitimpanel button[action=sil]': {
				click: this.onSilEgitim
			},
			'projeegitimpanel button[action=tamam]': {
				click: this.onTamamEgitim
			},
			'projeanketpanel button[action=sil]': {
				click: this.onSilAnket
			},
			'projeanketpanel button[action=tamam]': {
				click: this.onTamamAnket
			},
			
			'projeegitimbilgilericontainer #egitmen': {
				select: this.onSecildiEgitmen
			},
			'katilimcilist button[action=grupla]': {
				click: this.onGrupla
			},
			'katilimcilist button[action=aktif]': {
				click: this.onKatilimciOnayDegistir
			},
			'katilimcilist button[action=pasif]': {
				click: this.onKatilimciOnayDegistir
			},
			'katilimcilist button[action=cikart]': {
				click: this.onKatilimciProjedenCikart
			},
			'katilimcilist button[action="ky-do"]': {
				click: this.onKyDurumDegistir
			},
			'katilimcilist button[action="ky-undo"]': {
				click: this.onKyDurumDegistir
			},
			'katilimcilist #grupadi': {
				specialkey: this.onGrupla
			},
			'katilimcilist': {
				guncellekatilimci: this.onSecildiKatilimci,
				afterrender: this.onGosterKatilimciList
			},
			'uygegitimdokumanlist button[action=yuklepencereac]': {
				click: this.onAcEgitimDokumanYuklePencere
			},
			'uygegitimdokumanlist': {
				indirdokuman: this.onIndirDokuman,
				sildokuman: this.onSilDokuman,
				guncelledokuman: this.onGuncelleDokuman
				
			},
			'uygegitimdokumaniyuklemeform button[action=tamam]': {
				click: this.onTamamUygEgitimDokumaniYuklemeForm
			},
			'projeegitimview': {
				afterrender: function (view){
					view.getStore().load({
						params: {
							id: view.up('tabpanel').getProjeId()
						}
					});
				}
			},
			'projegrupview': {
				afterrender: function (view){
					view.getStore().load({
						params: {
							id: view.projeId
						}
					});
				},
				select: this.onSecildiProjeGrup
			},
			'projegrupprogramcontainer button[action=yenievent]': {
				click: this.onYeniGrupProgramEvent
			},
			'projegrupprogramcontainer button[action=tazele]': {
				click: function (){
					this.calPanelReset();
				}
			},
			'grupprogrameventform button[action=tamam]': {
				click: this.onTamamGrupProgramEventForm
			},
			'calendarpanel': {
				dayclick: function(vw, dt, ad, el){
					if (YETKI.isProjeGrupEventAuth()) {
	                    this.showEditWindow({
	                        StartDate: dt,
	                        IsAllDay: ad
	                    }, el);
	                    //this.clearMsg();						
					}
                },
                eventclick: function(vw, rec, el){
                    this.showEditWindow(rec, el);
                }
			},
			'ankettanimlist': {
				secildi: this.onAnketSecildi
			},
			'projeanketview': {
				afterrender: this.onProjeAnketViewRender 
			}
		});
	},
	
	onProjeAnketViewRender: function (view){
		var projeId = this.getProjeTabPanel().projeId;
		view.getStore().load({
			params: {
				id: projeId
			}
		});
	},
	
	onAnketSecildi: function (grid, rec) {
		var id = rec.get('id'),
			store = this.getProjeAnketView().getStore();
		if (Ext.isEmpty(store.getById(id))) {
			store.add({
				src: 'egitimapp/resources/images/anket_big.png', 
				baslik: rec.get('baslik'), 
				id: id
			});			
		}
	},
	
	onSilDokuman: function (grid, record) {
		var dokId = record.get('id'),
			text = record.get('baslik');
		
		Ext.Msg.confirm('Onay', text + ' Silinecek. Onaylıyor musunuz?', function(button) {
		    if (button === 'yes') {
		    	Egitim.lib.Utility.ajaxRequest({
					url: 'egitims/deleteUygDokuman/' + dokId,
					successFn: function () {
						grid.getStore().load();
					}
				});
		    }
		});
	},
	
	onGuncelleDokuman: function (grid, record) {
		var dokId = record.get('id'),
			kod = record.get('kod');
		
		Ext.widget('uygegitimdokumaniyuklemepenceresi', {
			title: 'Medya Penceresi [' + kod +  '] [' + dokId + ']',
			width: 500,
			uygegitimdokumaniId: dokId,
			modal: true
		}).show();
	},
	
	onIndirDokuman: function (grid, rec) {
		var mediaId = rec.get('id');
		document.getElementById('downloadFrame').src = 'egitims/downloadUygDokuman/' + mediaId;
	},
	
	onTamamUygEgitimDokumaniYuklemeForm: function (but) {
		var formPanel = but.up('form');
		var form = formPanel.getForm();
		var me = this;
		if (form.isValid()) {
			form.submit({
				success: function(form, action) {
					but.up('form').showMessage (1, action.result.msg);
					//güncelleme olup olmadığını kontrol et
					Egitim.lib.Utility.infoMessage(action.result.msg, function (){
						if (formPanel.isGuncelleme()) {
							formPanel.up('window').close();
						} else {
							formPanel.temizle();
						}
						me.getUygEgitimDokumanList().getStore().load();						
					});
				},
				failure: function(form, action) {
					but.up('form').showMessage (0, action.result.msg);
				}
			});
		}
	},
	
	onAcEgitimDokumanYuklePencere: function (but) {
		var projeegitimview = this.getUygEgitimDokumanlarPanel().down('projeegitimpanel').down('projeegitimview');
		var selected = projeegitimview.getSelectionModel().getSelection();
		var projeTabPanel = this.getProjeTabPanel();
		var projeId = projeTabPanel.projeId;
		debugger;
		if (selected.length == 0) {
			Egitim.lib.Utility.warnMessage('Eğitim seçiniz');
			return;
		} else {
			var egitimId = selected[0].get('id');
			Ext.widget('uygegitimdokumaniyuklemepenceresi', {
				width: 500,
				projeId: projeId,
				egitimId: egitimId,
				modal: true
			}).show();
		}
	},
	
	onKatilimciOnayDegistir: function (but) {
		var katilimciList = this.getKatilimciList(),
			onay = but.action === 'aktif' ? true : false,
			katilimciIds = this.getSelectedKatilimcis();

		if (Ext.isEmpty(katilimciIds)) {
			return;
		}
		var msg = null;
		if (onay) {
			msg = "Seçilen katılımcılar onaylanacak.";
		} else {
			msg = "Seçilen katılımcılar onayı kaldırılacak.";			
		}
		
		Ext.Msg.confirm('Onay', msg + ' Onaylıyor musunuz?', function(button) {
		    if (button === 'yes') {
		    	Egitim.lib.Utility.ajaxRequest ({
					url: 'katilimcis/onayDegistir',
					params: {
						onay: onay,
						katilimciIds: katilimciIds
					},
					successFn: function (){
						katilimciList.getSelectionModel().deselectAll();
						katilimciList.getStore().load();
					}
				});
		    }
		});
	},
	
	onKatilimciProjedenCikart: function (but) {
		var katilimciList = this.getKatilimciList(),
			userIds = this.getSelectedKatilimciUserIds();
	
		if (Ext.isEmpty(userIds)) {
			return;
		}
		var projeId = this.getProjeGrupProgramContainer().projeId;
		
		Ext.Msg.confirm('Onay', 'Seçilen katılımcılar projeden [Proje Id: ' + projeId + '] çıkarılacak. Onaylıyor musunuz?', function(button) {
		    if (button === 'yes') {
		    	Egitim.lib.Utility.ajaxRequest ({
					url: 'katilimcis/projedenCikart',
					params: {
						userIds: userIds,
						projeId: projeId
					},
					successFn: function (){
						katilimciList.getSelectionModel().deselectAll();
						katilimciList.getStore().load();
					}
				});
		    }
		});
		
	},
	
	onGosterKatilimciList: function (grid) {
		//this.getKatilimciList().getStore().load();
		grid.getStore().load();
	},
	
	calPanelReset: function (baslik){
		var calPanel = this.getProjeGrupProgramContainer().down('#calendarpanel');
		calPanel.setTitle('Takvim' + (Ext.isEmpty(baslik) ? '': ' [' + baslik + ']'));
		calPanel.eventStore.removeAll();
	},
	
	onSecildiProjeGrup: function (view, record, eOpts) {
		var me = this;
		var calPanel = this.getProjeGrupProgramContainer().down('#calendarpanel');
		var projeGrupProgramContainer = this.getProjeGrupProgramContainer();
		calPanel.getEl().mask('Yükleniyor...');
		
		var store = Ext.create('Egitim.store.GrupProgramEventStore').load({
			params: {
				projeId: projeGrupProgramContainer.projeId,
	        	grup: record.get('id')
			},
			callback: function(records, operation, success) {
				me.calPanelReset(record.get('baslik'));
				for ( var i = 0; i < records.length; i++) {
					var rec = records[i];
					calPanel.eventStore.add(rec.makeEventData());
				}
				calPanel.getEl().unmask();
		    }
		});
	},
	
	showWindowForView: function (rec){
		Ext.create('Ext.window.Window', {
			iconCls: 'event',
			title: 'Etkinlik',
			modal: false,
			height: 400,
			width: 500,
			modal: true,
			layout: 'fit',
			autoScroll: true,
			maximizable: false,
			items: [{
				xtype: 'grupprogrameventview',
				autoScroll: true,
				eventId: rec.data.recordData ? rec.data.recordData.id : rec.raw.recordData.id
			}]
		}).show();
	},
	
	showEditWindow : function(rec, animateTarget){
		if (!YETKI.isProjeGrupEventAuth()) {
			this.showWindowForView(rec);
			return;
		}
		
		//var projeId = this.getProjeTabPanel().projeId;
		var projeId = this.getProjeGrupProgramContainer().projeId;
		var selections = this.getProjeGrupView().getSelectionModel().getSelection();
		if (!selections || selections.length == 0) {
			Egitim.lib.Utility.warnMessage('Grup seçiniz');
			return;
		}
		var grup = selections[0].get('id');

		var form = Ext.widget('grupprogrameventform', {
			readonly: !YETKI.isProjeGrupEventAuth(),
			title: '',
			grup: grup,
			projeId: projeId,
			egitmenComboQueryMode: 'remote',
			border: false
		});
		var eventModel = null;
		var yeni = !(rec && rec.data && /*rec.data.recordData*/rec.raw && rec.raw.recordData);
		if (!yeni) {
			eventModel = new Egitim.model.EventModel(rec.raw.recordData/*rec.data.recordData*/);			
		} else {
			var minutes = rec.StartDate.getMinutes() + "";
			var hour = rec.StartDate.getHours() + "";
			//alert(hour + ':' + minutes);
			eventModel = new Egitim.model.EventModel({
				bas_tarihi: rec.StartDate,
				bas_saati: (hour.length == 2 ? hour : '0'+ hour)  + ':' + (minutes.length == 2 ? minutes : '0'+ minutes),
				grup: grup,
				proje_id: projeId
			});
		}
		Ext.create('Ext.window.Window', {
			iconCls: 'event',
			title: Ext.String.format('Event [{0}]', Ext.isEmpty(eventModel.get('id')) ? 'Yeni' : eventModel.get('id')),
			modal: false,
			height: 300,
			width: 500,
			modal: true,
			layout: 'fit',
			maximizable: false,
			items: [form]
		}).show();
		
		form.getMessageLabel().setText ('İşlem yapılıyor...');
		var egitimCombo = form.getForm().findField('egitim_id');
		var basicForm = form.getForm();
		form.getEl().mask('Yükleniyor...');
		egitimCombo.getStore().load({
			callback: function (){
				form.getMessageLabel().setText ('');
				if (!yeni) {
					basicForm.findField('egitmen_id').getStore().load({
						params:{
							egitimId: eventModel.data.egitim_id
						},
						callback: function () {
							basicForm.loadRecord(eventModel);
							basicForm.findField('renk').setValue(eventModel.get('renk'));
							form.getEl().unmask();
						}
					});					
				} else {
					basicForm.loadRecord(eventModel);
					basicForm.findField('renk').setValue(eventModel.get('renk'));
					form.getEl().unmask();					
				}
			}
		});
    },
   
	onTamamGrupProgramEventForm: function (but) {
		var formPanel = but.up('form'),
			form = formPanel.getForm();
		/*
			id = form.findField('id').getValue(),
			cid = form.findField('renk').getValue(),
			basValue = form.findField('bas_tarihi').getValue(),
			bitValue = form.findField('bit_tarihi').getValue();
		*/
		
		var calPanel = this.getProjeGrupProgramContainer().down('#calendarpanel');
		if (form.isValid()) {
			form.submit({
				success: function(form, action) {
			        var msg = action.result.msg;
					formPanel.showMessage (1, msg);
					var rec = new Egitim.model.EventModel(Ext.applyIf({
						id: action.result.grupProgramEventId
					}, form.getValues()));
			        calPanel.eventStore.add(rec.makeEventData());
			        
					Egitim.lib.Utility.infoMessage(msg, function () {
						if (!formPanel.isGuncelleme()) {
							formPanel.temizle();						
						}
					});
			        
				},
				failure: function(form, action) {
					formPanel.showMessage (0, action.result.msg);
				}
			});
		}		
	},
	
	onYeniGrupProgramEvent: function (but){
		var projeId = this.getProjeTabPanel().projeId;
		var selections = this.getProjeGrupView().getSelectionModel().getSelection();
		if (!selections || selections.length == 0) {
			Egitim.lib.Utility.warnMessage('Grup seçiniz');
			return;
		}
		var grup = selections[0].get('id');
		
		Ext.create('Ext.window.Window', {
			title: Ext.String.format('Event [{0}]', 'Yeni'),
			modal: true,
			height: 300,
			width: 500,
			layout: 'fit',
			maximizable: false,
			items: {
				xtype: 'grupprogrameventform',
				projeId: projeId,
				readonly: !YETKI.isAdmin(), //FIXME admin dışındakiler için true olacak
				title: '',
				projeId: projeId,
				grup: grup,
				border: false,
				listeners: {
					afterrender: function (form) {
						form.getForm().findField('renk').setValue(1);
					}
				}
			}
		}).show();
		
	},
	
	onSecildiKatilimci: function (grid, rec) {
		debugger;
		var katForm = this.getKatilimciForm();
		if (katForm) { //proje ekranından açılmış demektir
			katForm.setGuncelleme();
			katForm.loadRecord(rec);			
		} else {
			katForm = Ext.widget('katilimciform', {
				readonly: !YETKI.isAdmin(),
				yeni: false,
				header: false,
				parolaDegistirGoster: false,
				listeners: {
					afterrender: function (form){
						form.getForm().load({
							waitMsg: 'Yükleniyor',
							url: 'katilimcis/load/' + rec.get('id'),
							method: 'POST',
							success: function (f, action){
								var ilCombo = f.findField('il');
								var r = ilCombo.getStore().findRecord('key', action.result.data.il);
								if (r) {
									ilCombo.ilce = action.result.data.ilce;
									ilCombo.fireEvent('select', ilCombo, [r]);									
								}
							}
						});
					}
				}
			});
			//katForm.setGuncelleme();
			Ext.create('Ext.window.Window', {
				title: Ext.String.format('Event [{0}]', 'Yeni'),
				modal: true,
				height: 500,
				iconCls: 'katilimci',
				width: 600,
				title: 'Katılımcı Bilgileri',
				layout: 'fit',
				maximizable: true,
				items: [katForm]
			}).show();
		}
	},
	
	onGrupla: function (f, e) {	
		var grid = f.up('grid');
		var grupAdiComp = grid.down('#grupadi'),//this.getKatilimciListGrupAdi(),
			//katilimciList = this.getKatilimciList(),
			katilimciList = grid,
			secilenler = katilimciList.getSelectionModel().getSelection(),
			grupAdi = grupAdiComp.getValue(),
			projeId = this.getProjeTabPanel().getProjeId();
		
		if (grupAdiComp.isHidden()) {
			grupAdiComp.setVisible(true);
			return;
		}
		
		if (f.xtype === 'textfield') {
			if(e && e.getKey && e.getKey()!=e.ENTER){
				return;	
			}
		}
		
		var userIds = this.getSelectedKatilimciUserIds(katilimciList);
		if (Ext.isEmpty(userIds)) {
			return;
		}
		
		if (!Ext.isIE) {
			console.log ("Grupla: " + grupAdi + ' ' + secilenler.length);
		}
		Egitim.lib.Utility.ajaxRequest({
			url: 'projes/grupla',
			params: {
				grupAdi: grupAdi,
				projeId: projeId,
				userIds: userIds
			},
			successFn: function (){
				katilimciList.getSelectionModel().deselectAll();
				katilimciList.getStore().load();
			}
		});
	},
	
	onKyDurumDegistir: function (but) {
		
		var katilimciList = but.up('grid'),//this.getKatilimciList(),
			ky_durumu = but.action === 'ky-do' ? true : false,
			userIds = this.getSelectedKatilimciUserIds(katilimciList),
			projeId = this.getProjeTabPanel().getProjeId();

		if (Ext.isEmpty(userIds)) {
			return;
		}
		
		Egitim.lib.Utility.ajaxRequest ({
			url: 'katilimcis/kyDegistir',
			params: {
				ky_durumu: ky_durumu,
				userIds: userIds,
				projeId: projeId
				//katilimciIds: katilimciIds
			},
			successFn: function (){
				katilimciList.getSelectionModel().deselectAll();
				katilimciList.getStore().load();
			}
		});
		
	},
	
	/**
	 * Seçilen katılımcı listesini 1,2,3, şeklinde döner<br>
	 * Hiç seçilmediği durumda "" döner
	 */
	getSelectedKatilimcis: function (katilimciList) {
		var katilimciIds = "",
			katilimciList = katilimciList || this.getKatilimciList(),
			secilenler = katilimciList.getSelectionModel().getSelection();
		
		for ( var i = 0; i < secilenler.length; i++) {
			var kat = secilenler[i];
			katilimciIds += kat.get('id') + ',';
		}
		return katilimciIds;
		
	},
	
	getSelectedKatilimciUserIds: function (katilimciList) {
		var userIds = "",
			katilimciList = katilimciList || this.getKatilimciList(),
			secilenler = katilimciList.getSelectionModel().getSelection();
		
		for ( var i = 0; i < secilenler.length; i++) {
			var kat = secilenler[i];
			userIds += kat.get('user_id') + ',';
		}
		return userIds;
		
	},
	
	onSecildiEgitim: function () {
		
	},
	
	onSilEgitim: function (){
		var view = this.getProjeEgitimView(),
			st = view.getStore(),
			selections = view.getSelectionModel().getSelection();
		if (Ext.isEmpty(selections)) {
			return;
		}
		st.remove(selections);
	},
	
	onSilAnket: function (){
		var view = this.getProjeAnketView(),
			st = view.getStore(),
			selections = view.getSelectionModel().getSelection();
		if (Ext.isEmpty(selections)) {
			return;
		}
		st.remove(selections);
	},
	
	/**
	 * Projenin önceden kaydedilmiş olması gerekir, projeId dolu olmalı
	 */
	onTamamEgitim: function (){
		var view = this.getProjeEgitimView(),
			st = view.getStore();
			models = st.getRange(0, st.getCount()),
			projeId = this.getProjeTabPanel().projeId;
	
		if (Ext.isEmpty(projeId)) {
			Egitim.lib.Utility.errorMessage('Önce Proje kaydını yapmanız gerekir. Proje id boş.');
			return;
		}
		
		if (!Ext.isIE) {
			console.log(models.length + ' eğitim,' + projeId + ' idli proje için kaydedilecek');
		}
		var egitimIds = '', 
			egitmenIds = '';
		for ( var i = 0; i < models.length; i++) {
			var model = models[i];
			egitimIds += model.get('id') + ',';
			egitmenIds += (Ext.isEmpty(model.get('egitmen_id')) ? 0 : model.get('egitmen_id')) + ',';
		}

		Egitim.lib.Utility.ajaxRequest({
			url: 'projes/saveEgitim',
			method: 'POST',
			params: {
				projeId: projeId,
				egitimIds: egitimIds,
				egitmenIds: egitmenIds //olmayanlar için '' gider
			}
		});
	},
	
	onTamamAnket: function (){
		var view = this.getProjeAnketView(),
			st = view.getStore();
			models = st.getRange(0, st.getCount()),
			projeId = this.getProjeTabPanel().projeId;
	
		if (Ext.isEmpty(projeId)) {
			Egitim.lib.Utility.errorMessage('Önce Proje kaydını yapmanız gerekir. Proje id boş.');
			return;
		}
		
		if (!Ext.isIE) {
			console.log(models.length + ' anket,' + projeId + ' idli proje için kaydedilecek');
		}
		var anketIds = '';
		for ( var i = 0; i < models.length; i++) {
			var model = models[i];
			anketIds += model.get('id') + ',';
		}

		Egitim.lib.Utility.ajaxRequest({
			url: 'projes/saveAnket',
			method: 'POST',
			params: {
				projeId: projeId,
				anketIds: anketIds
			}
		});
	},
	
	onEgitimSecildi: function (grid, rec) {
		this.getProjeEgitimView().getStore().add({
			src: 'egitimapp/resources/images/egitim_big.png', 
			baslik: rec.get('baslik'), 
			id: rec.get('id')
		});
	},
	
	onGosterProjeForm: function (projeForm) {
		var tabpanel = projeForm.up('tabpanel'),
			projeId = projeForm.up('tabpanel').getProjeId();
		
		tabpanel.fireEvent('yuklendi', projeId);
		//projeForm.projeId = projeId;
		
		if (!Ext.isEmpty(projeId)) {
			projeForm.load({
				waitMsg: 'Yükleniyor',
				url: 'projes/load/' + projeId,
				method: 'POST'
			});
		}
	},
	
	onProjeListListAfterRender: function (){
		this.getProjeStore().load();
	},
	
	onTamamProje: function (but) {
		var formPanel = but.up('form'),
			form = formPanel.getForm(),
			projeList = this.getProjeList();
		
		if (form.isValid()) {
			form.submit({
				success: function(form, action) {
					var msg = action.result.msg;
					var projeId = action.result.projeId;
					formPanel.up('tabpanel').fireEvent('yuklendi', projeId);
					formPanel.showMessage (1, msg);
					Egitim.lib.Utility.infoMessage(msg, function () {
						formPanel.up('window').close();
					});
					projeList.getStore().load();
				},
				failure: function(form, action) {
					formPanel.showMessage (0, action.result.msg);
				}
			});
		}		
	},
	
	onProjeListSearch: function (field, e){
		if (e.getKey() == e.ENTER) {
			var form = field.up('form').getForm();
			this.getProjeStore().load({
				params: form.getValues()
			});
		}
	},
	
	onSilProje: function (grid, record) {
		var projeId = record.get('id'),
			text = record.get('baslik'),
			me = this;
		
		Ext.Msg.confirm('Onay', text + ' Silinecek. Onaylıyor musunuz?', function(button) {
		    if (button === 'yes') {
		    	Egitim.lib.Utility.ajaxRequest({
					url: 'projes/delete/' + projeId,
					successFn: function () {
						me.getProjeStore().load();
					}
				});
		    }
		});
	},
	
	onGuncelleProje: function (grid, record, readonly, mediaPanelAktif) {
		readonly = readonly || false;
		var projeId = record.get('id'),
			kod = record.get('kod');
		Ext.create('Ext.window.Window', {
			title: Ext.String.format('Proje [{0}] [{1}]', projeId, kod),
			modal: true,
			height: 500,
			width: 600,
			layout: 'fit',
			maximized: true,
			maximizable: true,
			items: {
				xtype: 'projetabpanel',
				projeId: projeId,
				readonly: readonly,
				mediaPanelAktif: mediaPanelAktif,
				title: '',
				border: false
			}
		}).show();
	}
	
});