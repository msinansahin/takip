/**
 * Hazırlık aşamasında projeye anket tanımlama
 * 
 */
Ext.define('Egitim.view.proje.ProjeAnketContainer', {
	extend: 'Ext.container.Container',
	alias: 'widget.projeanketcontainer',
	uses: ['Egitim.view.proje.ProjeAnketPanel'],
	border: false,
    autoScroll : true,
    split: true,
    layout: 'border',
    title: 'Anketler',
    style: {borderColor:'#000000', borderStyle:'solid', borderWidth:'0px', padding: '0px'},
    defaults: {
        flex: 1,
        style: {
            padding: '2px'
        }
	},
	items: [{
    	region: 'center',
    	flex: 1,
    	split: true,
    	xtype: 'projeanketpanel' //projeye seçilen anketler
	}, {
    	region: 'east',
    	flex: 2,
    	split: true,
    	xtype: 'ankettanimlist',
    	selectable: true,
    	title: 'Anketler'
    }]
});