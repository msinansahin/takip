/**
 * Projeye tanımlanmış anketler
 */
var imageTplAnket = new Ext.XTemplate(
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


Ext.define('Egitim.view.proje.ProjeAnketView', {
	extend: 'Ext.view.View',
	alias: 'widget.projeanketview',
	requires: ['Egitim.store.ProjeAnketStore', 'Egitim.model.ImageAnket'],
	selModel: {
		mode: 'MULTI',
		listeners: {
			scope: this
		}
	},
    tpl: imageTplAnket,
    autoScroll : true,
    cls: 'img-chooser-view',
    overItemCls: 'x-view-over',
    itemSelector: 'div.thumb-wrap',
    
    initComponent: function (){
    	this.store = Ext.create('Egitim.store.ProjeAnketStore');
    	this.callParent(arguments);
    }
	
});