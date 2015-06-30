Ext.define('Egitim.model.AnketTanimSoru', {
    extend: 'Ext.data.Model',
    fields: ['id', 
             'sira', 
             'soru_metin', 
             'soru_tipi', 
             'soru_alt_bilgi',
             'soru_data',
             'anket_tanim_id',
             'rank',
             'created']
});