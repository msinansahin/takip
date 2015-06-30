/**
 * Seçilen anket,
 * 
 */
Ext.define('Egitim.view.proje.ProjeAnketPanel', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.projeanketpanel',
	uses: ['Egitim.view.proje.ProjeAnketView'],
	border: false,
    autoScroll : true,
    split: true,
    layout: 'border',
    title: 'Seçilen Anketler',
    style: {borderColor:'#000000', borderStyle:'solid', borderWidth:'0px', padding: '0px'},
    defaults: {
        flex: 1,
        style: {
            padding: '2px'
        }
    },
    items: [{
    	region: 'center',
    	title: 'adsa',
    	xtype: 'projeanketview'
    }],
    tbar: [{
    	text: 'Tamam',
    	action: 'tamam',
    	hidden: !YETKI.isProjeAuth()
    }, {
    	text: 'Sil',
    	action: 'sil',
    	hidden: !YETKI.isProjeAuth()
    }]
});