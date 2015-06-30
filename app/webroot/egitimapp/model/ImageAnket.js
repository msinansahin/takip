Ext.define('Egitim.model.ImageAnket', {
    extend: 'Ext.data.Model',
    fields: [
        {name:'id'},
        {name:'src', type:'string'},
        {name:'baslik', type:'string'},
        {name:'proje_id', type:'string'}
    ]
});