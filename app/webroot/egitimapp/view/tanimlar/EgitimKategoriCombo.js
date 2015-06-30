Ext.define('Egitim.view.tanimlar.EgitimKategoriCombo', {
	extend: 'Ext.form.field.ComboBox',
	alias: 'widget.egitimkategoricombo',
    fieldLabel: LBL_EGITIM_KAT_GRUBU,
    displayField: 'name',
    valueField: 'key',
    queryMode: 'local',
    inputWidth: 150,
    editable: false,
    typeAhead: true,
    tpl: Ext.create('Ext.XTemplate',
            '<tpl for=".">',
	            '<tpl if="leaf == true">',
	            	'<div class="x-boundlist-item"> --> {name}</div>',
	            '</tpl>',
	            '<tpl if="leaf == false">',
	            	'<div class="x-boundlist-item"> {name}</div>',
	            '</tpl>',
            '</tpl>'
        ),
    
    initComponent: function () {
    	var me = this;
    	var store = Ext.create('Egitim.store.EgitimKategori', {
    		listeners: {
    			load: function ( store, records, successful, operation, eOpts ) {
    				
    			}
    		}
    	});
    	this.store = store;
    	this.callParent();
    }

});