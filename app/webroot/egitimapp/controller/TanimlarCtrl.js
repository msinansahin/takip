Ext.define('Egitim.controller.TanimlarCtrl', {
	extend: 'Ext.app.Controller',
	views: ['tanimlar.EgitimKategoriTree'],
	stores: [],
	models: [],
	refs: [{
		ref: 'egitimKategoriTree',
		selector: 'egitimkategoritree'
	}],
	init: function() {

		this.control({
			'egitimkategoritree button[action=ekle]': {
				click: this.onKategoriEkle
			},
			'egitimkategoritree': {
				nodeedittamamlandi: this.onEgitimKategoriNodeEdit,
				silegitimkategori: this.onSilEgitimKategori
			}
		});
		
	},
	
	onSilEgitimKategori: function (tree, record) {
		var text = record.get('text');
		
		Ext.Msg.confirm('Onay', text + ' Silinecek. Onaylıyor musunuz?', function(button) {
		    if (button === 'yes') {
				var egitimId = record.get('id');
				var me = this;
				Egitim.lib.Utility.waitMessage();
				Ext.Ajax.request({
					url: 'tanimlars/deleteEgitimKategori/' + egitimId,
					success: function(response){
						Ext.MessageBox.hide();
						var msg = Ext.JSON.decode(response.responseText).msg;
						Egitim.lib.Utility.infoMessage(msg);
						record.remove(true);
					},
					failure: function (response){
						alert(response);
					}
				});
		    }
		});
	},
	
	onEgitimKategoriNodeEdit: function (node, grid){
		//debugger;
		if (!node.record.isModified('text')) {
			return;
		}
		var parentId = node.record.parentNode.get('id'),
			ad = node.value,
			id = node.record.get('id'),
			yeniKayit = Ext.isEmpty(id); //guncelleme olup olmayaca�� �nemli!
		Egitim.lib.Utility.waitMessage();
		Ext.Ajax.request({
			url: 'tanimlars/saveEgitimKategori',
			method: 'POST',
			params: {
				parent_id: 'Root' == parentId ? null : parentId,
				ad: ad,
				id: Ext.isEmpty(id) ? null : id
			},
			success: function(response){
				Ext.MessageBox.hide();
				var respJson = Ext.JSON.decode(response.responseText),
					msg = respJson.msg,
					newId = respJson.newId;
				
				Egitim.lib.Utility.infoMessage(msg);
				if (yeniKayit) {
					node.record.set('id', newId);					
				}
			},
			failure: function (response){
				alert(response);
			}
		});		
		
	},

	onKategoriEkle: function (){
		var tree = this.getEgitimKategoriTree();
		var sm = tree.getSelectionModel();
		var m = sm.getSelection();
		if (m.length == 1 && !m[0].get('leaf')) {
			var recId = m[0].get('id');
			m[0].appendChild({
				text: 'Yeni',
				leaf: recId !== 'Root'
			});
		}
	}

});