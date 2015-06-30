/**
 * Hazırlık aşamasında projeye eğitim tanımlama, program hazırlama,
 * eğitime eğitmen seçme gibi işlemler yapılır
 */
Ext.define('Egitim.view.proje.ProjeEgitimContainer', {
	extend: 'Ext.container.Container',
	alias: 'widget.projeegitimcontainer',
	uses: ['Egitim.view.proje.ProjeEgitimPanel', 'Egitim.view.proje.ProjeEgitimView',
	       'Egitim.view.proje.ProjeEgitimBilgileriContainer'],
	border: false,
    split: true,
    layout: 'border',
    title: 'Eğitimler',
    style: {borderColor:'#000000', borderStyle:'solid', borderWidth:'0px', padding: '0px'},
    defaults: {
        flex: 1,
        style: {
            padding: '2px'
        }
	},
	items: [{
    	region: 'center',
        //autoScroll : true,
    	split: true,
    	xtype: 'projeegitimpanel' //projeye seçilen eğitimler, eğitimin eğitmen seçimi ve programı
	}, {
    	region: 'east',
    	split: true,
    	xtype: 'egitimlist',
    	selectable: true,
    	title: 'Eğitimler'
    }]
});