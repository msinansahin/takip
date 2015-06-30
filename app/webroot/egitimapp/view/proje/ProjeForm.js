/**
 * Projenin katalog bilgileri, (isim vs)
 */
Ext.define ('Egitim.view.proje.ProjeForm', {
	extend: 'Egitim.lib.FormPanel',
    title: 'Proje Bilgileri',
	alias: 'widget.projeform',
	requires: [
	           'Ext.calendar.CalendarPanel',
	           'Ext.calendar.data.Calendars',
	           'Ext.calendar.data.Events',
	           'Egitim.view.tanimlar.IlCombo'
    ],
    allowScroll: true,

    // The form will submit an AJAX request to this URL when submitted
    url: 'projes/save',
    
	items: [{
		xtype: 'textfield',
		fieldLabel: 'Kodu',
		emptyText: 'Projenin kodu',
		allowBlank: false,
		name: 'kod'
	}, {
		xtype: 'textfield',
		fieldLabel: LBL_BASLIK,
		emptyText: 'Projenin başlığı',
		allowBlank: false,
		name: 'baslik'
	}, {
		xtype: 'textarea',
		fieldLabel: 'Açıklama',
		emptyText: 'Proje açıklamasını giriniz',
		allowBlank: false,
		name: 'aciklama'
	}, {
		xtype: 'textfield',
		fieldLabel : 'Kurum',
		emptyText: '',
		name: 'kurum'
	},{
		xtype: 'textfield',
		fieldLabel: 'Katılımcı Profili',
		emptyText: 'Müdür, şef, uzman vs.',
		allowBlank: false,
		name: 'katilimci_profili'
	},{
		xtype: 'fieldset',
		title: 'Dönemler',
		defaults: {
			layout: 'hbox',
			labelWidth: 150
		},
		items: [{
			xtype: 'fieldcontainer',
			fieldLabel: 'Hazırlık',
			items: [{
				xtype: 'egitimdate',
				name: 'hazirlik_bas_tarihi'
			}, {
				xtype: 'egitimdate',
				name: 'hazirlik_bit_tarihi'
			}]
		}, {
			xtype: 'fieldcontainer',
			fieldLabel: 'Uygulama',
			items: [{
				xtype: 'egitimdate',
				name: 'uygulama_bas_tarihi'
			}, {
				xtype: 'egitimdate',
				name: 'uygulama_bit_tarihi'
			}]
		}, {
			xtype: 'fieldcontainer',
			fieldLabel: 'Takip',
			items: [{
				xtype: 'egitimdate',
				name: 'takip_bas_tarihi'
			}, {
				xtype: 'egitimdate',
				name: 'takip_bit_tarihi'
			}]
		}, {
			xtype: 'fieldcontainer',
			fieldLabel: 'Sonuç ve Raporlama',
			items: [{
				xtype: 'egitimdate',
				name: 'sonuc_raporlama_bas_tarihi'
			}, {
				xtype: 'egitimdate',
				name: 'sonuc_raporlama_bit_tarihi'
			}]
		}, {
			xtype: 'button',
			text: 'Takvim',
			handler: function (but) {
				var formPanel = but.up('form'),
					form = formPanel.getForm();
				var eventData = formPanel.createEventData();
				
				new Ext.create('Ext.Window', {
					maximized: true,
					layout: 'fit',
					title: form.findField('kod').getValue(),
					items: [{
						xtype: 'calendarpanel',
						border: false,
	                    region: 'center',
	                    activeItem: 3, // month view
	                    monthViewCfg: {
	                        showHeader: true,
	                        showWeekLinks: true,
	                        showWeekNumbers: true
	                    },
				        calendarStore: Ext.create('Ext.calendar.data.MemoryCalendarStore', {
				            data: Ext.calendar.data.Calendars.getData()
				        }),
				        eventStore: Ext.create('Ext.calendar.data.MemoryEventStore', {
				            data: eventData
				        })
					}]
				}).show();
			}
		}]
	},{
		xtype: 'fieldset',
		title: 'Yer',
		defaults: {
			//width: '90%'
		},
		items: [{
			xtype: 'ilcombo',
			fieldLabel: 'İl',
			name: 'il'
		}, {
			xtype: 'textfield',
			fieldLabel: 'Otel Adı',
			name: 'otel'
		}]
	}, {
		xtype: 'hidden',
		name: 'id'
	}],
	
	createEventData: function () {
		var formPanel = this;
		var form = formPanel.getForm();
		var sonuc = {"evts": []};
		var h = formPanel.makeEventByTarih (
       		 form.findField('hazirlik_bas_tarihi'), 
    		 form.findField('hazirlik_bit_tarihi'), 
    		 1);
		if (h) {
			sonuc.evts.push(h);
		}
		var u = formPanel.makeEventByTarih (
       		 form.findField('uygulama_bas_tarihi'), 
    		 form.findField('uygulama_bit_tarihi'), 
    		 2);
		if (u) {
			sonuc.evts.push(u);
		}
		var t = formPanel.makeEventByTarih (
       		 form.findField('takip_bas_tarihi'), 
    		 form.findField('takip_bit_tarihi'), 
    		 3);
		if (t) {
			sonuc.evts.push(t);
		}
		var s = formPanel.makeEventByTarih (
       		 form.findField('sonuc_raporlama_bas_tarihi'), 
    		 form.findField('sonuc_raporlama_bit_tarihi'), 
    		 4);
		if (s) {
			sonuc.evts.push(s);
		}
		return sonuc;
		
	},
	
	/**
	 * Dönemlerdeki tarihlerden calendar'ın anlayacğı tipte nesne döner
	 */
	makeEventByTarih: function (dateFieldBas, dateFieldBit, cid){
		var basValue = dateFieldBas.getValue(),
			bitValue = dateFieldBit.getValue();
		if (basValue == null || bitValue == null) {
			return null;
		}
		var obj = {
            "id": dateFieldBas.getId(),
            "cid": cid,
            "title": dateFieldBas.up('fieldcontainer').getFieldLabel(),
            "start": basValue,
            "end": bitValue,
            "notes": "",
            "ad": true
        };
		return obj;
	}
});