Ext.define('Egitim.view.proje.GrupProgramEventForm', {
	extend: 'Egitim.lib.FormPanel',
	alias: 'widget.grupprogrameventform',
	requires: [
	           'Egitim.view.tanimlar.DateRange',
	           'Ext.calendar.form.field.ReminderCombo',
	           'Ext.calendar.data.EventMappings',
	           'Egitim.view.tanimlar.CalendarCombo',
	           'Egitim.store.Egitmen',
	           'Egitim.lib.Date'
	],
	fieldDefaults: {
        msgTarget: 'side',
        labelWidth: 100
    },
    allowScroll: true,

    // The form will submit an AJAX request to this URL when submitted
    url: 'projes/saveGrupProgramEvent',
    
	initComponent: function (){
		var me = this;
        this.addEvents({
            /**
             * @event eventadd
             * Fires after a new event is added
             * @param {Ext.calendar.form.EventDetails} this
             * @param {Ext.calendar.EventRecord} rec The new {@link Ext.calendar.EventRecord record} that was added
             */
            eventadd: true,
            /**
             * @event eventupdate
             * Fires after an existing event is updated
             * @param {Ext.calendar.form.EventDetails} this
             * @param {Ext.calendar.EventRecord} rec The new {@link Ext.calendar.EventRecord record} that was updated
             */
            eventupdate: true,
            /**
             * @event eventdelete
             * Fires after an event is deleted
             * @param {Ext.calendar.form.EventDetails} this
             * @param {Ext.calendar.EventRecord} rec The new {@link Ext.calendar.EventRecord record} that was deleted
             */
            eventdelete: true,
            /**
             * @event eventcancel
             * Fires after an event add/edit operation is canceled by the user and no store update took place
             * @param {Ext.calendar.form.EventDetails} this
             * @param {Ext.calendar.EventRecord} rec The new {@link Ext.calendar.EventRecord record} that was canceled
             */
            eventcancel: true
        });
		
		var egitimStore = Ext.create('Egitim.store.ProjeEgitimStore', {
			projeId: this.projeId,
			autoLoad: true
		});
		
		var egitimEgitmenStore = Ext.create('Egitim.store.EgitimEgitmenStore', {
			listeners: {
				beforeload: function (store){
					store.proxy.proxyConfig.extraParams.egitimId = me.getForm().findField('egitim_id').getValue();
				}
			}
		});
		
		me.on('temizlendi', function (form) {
			form.getForm().findField('egitmen_id').getStore().load();
		});

		this.items = [{
			xtype: 'displayfield',
			fieldLabel: 'Grup',
			value: this.grup
		}, {
			xtype: 'fieldcontainer',
			fieldLabel: 'Eğitim/Etkinlik',
			layout: 'hbox',
			items: [{
				xtype: 'combo',
				store: egitimStore,
				inputWidth: 200,
			    editable: false,
				name: 'egitim_id',
				queryMode: 'local',
				displayField: 'baslik',
				valueField: 'id',
				listeners: {
					select: function (combo, recs){
						var formPanel = combo.up('form');
						if (recs.length > 0) {
							var rec = recs[0],
								egitmenCombo = formPanel.getForm().findField('egitmen_id'),
								store = egitmenCombo.getStore();
							
							store.removeAll();
							egitmenCombo.setValue(null);
							store.load({
								params: {
									egitimId: rec.get('id')
								}
							});
							formPanel.getForm().findField('etkinlik_adi').setValue(combo.getRawValue());
						}
					}
				}
			}, {
				xtype: 'textfield',
				name: 'etkinlik_adi',
				allowBlank: false
			}]
		}, {
			xtype: 'fieldcontainer',
			fieldLabel: 'Ne zaman',
			layout: 'vbox',
			items: [{
				xtype: 'fieldcontainer',
				layout: 'hbox',
				defaults: {allowBlank: false},
				items: [{
					xtype: 'egitimdate',
					name: 'bas_tarihi'
				}, {
					xtype: 'timefield',
					format: 'H:i',
					name: 'bas_saati'
				}]
			}, {
				xtype: 'fieldcontainer',
				layout: 'hbox',
				defaults: {allowBlank: false},
				items: [{
					xtype: 'egitimdate',
					name: 'bit_tarihi'
				}, {
					xtype: 'timefield',
					format: 'H:i',
					name: 'bit_saati'
				}]
			}]
		}, {
			xtype: 'calendarpicker',
			name: 'renk',
			inputWidth: 200,
		    editable: false,
			fieldLabel: 'Renk',
			store: Ext.create('Ext.calendar.data.MemoryCalendarStore', {
	            data: Ext.calendar.data.Calendars.getData()
	        })
		}, {
			xtype: 'combo',
			name: 'egitmen_id',
			itemId: 'egitmenid',
			inputWidth: 200,
			valueField: 'id',
			displayField: 'adSoyad',
			allowBlank: false,			
		    editable: false,
			store: egitimEgitmenStore,
			queryMode: !Ext.isEmpty(me.egitmenComboQueryMode) ? me.egitmenComboQueryMode: 'local',
			fieldLabel:'Eğitmen'
		}, {
			xtype: 'hidden',
			name: 'id'
		}, {
			xtype: 'hidden',
			name: 'proje_id',
			value: this.projeId
		}, {
			xtype: 'hidden',
			name: 'grup',
			value: this.grup
		}];
		me.callParent();
	}
});