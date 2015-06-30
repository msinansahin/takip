Ext.define('Egitim.view.tanimlar.AraButton', {
	extend: 'Ext.button.Button',
	iconCls :'ara',
	tooltip: 'Arama penceresi',
	alias: 'widget.arabutton',
	handler: function () {
		var panel = this.up('panel');
		var searchform = panel ? panel.down('#searchform') : null;
		if (searchform) {
			searchform.setVisible(searchform.isHidden());
		}
	}
	
});