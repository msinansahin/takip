Ext.define('Egitim.model.Egitmen', {
    extend: 'Ext.data.Model',
    fields: ['id', 'ad', 'soyad', 'eposta', 'cadde', 'sokak', 'il',
             'ilce', 'ulke', 'tel', 'mobil', 'dogumTarihi', 'kod',
             'web', 'cv_media_id', 'created', 'egitimler'],
             
    getAdSoyad: function () {
    	return this.get('ad') + ' ' + this.get('soyad');
    }
});