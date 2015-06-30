Ext.define('Egitim.lib.Utility', {
	extend: 'Ext.Base',
	statics: {
        infoMessage: function(msg, fn) {
        	fn = fn || Ext.emptyFn
            Ext.MessageBox.show({
				title: 'Bilgi',
				msg: msg,
				buttons: Ext.MessageBox.OK,
				//animateTarget: 'mb9',
				fn: fn,
				icon: 'x-message-box-info'
			});
        },
        warnMessage: function(msg) {
            Ext.MessageBox.show({
				title: 'Uyarı',
				msg: msg,
				buttons: Ext.MessageBox.OK,
				//animateTarget: 'mb9',
				fn: Ext.emptyFn,
				icon: 'x-message-box-warning'
			});
        },
		errorMessage: function(msg) {
            Ext.MessageBox.show({
				title: 'Hata',
				msg: msg,
				buttons: Ext.MessageBox.OK,
				//animateTarget: 'mb9',
				fn: Ext.emptyFn,
				icon: 'x-message-box-error'
			});
        },
		waitMessage: function (msg){
			return Ext.MessageBox.show({
				msg: 'Bekleyiniz',
				progressText: Ext.isEmpty(msg) ? 'İşleminiz gerçekleştiriliyor...' : msg,
				width:300,
				wait:true,
				waitConfig: {interval:200}
				//icon:'ext-mb-download', //custom class in msg-box.html
				//iconHeight: 50,
				//animateTarget: 'mb7'
			}); 
		},
		
		/**
		 * Tarihe h, m ve s eklenir
		 * saat: 11:23 gibi bir değer
		 */
		makeDate: function(date, saat/*d, h, m, s*/) {
            //d = d * 86400;
			var ss = saat.split(':');
			var h = ss[0],
				m = ss[1],
				s = 0;
			d = 0;
            h = (h || 0) * 3600;
            m = (m || 0) * 60;
            s = (s || 0);
            return Ext.Date.add(Ext.Date.clearTime(date), Ext.Date.SECOND, d + h + m + s);
		},
		ajaxRequest: function (obj) {
			var successFn = obj.successFn || Ext.emptyFn;
			
			Egitim.lib.Utility.waitMessage();
			Ext.Ajax.request(Ext.apply({
				timeout: 120000,
				success: function(response){
					Ext.MessageBox.hide();
					var msg = Ext.JSON.decode(response.responseText).msg;
					Egitim.lib.Utility.infoMessage(msg);
					successFn.apply(msg);
				},
				failure: function (response){
					Ext.MessageBox.hide();
					var msg = 'Hata';
					if (response.result) {
						msg = response.result.msg;
					} else {
						msg = response.responseText;
					}
					Egitim.lib.Utility.errorMessage(msg);
				}
			}, obj));
		},
		/**
		 * text, fn
		 */
		confirm: function (obj) {
			obj = Ext.applyIf(obj, {
				text: '',
				fn: Ext.emptyFn
			});
			Ext.Msg.confirm('Onay', obj.text + ' Silinecek. Onaylıyor musunuz?', function(button) {
			    if (button === 'yes') {
					obj.apply();
			    }
			});			
		},
		
		rendererTarih: function (v){
			try {
				if (v) {
					if (v.length > 10) {
						return Ext.Date.format(Ext.Date.parse(v, "Y-m-d H:i:s"), 'd-m-Y H:i:s');						
					} else {
						return Ext.Date.format(Ext.Date.parse(v, "Y-m-d"), 'd-m-Y');							
					}
				}
			} catch (e) {
				
			}
			return v;
		},
		
		/**
		 * {
		 * 	xtype: ...list string
		 *  event: ... string
		 * } 
		 * @param obj
		 * @returns
		 */
		createActionColumnGor: function(obj) {
			return Ext.apply(obj, {
                icon: 'egitimapp/resources/icons/gor.png',
                tooltip: 'Gör',
                handler: function(grid, rowIndex, colIndex) {
                    var rec = grid.getStore().getAt(rowIndex);
                    grid.up(obj.xtype).fireEvent(obj.event, grid, rec);
                }		              
            });
		},
		
		ttDokumanGor: function (ttId) {
			document.getElementById('downloadFrame').src = 'admins/downloadTTDokuman/' + ttId;
		},
		grDokumanGor: function (grId) {
			document.getElementById('downloadFrame').src = 'admins/downloadGRDokuman/' + grId;
		}
	}
});