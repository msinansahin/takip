/**
 * Eğitime tanımlanmış eğitmenler
 */
var imageTplEgitmen = new Ext.XTemplate(
		'<tpl for=".">',
		'<div class="thumb-wrap">',
		    '<div class="thumb">',
		    (!Ext.isIE6? '<img src="{src}" />' : 
		    '<div style="width:74px;height:74px;filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'{src}\')"></div>'),
		    '</div>',
		    '<span>{adSoyad}</span>',
		'</div>',
		'</tpl>'
	);


Ext.define('Egitim.view.EgitimEgitmenView', {
	extend: 'Ext.view.View',
	alias: 'widget.egitimegitmenview',
	requires: ['Egitim.store.EgitimEgitmenStore', 'Egitim.model.ImageEgitmen'],
	selModel: {
		mode: 'MULTI',
		listeners: {
			scope: this
		}
	},
    tpl: imageTplEgitmen,
    autoScroll : true,
    cls: 'img-chooser-view',
    overItemCls: 'x-view-over',
    itemSelector: 'div.thumb-wrap',
    tbar: [{
    	text: 'Sil'
    }],
    initComponent: function (){
    	var me= this;
    	this.store = Ext.create('Egitim.store.EgitimEgitmenStore');
    	this.callParent(arguments);
    }
	
});