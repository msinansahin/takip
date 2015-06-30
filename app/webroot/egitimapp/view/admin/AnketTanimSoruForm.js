Ext.define('Egitim.view.admin.AnketTanimSoruForm', {
	extend: 'Egitim.lib.FormPanel',
    title: 'Soru Tanımı',
	alias: 'widget.ankettanimsoruform',
	requires: [],

    url: 'admins/saveAnketTanimSoru',
    autoScroll: true,
	
    temizle: function () {
    	this.getForm().reset();
    	var secenekler = this.down('#secenekler');
    	secenekler.getStore().removeAll();
    	secenekler.hide();
    },
    
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
						combo.up('form').down('#secenekler').setVisible(sel.get('key') === 'S' || sel.get('key') === 'CS' || sel.get('key') === 'K');
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
			plugins: [Ext.create('Ext.grid.plugin.CellEditing', {clicksToEdit: 1})],
			store: Ext.create('Ext.data.Store', {
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
				dataIndex: 'soru',
				text: 'Seçenek',
				flex: 1,
				editor: {
					xtype: 'textfield',
					emptyText: 'Soru giriniz'
				}
			}, {
	              xtype:'actioncolumn',
	              width:30,
	              items: [{
	  				icon: 'egitimapp/resources/icons/delete.gif',
					tooltip: LBL_SIL,
					handler: function(grid, rowIndex, colIndex) {
						grid.getStore().removeAt(rowIndex);
					}
				}]
			}],
			tbar: [{
				iconCls: 'yeni',
				text: 'Ekle',
				handler: function (but) {
					but.up('grid').getStore().add({
						
					});
				}
			}]
		}, {
			xtype: 'hidden',
			name: 'soru_data'
		}, {
			xtype: 'hidden',
			name: 'anket_tanim_id',
			value: this.atId
		}, {
			xtype: 'hidden',
			name: 'id'
		}];
    	
    	this.callParent(arguments);
    }
});