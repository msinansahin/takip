Ext.define('Egitim.view.tanimlar.AnketCombo', {
	extend: 'Ext.form.field.ComboBox',
	alias: 'widget.anketcombo',
    fieldLabel: 'Proje',
    displayField: 'kod',
    tpl: Ext.create('Ext.XTemplate',
            '<tpl for=".">',
            	'<div class="x-boundlist-item">{kod} - {baslik}</div>',
        '</tpl>'
    ),
    store: Ext.create('Ext.data.Store', {
    	fields: ['id', 'kod', 'baslik'],
    	pageSize: 999,
    	proxy: {
            type: 'ajax',
            url: 'projes/listProjeAnket',
            reader: {
                type: 'json',
                root: 'results'
            }
        }
    }),
    valueField: 'id',
    queryMode: 'local',
    typeAhead: true,
    inputWidth: 150,
    editable: false 
});
