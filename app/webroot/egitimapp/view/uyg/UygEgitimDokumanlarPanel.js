Ext.define('Egitim.view.uyg.UygEgitimDokumanlarPanel', {	
	extend: 'Ext.container.Container',
	alias: 'widget.uygegitimdokumanlarpanel',
	uses: ['Egitim.view.EgitimDokumanYuklePanel', 'Egitim.view.EgitimDokumanList',
	       'Egitim.view.uyg.UygEgitimDokumaniYuklemePenceresi'],
	border: false,

    layout: 'border',
    egitimId: '',
    style: {borderColor:'#000000', borderStyle:'solid', borderWidth:'0px', padding: '0px'},
    defaults: {
		split: true,
        style: {
            padding: '2px'
        }
    },
    
    initComponent: function () {
    	var me = this;
    	
    	this.items = [{
    		region: 'center',
    		xtype: 'projeegitimpanel',
    		projeId: this.projeId
    	},{
    		xtype:'uygegitimdokumanlist',
    		title: 'Medya Listesi',
    		egitimId: this.egitimId,
    		projeId: this.projeId,
    		region: 'east',
    		padding: '0 0 0 0',
    		flex: 3
    	}];
    	
    	me.callParent(arguments);
    }
});