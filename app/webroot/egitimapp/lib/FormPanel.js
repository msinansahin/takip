Ext.define('Egitim.lib.FormPanel', {
	extend: 'Ext.form.Panel',
    bodyPadding: 5,
    layout: 'anchor',
    alias: 'widget.libform',
    requires: ['Egitim.lib.LabelRequired'],
    plugins : [{ptype:"formlabelrequired"}],
    defaults: {
        anchor: '100%'
    },

    // The fields
    defaultType: 'textfield',
    kapatGoster: true,
    
	initComponent: function () {
		var me = this;
	
		var readonly = this.readonly || false;
		me.on('beforeaction', function (form){
			form.owner.getMessageLabel().removeCls ('islem-hatali');
			form.owner.getMessageLabel().removeCls ('islem-basarili');
			form.owner.getMessageLabel().addCls ('isleniyor');
			form.owner.getMessageLabel().setText ('İşlem yapılıyor...');
		});
		me.on('actioncomplete', function (form, response, c){
			var msg = response.result.msg;
			form.owner.getMessageLabel().removeCls ('islem-hatali');
			form.owner.getMessageLabel().removeCls ('isleniyor');
			form.owner.getMessageLabel().addCls ('islem-basarili');
			if (!Ext.isEmpty(msg)) {
				form.owner.getMessageLabel().setText (msg);
			}
			else 
				form.owner.getMessageLabel().setText ('');
		});
		me.on('actionfailed', function (form, response, c){
			//debugger;
			var msg = 'Hata';
			if (response.result) {
				if (response.result.msg) {
					msg = response.result.msg;					
				} else if (response.response){
					msg = response.response.responseText;
				}
			} else {
				msg = response.response.responseText;
			}
			form.owner.getMessageLabel().addCls ('islem-hatali');
			form.owner.getMessageLabel().setText ('Hatalı: ' + msg);
			Egitim.lib.Utility.errorMessage(msg);
		});
		
		// Reset and Submit buttons
	    var bbar = [{
			xtype: 'label',
			itemId: 'message',
			hidden: false,
			text: ''
		}, '->', {
	        text: 'Temizle',
	        iconCls: 'temizle',
	        //hidden: readonly,
	        
	        hidden: true,
	        handler: function() {
				var form = this.up('form');
	            form.temizle();
	        }
	    }, {
			text: 'Kapat',
			iconCls: 'kapat',
			hidden: !me.kapatGoster,
			handler: function (){
				var panel = this.up('window');
				panel =  panel || this.up('panel');
				if (panel && panel.close) {
					panel.close();					
				}
			}
		}, {
	        text: 'Tamam',
			action: 'tamam',
			iconCls: 'kaydet',
			hidden: readonly,
	        //formBind: true, //only enabled once the form is valid
	        disabled: false
	    }];
	    this.bbar = bbar;
		me.addEvents('temizlendi');
		me.callParent();
	},
	
	isGuncelleme: function () {
		return !Ext.isEmpty(this.getForm().findField('id').getValue());
	},
	
	temizle: function (arr) {
		arr = arr || [];
		arr[arr.length] = 'id';
		var fieldArr = [];
		for (var i = 0; i < arr.length; i++) {
			var field = this.getForm().findField(arr[i]);
			fieldArr[i] = {
				name: arr[i],
				field: field,
				value: (field && field.getValue) ? field.getValue() : null
			};
		}
		this.getForm().reset();
		this.fireEvent('temizlendi', this);
		this.getMessageLabel().setText ('');
		
		for (var i = 0; i < fieldArr.length; i++) {
			var field = fieldArr[i].field;
			if (field && field.setValue && field.getValue) {
				field.setValue(fieldArr[i].value);
			}
		}
	},
	
	getMessageLabel: function (){
		return this.down('#message');
	},
	
	showMessage: function (status, msg) {
		//gecersiz
	}
});