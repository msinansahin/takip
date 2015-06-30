Ext.define('Egitim.view.admin.AnketSoruTanimForm', {
	extend: 'Egitim.lib.FormPanel',
    title: 'Soru Tanımı',
	alias: 'widget.anketsorutanimform',
	requires: [],

    // The form will submit an AJAX request to this URL when submitted
    url: 'admins/saveAnketSoruTanim',
    autoScroll: true,
	
    initComponent: function () {
    	this.items = [{
			xtype: 'textarea',
			name: 'soru_metin',
			fieldLabel: 'Soru Metni',
			allowBlank: false
		}, {
			xtype: 'textfield',
			name: 'soru_alt_bilgi',
			fieldLabel: 'Soru Alt Bilgi',
			emptyText: 'Soruların derecesi en iyi 5 en kötü 1 gibi açıklama girilebilir'
		}, {
			xtype: 'fieldcontainer',
			title: 'Soru Tipi',
			layout: 'hbox',
			items:[{
				xtype: 'anketsorutipicombo',
				name: 'soru_tipi',
				allowBlank: false,
				listeners: {
					select: function (combo, selected){
						var sel = selected[0];
						combo.up('form').down('#secenekler').setVisible(sel.get('key') === 'S' || sel.get('key') === 'CS');
						combo.up('fieldcontainer').down('#rank').setVisible(sel.get('key') === 'K');
					}
				}
			}, {
				xtype: 'numberfield',
				itemId: 'rank',
				hidden: true,
				name: 'rank'
			}]
		}, {
			xtype: 'grid',
			itemId: 'secenekler',
			title: 'Seçenekler',
			hidden: true,
			store: Ext.create('Ext.data.Store', {
			    storeId:'simpsonsStore',
			    fields:['id', 'soru'],
			    data:{'items':[]},
			    proxy: {
			        type: 'memory',
			        reader: {
			            type: 'json',
			            root: 'items'
			        }
			    }
			}),
			columns: [{
				dataIndex: 'secenek',
				text: 'Seçenek',
				flex: 1
			}],
			tbar: [{
				text: 'Ekle'
			}]
		}];
    	
    	this.callParent(arguments);
    }
});