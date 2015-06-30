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

App::Import('Model', 'ToplantiTutanagi');

class AdminsController extends AppController {
	public $helpers = array('Html', 'Form');
	public $components = array('Paginator');
	public $paginate = array(
		'limit' => 5,
		'order' => array(
			'Egitmen.ad' => 'asc'
		)
	);
	
	public function pass ($pass=null) {
		$this->autoRender=false;
		$this->layout = 'ajax';
		$this->Auth =  $this->Components->load('Auth');
		echo  $this->Auth->password($pass);
	}
	
	public function listToplantiTutanagi () {
		$this->layout = 'ajax';
		
		$this->ToplantiTutanagi = ClassRegistry::init('ToplantiTutanagi');
		
		$tarih = $this->request->query('tarih');
		$conditions = array();
		$conditions['ToplantiTutanagi.konu LIKE'] = $this->request->query('konu') . '%';
		
		if (!empty($tarih)) {
			$conditions['ToplantiTutanagi.tarih ='] = $tarih;
		}
		
		if ($this->isKatilimci()) {
			$projeId = $this->getProjeId();
			if (empty($projeId)) { //kişinin projesi girilmemişi hiçbir tutanak görmemeli
				$projeId = -1;
			}
			$conditions['ToplantiTutanagi.proje_id ='] = $projeId;
		}
		
		$this->paginate['ToplantiTutanagi'] = array(
			'conditions' => $conditions,
			'limit' => $this->request->query('limit'),
			'page' => $this->request->query('page')
		);
		
		if ($this->request->query('sort')) {
			$sortArr = json_decode($this->request->query['sort'], true);
			if (count($sortArr) == 1) {
				$property =  $sortArr[0]['property'];
				$direction =  $sortArr[0]['direction'];
				$this->paginate['ToplantiTutanagi']['order'] =  array(
					'ToplantiTutanagi.' . $property => $direction
				);
			}			
		}


		$this->Paginator->settings = $this->paginate['ToplantiTutanagi'];
		
		// similar to findAll(), but fetches paged results
		$data = $this->Paginator->paginate('ToplantiTutanagi');
		
		// similar to findAll(), but fetches paged results
		//$data = $this->paginate('ToplantiTutanagi');
		$count = $this->params['paging']['ToplantiTutanagi']['count'];
		//debug($data, true);
		$this->set('tts', $data);
		$this->set('count', $count);
		
	}
	
	public function listGunlukRapor () {
		$this->layout = 'ajax';
	
		$this->GunlukRapor = ClassRegistry::init('GunlukRapor');
	
		$tarih = $this->request->query('tarih');
		$conditions = array();
		$conditions['GunlukRapor.konu LIKE'] = $this->request->query('konu') . '%';
	
		if (!empty($tarih)) {
			$conditions['GunlukRapor.tarih ='] = $tarih;
		}
	
//		debug($this->getUserRol (), true);
		if ($this->isKatilimci()) {			
			$projeId = $this->getProjeId();
			if (empty($projeId)) { //kişinin projesi girilmemişi hiçbir tutanak görmemeli
				$projeId = -1;
			}
			$conditions['GunlukRapor.proje_id ='] = $projeId;
		}
	
		$this->paginate['GunlukRapor'] = array(
				'conditions' => $conditions,
				'limit' => $this->request->query('limit'),
				'page' => $this->request->query('page')
		);
	
		if ($this->request->query('sort')) {
			$sortArr = json_decode($this->request->query['sort'], true);
			if (count($sortArr) == 1) {
				$property =  $sortArr[0]['property'];
				$direction =  $sortArr[0]['direction'];
				$this->paginate['GunlukRapor']['order'] =  array(
						'GunlukRapor.' . $property => $direction
				);
			}
		}
	
	
		$this->Paginator->settings = $this->paginate['GunlukRapor'];
	
		// similar to findAll(), but fetches paged results
		$data = $this->Paginator->paginate('GunlukRapor');
	
		// similar to findAll(), but fetches paged results
		//$data = $this->paginate('GunlukRapor');
		$count = $this->params['paging']['GunlukRapor']['count'];
		//debug($data, true);
		$this->set('grs', $data);
		$this->set('count', $count);
	
	}
	
