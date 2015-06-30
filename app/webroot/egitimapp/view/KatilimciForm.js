Ext.define('Egitim.view.KatilimciForm', {
	extend: 'Egitim.lib.FormPanel',
    title: 'Katılımcı Bilgileri',
	alias: 'widget.katilimciform',
	uses: ['Egitim.view.tanimlar.IlCombo', 'Egitim.view.tanimlar.IlceCombo'],
    // The form will submit an AJAX request to this URL when submitted
    requires: ['Egitim.view.tanimlar.ParolaDegistirForm'],
	url: 'kayit/create',
    autoScroll: true,
	katilimciId: '',
	yeni: false,
	iconCls: 'profil',
	parolaDegistirGoster: true,
	
	setYeni: function () {
		this.temizle();
		this.getForm().url = 'kayit/create';
	},
	
	setGuncelleme: function () {
		this.url = 'katilimcis/save';
		this.getForm().url = 'katilimcis/save';
	},
	
	initComponent: function () {
		
		if (!this.yeni) {
			this.on('afterrender', function (form){
				form.load({
					url: 'katilimcis/load',
					success: function (f, action){
						//aynısı projectrl'de var, //TODO ortak bir yere koy
						var ilCombo = f.findField('il');
						var r = ilCombo.getStore().findRecord('key', action.result.data.il);
						if (r) {
							ilCombo.ilce = action.result.data.ilce;
							ilCombo.fireEvent('select', ilCombo, [r]);									
						}
					}
				});
			});
			this.url = 'katilimcis/save'; //captcha istemiyor
		}

		this.items = [{
	        xtype:'fieldset',
	        columnWidth: 0.5,
	        title: '',
	        border: false,
	        collapsible: false,
	        defaults: {anchor: '100%'},
	        layout: 'column',
	        items :[{
	        	columnWidth: 0.5,
	        	xtype: 'container',
	        	layout: 'form',
		        defaultType: 'textfield',
	        	items: [{
	        		fieldLabel: 'Ad',
	        		name: 'ad',
	        		emptyText: 'Adı giriniz',
	        		allowBlank: false
	        	},{
	        		fieldLabel: 'Soyad',
	        		name: 'soyad',
	        		emptyText: 'Soyadı giriniz',
	        		allowBlank: false
	        	},{
	        		xtype: 'egitimdate',
	        		name : 'dogumTarihi',
	        		fieldLabel: 'D.Tarihi',
	        		emptyText: 'Doğum Tarihini giriniz',
	        		allowBlank: true
	        	}]
	        }, {
	        	columnWidth: 0.5,
	        	xtype: 'container',
	        	layout: 'form',
	        	padding: '0 0 0 10',
	        	items: [{
	        		xtype: 'textfield',
	        		fieldLabel: 'Tel',
	        		name: 'tel',
	        		emptyText: 'Telefon giriniz',
	        		allowBlank: true
	        		
	        	},{
	        		xtype: 'textfield',
	        		name: 'mobil',
	        		fieldLabel: 'Mobil'
	        	},{
	        		xtype: 'textfield',
	        		name: 'eposta',
	        		emptyText: 'E-posta giriniz',
	        		fieldLabel: 'E-Posta',
	        		vtype: 'email',
	        		disabled: !this.yeni,
	        		allowBlank: false,
	        		validateOnChange: false,
	        		listeners: {
	        			blur: function ( comp, e, eOpts ) {
	        				var value = comp.getValue();
	        				if(Ext.form.field.VTypes.email(value)) {
		        				Ext.Ajax.request({
		        					url: 'kayit/is__is',
		        					method: 'POST',
		        					params: {
		        						v: value
		        					},
		        					success: function(response){
		        						var json = Ext.JSON.decode(response.responseText);
		        						if (!json.success) {
		        							comp.markInvalid(json.msg);
		        						}
		        					},
		        					failure: function (response){
		        						comp.markInvalid('Hatalı istek');
		        					}
		        				});
		        			}
	        			}
	        		},
	        		validatorx: function (value){
	        			if(Ext.form.field.VTypes.email(value)) {
	        				debugger;
	        				Ext.Ajax.request({
	        					url: 'xxx',
	        					success: function(response){
	        						
	        					},
	        					failure: function (response){
	        						
	        					}
	        				});
	        			}
	        			return true;
	        		}
	        	}]
	        }]
	    },{
	        xtype:'fieldset',
	        columnWidth: 0.5,
	        title: 'Adres',
	        collapsible: false,
	        defaultType: 'textfield',
	        defaults: {anchor: '100%'},
	        layout: 'column',
	        items :[{
	        	columnWidth: 0.5,
	        	xtype: 'container',
	        	layout: 'form',
	        	items: [{
	        		xtype: 'textfield',
	        		fieldLabel: 'Sokak',
	        		name: 'sokak'
	        	},{
	        		xtype: 'textfield',
	        		fieldLabel: 'Cadde',
	        		name: 'cadde'
	        	},{
	        		xtype: 'textfield',
	        		fieldLabel: 'Posta Kodu',
	        		name: 'posta_kodu'
	        	},{
	        		xtype: 'textfield',
	        		fieldLabel: 'Diğer',
	        		name: 'adres'
	        	}]
	        }, {
	        	columnWidth: 0.5,
	        	xtype: 'container',
	        	layout: 'form',
	        	padding: '0 0 0 10',
	        	items: [{
	        		xtype: 'textfield',
	        		fieldLabel: 'Ülke',
	        		name: 'ulke',
	        		value: 'Türkiye',
	        		disabled: true
	        	},{
	        		xtype: 'ilcombo',
	        		name: 'il',
	        		allowBlank: true,
	        		listeners: {
	        			select: function ( combo, records, eOpts ){
	        				debugger;
	        				var secilen = records.length > 0 ?records[0] : null;
	        				var ilce = combo.ilce;
	        				combo.ilce = null;
	        				var ilceCombo = combo.up('form').getForm().findField ('ilce');
	        				if (secilen) {
	        					ilceCombo.setValue(null);
	        					//ilceCombo.getEl().mask('Yükleniyor...');
	        					ilceCombo.getStore().load({
	        						params: {
	        							il: secilen.get('key')
	        						},
	        						callback: function (){
	        							ilceCombo.getEl().unmask();	
	        							if (ilce) {
	        								ilceCombo.setValue(ilce);
	        							}
	        						}
	        					});
	        				} else {
	        					ilceCombo.getStore().removeAll();
	        				}
	        			}
	        		}
	        	},{
	        		xtype: 'ilcecombo',
	        		disabled: false,
	        		allowBlank: true,
	        		name: 'ilce'
	        	},{
	        		xtype: 'textfield',
	        		fieldLabel: 'Mahalle',
	        		name: 'mahalle'
	        	}]
	        }]
    }, {
        xtype:'fieldset',
        columnWidth: 0.5,
        title: 'Kurumsal',
        collapsible: false,
        defaultType: 'textfield',
        defaults: {anchor: '100%'},
        layout: 'column',
        items :[{
        	columnWidth: 0.5,
        	xtype: 'container',
        	layout: 'form',
        	items: [{
        		xtype: 'textfield',
        		fieldLabel: 'Kurum',
        		//readOnly: true,
        		name: 'kurum',
        		value: YETKI.proje ? YETKI.proje.kurum : ''
        	}, {
        		xtype: 'fieldcontainer',
        		layout: 'hbox',
//			fieldLabel: 'Görev',
        		items: [{
        			xtype: 'gorevcombo',
	        		name: 'gorev',
	        		listeners: {
	        			select: function( combo, records, eOpts ) {
	        				if (records.length == 1) {
	        					var rec = records[0];
	        					var key = rec.get('key');
	        					var compDiger =  combo.up('fieldcontainer').down('#diger_gorev');
	        					compDiger.setVisible(key === 'D');
	        					compDiger.setValue(null);
	        				}
	        			}
	        		}
        		}, {
        			xtype: 'textfield',
        			name: 'diger_gorev',
        			hidden: true,
	        		emptyText: 'Görev giriniz',        			
        			itemId: 'diger_gorev'
        		}]
        	}
        	
        	]
        }, {
        	columnWidth: 0.5,
        	xtype: 'container',
        	layout: 'form',
        	padding: '0 0 0 10',
        	items: [{
        		xtype: 'textfield',
        		fieldLabel: 'İl',
        		name: 'kurum_il'
        	},{
        		xtype: 'textfield',
        		fieldLabel: 'İlçe',
        		name: 'kurum_ilce'
        	}]
        }]
    },{
	        xtype:'fieldset',
	        columnWidth: 1,
	        title: 'Konaklama ve Transfer',
	        collapsible: false,
	        defaultType: 'textfield',
	        defaults: {anchor: '100%'},
	        layout: 'column',
	        items :[{
	        	columnWidth: 0.5,
	        	xtype: 'container',
	        	layout: 'form',
	        	items: [{
	                xtype      : 'fieldcontainer',
	                fieldLabel : 'Konaklama',
	                defaultType: 'radiofield',
	                defaults: {
	                    flex: 1
	                },
	                layout: 'hbox',
	                items: [
	                    {
	                        boxLabel  : 'Evet',
	                        name      : 'konaklama',
	                        inputValue: 'e'
	                    }, {
	                        boxLabel  : 'Hayır',
	                        name      : 'konaklama',
	                        inputValue: 'h'
	                    }
	                ]
	            },{
	                xtype      : 'fieldcontainer',
	                fieldLabel : 'Oda',
	                defaultType: 'radiofield',
	                defaults: {
	                    flex: 1
	                },
	                layout: 'hbox',
	                items: [
	                    {
	                        boxLabel  : 'Tek Kişilik',
	                        name      : 'oda',
	                        inputValue: 't'
	                    }, {
	                        boxLabel  : 'Çift Kişilik',
	                        name      : 'oda',
	                        inputValue: 'c'
	                    }
	                ]
	        	},{
	                xtype      : 'fieldcontainer',
	                fieldLabel : 'Refakatçi',
	                defaultType: 'radiofield',
	                defaults: {
	                    flex: 1
	                },
	                layout: 'hbox',
	                items: [
	                    {
	                        boxLabel  : 'Yok',
	                        name      : 'refakatci',
	                        inputValue: 'y'
	                    }, {
	                        boxLabel  : 'Var',
	                        name      : 'refakatci',
	                        inputValue: 'v'
	                    }
	                ]
	        	}, {
	        		xtype      : 'fieldcontainer',
	                fieldLabel : 'Transfer',
	                defaultType: 'radiofield',
	                defaults: {
	                    flex: 1
	                },
	                layout: 'hbox',
	                items: [
	                    {
	                        boxLabel  : 'Evet',
	                        name      : 'transfer',
	                        inputValue: 'e'
	                    }, {
	                        boxLabel  : 'Hayır',
	                        name      : 'transfer',
	                        inputValue: 'h'
	                    }
	                ]
	        	}, {
	        		xtype      : 'fieldcontainer',
	                fieldLabel : 'Nereden',
	                defaultType: 'radiofield',
	                defaults: {
	                    flex: 1
	                },
	                layout: 'hbox',
	                items: [
	                    {
	                        boxLabel  : 'Havaalanı',
	                        name      : 'nereden',
	                        inputValue: 'h'
	                    }, {
	                        boxLabel  : 'Otogar',
	                        name      : 'nereden',
	                        inputValue: 'o'
	                    }, {
	                        boxLabel  : 'Diğer',
	                        name      : 'nereden',
	                        inputValue: 'd',
	                        listeners: {
	                        	change: function( rb, newValue, oldValue, eOpts ) {
	                        		rb.up('form').form.findField('nereden_diger').setVisible(newValue);
	                        	}
	                        }
	                    }, {
	                        xtype  	  : 'textfield',
	                        name      : 'nereden_diger',
	                        hidden	  : true,
	                        emptyText : 'Diğer ulaşım şeklini giriniz'
	                    }
	                ]
	        	}, {
	        		xtype      : 'fieldcontainer',
	                fieldLabel : 'Kaç Kişi',
	                defaultType: 'checkbox',
	                defaults: {
	                    flex: 1
	                },
	                layout: 'vbox',
	                items: [
	                    {
	                    	xtype: 'fieldcontainer',
	                    	defaultType: 'checkbox',
	                        defaults: {
	                            flex: 1
	                        },
	                        layout: 'hbox',
	                    	items: [{
	                            boxLabel  : 'Erişkin',
	                            name      : 'kac_kisi_eriskin',
	                            inputValue: 'h'
	                    	}, {
	                    		xtype: 'numberfield',
	                    		padding: '0 0 0 5',
	                    		name: 'kac_kisi_eriskin_sayi'
	                    	}]                    	
	                    }, {
	                    	xtype: 'fieldcontainer',
	                    	defaultType: 'checkbox',
	                        defaults: {
	                            flex: 1
	                        },
	                        layout: 'hbox',
	                    	items: [{
	                            boxLabel  : 'Çocuk',
	                            name      : 'kac_kisi_cocuk',
	                            inputValue: 'c'
	                    	}, {
	                    		xtype: 'numberfield',
	                    		padding: '0 0 0 5',
	                    		name: 'kac_kisi_cocuk_sayi'
	                    	}]   
	                    }
	                ]
	        	}]
	        }]
	    },
	    {
	    	xtype: 'fieldcontainer',
	    	layout: 'hbox',
	    	hidden: true,//!this.yeni,
	    	align: 'center',
	    	items: [{
	        	xtype: 'label',
	        	width: 150,
	        	html: '<div><img id="cap-id" src="kayit/captcha?' + Math.random() + '" /></div>'
	    	}, {
	    		xtype: 'button',
	    		height: 50,
	    		iconCls: 'yenile',
	    		tooltip: 'Resmi yenile',
	    		handler: function (){
	    			document.getElementById('cap-id').src = 'kayit/captcha?' + Math.random();
	    		}
	    	}, {
	    		xtype: 'textfield',
	    		height: 50,
	    		name: 'captcha',
	    		//allowBlank: !this.yeni,
	    		emptyText: 'Resimdeki yazı'
	    	}]
	    },{
	        xtype: 'displayfield',
	        fieldLabel: 'Grup',
	        name: 'grup'
	    },{
	        name: 'grup',
			xtype: 'hidden'
	    },{
	        name: 'id',
			xtype: 'hidden'
	    },{
	        name: 'proje_id',
			xtype: 'hidden'
	    }];
		
		
		if (this.parolaDegistirGoster && !this.yeni) {
			Ext.Array.insert(this.items, 0, [{xtype:'label', html: '<hr>'}]);
			Ext.Array.insert(this.items, 0, [{
				fieldLabel: 'Parola Değiştir',
			    xtype: 'box',
		        cls: 'parola',
			    autoEl: {
			        tag: 'a',
			        href: '#',
			        onclick: "parolaDegistir();",
			        html: 'Parola Değiştir'
			    }
			}]);
		}
		this.callParent(arguments);
	}
	
});