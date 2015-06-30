Ext.define('Egitim.model.Menu', {
    extend: 'Ext.data.Model',
    fields: ['id', 'xtype', 'title', 'modal', 'iconCls', 'menuCls'] //menuCls admin dışındaki kullanıcılar için
});