	public function saveGunlukRapor() {
		//$this->layout = null ;
		$this->autoRender = false;
		$this->layout = 'ajax';
		//CakeLog::write('debug',"data " . $this->data);
		$media = ClassRegistry::init('Media');
		$gunlukRapor = ClassRegistry::init('GunlukRapor');
		//debug($media, true);
		if ($this->request->is('post')) {
			$gunlukRapor->create();
			$result = FALSE;
				
			$data = $this->request->data;
			$data['user_id'] = $this->getUserId();
			$dokuman_media_id = null;
				
			$tempFilePath = $_FILES['dokumandata']['tmp_name'];
				
			//CakeLog::write('debug', 'filename: '. $tempFilePath);
			//CakeLog::write('debug', 'filename: '. $_FILES['cvdata']['name']);
				
			if (!empty($tempFilePath)) {
				$realFileName = $_FILES['dokumandata']['name'];
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
	
				$dokuman_media_id = $media->id;
				$data['dokuman_media_id'] = $dokuman_media_id;
			}
				
			//Debugger::log($data);
			$result = $gunlukRapor->save($data);
			//Debugger::log($gunlukRapor);
				
			if ($result) {
				echo "{msg:'Günlük Rapor Başarıyla Kaydedildi', success: true}";
			} else {
				echo "{msg:'hatalı', success: false}";
			}
		}
	}
	
	public function listEgitmenEgitim () {
		$id = $this->request->query('id');
		if (!$id) {
			$id = $this->request->data->id;
		}
		$this->autoRender = false;
		$this->layout = 'ajax';
		$data = $this->Egitmen->read(null, $id);
		$egitimler = $data['Egitimler'];
		
		$resultEgitimler = array();
		foreach ($egitimler as $egitim) {
			$node = new N();
			$node->id = $egitim['id'];
			$node->baslik = $egitim['baslik'];
			$node->src = 'egitimapp/resources/images/egitim_big.png';
			array_push($resultEgitimler, $node);
		}
		echo "{results:" . json_encode($resultEgitimler) . "}";
		
	}
	
	/**
	 * Eğitime dahil olmuş eğitmenleri döner
	 * @param string $egitimId
	 */
	public function listEgitimEgitmen () {
		$this->autoRender = false;
		$this->layout = 'ajax';

		$egitimId = $this->request->query('egitimId');
		if (!$egitimId) {
			$egitimId = $this->request->data->egitimId;
		}
		
		$this->Egitmen->bindModel(array('hasOne' => array('EgitimsEgitmen')));
		
		//FIXME daha kısıtlı bilgi al
		$data = $this->Egitmen->find('all', array(
				'fields' => array('id', 'ad', 'soyad'),
				'conditions' => array('EgitimsEgitmen.egitim_id' => $egitimId),
				'contain' => array()
				//'recursive' => 2
		));
		
		$resultEgitmenler = array();
		foreach ($data as $egitmen) {
			$egt = $egitmen['Egitmen'];
			$node = new N1();
			$node->id = $egt['id'];
			$node->adSoyad = $egt['ad'] . ' ' . $egt['soyad'];
			$node->src = 'egitimapp/resources/images/egitmen_big.png';
			array_push($resultEgitmenler, $node);
		}
		echo "{results:" . json_encode($resultEgitmenler) . "}";
		
	}
	
	//eteçmintli
	function __saveToplantiTutanagi() {
		$this->autoRender = false;
		$this->layout = 'ajax';
		if ($this->request->is('post')) {
			$toplantiTutanagi = ClassRegistry::init('ToplantiTutanagi');
			try {
				$toplantiTutanagi->createWithAttachments($this->request->data);
				//$this->Session->setFlash(__('The message has been saved'));
				echo "{msg:'Toplantı Tutanağı Başarıyla Kaydedildi', success: true}";
			} catch (Exception $e) {
				echo "{msg:'hatalı', success: false}";
				//$this->Session->setFlash($e->getMessage());
			}
		}
		
	}
	
