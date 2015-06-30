/**
 * Proje için seçilen eğitim'le ilgili, eğitmen, program ve diğer bilgilieri içerir
 */
Ext.define('Egitim.view.proje.ProjeEgitimBilgileriContainer', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.projeegitimbilgilericontainer',
	uses: [],
	border: false,
    autoScroll : true,
    split: true,
    layout: 'form',
    title: 'Eğitim Bilgileri',
    style: {borderColor:'#000000', borderStyle:'solid', borderWidth:'0px', padding: '10px'},
    defaults: {
        flex: 1,
        style: {
            padding: '2px'
        }
	},
	items: [{
    	xtype: 'combo',
    	store: 'Egitmen',
    	itemId: 'egitmen',
    	fieldLabel: 'Eğitmen',
    	displayField: 'ad'
	}]
});