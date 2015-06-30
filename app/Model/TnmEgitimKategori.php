<?php
/**
 *
 * This file is application-wide model file. You can put all
 * application-wide model-related methods here.
 *
 * Licensed under The MIT License
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @author		sinan
 * @link		http://cakephp.org CakePHP(tm) Project
 * @package		app.Model
 * @since		EgitimApp(tm) v 0.0.1
 * @license		private
 */

/**
 * Egitmen model .
 *
 * @package       app.Model
 */
class TnmEgitimKategori extends AppModel {
	//public $actsAs = array('Tree');
	/*
	public $belongsTo = array(
        'Parent' => array(
            'className' => 'TnmEgitimKategori',
            'foreignKey' => 'parent_id'
        )
    );
	public $hasMany = array(
				'Children' => array(
						'className' => 'TnmEgitimKategori',
						'foreignKey' => 'parent_id',
						'conditions' => array('Children.id' => 'parent_id'),
						'limit' => '100',
						'dependent' => true
				)
	);
	*/
}
