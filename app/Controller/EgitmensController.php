<?php
/**
 * Application level Controller
 *
 * This file is application-wide controller file. You can put all
 * application-wide controller-related methods here.
 *
 * CakePHP(tm) : Rapid Development Framework (http://cakephp.org)
 * Copyright (c) Cake Software Foundation, Inc. (http://cakefoundation.org)
 *
 * Licensed under The MIT License
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Cake Software Foundation, Inc. (http://cakefoundation.org)
 * @link          http://cakephp.org CakePHP(tm) Project
 * @package       app.Controller
 * @since         CakePHP(tm) v 0.2.9
 * @license       http://www.opensource.org/licenses/mit-license.php MIT License
 */
App::uses('Controller', 'Controller');
App::uses('Folder', 'Utility');
App::uses('File', 'Utility');

/**
 * Application Controller
 *
 * Add your application-wide methods in the class below, your controllers
 * will inherit them.
 *
 * @package		app.Controller
 * @link		http://book.cakephp.org/2.0/en/controllers.html#the-app-controller
 */

class N {
	var $id;
	var $baslik;
	var $kod;
	var $src;

};

class N1 {
	var $id;
	var $adSoyad;
	var $src;

};

class EgitmensController extends AppController {
	public $helpers = array('Html', 'Form');
	public $components = array('Paginator');
	public $paginate = array(
		'limit' => 5,
		'order' => array(
			'Egitmen.ad' => 'asc'
		)
	);
	public function index() {
		$this->set('egitmens', $this->Egitmen->find('all'));
	}
	
	public function listEgitmen () {
		$this->layout = null ;
		$this->Paginator->settings = $this->paginate;
		$this->Paginator->settings = array(
			'conditions' => array('Egitmen.ad LIKE' => $this->request->query('ad') . '%'),
			'limit' => $this->request->query('limit'),
			'page' => $this->request->query('page')
		);
		
		
		
		if ($this->request->query('sort')) {
			$sortArr = json_decode($this->request->query['sort'], true);
			if (count($sortArr) == 1) {
				$property =  $sortArr[0]['property'];
				$direction =  $sortArr[0]['direction'];
				$this->Paginator->settings['order'] =  array(
					'Egitmen.' . $property => $direction
				);
			}			
		}

		// similar to findAll(), but fetches paged results
		$data = $this->Paginator->paginate('Egitmen');
		//debug($data, true);

		//eğitme kayıtlarına aldığı eğitimleri de ekle
		for ($i = 0; $i < count($data); $i++) {
			$resultEgitimler = $this->__listEgitmenEgitim($data[$i]['Egitmen']['id']);
			$data[$i]['Egitmen']['egitimler'] = $resultEgitimler;
		}
		
		//$this->Paginator->counter();//$this->Paginator->paging['count']; //$this->Paginator->find('count');
		$count = $this->params['paging']['Egitmen']['count'];
		//debug($data, true);
		$this->set('egitmens', $data);
		$this->set('count', $count);
	}
	
	/**
	 * Eğitmen'in eğitimlerini listeler
	 */
	public function listEgitmenEgitim () {
		$id = $this->request->query('id');
		if (!$id) {
			$id = $this->request->data->id;
		}
		$this->autoRender = false;
		$this->layout = 'ajax';
		//$data = $this->Egitmen->read(null, $id);
		//debug($data, true);
		//$egitimler = $data('Egitimler');
		
		$resultEgitimler = $this->__listEgitmenEgitim($id);
		
		echo "{results:" . json_encode($resultEgitimler) . "}";
		
	}
	
	/**
	 * 
	 */
	function __listEgitmenEgitim ($id = null) {
		$egitmenEgitim = ClassRegistry::init("EgitimsEgitmen");
		$egitimIdArr = $egitmenEgitim->find('all', array(
				'fields' => array('egitim_id'),
				'conditions' => array('EgitimsEgitmen.egitmen_id ='.$id)
		));
		
		$egitimIds = array();
		array_push($egitimIds, -1); //dummy eklemek gerekiyor, tek gelince sql patlıyor //TODO
		array_push($egitimIds, -2);
		foreach ($egitimIdArr as $egtEgt) {
			array_push($egitimIds, $egtEgt['EgitimsEgitmen']['egitim_id']);
		}
		
		//debug($egitimIds, true);
		$egitim = ClassRegistry::init("Egitim");
		$egitimler = $egitim->find('all', array(
				'fields' => array('id', 'baslik', 'kod'),
				'conditions' => array('Egitim.id in ' => $egitimIds)
		));
		
		//debug($egitimler, true);
		
		$resultEgitimler = array();
		foreach ($egitimler as $egt) {
			$node = new N();
			$node->id = $egt['Egitim']['id'];
			$node->baslik = $egt['Egitim']['baslik'];
			$node->kod = $egt['Egitim']['kod'];
			$node->src = 'egitimapp/resources/images/egitim_big.png';
			array_push($resultEgitimler, $node);
		}
		
		return $resultEgitimler;
	}
	
