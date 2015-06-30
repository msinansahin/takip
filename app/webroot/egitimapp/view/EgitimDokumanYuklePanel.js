Ext.define('Egitim.view.EgitimDokumanYuklePanel', {	
	extend: 'Ext.container.Container',
	alias: 'widget.egitimdokumanyuklepanel',
	uses: ['Egitim.view.EgitimDokumanView', 'Egitim.view.EgitimDokumaniYuklemePenceresi'],
	border: false,
    autoScroll : true,
    split: true,
    layout: 'anchor',
    egitimId: '',
    style: {borderColor:'#000000', borderStyle:'solid', borderWidth:'0px', padding: '0px', background: "#000000"},
    defaults: {
        flex: 1,
        style: {
            padding: '2px'
        }
    },
    
    initComponent: function (){
    	var me = this;
    	
    	this.items = [{
    		xtype: 'button',
    		text: 'Yükle',
    		action: 'yuklepencereac',
    		hidden: !YETKI.isEgitimDokumanAuth()
    	}, {
    		xtype: 'panel'
    	}];
    	
    	me.callParent(arguments);
    }
});