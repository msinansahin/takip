/**
 * Eğitime tanımlanmış eğitmenler
 */
var imageTplEgitim = new Ext.XTemplate(
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


/*
Ext.define('ImageEgitim', {
    extend: 'Ext.data.Model',
    fields: [
        {name:'id'},
        {name:'src', type:'string'},
        {name:'baslik', type:'string'},
        {name:'egitmen_id', type:'string'}
    ]
});
*/


Ext.define('Egitim.view.proje.ProjeEgitimView', {
	extend: 'Ext.view.View',
	alias: 'widget.projeegitimview',
	requires: ['Egitim.store.ProjeEgitimStore', 'Egitim.model.ImageEgitim'],
	//store: Ext.data.StoreManager.lookup('projeEgitimStore'),
	selModel: {
		mode: 'MULTI',
		listeners: {
			scope: this
		}
	},
    tpl: imageTplEgitim,
    autoScroll : true,
    cls: 'img-chooser-view',
    overItemCls: 'x-view-over',
    itemSelector: 'div.thumb-wrap',
    
    initComponent: function (){
    	var me= this;
    	this.store = Ext.create('Egitim.store.ProjeEgitimStore');
    	this.callParent(arguments);
    }
	
});