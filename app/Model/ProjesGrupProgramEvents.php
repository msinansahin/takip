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
 * ProjesEgitim model .
 *
 * @package       app.Model
 */
class ProjesGrupProgramEvents extends AppModel {
	public $virtualFields = array(
		'egitmen_adsoyad' => "select concat(e.ad, ' ', e.soyad) from egitmens e where e.id = ProjesGrupProgramEvents.egitmen_id",
		'egitim_baslik' => "select eg.baslik from egitims eg where eg.id = ProjesGrupProgramEvents.egitim_id"
	);
}