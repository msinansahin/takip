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
 * Günlük Rapor model .
 *
 * @package       app.Model
 */
class GunlukRapor extends AppModel {
	/*
	public $hasMany = array(
			'Image' => array(
					'className' => 'Attachment',
					'foreignKey' => 'foreign_key',
					'conditions' => array(
							'Image.model' => 'GunlukRapor',
					),
			),
	);
	*/
	
	public $virtualFields = array(
			'proje_baslik' => "select p.baslik from projes p where p.id = GunlukRapor.proje_id",
			'proje_kod' => "select p.kod from projes p where p.id = GunlukRapor.proje_id"
	);
	
	public function createWithAttachments($data) {
		// Sanitize your images before adding them
		$images = array();
		if (!empty($data['Image'][0])) {
			foreach ($data['Image'] as $i => $image) {
				if (is_array($data['Image'][$i])) {
					// Force setting the `model` field to this model
					$image['model'] = 'GunlukRapor';
	
					$image['name'] = 'xxxx';
					
					// Unset the foreign_key if the user tries to specify it
					if (isset($image['foreign_key'])) {
						unset($image['foreign_key']);
					}
	
					$images[] = $image;
				}
			}
		}
		$data['Image'] = $images;
	
		// Try to save the data using Model::saveAll()
		$this->create();
		if ($this->saveAll($data)) {
			return true;
		}
	
		// Throw an exception for the controller
		throw new Exception(__("This post could not be saved. Please try again"));
	}
}
