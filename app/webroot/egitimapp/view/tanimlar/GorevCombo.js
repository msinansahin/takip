Ext.define('Egitim.view.tanimlar.GorevCombo', {
	extend: 'Ext.form.field.ComboBox',
	alias: 'widget.gorevcombo',
    fieldLabel: 'Görev',
    displayField: 'name',
    store: Ext.create('Ext.data.Store', {
        fields: ['key', 'name'],
        data : [
            {"key":"M", "name":"Memur"},
            {"key":"S", "name":"Şef"},
            {"key":"U", "name":"Uzman"},
            {"key":"D", "name":"Diğer"}
        ]
    }),
    valueField: 'key',
    queryMode: 'local',
    typeAhead: true,
    inputWidth: 150,
    editable: false 
});