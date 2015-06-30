Ext.define('Egitim.view.proje.ProjeBilgiView',{
	extend: 'Ext.Component',
	alias: 'widget.projebilgiview',
	projeId: '', //Katılımcılar için session'dan alınır
	
	initComponent: function (){
		
		if (YETKI.isKatilimci() || YETKI.isKurumYoneticisi()) {
		    this.loader = {
		        url: 'projes/view/' + YETKI.projeId,
		        autoLoad: false,
		        loadMask: 'Yükleniyor'
		    };
		} else {
			this.title = 'Proje Bilgileri';
		    this.loader = {
		        url: 'projes/view/' + this.projeId,
		        autoLoad: false,
		        loadMask: 'Yükleniyor'
		    };
		}
		
		this.callParent(arguments);
	},
	
    listeners: {
    	afterrender: function (comp){
    		comp.getLoader().load();
    	}
    }
	
});