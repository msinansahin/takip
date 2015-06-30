var projeMenuItems = function (){
	var items = [];
	if (!YETKI.projeIds) {
		return items;
	}
	for (var i = 0; i < YETKI.projeIds.length; i++) {
		var projeId = YETKI.projeIds[i];
		items[i] = {
            text: 'Proje ' + projeId,
            checked: (YETKI.projeId + "") === (projeId + ""),
            projeId: projeId,
            group: 'theme',
            checkHandler: function (c, checked){
            	window.location = 'kullanicis?p_id=' + c.projeId;
            }
		};
	}	
	return items;
};

Ext.define('Egitim.view.Viewport', {
	extend: 'Ext.container.Viewport',
	layout: 'border',
	requires: ['Egitim.view.CenterPanel', 'Egitim.view.tanimlar.AraButton' /*'Egitim.lib.upload.FileSelectorPanel'*/],
	items: [{
		region: 'north',
		height: 50,
		layout: 'hbox',
		border: false,
		defaults: {
			height: 50,
			border: false
		},
		items: [{
			xtype: 'box',
			width: 100,
			cls: 'banner'
		},{
			xtype:'box',
			flex: 1,
			cls: 'banner-yazi',
			html: '<div style="vertical-align: middle; line-height: 50px; height:50px;">Eğitim Takip Sistemi</div>'
		}/*,{
			xtype: 'box',
			html: '',
			hidden: false,
			width: 200,
			cls: 'banner-doktorala'
		}*/]
	}, /*{
			// lazily created panel (xtype:'panel' is default)
			region: 'south',
			split: true,
			height: 100,
			minSize: 100,
			maxSize: 200,
			collapsible: true,
			collapsed: true,
			title: 'South',
			margins: '0 0 0 0'
		}*/
	Ext.create('Ext.ux.statusbar.StatusBar', {
        id: 'egitimuygulamasi-status',
        region: 'south',
        height: 40,
        // defaults to use when the status is cleared:
        defaultText: 'Default status text',
        defaultIconCls: 'default-icon',
        style: {background: '#D2D2D2'},
        // values to set initially:
        text: Ext.String.format('<b>{0} | {1}</b>', YETKI.kullaniciAdi, YETKI.rol),
        iconCls: 'ready-icon',

        // any standard Toolbar items:
        items: [{
        	text: YETKI.projeIds,
        	xtype:'splitbutton',
            text:'Projeler',
            iconCls: '',
            menuAlign: 'br-tr?',
            menu: Ext.create('Ext.menu.Menu', {
            	items: projeMenuItems()
            })
        },{
            xtype:'splitbutton',
            text:'Profil/Çıkış',
            iconCls: '',
            menuAlign: 'br-tr?',
            menu: Ext.create('Ext.menu.Menu', {
                items: [{
                	text: 'Profil', 
                	iconCls: 'profil'
                	
                }, {
                	text: 'Çıkış', 
                	iconCls: 'logout',
                	handler: function () {
                		window.location = 'kullanicis/logout';
                	}
                }]
            })
        }]
    }),
	{
			xtype: 'tabpanel',
			region: 'east',
			hidden: true,
			title: 'East Side',
			dockedItems: [{
				dock: 'top',
				xtype: 'toolbar',
				items: [ '->', {
				   xtype: 'button',
				   text: 'test',
				   tooltip: 'Test Button'
				}]
			}],
			animCollapse: true,
			collapsible: true,
			split: true,
			width: 225, // give east and west regions a width
			minSize: 175,
			maxSize: 400,
			margins: '0 5 0 0',
			activeTab: 1,
			tabPosition: 'bottom',
			items: [{
				html: '<p>A TabPanel component can be a region.</p>',
				title: 'A Tab',
				autoScroll: true
			}, Ext.create('Ext.grid.PropertyGrid', {
					title: 'Property Grid',
					closable: true,
					source: {
						"(name)": "Properties Grid",
						"grouping": false,
						"autoFitColumns": true,
						"productionQuality": false,
						"created": Ext.Date.parse('10/15/2006', 'm/d/Y'),
						"tested": false,
						"version": 0.01,
						"borderWidth": 1
					}
				})]
		}, {
			xtype: 'navigationpanel'
		},
		/*{
	         id: 'maintabpanel',
	         region: 'center', // this is what makes this panel into a region within the containing layout
	         layout: 'card',
	         margins: '2 5 5 0',
	         activeItem: 0,
	         border: false
	    }*/
		Ext.create('Ext.tab.Panel', {
			id: 'maintabpanel',
			region: 'center', // a center region is ALWAYS required for border layout
			deferredRender: false,
			activeTab: 0,     // first tab initially active
			items: [Ext.create('Egitim.view.CenterPanel',{
				xtype: 'centerpanel',
				title: 'Dash',
				autoScroll: true
			})]
		})]
});