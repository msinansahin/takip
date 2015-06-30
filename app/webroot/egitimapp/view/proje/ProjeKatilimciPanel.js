Ext.define('Egitim.view.proje.ProjeKatilimciPanel', {
	extend: 'Ext.container.Container',
	alias: 'widget.projekatilimcipanel',
	uses: ['Egitim.view.KatilimciList', 'Egitim.view.KatilimciForm'],
	border: false,

    layout: 'border',
    title: 'Katılımcılar',
    style: {borderColor:'#000000', borderStyle:'solid', borderWidth:'0px', padding: '0px'},
    projeId: '',
    defaults: {
        split: true,
        style: {
            padding: '2px'
        }
    },
    
    initComponent: function () {
    	
    	this.items = [{
    		flex: 2,
        	region: 'center',
        	xtype: 'katilimcilist',
        	title: 'Proje Katılımcıları',
        	userOlanlar: 1,
        	projeSecili: true,
        	pageSize: 100,
        	projeId: this.projeId
        }];
    	if (YETKI.isProjeAuth()) {
        	this.items[this.items.length] = {
        		flex: 1,
        	    autoScroll : true,
            	region: 'west',
            	xtype: 'katilimciform',
            	collapsible: true,
            	projeId: this.projeId,
            	yeni: true,
            	selectable: true,
            	tbar: [{
            		xtype: 'button',
            		text: 'Yeni',
            		handler: function (but) {
            			but.up('form').setYeni();
            		}
            	}]
            };    		
    	}

    	this.callParent();
    }
    
});