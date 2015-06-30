/**
 * Uygulama eğitim medyaları için de kullanılır
 */
Ext.define('Egitim.model.EgitimDokumaniModel', {
    extend: 'Ext.data.Model',
    fields: ['id', 'baslik', 'egitim_id', 'kod',
             'egitim_adi', //transient
             'egitmen_id', 'aciklama',
             'indirilebilir', 'media_id', 
             'egitim_kod', 'egitim_baslik',
             'proje_id',
             'tur', //listelerken media ile join etmemek için
             'created']
});