Ext.define('Egitim.view.EgitimDokumanlarPanel', {	
	extend: 'Ext.container.Container',
	alias: 'widget.egitimdokumanlarpanel',
	uses: ['Egitim.view.EgitimDokumanYuklePanel', 'Egitim.view.EgitimDokumanList'],
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
    		xtype:'egitimdokumanyuklepanel',
    		region: 'center',
    	    autoScroll : true,
    		flex: 1
    	}, {
    		xtype:'egitimdokumanlist',
    		title: 'Dokümanlar Listesi',
    		region: 'east',
    		padding: '0 0 0 50',
    		flex: 3
    	}];
    	
    	me.callParent(arguments);
    }
});