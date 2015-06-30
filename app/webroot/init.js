Ext.override(Ext.grid.View, { enableTextSelection: true });
Ext.Ajax.on('requestexception', function (conn, response, options) {
    if (response.status === 403) {
        //window.location = 'kullanicis/login';
    	//Egitim.lib.Utility.warnMessage('Oturumunuz geçersiz. Tekrar giriş yapınız.');
    	Ext.widget('window', {
    		title: 'Giriş yapınız (Oturumunuz geçersiz!)',
    		layout: 'fit',
    		modal: true,
    		bodyPadding: 5,
    		border: false,
    		width: 300,
    		height: 200,
    		items: [{
    			xtype: 'form',
    			defaultType: 'textfield',
        		url: 'kullanicis/login?ajax=1',
    			items: [{
    				name: 'data[Kullanici][username]',
    				fieldLabel: 'Kullanıcı Adı',
    				value: YETKI.kullaniciAdi,
    				allowBlank: false
    			},{
    				inputType: 'password',
    				name: 'data[Kullanici][password]',
    				fieldLabel: 'Parola',
    				allowBlank: false
    			}],
    			bbar: ['->',{
    		        text: 'Tamam',
    				action: 'tamam',
    				iconCls: 'kaydet',
    		        formBind: true, //only enabled once the form is valid
    		        disabled: false,
    		        handler: function (but) {
    		        	var form = but.up('form').getForm();
    		        	if (form.isValid()) {
    		    			but.setDisabled(true);
    		    			form.submit({
    		    				success: function(form, action) {
    		    					but.up('window').close();
    		    				},
    		    				failure: function(form, action) {
    		    					but.setDisabled(false);
    		    					Egitim.lib.Utility.warnMessage(action.result.msg);
    		    				}
    		    			});
    		    		}
    		        }
    		    }]
    		}]
    	}).show();
    }
});

var PAGE_SIZE = 20;
var YETKI = YETKI || {dummy:true};

Ext.apply(YETKI, {
	isEgitimAuth: function () {
		return YETKI.isAdmin();
	},
	isEgitimIcerikAuth: function (){
		return YETKI.isAdmin() || YETKI.isEgitmen();	
	},
	isEgitimDokumanAuth: function (){
		return YETKI.isAdmin() || YETKI.isEgitmen() || YETKI.isAsistan();	
	},
	
	/**
	 * İndirilebilir olup olmamasının hangi kullanıcı tipleri için bakılacağı
	 */
	isEgitimDokumanIndirilebilirAuth: function (){
		return YETKI.isAdmin() || YETKI.isEgitmen();	
	},
	
	/**
	 * proje silme güncelleme işlemleri
	 * @returns
	 */
	isProjeAuth: function () {
		return YETKI.isAdmin();
	},
	
	/**
	 * Event yaratılabilir mi?
	 */
	isProjeGrupEventAuth: function () {
		return YETKI.isAdmin();
	},
	
	/**
	 * Grup yaratma, katılımcı işlemleri
	 */
	isProjeKatilimciAuth: function (){
		return YETKI.isAdmin();
	},
	
	/**
	 * Toplantı tutanağı işlemleri yetkisi
	 * @returns
	 */
	isTTAuth: function(){
		return YETKI.isAdmin();		
	},
	
	/**
	 * Günlük rapor işlemleri yetkisi
	 * @returns
	 */
	isGRAuth: function(){
		return YETKI.isAdmin() || YETKI.isEgitmen() || YETKI.isAsistan();
	}
});	

function parolaDegistir () {
	Ext.create('Ext.window.Window', {
		title: 'Parola Değiştir',
		width: 400,
		iconCls: 'parola',
		modal: true,
		layout: 'fit',
		items: [{
			xtype: 'paroladegistirform',
			title: ''
		}]
	}).show();
}

