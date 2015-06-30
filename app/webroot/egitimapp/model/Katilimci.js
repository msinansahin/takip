Ext.define('Egitim.model.Katilimci', {
    extend: 'Ext.data.Model',
    fields: ['id', 'ad', 'soyad', 'eposta', 'grup', 
             'dogumTarihi', 'tel', 'mobil', 
             'il', 'ilce', 'ulke', 'adres',
             'sokak', 'cadde', 'proje_id', 'onay', 'proje_kod', 'created', 'user_id', 'ky_durumu'
             /*
             'created',
             'posta_kodu', 'mahalle', 'gorev',
             'konaklama', 
             'oda',
             'refakatci',
             'transfer',
             'nereden',
             'nereden_diger',
             'kac_kisi_eriskin',
             'kac_kisi_cocuk',
             'kac_kisi_eriskin_sayi',
             'kac_kisi_cocuk_sayi'
             */
             ],
     getAdSoyad: function () {
     	return this.get('ad') + ' ' + this.get('soyad');
     }

});