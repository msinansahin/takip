Ext.define('Egitim.view.tanimlar.EgitimKategoriTree', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.egitimkategoritree',
    requires: [
        'Ext.data.TreeStore'
    ],
    xtype: 'check-tree',
    
    rootVisible: false,
    useArrows: true,
    frame: true,
    title: 'Eğitim Türleri',
    width: 250,
    height: 300,
    selType: 'cellmodel',
    viewConfig:{
    	toggleOnDblClick: false
    },
    initComponent: function(){
    	
        Ext.apply(this, {
            store: new Ext.data.TreeStore({
            	autoLoad: false,
                proxy: {
                    type: 'ajax',
                    url: 'tanimlars/listEgitimKategori'
                },
                sorters: [{
                    property: 'leaf',
                    direction: 'ASC'
                }, {
                    property: 'text',
                    direction: 'ASC'
                }]
            }),
            tbar: [{
            	text: 'Ekle',
            	action: 'ekle'
            }]
        });
        Ext.override(Ext.data.AbstractStore,{
    	    indexOf: Ext.emptyFn
    	});
        
        this.addEvents('nodeedittamamlandi', 'silegitimkategori');
        
        this.callParent();
    },
    plugins: [Ext.create('Ext.grid.plugin.CellEditing', {
    	clicksToEdit: 2    	
    })],
    
    listeners: {
		edit: function (editor, node, e){
			console.log ('editting -> ' + node);
			editor.grid.fireEvent('nodeedittamamlandi', node, editor.grid);
		}
	},

	    
    columns : [ {
		xtype : 'treecolumn',
		dataIndex : 'text',
		flex : 1,
		sortable : true,
		editor : {
			xtype : 'textfield',
			allowBlank : false
		}
	}, {
        xtype:'actioncolumn',
        width:50,
        items: [{
            icon: 'egitimapp/resources/icons/delete.gif',
            tooltip: 'Sil',
            handler: function(tree, rowIndex, colIndex) {
                var rec = tree.getStore().getAt(rowIndex);
                tree.up('egitimkategoritree').fireEvent('silegitimkategori', tree, rec);
            },
            getClass: function (v, md, record){
            	return record.get('id') === 'Root' ? 'hidden' : '';
            }
        }]
    }],
    
    onCheckedNodesClick: function(){
        var records = this.getView().getChecked(),
            names = [];
                   
        Ext.Array.each(records, function(rec){
            names.push(rec.get('text'));
        });
                    
        Ext.MessageBox.show({
            title: 'Selected Nodes',
            msg: names.join('<br />'),
            icon: Ext.MessageBox.INFO
        });
    }
})