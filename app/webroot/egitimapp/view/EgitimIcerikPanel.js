/**
 * Eğitmenlerle beraber içerik gösterilir
 */
Ext.define ('Egitim.view.EgitimIcerikPanel', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.egitimicerikpanel',
	layout: 'border',
	split: true,
	autoScroll: true,
    style: {borderColor:'#000000', borderStyle:'solid', borderWidth:'0px', padding: '0px'},
    defaults: {
        style: {
            padding: '2px'
        }
    },
	items: [{
    	xtype: 'panel',
		region: 'west',
		border: false,
	    autoScroll : true,
	    title: 'Eğitmenler',
	    split: true,
	    minSize: 200,
	    flex: 1,
    	tbar: [{xtype: 'label', html:'Eğitmen Seç'}],
    	items: [{
    		xtype: 'egitimegitmenview'
    	}]
    }, { 
    	xtype: 'egitimicerikform',
    	region: 'center',
    	flex: 2,
    	split: true
    }]
});