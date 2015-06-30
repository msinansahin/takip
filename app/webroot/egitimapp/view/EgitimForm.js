var fsFormatListeners = {
			change: function (cb, newValue, oldValue, eOpts) {
				var fc = cb.up('fieldcontainer');
				var sureCombo = fc.down('egitimsuresicombo');
				var digerAciklama = fc.down('#da');
				if (newValue === false) {
					sureCombo.setValue(null);
					digerAciklama.setVisible(false);
				}
				sureCombo.setVisible(newValue === true);
			}
		};
		
//süre combosu değişince
var fsSureListeners = {
			change: function (combo, newValue, oldValue, eOpts) {
				var digerAciklama = combo.up('fieldcontainer').down('#da');
				var digerMi = newValue === '_DIGER';
				if (!digerMi) {
					digerAciklama.setValue(null);				
				}
				digerAciklama.setVisible(newValue === '_DIGER');
			}
		};

var egitimSureFormatYarat = function (fieldLabel, cbName, sureName, daName){
		return {
    		xtype: 'fieldcontainer',
    		padding: 5,
    		layout: 'hbox',
    		items: [{
    					xtype:'checkbox', 
    					fieldLabel: fieldLabel, 
    					name: cbName, 
    					listeners: fsFormatListeners,
    					uncheckedValue: ''
    					//inputValue: true
    				},{	xtype: 'egitimsuresicombo', fieldLabel: '', 
    		        	name: sureName, 
    		        	hidden: true,
    		        	listeners: fsSureListeners
    		        },{
						xtype: 'textfield', 
						fieldLabel: '', 
						name: daName, 
						itemId: 'da', 
						width: 300, 
						emptyText: 'Açıklama Giriniz', 
						hidden: true
					}]
	    };
};
		
Ext.define('Egitim.view.EgitimForm', {
	extend: 'Egitim.lib.FormPanel',
    title: LBL_EGITIM,
	alias: 'widget.egitimform',

    // The form will submit an AJAX request to this URL when submitted
    url: 'egitims/save',

    requires: ['Egitim.view.tanimlar.EgitimKategoriCombo', 'Egitim.view.tanimlar.EgitimSuresiCombo'],
    autoScroll: true,
    readonly: !YETKI.isEgitimAuth(),
    
    initComponent: function (){
    	this.callParent(arguments);
    },
    
	egitimId: '',
    items: [{
        xtype:'fieldset',
        title: '',
        border: false,
        collapsible: false,
        defaults: {anchor: '100%'},
        items :[{
    		xtype: 'textfield',
    		fieldLabel: 'Kodu',
    	    msgTarget: 'side',
    	    name: 'kod',
    		emptyText: LBL_EGITIM_KODU_GIRINIZ,
    		allowBlank: false,
    		inputWidth: 150
    	}, {
    		xtype: 'egitimkategoricombo',
    		name: 'kategori',
    		emptyText: 'Eğitim Grubunu giriniz',
    		allowBlank: false
    	}]
    },{
        fieldLabel: LBL_BASLIK,
        name: 'baslik',
        emptyText: 'Başlık giriniz',
        allowBlank: false
    },{
        fieldLabel: LBL_KAZANIMLAR,
        name: 'kazanimlar',
        xtype: 'textarea',
        allowBlank: false
    },{
    	xtype: 'fieldset',
    	title: 'Eğitim Format ve Süresi',
    	items: [
    		egitimSureFormatYarat ('Seminer', 'esf_seminer', 'esf_seminer_sure', 'esf_seminer_diger_aciklama'),	
    		egitimSureFormatYarat ('Eğitim', 'esf_egitim', 'esf_egitim_sure', 'esf_egitim_diger_aciklama'),	
    		egitimSureFormatYarat ('Kurs', 'esf_kurs', 'esf_kurs_sure', 'esf_kurs_diger_aciklama'),	
    		egitimSureFormatYarat ('Aktivite', 'esf_aktivite', 'esf_aktivite_sure', 'esf_aktivite_diger_aciklama'),	
    		egitimSureFormatYarat ('Uygulama', 'esf_uygulama', 'esf_uygulama_sure', 'esf_uygulama_diger_aciklama')
	]},/*{
        name: 'formati_suresi',
        xtype: 'sureformatcombo',
        allowBlank: false
    },{
    	name: 'egitim_sekli',
    	xtype: 'egitimseklicombo',
    	allowBlank: false,
    	width: 200
    },*/{
    	name: 'katilimci_profili',
    	fieldLabel: 'Katılımcı Profili',
    	xtype: 'textarea'
    }, {
    	name: 'egitmen_id', //hangi eğitmenin içeriği görünecek
    	fieldLabel: 'Eğitmen Kodu',
    	xtype: 'textfield',
    	hidden: true,
    	editable: false
    },
    {
        name: 'id',
		xtype: 'hidden'
    }]
});