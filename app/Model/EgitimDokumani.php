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
 * EgitimsEgitmen model .
 *
 * @package       app.Model
 */
class EgitimDokumani extends AppModel {
	public $actsAs = array(
		'Upload.Upload' => array(
			'dokuman' => array(
				'fields' => array(
					'dir' => 'dok_dir',
					'type' => 'tur',
					'size' => 'size',
					'filename'=> 'dosya_ismi'
				)
			)
		)
	);
	
	public function createWithAttachment($data) {
		
		//debug($data, true);
		$this->create();
		$data['EgitimDokumani']['kod'] = $data['kod'];
		$data['EgitimDokumani']['baslik'] = $data['baslik'];
		$data['EgitimDokumani']['aciklama'] = $data['aciklama'];
		if (!empty($data['indirilebilir'])) {
			$data['EgitimDokumani']['indirilebilir'] = $data['indirilebilir'];
		} else {
			$data['EgitimDokumani']['indirilebilir'] = 0;
		} 
			
		$data['EgitimDokumani']['egitim_id'] = $data['egitim_id'];
		$data['EgitimDokumani']['dosya_ismi'] = $data['EgitimDokumani']['dokuman']['name'];
		
		$realFileName = $data['EgitimDokumani']['dosya_ismi'];
		
		$var = explode('.',$realFileName);
		$var = end($var);
		$ext = strtolower($var);
		$data['EgitimDokumani']['uzanti'] = $ext;
		
		
		if ($this->saveAll($data)) {
			return true;
		}
		
		// Throw an exception for the controller
		throw new Exception(__("This post could not be saved. Please try again"));
		
	}
}