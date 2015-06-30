Ext.define('Egitim.view.tanimlar.AnketSoruTipiCombo', {
	extend: 'Ext.form.field.ComboBox',
	alias: 'widget.anketsorutipicombo',
    fieldLabel: 'Soru Tipi',
    displayField: 'name',
    store: Ext.create('Ext.data.Store', {
        fields: ['key', 'name'],
        data : [
            {"key":"M", "name":"Metin"},
            {"key":"EH", "name":"Evet/Hayır"},
            {"key":"S", "name":"Seçmeli"},
            {"key":"CS", "name":"Çoklu Seçmeli"},
            {"key":"K", "name":"Kademe"}
        ]
    }),
    valueField: 'key',
    queryMode: 'local',
    typeAhead: true,
    inputWidth: 150,
    editable: false 
});