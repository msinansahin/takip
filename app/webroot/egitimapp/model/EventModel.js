Ext.define('Egitim.model.EventModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name:'id'},
        {name:'proje_id', type:'int'},
        {name:'grup', type:'string'},
        {name:'egitim_id', type:'string'},
        {name:'egitmen_id', type:'string'},
        {name:'etkinlik_adi', type:'string'},
        {name:'renk', type:'int'},
        {name:'bas_tarihi', type:'date'},
        {name:'bas_saati', type:'string'},
        {name:'bit_tarihi', type:'date'},
        {name:'bit_saati', type:'string'},
        {name:'notlar', type:'string'},
        {name:'created', type:'date'}
    ],
    makeEventData: function () {
    	var rec = this;
    	var basValue = Egitim.lib.Utility.makeDate(rec.get('bas_tarihi'), rec.get('bas_saati'));
		var bitValue = Egitim.lib.Utility.makeDate(rec.get('bit_tarihi'), rec.get('bit_saati'));
		var obj = {
				EventId: rec.get('id'),
				CalendarId: rec.get('renk'),
	            Title: rec.get('etkinlik_adi'),
	            StartDate: basValue,
	            EndDate: bitValue,
	            recordData: rec.getData()
	        };
		return obj;
    }
});