	/**
	 * Eğitime dahil olmuş eğitmenleri döner<br>
	 * eğer egitimId boş gelirse bütün eğitmenleri döner
	 * @param string $egitimId
	 */
	public function listEgitimEgitmen () {
		$this->autoRender = false;
		$this->layout = 'ajax';

		$egitimId = $this->request->query('egitimId');
		if (empty($egitimId)) {
			$egitimId = $this->request->data('egitimId');
		}
		
		$conditions = array('1 = 1');
		if (!empty($egitimId)) {
			$conditions['EgitimsEgitmen.egitim_id'] = $egitimId;
		}
		
		$this->Egitmen->bindModel(array('hasOne' => array('EgitimsEgitmen')));
		//debug($egitimId, true);
		//FIXME daha kısıtlı bilgi al
		$data = $this->Egitmen->find('all', array(
				'fields' => array('id', 'ad', 'soyad', 'cinsiyet'),
				'conditions' => $conditions,//array('EgitimsEgitmen.egitim_id' => $egitimId),
				'contain' => array()
				//'recursive' => 2
		));
		
		$resultEgitmenler = array();
		foreach ($data as $egitmen) {
			$egt = $egitmen['Egitmen'];
			$node = new N1();
			$node->id = $egt['id'];
			$node->adSoyad = $egt['ad'] . ' ' . $egt['soyad'];
			if (empty($egt['cinsiyet'])) {
				$node->src = 'egitimapp/resources/images/egitmen_K_big.png';
			} else {
				$node->src = 'egitimapp/resources/images/egitmen_' . $egt['cinsiyet'] . '_big.png';
			}
			array_push($resultEgitmenler, $node);
		}
		echo "{results:" . json_encode($resultEgitmenler) . "}";
		
	}
	
	public function save() {
		//$this->layout = null ;
		$this->autoRender = false;
		$this->layout = 'ajax';
		//CakeLog::write('debug',"data " . $this->data);
		$media = ClassRegistry::init('Media');
		//debug($media, true);
		
		if ($this->request->is('post')) {
			
			//debug($this->request->data('kod'), true);
			//aynı kodlu eğitmen varsa hata ver
			
			$egitmenKodu = $this->request->data('kod');
			$kontrol = $this->Egitmen->find('first', array(
					'conditions' => array(
							'kod = ' => $egitmenKodu,
							'id != ' =>  $this->request->data('id')
					)
			));
			
			CakeLog::debug('kod: '. $egitmenKodu. ' id: '. $this->request->data('id'));
			//debug($kontrol, true);
			if (count($kontrol) > 0) {
				echo "{msg:'Eğitmen Kodu [" . $egitmenKodu . "] kullanılıyor. Başka bir kod giriniz.', success: false}";
				return;
			}
			
			$this->Egitmen->create();
			$result = FALSE;
			$cv_media_id = null;
			$tempFilePath = $_FILES['cvdata']['tmp_name'];
			
			//CakeLog::write('debug', 'filename: '. $tempFilePath);
			//CakeLog::write('debug', 'filename: '. $_FILES['cvdata']['name']);
			$data = $this->request->data;
				
			$cv_media_id = null;
			if (!empty($tempFilePath)) {
				$realFileName = $_FILES['cvdata']['name'];
				
				CakeLog::write('debug', 'filesize: '. filesize($tempFilePath ));
				$fileSize = filesize($tempFilePath);
				$fileData = fread(fopen($tempFilePath, "r"), $fileSize);
					
				$var = explode('.',$realFileName);
				$var = end($var);
				$ext = strtolower($var);
					
				$tur = $ext; // strtolower(end(explode(".", $realFileName)));
				$media->save(array(
						'name' => ($realFileName),
						'ext' => $tur,
						'content' => ($fileData),
						'size' => $fileSize,
						'type' => $tur
				));
				
				$cv_media_id = $media->id;
				$data['cv_media_id'] = $cv_media_id;
			}
			
			//Debugger::log($data);
			$result = $this->Egitmen->save($data);
			//Debugger::log($this->Egitmen);
			
			if ($result) {
				echo "{msg:'Eğitmen Başarıyla Kaydedildi', success: true}";
			} else {
				echo "{msg:'hatalı', success: false}";
			}
		}
	}
	
