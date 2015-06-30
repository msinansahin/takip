Ext.define('Egitim.view.EgitmenPanel', {
	extend : 'Ext.tab.Panel',
	alias: 'widget.egitmenpanel',
	required: ['EgitmenForm', 'EgitmenEgitimPanel'],
	egitmenId: '',
    activeTab: 1,
    
    initComponent: function (){
    	this.callParent();
    },
    
    items: [{
        title: 'Açıklama',
        bodyPadding: 10,
        html: '<h1>Eğitmenle ilgili bilgilerin tabpaneli</h1>',
        border: false
    }, {
    	title: 'Profil',
    	xtype: 'egitmenform',
    	header: false
    }, {
    	title: 'Eğitimler',
    	xtype: 'egitmenegitimpanel',
    	header: false
    }]
});