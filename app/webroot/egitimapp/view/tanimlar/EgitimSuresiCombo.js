Ext.define('Egitim.view.tanimlar.EgitimSuresiCombo', {
	extend: 'Ext.form.field.ComboBox',
	alias: 'widget.egitimsuresicombo',
    fieldLabel: 'Eğitim Suresi',
    displayField: 'name',
    store: Ext.create('Ext.data.Store', {
        fields: ['key', 'name'],
        data : [
            {"key":"_2SAAT", "name":"2 saat(tek oturum)"},
            {"key":"_3SAAT", "name":"3 saat(iki oturum)"},
            {"key":"_1GUN", "name":"Bir gün"},
            {"key":"_2GUN", "name":"İki Gün"},
            {"key":"_DIGER", "name":"Diğer"}
        ]
    }),
    valueField: 'key',
    queryMode: 'local',
    typeAhead: true,
    inputWidth: 150,
    editable: false 
});