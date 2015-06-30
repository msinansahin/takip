Ext.define('Egitim.lib.Date', {
	extend: 'Ext.form.field.Date',
	alias: 'widget.egitimdate',
	format: 'd-m-Y',
	submitFormat : 'Y-m-d',
	msgTarget: 'side'
});