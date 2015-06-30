Ext.define('Egitim.view.tanimlar.SureFormatCombo', {
	extend: 'Ext.form.field.ComboBox',
	alias: 'widget.sureformatcombo',
    fieldLabel: 'Eğitim Formatı',
    displayField: 'name',
    store: Ext.create('Ext.data.Store', {
        fields: ['key', 'name'],
        data : [
            {"key":"SEMINER", "name":"Seminer"},
            {"key":"EGITIM", "name":"Eğitim"},
            {"key":"KURS", "name":"Kurs"},
            {"key":"AKTIVITE", "name":"Aktivite"},
            {"key":"UYGULAMA", "name":"Uygulama"}
        ]
    }),
    valueField: 'key',
    queryMode: 'local',
    typeAhead: true,
    inputWidth: 150,
    editable: false 
});