/**
 * Eğitmenin dahil olduğu eğitimleri gösteriri
 */
var imageTpl = new Ext.XTemplate(
		'<tpl for=".">',
		'<div class="thumb-wrap">',
		    '<div class="thumb">',
		    (!Ext.isIE6? '<img src="{src}" />' : 
		    '<div style="width:74px;height:74px;filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'{src}\')"></div>'),
		    '</div>',
		    '<span class="dataview-text">{baslik}</span>',
		'</div>',
		'</tpl>'
	);


Ext.define('Image', {
    extend: 'Ext.data.Model',
    fields: [
        { name:'id'},
        { name:'src', type:'string' },
        { name:'baslik', type:'string' }
    ]
});

Ext.create('Ext.data.Store', {
    id:'imagesStore',
    model: 'Image',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'egitmens/listEgitmenEgitim',
        reader: {
            type: 'json',
            root: 'results'
        }
    }
});

Ext.define('Egitim.view.EgitmenEgitimView', {
	extend: 'Ext.view.View',
	alias: 'widget.egitmenegitimview',
	store: Ext.data.StoreManager.lookup('imagesStore'),
	selModel: {
		mode: 'MULTI',
		listeners: {
			scope: this
		}
	},
    tpl: imageTpl,
    autoScroll : true,
    cls: 'img-chooser-view',
    overItemCls: 'x-view-over',
    itemSelector: 'div.thumb-wrap',
    tbar: [{
    	text: 'Sil'
    }]
	
});