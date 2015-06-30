/**
 * @author sinans
 */
Ext.application({
	autoCreateViewport : false,
	appFolder: 'egitimapp',
    name: 'Egitim',
	models: ['Katilimci'],
	requires: ['Egitim.lib.Utility', 'Egitim.lib.Date'],
	controllers: ['KatilimciCtrl'],
    launch: function() {
    	
    	var onForm = Ext.widget('form', {
    		title: 'Katılım',
    		itemId: 'mevcutkullaniciformu',
    	    bodyPadding: 5,
    	    layout: 'anchor',
        	region: 'center',
        	style: 'width: 700',
        	url: 'kayit/mevcutKatilimciProjeEkle',
        	defaults: {
        		width: 300,
        		allowBlank: false
        	},
    		items: [{
    			xtype: 'label',
    			html: "<b>Eğitim Takip Sistemi'ne önceden kaydınız varsa proje kaydınızı için kullanıcı adı ve parolanızı girerek yapabilirsiniz.<br>" +
    				"Eğer kaydınız yoksa Yeni ile kaydınızı yapabilirsiniz.</b><br><br>"
    		}, {
    			xtype: 'textfield',
    			fieldLabel: 'Kullanıcı Adı',
    			name: 'kullaniciAdi'
    		}, {
    			xtype: 'textfield',
    			name: 'parola',
    			fieldLabel: 'Parola',
    			inputType: 'password'
    		}, {
    			xtype: 'hidden',
    			name: 'proje_id',
    			value: YETKI.pid
    		},{
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
    	    	xtype: 'container',
    	    	style: {
    	            padding: '10px'
    	        },
    	    	defaults: {
	    	        
	    	    },
    	    	items: [ {
        	    	xtype: 'button',
        	    	text: 'Yeni',
        	    	action: 'yeni'
        	    }, {
        	    	xtype: 'button',
        	    	text: 'Tamam',
        	    	action: 'tamam'
        	    }]
    	    }]
    	});
    	
    	var katForm = Ext.widget('katilimciform', {
        	region: 'center',
        	style: 'width: 700',
    	    id: 'kat-form',
        	autoHeight: true,
        	yeni: true,
        	parolaDegistirGoster: false,
        	kapatGoster: false,
        	hidden: true,
        	//height: 350,
        	border: false
        });
    	katForm.getForm().findField('grup').setVisible(false);
    	katForm.getForm().findField('proje_id').setValue(YETKI.pid);
    	//katForm.render('kat-form-id');
        Ext.create('Ext.container.Viewport', {
            //layout: 'fit',
            padding: '10 50 0 50', //(top, right, bottom, left
            layout: 'border',
            bodyPadding: '30',
            style: 'background: #FFFFFF',
            border: false,
            defaults: {
            	border: false
            },
            items: [
                {
                	region: 'north',
                	//layout: '',
                	items: [{
                		//region: 'north',
                		height: 50,
                		layout: 'hbox',
                		border: false,
                		defaults: {
                			height: 50,
                			border: false
                		},
                		items: [{
                			xtype: 'box',
                			width: 100,
                			cls: 'banner'
                		},{
                			xtype:'box',
                			flex: 1,
                			cls: 'banner-yazi',
                			html: '<div style="vertical-align: middle; line-height: 50px; height:50px;"><a href="kullanicis/login">Eğitim Takip Sistemi</a></div>'
                		}]
                	},{xtype: 'label', html: '<br>'},{
                    	xtype: 'panel',
                    	title: 'Proje Bilgileri',
                    	collapsible: true,
                    	border: false,
                    	iconCls: 'proje',
                    	tpl: new Ext.XTemplate(
                		    '<table>',
                		    '<tr>',
                		    '<td>Başlık: </td>',
                		    '<td  class="big-menu-text"><b>{baslik}</b></td>',
            		    	'</td>',
            		    	'</tr>',
            		    	'<tr>',
                		    '<td>Kurum: </td>',
                		    '<td  class="big-menu-text"><b>{kurum}</b></td>',
            		    	'</td>',
                		    '</tr>',
                		    '</table>',
                		    '<br>'
                		),
                		data: YETKI.proje
                    }]
                },    
                onForm,
                katForm
            ]
        });
    },
	
	init: function (application){
		
		Ext.Loader.setConfig({
			enabled: true,
			paths: {
				'Egitim': 'lib'
				//'Ext.calendar' : 'abc'
			}
		});
		Ext.Loader.setPath('Ext.chooser', 'extjs/view/chooser');
		
		Ext.QuickTips.init();
        Ext.state.Manager.setProvider(Ext.create('Ext.state.CookieProvider'));
       
	}
	
});