	public function delete($id = null) {
		//$this->layout = null ;
		$this->autoRender = false;
		$this->layout = 'ajax';
		
		if ($this->isEgitmenSilinemez($id)) {
			echo "{msg:'Eğitmen Silinemez (Etkinliklerde kullanılmış veya uyg.eğt. dokümanı yüklemiş)', success: false}";
			return;
		}
		
		$this->Egitmen->id = $id;
		
		if ($this->Egitmen->delete()) {
			echo "{msg:'Eğitmen Başarıyla Silindi', success: true}";
		} else {
			echo "{msg:'hatalı', success: false}";
		}
	
	}
	
	public function load($id = null) {
		$this->layout='ajax' ;
		$this->Egitmen->id = $id;
		if (!$this->Egitmen->exists()) {
			//throw new NotFoundException(__('Invalid user'));
		}
		$this->set('egitmen', $this->Egitmen->read(null, $id));
	}
	
	public function downloadCV($id = null) {
		$this->autoRender = false;
		$this->layout = 'ajax';
		
		$this->Egitmen->id = $id;
		if (!$this->Egitmen->exists()) {
			//throw new NotFoundException(__('Invalid user'));
		}
		$egitmen = $this->Egitmen->read(null, $id);
		//debug($egitmen, true);
		$cvMediaId = $egitmen['Egitmen']['cv_media_id'];
		$this->viewClass = 'Media';
		$media = ClassRegistry::init('Media');
		$media->id = $cvMediaId;
		
		$mediaData = $media->read()['Media'];
		
		$filename = $mediaData['name'];
		$this->Eposta = $this->Components->load('Eposta');
		header('Content-type: ' . $this->Eposta->mimeContentType( $filename ));
		header('Content-length: ' . $mediaData['size']);
		header('Content-Disposition: attachment; filename='. $filename);
		
		
		//debug($media, true);
		echo  $media->read()['Media']['content'];
		exit();
		//echo $cvMediaId;
	}
	
	public function saveEgitim () {
		$this->autoRender = false;
		$this->layout = 'ajax';
		
		$egitimsEgitmen = ClassRegistry::init('EgitimsEgitmen');
		$dataSource = $egitimsEgitmen->getDataSource();
		$egitmenId = $this->request->query('egitmenId');
		$egitimIds = split(",", $this->request->query('egitimIds'));
		
		//debug($egitimIds, true);
		
		$result = $egitimsEgitmen->deleteAll(array('egitmen_id' => $egitmenId), false);
		if ($result) {
			if (count($egitimIds) > 0) {
				foreach ($egitimIds as $egitimId) {
					if ($egitimId != NULL) {
						$egitimsEgitmen->create();
						$egitimsEgitmen->save(array(
								'egitmen_id' => $egitmenId,
								'egitim_id' => $egitimId
						));
					}
				}
			}			
		}
		
		if ($result) {
			$dataSource->commit();
		} else {
			$dataSource->rollback();
		}
		
		if ($result) {
			echo "{msg:'Eğitim(ler) Başarıyla Kaydedildi', success: true}";
		} else {
			echo "{msg:'hatalı', success: false}";
		}
	}
	
	/**
	 * Eğitmenin silinip silinemeyeceği kontrol edilir<br>
	 * proje ektinliklerinde kullanıldıysa<br>
	 * uyg egitim dokümanlarında kaydı varsa<br>
	 * silinmez
	 * @param unknown $id
	 */
	public function isEgitmenSilinemez ($id=null) {
		if (empty($id)) {
			throw new InvalidArgumentException("id null olamaz");
		}
		$this->autoRender = false;
		$this->layout = 'ajax';
		$data = $this->Egitmen->query("SELECT count(1) as SAYI FROM projes_grup_program_events where egitmen_id = " . $id . ";");
		$sayi = intval($data[0][0]['SAYI']);
	
		if ($sayi <= 0) {
			$data = $this->Egitmen->query("SELECT count(1) as SAYI FROM uyg_egitim_dokumanis where egitmen_id = " . $id . ";");
			$sayi = intval($data[0][0]['SAYI']);
		}
		return $sayi > 0;
	}

}
