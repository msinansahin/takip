/**
 * Eğitmenin bağlı olduğu eğitimlerin gösterildiği eklendiği silindiği panel
 */
Ext.define('Egitim.view.EgitmenEgitimPanel', {
	extend: 'Ext.container.Container',
	alias: 'widget.egitmenegitimpanel',
	uses: ['Egitim.view.EgitimList'],
	border: false,
    autoScroll : true,
    layout: 'border',
    style: {borderColor:'#000000', borderStyle:'solid', borderWidth:'0px', padding: '0px'},
    defaults: {
        style: {
            padding: '2px'
        }
    },
    items: [{
    	xtype: 'panel',
		region: 'center',
		title: 'Eğitmenin Verdiği Eğitimler',
		border: false,
	    autoScroll : true,
	    split: true,
	    flex: 1,
    	tbar: [{
    		text: 'Kaydet',
    		action: 'tamamegitim',
    		itemId: 'tamamegitim'
    	}, {
    		text: 'Sil',
    		action: 'silegitim'
    	}],
    	items: [{
    		xtype: 'egitmenegitimview'
    	}]
    }, {  // Let's put an empty grid in just to illustrate fit layout
			xtype: 'egitimlist',
			region: 'east',
			flex: 2,
			selectable: true,
			title: '',
			border: false,
			split: true,
			listeners: {
				secildi: function (grid, rec) {
					debugger;
					var store = grid.up('egitmenegitimpanel').down('dataview').getStore();
					var id = rec.get('id');
					if (store.indexOfId( id ) >= 0) {
						Egitim.lib.Utility.warnMessage('Eğitim önceden seçilmiş, ekleyemezsiniz.');
					} else {
						store.add({src: 'egitimapp/resources/images/egitim_big.png', baslik: rec.get('baslik'), id: id});						
					}
				}
			}
		}
	]	
});