	public function saveToplantiTutanagi() {
		//$this->layout = null ;
		$this->autoRender = false;
		$this->layout = 'ajax';
		//CakeLog::write('debug',"data " . $this->data);
		$media = ClassRegistry::init('Media');
		$toplantiTutanagi = ClassRegistry::init('ToplantiTutanagi');
		//debug($media, true);
		if ($this->request->is('post')) {
			$toplantiTutanagi->create();
			$result = FALSE;
			
			$data = $this->request->data;
			$dokuman_media_id = null;
			
			$tempFilePath = $_FILES['dokumandata']['tmp_name'];
			
			//CakeLog::write('debug', 'filename: '. $tempFilePath);
			//CakeLog::write('debug', 'filename: '. $_FILES['cvdata']['name']);
			
			if (!empty($tempFilePath)) {
				$realFileName = $_FILES['dokumandata']['name'];
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
				
				$dokuman_media_id = $media->id;
				$data['dokuman_media_id'] = $dokuman_media_id;
			}
			
			//Debugger::log($data);
			$result = $toplantiTutanagi->save($data);
			//Debugger::log($toplantiTutanagi);
			
			if ($result) {
				echo "{msg:'Toplantı Tutanağı Başarıyla Kaydedildi', success: true}";
			} else {
				echo "{msg:'hatalı', success: false}";
			}
		}
	}
	
	public function deleteToplantiTutanagi ($id = null){
		$this->autoRender = false;
		$this->layout = 'ajax';

		
		$toplantiTutanagi = ClassRegistry::init('ToplantiTutanagi');
		$toplantiTutanagi->id = $id;
		
		if ($toplantiTutanagi->delete()) {
			echo "{msg:'Toplantı Tutanağı Başarıyla silindi', success: true}";
		} else {
			echo "{msg:'hatalı', success: false}";
		}
	}
	
	public function deleteAnketTanimSoru ($id = null){
		$this->autoRender = false;
		$this->layout = 'ajax';

		
		$ats = ClassRegistry::init('AnketTanimSoru');
		$ats->id = $id;
		
		if ($ats->delete()) {
			echo "{msg:'Soru Başarıyla silindi', success: true}";
		} else {
			echo "{msg:'Hatalı', success: false}";
		}
	}
	
	public function deleteGunlukRapor ($id = null){
		$this->autoRender = false;
		$this->layout = 'ajax';

		//TODO kullanıcı silebilir mi kontrolü yap
		$gunlukRapor = ClassRegistry::init('GunlukRapor');
		$gunlukRapor->id = $id;
	
		if ($gunlukRapor->delete()) {
			echo "{msg:'Günlük Rapor Başarıyla silindi', success: true}";
		} else {
			echo "{msg:'hatalı', success: false}";
		}
	}
	
