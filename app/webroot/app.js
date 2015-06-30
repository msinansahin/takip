/**
 * @author sinans
 */
Ext.application({
	autoCreateViewport : true,
	appFolder: 'egitimapp',
    name: 'Egitim',
	models: ['Menu'],
	views: ['NavigationPanel', 'anket.AnketForm'],
	requires: ['Egitim.lib.Utility', 'Egitim.lib.Date'],
	controllers: ['MenuCtrl',
	              'EgitimCtrl', 
	              'EgitmenCtrl', 
	              'TanimlarCtrl',
	              'ProjeCtrl', 
	              'KatilimciCtrl', 
	              'AdminCtrl', 
	              'AnketCtrl'],
    launch_: function() {
	
		
        Ext.create('Ext.container.Viewport', {
            layout: 'fit',
            items: [
                {
                    title: 'Hello Ext',
                    html : 'Hello! Welcome to Ext JS.'
                }
            ]
        });
    },
	
	init: function (application){
		
		Ext.Loader.setConfig({
			enabled: true,
			paths: {
				'Egitim': 'lib'
				//'Ext.calendar' : 'abc'
			}
		});
		Ext.Loader.setPath('Ext.chooser', 'extjs/view/chooser');
		
		Ext.QuickTips.init();
        Ext.state.Manager.setProvider(Ext.create('Ext.state.CookieProvider'));
        if (!Ext.isIE)
        	console.log (application.name + ' inited');
	}
	
});