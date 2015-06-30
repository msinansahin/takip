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
 * ProjesAnket model .
 *
 * @package       app.Model
 */
class ProjesAnket extends AppModel {
	public $virtualFields = array(
			'anket_tanim_baslik' => "select at.baslik from anket_tanims at where at.id = ProjesAnket.anket_id"
	);
}