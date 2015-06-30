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
 * Egitim model .
 *
 * @package       app.Model
 */
class Egitim extends AppModel {
	public $hasAndBelongsToMany  = array(
			'Egitimenler' => array(
					'className' => 'Egitmen',
			)
	);
	
	public $virtualFields = array(
			'kategori_adi' => 'select t.ad from tnm_egitim_kategoris t where t.id = Egitim.kategori'
	);

}
