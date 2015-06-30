Ext.define('Egitim.view.tanimlar.IlceCombo', {
	extend: 'Ext.form.field.ComboBox',
	alias: 'widget.ilcecombo',
    fieldLabel: 'İlçe',
    displayField: 'name',
    store: Ext.create('Ext.data.Store', {
    	fields: ['il', 'key', 'name'],
    	proxy: {
            type: 'ajax',
            url: 'tanimlars/listIlce',
            reader: {
                type: 'json',
                root: 'results'
            }
        }
    }),
    valueField: 'key',
    queryMode: 'local',
    typeAhead: true,
    inputWidth: 150,
    editable: false 
});






