/*
 * EgitimDokumanView.
 */
Ext.define('Egitim.view.EgitimDokumanView', {	
	extend: 'Ext.panel.Panel',
	alias: 'widget.egitimdokumanview',
	title: 'Eğitim Dokümanı',
	
	items: [Ext.create('Ext.Component', {
		loader: {
			url: 'egitims/view/' + this.egitimId,
	        autoLoad: false,
	        loadMask: 'Yükleniyor'
		}
	})]
	
});