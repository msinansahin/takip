/**
 * Eğitmen formuunu ve eğitmen eğitim içeriğinin oluşturulduğu panel<br>
 * İki panelin toplamı
 */
Ext.define('Egitim.view.EgitimPanel', {
	extend : 'Ext.tab.Panel',
	alias: 'widget.egitimpanel',
	requires: ['Egitim.view.EgitimBilgiView'],
	egitimId: '',
    activeTab: 1,
    
    initComponent: function (){
    	var me = this;
    	
    	if (!YETKI.isEgitimAuth()) {
    		this.activeTab = 0;
    	}
    	
    	this.items =[{
            title: 'Açıklama',
            xtype: 'egitimbilgiview',
            bodyPadding: 10,
            egitimId: me.egitimId,
            autoScroll: true,
            border: false
        }, {
        	title: 'Eğitim Bigileri',
        	xtype: 'egitimform',
        	readonly: this.readonly,
        	hidden: !YETKI.isEgitimAuth(),
        	header: false,
        	listeners: {
        		actioncomplete: function ( form, action, eOpts ) {
        			var tabpanel = form.owner.up('tabpanel');
        			tabpanel.getComponent(2).setDisabled(false);
        			tabpanel.getComponent(3).setDisabled(false);
        		}
        	}
        }, {
        	title: 'Eğitim İçeriği',
        	xtype: 'egitimicerikpanel',
        	hidden: !YETKI.isEgitimAuth(),
        	readonly: this.readonly,
        	disabled: true,
        	header: false
        }, {
        	title: 'Dokümanlar',
        	xtype: 'egitimdokumanlarpanel',
        	readonly: this.readonly,
        	//disabled: true,
        	header: false
        }];
    	this.callParent();
    }
    
});