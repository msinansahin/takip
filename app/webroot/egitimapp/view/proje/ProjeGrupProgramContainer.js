/**
 * Proje'de grupların takvimlerinin oluşturulmasının ana paneli<br>
 * Sol'da gruplar sağda takvim var.
 */
Ext.define ('Egitim.view.proje.ProjeGrupProgramContainer', {
	extend: 'Ext.container.Container',
	alias: 'widget.projegrupprogramcontainer',
	requires: ['Egitim.view.proje.ProjeGrupView', 'Egitim.view.proje.GrupProgramEventForm',
	           'Egitim.store.GrupProgramEventStore'],
	border: false,
    split: true,
    layout: 'border',
    title: 'Grup-Program',
    projeId: '',
    style: {borderColor:'#000000', borderStyle:'solid', borderWidth:'0px', padding: '0px'},
    defaults: {
    	split: true,
        style: {
            padding: '2px'
        }
    },
    //katılımcılar birden fazla proje için tanımırsa bu geçersiz olacak
    //Katılımcı dahil olduğu projeleri listeleyip takvimlere bakacak
    projeId: YETKI.isKatilimci() || YETKI.isKurumYoneticisi() ? YETKI.projeId : '', 
    initComponent: function () {
    	var me = this;
    	
    	me.items = [{
    		xtype: 'panel',
    		layout: 'fit',
    		iconCls: 'grup',
    		title: 'Gruplar',
    		region: 'west',
    	    autoScroll : true,

    		items: [{
        		xtype: 'projegrupview',
        		projeId: this.projeId,
        		width: '200px',
        		cls: 'img-chooser-view' //FIXME css id ile çalışıyor sonra düzelt
    		}],
    		tbar: [{
    	    	text: 'Tazele',
    	    	action: 'tazele',
    	    	tooltip: 'Grupları tazeler, takvimde girilen verileri tazeler',
    	    	hidden: !YETKI.isProjeGrupEventAuth(),
    	    	handler: function (but) {
    	    		but.up('panel').down('projegrupview').getStore().load({
    	    			params: {
    	    				id: me.projeId
    	    			}
    	    		});
    	    	}
    	    }, {
    	    	text: 'Yeni',
    	    	tooltip: 'Yeni Event oluştur',
    	    	action : 'yenievent',
    	    	hidden: !YETKI.isProjeGrupEventAuth()
    	    }, {
    	    	xtype: 'label',
    	    	html: 'Grup seçiniz'
    	    }]
    	}, {
			xtype: 'calendarpanel',
			itemId: 'calendarpanel',
			border: false,
	        flex: 5,
            region: 'center',
            iconCls: 'takvim',
            title: 'Takvim',
            activeItem: 1, // month view
            todayText: 'Bugün',
            dayText: 'Gün',
            weekText: 'Hafta',
            monthText: 'Ay',            
            monthViewCfg: {
                showHeader: true,
                showWeekLinks: true,
                showWeekNumbers: true
            },
	        calendarStore: Ext.create('Ext.calendar.data.MemoryCalendarStore', {
	            data: Ext.calendar.data.Calendars.getData()
	        }),
	        eventStore: Ext.create('Egitim.store.GrupProgramEventStore', {
	        	projeId: this.projeId,
	        	grup: this.grup
	        }),
	        
	        eventStore: Ext.create('Ext.calendar.data.MemoryEventStore', {
	            data: [] //burası grup seçilince dolacak
	        })
		}];
    	
    	me.callParent();
    }
    
	
});