/**
 * Eğitime tanımlanmış eğitmenler
 */
var imageTplGrup = new Ext.XTemplate(
		'<tpl for=".">',
		'<div class="thumb-wrap">',
		    '<div class="thumb">',
		    (!Ext.isIE6? '<img src="{src}" />' : 
		    '<div style="width:74px;height:74px;filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'{src}\')"></div>'),
		    '</div>',
		    '<span>{baslik}</span>',
		'</div>',
		'</tpl>'
	);


Ext.define('ImageGrup', {
    extend: 'Ext.data.Model',
    fields: [
        {name:'id'},
        {name:'src', type:'string'},
        {name:'baslik', type:'string'},
        {name:'proje_id', type:'string'}
    ]
});

Ext.create('Ext.data.Store', {
    id:'projeGrupStore',
    model: 'ImageGrup',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'projes/listProjeGrup',
        reader: {
            type: 'json',
            root: 'results'
        }
    }
});

Ext.define('Egitim.view.proje.ProjeGrupView', {
	extend: 'Ext.view.View',
	alias: 'widget.projegrupview',
	store: Ext.data.StoreManager.lookup('projeGrupStore'),
	selModel: {
		mode: 'SINGLE',
		listeners: {
			scope: this
		}
	},
    tpl: imageTplGrup,
    autoScroll : true,
    overItemCls: 'x-view-over',
    itemSelector: 'div.thumb-wrap'
	
});