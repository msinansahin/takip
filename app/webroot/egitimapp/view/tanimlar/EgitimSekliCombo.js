Ext.define('Egitim.view.tanimlar.EgitimSekliCombo', {
	extend: 'Ext.form.field.ComboBox',
	alias: 'widget.egitimseklicombo',
    fieldLabel: LBL_EGITIM_SEKLI,
    displayField: 'name',
    store: Ext.create('Ext.data.Store', {
        fields: ['key', 'name'],
        data : [
            {"key":"U", "name":"Uygulama"},
            {"key":"W", "name":"Workshop"},
            {"key":"D", "name":"Ders"}
        ]
    }),
    valueField: 'key',
    queryMode: 'local',
    typeAhead: true,
    inputWidth: 150,
    editable: false 
});