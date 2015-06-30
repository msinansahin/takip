var imageTplAdminDisi = new Ext.XTemplate(
		'<tpl for=".">',
		'<div class="thumb-wrap">',
		    '<div class="thumb">',
		    	'<div class="{menuCls}" style="width: 96px">',
		    	'</div>',
		    /*
		    (!Ext.isIE6? '<img src="{src}" />' : 
		    '<div style="width:74px;height:74px;filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'{src}\')"></div>'),
		    */
		    '</div>',
		    '<span class="big-menu-text">{title}</span>',
		'</div>',
		'</tpl>'
	);

Ext.define('Egitim.view.UserMenu', {
	extend: 'Ext.view.View',
	alias: 'widget.usermenu',
	/*
	itemTpl: new Ext.XTemplate(
		'<div style="margin-bottom: 10px;" class="usermenu">',
		  '<img src="{id}" />',
		  '<br/><span>{xtype}</span>',
		'</div>'
	),
	*/
	//store: 'UserMenu',
	autoScroll: true,
	selModel: {
		mode: 'SINGLE',
		listeners: {
			scope: this
		}
	},
	listeners: {
		scope: this/*,
		contextmenu: this.onContextMenu,
		viewready: this.onViewReady
		*/
	},
	trackOver: true,
	
	initComponent: function () {
		var gorunum = {};
		if (YETKI.isAdmin()) {
			Ext.apply(gorunum, {
				cls: 'feed-list',
				itemSelector: '.feed-list-item',
				overItemCls: 'feed-list-item-hover',
				tpl: '<tpl for="."><div class="feed-list-item" xtype="{xtype}">{title}</div></tpl>'				
			});
		} else {
			Ext.apply(gorunum, {
				//cls: 'feed-list',
				//itemSelector: '.feed-list-item',
				//overItemCls: 'feed-list-item-hover',
				cls: 'img-chooser-view',
			    overItemCls: 'x-view-over',
			    itemSelector: 'div.thumb-wrap',
				tpl: imageTplAdminDisi //'<tpl for="."><div class="feed-list-item" xtype="{xtype}">{title}</div></tpl>'				
			});			
		}
		Ext.apply(this, gorunum);
		this.callParent(arguments);
	}
	
});