	function delete($id = null) {
		//$this->layout = null ;
		$this->autoRender = false;
		$this->layout = 'ajax';
		
		$this->Egitmen->id = $id;
		
		if ($this->Egitmen->delete()) {
			echo "{msg:'Silme Başarıyla Tamamlandı', success: true}";
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
	
	public function downloadTTDokuman($ttId = null) {
		$this->autoRender = false;
		$this->layout = 'ajax';
		
		$toplantiTutanagi = ClassRegistry::init('ToplantiTutanagi');
		
		$toplantiTutanagi->id = $ttId;
		if (!$toplantiTutanagi->exists()) {
			throw new NotFoundException(__('Geçersiz tt'));
		}
		$tt = $toplantiTutanagi->read(null, $ttId);
		//debug($egitmen, true);
		$dokMediaId = $tt['ToplantiTutanagi']['dokuman_media_id'];
		$this->viewClass = 'Media';
		$media = ClassRegistry::init('Media');
		$media->id = $dokMediaId;
		
		$mediaData = $media->read()['Media'];
		
		$filename = $mediaData['name'];
		$this->Eposta = $this->Components->load('Eposta');
		header('Content-type: ' . $this->Eposta->mimeContentType( $filename ));
		header('Content-length: ' . $mediaData['size']);
		header('Content-Disposition: attachment; filename='. $mediaData['name']);
		
		
		//debug($media, true);
		echo  $media->read()['Media']['content'];
		exit();
		//echo $cvMediaId;
	}
	
	public function downloadGRDokuman($grId = null) {
		$this->autoRender = false;
		$this->layout = 'ajax';
	
		$gunlukRapor = ClassRegistry::init('GunlukRapor');
	
		$gunlukRapor->id = $grId;
		if (!$gunlukRapor->exists()) {
			throw new NotFoundException(__('Geçersiz gr'));
		}
		$gr = $gunlukRapor->read(null, $grId);
		//debug($egitmen, true);
		$dokMediaId = $gr['GunlukRapor']['dokuman_media_id'];
		$this->viewClass = 'Media';
		$media = ClassRegistry::init('Media');
		$media->id = $dokMediaId;
	
		$mediaData = $media->read()['Media'];
	
		$filename = $mediaData['name'];
		$this->Eposta = $this->Components->load('Eposta');
		header('Content-type: ' . $this->Eposta->mimeContentType( $filename ));
		header('Content-length: ' . $mediaData['size']);
		header('Content-Disposition: attachment; filename='. $mediaData['name']);
	
	
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
			echo "{msg:'Başarıyla Tamamlandı', success: true}";
		} else {
			echo "{msg:'hatalı', success: false}";
		}
	}
	
	public function loadToplantiTutanagi($id = null) {
		$this->layout='ajax' ;

		$toplantiTutanagi = ClassRegistry::init('ToplantiTutanagi');
		$toplantiTutanagi->id = $id;
		if (!$toplantiTutanagi->exists()) {
			throw new NotFoundException(__('Geçersiz toplantı tutanağı'));
		}
		$data = $toplantiTutanagi->read(null, $id);
		//debug($data, true);
		//$data['ToplantiTutanagi']['Dokumanlar'] = $data['Dokuman'];
		$this->set('tt', $data);
	}
	
	public function loadGunlukRapor($id = null) {
		$this->layout='ajax' ;
	
		$gunlukRapor = ClassRegistry::init('GunlukRapor');
		$gunlukRapor->id = $id;
		if (!$gunlukRapor->exists()) {
			throw new NotFoundException(__('Geçersiz günlük rapor'));
		}
		$data = $gunlukRapor->read(null, $id);
		//debug($data, true);
		//$data['GunlukRapor']['Dokumanlar'] = $data['Dokuman'];
		$this->set('gr', $data);
	}
	
	public function viewToplantiTutanagi ($id = null){
		$this->layout='ajax' ;
		
		$toplantiTutanagi = ClassRegistry::init('ToplantiTutanagi');
		$toplantiTutanagi->id = $id;
		if (!$toplantiTutanagi->exists()) {
			throw new NotFoundException(__('Geçersiz toplantı tutanağı'));
		}
		//debug($toplantiTutanagi, true);
		$this->set('toplantiTutanagi', $toplantiTutanagi->read(null, $id));
	}
	
	public function viewGunlukRapor ($id = null){
		$this->layout='ajax' ;
	
		$gunlukRapor = ClassRegistry::init('GunlukRapor');
		$gunlukRapor->id = $id;
		if (!$gunlukRapor->exists()) {
			throw new NotFoundException(__('Geçersiz günlük rapor'));
		}
		//debug($toplantiTutanagi, true);
		$this->set('gunlukRapor', $gunlukRapor->read(null, $id));
	}
	
	public function __saveGunlukRapor() {
		if ($this->request->is('post')) {
			$gunlukRapor = ClassRegistry::init('GunlukRapor');
			try {
				$gunlukRapor->createWithAttachments($this->request->data);
				$this->Session->setFlash(__('The message has been saved'));
			} catch (Exception $e) {
				$this->Session->setFlash($e->getMessage());
			}
		}
	}
	
	public function saveAnketTanim () {
		$this->layout = null ;
		$this->autoRender = false;
		if ($this->request->is('post')) {
				
			$anketTanimKodu = $this->request->data('kod');
			$anketTanim = ClassRegistry::init("AnketTanim");
			$kontrol = $anketTanim->find('first', array(
					'conditions' => array(
							'kod = ' => $anketTanimKodu,
							'id != ' =>  $this->request->data('id')
					)
			));
		
			CakeLog::debug('kod: '. $anketTanimKodu. ' id: '. $this->request->data('id'));
			//debug($kontrol, true);
			if (count($kontrol) > 0) {
				echo "{msg:'Anket Tanım Kodu " . $anketTanimKodu . " kullanılıyor. Başka bir kod giriniz.', success: false}";
				return;
			}
				
			$anketTanim->create();
			$result = $anketTanim->save($this->request->data);
			if ($result) {
				echo "{msg:'Anket Tanımı Başarıyla Kaydedildi', anketTanimId:" . $anketTanim->id .  ", success: true}";
			} else {
				echo "{msg:'Hatalı', success: false}";
			}
		}		
	}
	
	public function saveAnketTanimSoru () {
		$this->layout = null ;
		$this->autoRender = false;
		if ($this->request->is('post')) {
	
			$anketTanimSoru = ClassRegistry::init("AnketTanimSoru");
	
			$anketTanimSoru->create();
			$result = $anketTanimSoru->save($this->request->data);
			if ($result) {
				echo "{msg:'Anket Sorusu Başarıyla Kaydedildi', anketTanimSoruId:" . $anketTanimSoru->id .  ", success: true}";
			} else {
				echo "{msg:'Hatalı', success: false}";
			}
		}
	}
	
	public function listAnketTanim () {
				$this->layout = 'ajax';
		
		$this->AnketTanim = ClassRegistry::init('AnketTanim');
		
		$tarih = $this->request->query('tarih');
		$conditions = array();
		$conditions['AnketTanim.baslik LIKE'] = $this->request->query('baslik') . '%';
		
		$this->paginate['AnketTanim'] = array(
			'conditions' => $conditions,
			'limit' => $this->request->query('limit'),
			'page' => $this->request->query('page')
		);
		
		if ($this->request->query('sort')) {
			$sortArr = json_decode($this->request->query['sort'], true);
			if (count($sortArr) == 1) {
				$property =  $sortArr[0]['property'];
				$direction =  $sortArr[0]['direction'];
				$this->paginate['AnketTanim']['order'] =  array(
					'AnketTanim.' . $property => $direction
				);
			}			
		}

		$this->Paginator->settings = $this->paginate['AnketTanim'];
		$data = $this->Paginator->paginate('AnketTanim');
		$count = $this->params['paging']['AnketTanim']['count'];
		$this->set('ats', $data);
		$this->set('count', $count);
	}

	
	public function loadAnketTanimSoru ($id = null) {
		$this->layout = 'ajax';
		if (empty($id)) {
			return "{}";
		}
		
		$this->AnketTanimSoru = ClassRegistry::init('AnketTanimSoru');
		$this->AnketTanimSoru->id = $id;
		$data = $this->AnketTanimSoru->read(null, $id);
		$this->set('ats', $data);
	}
	
	public function listAnketTanimSoru () {
		$this->layout = 'ajax';
	
		$this->AnketTanimSoru = ClassRegistry::init('AnketTanimSoru');
	
		$tarih = $this->request->query('tarih');
		$atId = $this->request->data('atId');
		
		if (empty($atId)) {
			$atId = $this->request->query('atId');
		}
		
		if (empty($atId)) {
			throw new NotFoundException(__('Geçersi anket tanım id'));
		}
		
		$conditions = array();
		$conditions['AnketTanimSoru.soru_metin LIKE'] = $this->request->query('soru_metin') . '%';
		$conditions['AnketTanimSoru.anket_tanim_id'] = $atId;
		
		$this->paginate['AnketTanimSoru'] = array(
				'conditions' => $conditions,
				'limit' => $this->request->query('limit'),
				'page' => $this->request->query('page')
		);
	
		if ($this->request->query('sort')) {
			$sortArr = json_decode($this->request->query['sort'], true);
			if (count($sortArr) == 1) {
				$property =  $sortArr[0]['property'];
				$direction =  $sortArr[0]['direction'];
				$this->paginate['AnketTanimSoru']['order'] =  array(
						'AnketTanimSoru.' . $property => $direction
				);
			}
		}
	
		$this->Paginator->settings = $this->paginate['AnketTanimSoru'];
		$data = $this->Paginator->paginate('AnketTanimSoru');
		$count = $this->params['paging']['AnketTanimSoru']['count'];
		
		//ön izlemede anket tanım başlık vs göstermek için data'yla göndermek için
		$this->AnketTanim = ClassRegistry::init('AnketTanim');
		$this->AnketTanim->id = $atId;
		
		$this->set('atss', $data);
		$this->set('at', $this->AnketTanim->read(null, $atId)['AnketTanim']);
		$this->set('count', $count);
	}
	
	public function loadAnketTanim($id = null) {
		$this->layout='ajax' ;
		$this->AnketTanim = ClassRegistry::init('AnketTanim');
		$this->AnketTanim->id = $id;
		if (!$this->AnketTanim->exists()) {
			throw new NotFoundException(__('Invalid anket tanım'));
		}
		$this->set('at', $this->AnketTanim->read(null, $id));
	
	}
	
}