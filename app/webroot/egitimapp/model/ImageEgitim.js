Ext.define('Egitim.model.ImageEgitim', {
    extend: 'Ext.data.Model',
    fields: [
        {name:'id'},
        {name:'src', type:'string'},
        {name:'baslik', type:'string'},
        {name:'egitmen_id', type:'string'}
    ]
});