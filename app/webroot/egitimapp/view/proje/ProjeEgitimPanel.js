/**
 * Seçilen eğitimler,
 * eğitimler için seçilen eğitmenler,
 * 					program
 * 
 */
Ext.define('Egitim.view.proje.ProjeEgitimPanel', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.projeegitimpanel',
	border: false,
    split: true,
    layout: 'border',
    title: 'Seçilen Eğitimler',
    style: {borderColor:'#000000', borderStyle:'solid', borderWidth:'0px', padding: '0px'},
    defaults: {
        flex: 1,
        style: {
            padding: '2px'
        }
    },
    items: [{
    	region: 'center',
        autoScroll : true,

    	xtype: 'projeegitimview'
    }/*, {
    	region: 'south',
    	xtype: 'projeegitimbilgilericontainer'
    }*/],
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