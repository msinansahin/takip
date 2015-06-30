Ext.define('Egitim.lib.SimpleLink', {
    extend: 'Ext.Component',
    alias: 'widget.simplelink',
    
    baseCls: Ext.baseCSSPrefix + 'simplelink',
    autoEl: {
        tag: 'a',
        href: '#'
    },
    renderTpl: '{text}',
    
    initComponent: function() {
        this.renderData = {
            text: this.text
        };
        
        this.addEvents('click');
        this.callParent(arguments);
    },
    
    afterRender: function() {
        this.mon(this.getEl(), 'click', this.handler, this);
    },
    
    handler: function (){
    	this.fireEvent('click', this);
    }
});