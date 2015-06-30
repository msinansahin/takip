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
class UygEgitimDokumani extends AppModel {
	public $virtualFields = array(
		'egitim_kod' => "select e.kod from egitims e where e.id = UygEgitimDokumani.egitim_id",
		'egitim_baslik' => "select e.baslik from egitims e where e.id = UygEgitimDokumani.egitim_id"
	);
	public $actsAs = array(
		'Upload.Upload' => array(
			'dokuman' => array(
				'fields' => array(
					'dir' => 'dokuman_dir',
					'type' => 'tur',
					'size' => 'size',
					'filename'=> 'dokuman'
				)
			)
		)
	);
	
	public function createWithAttachment($data, $egitmenId) {
		
		//debug($data, true);
		$this->create();
		$data['UygEgitimDokumani']['id'] = $data['id'];
		$data['UygEgitimDokumani']['kod'] = $data['kod'];
		$data['UygEgitimDokumani']['baslik'] = $data['baslik'];
		$data['UygEgitimDokumani']['aciklama'] = $data['aciklama'];
		if (!empty($data['indirilebilir'])) {
			$data['UygEgitimDokumani']['indirilebilir'] = $data['indirilebilir'];
		} else {
			$data['UygEgitimDokumani']['indirilebilir'] = 0;
		} 
			
		$data['UygEgitimDokumani']['egitim_id'] = $data['egitim_id'];
		//$data['UygEgitimDokumani']['dokuman'] = $data['UygEgitimDokumani']['dokuman']['name'];
		$data['UygEgitimDokumani']['proje_id'] = $data['proje_id'];
		$data['UygEgitimDokumani']['egitmen_id'] = $egitmenId;
		
		$realFileName = $data['UygEgitimDokumani']['dokuman']['name'];
		
		if (!empty($realFileName)) {
			$var = explode('.',$realFileName);
			$var = end($var);
			$ext = strtolower($var);
			$data['UygEgitimDokumani']['uzanti'] = $ext;
			
			if ($this->saveAll($data)) {
				return true;
			}
		} else { //dosya yüklenmeden güncellendiyse
			if ($this->saveAll($data)) {
				return true;
			}
		}
		
		// Throw an exception for the controller
		throw new Exception(__("This post could not be saved. Please try again"));
	}
}