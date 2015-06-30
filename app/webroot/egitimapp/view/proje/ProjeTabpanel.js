Ext.define ('Egitim.view.proje.ProjeTabpanel', {
	extend: 'Ext.tab.Panel',
	alias: 'widget.projetabpanel',
	required: ['KatilimciForm', 'KatilimciList'],
	uses: ['Egitim.view.proje.ProjeAnketContainer'],
	projeId: '',
    activeTab: 1,
    
    initComponent: function (){
    	var me = this;
    	
    	if (!YETKI.isProjeAuth()) {
    		this.activeTab = 0;
    	}
    	
    	if (me.mediaPanelAktif === true) {
    		this.activeTab = 6;
    	}
    	
    	this.addEvents('yuklendi');
    	this.items = [{
            title: 'Açıklama',
            bodyPadding: 10,
            hidden: !YETKI.isProjeAuth(),
            html: '<h1>Projeyle ilgili bilgilerin tabpaneli</h1>' +
            	'Proje Kayıt Bağlantı: <a target="_blank" href="http://www.egitimtakipsistemi.com/takip1/kayit?_pid=' + this.projeId+ '">http://www.egitimtakipsistemi.com/takip1/kayit?_pid=' + this.projeId,
            border: false
        }, {
        	xtype: 'projeform',
        	projeId: this.projeId,
        	hidden: !YETKI.isProjeAuth(),
        	autoScroll: true,
        	listeners: {
        		actioncomplete: function ( form, action, eOpts ) {
        			var tabpanel = form.owner.up('tabpanel');
        			tabpanel.getComponent(2).setDisabled(false);
        			tabpanel.getComponent(3).setDisabled(false);
        			tabpanel.getComponent(4).setDisabled(false);
        		}
        	}
        }, {
        	xtype: 'projekatilimcipanel',
        	projeId: this.projeId,
        	disabled: YETKI.isProjeAuth()
        }, {
        	xtype: 'projeegitimcontainer',
        	projeId: this.projeId,
        	disabled: YETKI.isProjeAuth(),
        	hidden: !YETKI.isProjeAuth()
        }, {
        	xtype: 'projegrupprogramcontainer',
        	projeId: this.projeId,
        	disabled: YETKI.isProjeAuth()
        }, {
        	title: 'Medyalar', //Uygulama esnasında projedeki eğitimlere yükenlecek media
        	xtype: 'uygegitimdokumanlarpanel',
        	readonly: this.readonly,
        	projeId: this.projeId,
        	header: false
        }, {
        	title: 'Anketler', //Uygulama esnasında proje için seçilen anketler
        	xtype: 'projeanketcontainer',
        	readonly: this.readonly,
        	projeId: this.projeId,
        	header: false
        }];
    	
    	if (!YETKI.isProjeAuth()) {
        	Ext.Array.insert(this.items, 0, [{
        		xtype: 'projebilgiview',
        		projeId: this.projeId
        	}]); 		
    	}
    	
    	this.callParent();
    },
    
    listeners: {
    	yuklendi: function (projeId) {
    		var me = this,
    			paneldekiFormlar = Ext.ComponentQuery.query('form', this),
    			paneldekiViewler = Ext.ComponentQuery.query('view', this);
    		for ( var form in paneldekiFormlar) {
				if (form.setProjeId) {
					form.setProjeId (projeId);
				}
				if (form.getForm && form.getForm().findField('proje_id')) {
					form.getForm().findField('proje_id').setValue();
				}
				form.projeId = projeId;
			}
    		for (var view in paneldekiViewler) {
    			view.projeId = projeId;
    		}
    	}
    },
    
    getProjeId: function (){
    	return this.projeId;
    },
    
    setProjeId: function (projeId){
    	this.projeId = projeId;
    }

});