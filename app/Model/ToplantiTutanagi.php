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
 * Toplantı Tutanağı model .
 *
 * @package       app.Model
 */
class ToplantiTutanagi extends AppModel {
	public $virtualFields = array(
			'proje_baslik' => "select p.baslik from projes p where p.id = ToplantiTutanagi.proje_id",
			'proje_kod' => "select p.kod from projes p where p.id = ToplantiTutanagi.proje_id"
	);
}
