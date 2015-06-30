Ext.define('Egitim.lib.LabelRequired', {

        extend: 'Ext.AbstractPlugin',

        alias: 'plugin.formlabelrequired',

        asterisk: ' <span class="required"> *</span>',

        constructor: function() {

            this.callParent(arguments);

        },

        init: function(formPanel) {
            formPanel.on('beforerender', this.onBeforeRender, this);
        },

        /**
         * @private
         * Adds asterisk to labels.
         */
        onBeforeRender: function(formPanel) {

            var i, len, items, item;
            
            items = formPanel.query('[allowBlank=false]');

            for (i = 0, len = items.length; i < len; i++) {
                item = items[i];
                item.afterLabelTextTpl = (item.afterLabelTextTpl || "") + this.asterisk;
                //item.requiredCls  = 'required';
            }

            return true;

        }

    });