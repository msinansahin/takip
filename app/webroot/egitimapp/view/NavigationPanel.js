Ext.define('Egitim.view.NavigationPanel', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.navigationpanel',
	region: 'west',
	stateId: 'navigation-panel',
	title: '',
	split: true,
	width: 200,
	minWidth: 175,
	maxWidth: 400,
	collapsible: true,
	animCollapse: true,
	autoScroll: true,
	margins: '0 0 0 5',
	layout: 'accordion',
	defaults: {
		autoScroll: true
	}
	
});