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

/**
 * Application Controller
 *
 * Add your application-wide methods in the class below, your controllers
 * will inherit them.
 *
 * @package		app.Controller
 * @link		http://book.cakephp.org/2.0/en/controllers.html#the-app-controller
 */
class EgitimsController extends AppController {
	public $helpers = array('Html', 'Form');
	public $components = array('Paginator');
	public $paginate = array(
		'limit' => 5,
		'order' => array(
			'Egitim.title' => 'asc'
		)
	);
	public function index() {
		$this->set('egitims', $this->Egitim->find('all'));
	}
	
	public function listEgitim () {
		$this->layout = null ;
		
		$projeId = $this->request->query('projeId');

		$conditions = array();
		$conditions['Egitim.baslik LIKE'] = $this->request->query('baslik') . '%';
		//debug($this->isKatilimci(), true);
		if ($this->isKurumYoneticisi() || $this->isKatilimci()) {
			$projesEgitim = ClassRegistry::init('ProjesEgitim');
			$egitimIds = $projesEgitim->find('list', array(
					'fields' => array('egitim_id'),
					'conditions'=> array('ProjesEgitim.proje_id = ' => $this->getProjeId()),
					'group' => 'egitim_id'
			));
			if (count($egitimIds) > 0) {
				$conditions['Egitim.id'] = $egitimIds;
			} else {
				$conditions['Egitim.id'] = -1;
			}
		} else if (false && $this->isKatilimci()) {
			$grupProgramEvent = ClassRegistry::init('ProjesGrupProgramEvents');
			//debug($katilimci, true);
			$egitimIds = $grupProgramEvent->find('list', array(
				'fields' => array('egitim_id'),
				'conditions'=> array('ProjesGrupProgramEvents.proje_id = ' => $this->getProjeId()),
				'group' => 'egitim_id'
			));
			if (count($egitimIds) > 0) {
				$conditions['Egitim.id'] = $egitimIds;
			} else {
				$conditions['Egitim.id'] = -1;
			}
		} 
		else if ($this->isAsistan()) { //aynı zamanda eğitmen demek
			//asistanın ya da eğitmenin proje kapsamında dahil olduğu eğitimler listeleniyor
			$projesGrupProgramEvents = ClassRegistry::init('ProjesGrupProgramEvents');
			$egitimIds = $projesGrupProgramEvents->find('list', array(
					'fields'=>'egitim_id',
					'conditions'=> array(
						'ProjesGrupProgramEvents.proje_id' => $projeId,
						'ProjesGrupProgramEvents.egitmen_id' => $this->getEgitmenId()	
					),
					'group' => 'egitim_id'));
// 			debug($projeId, true);
// 			debug($this->getEgitmenId(), true);
// 			debug($egitimIds, true);
			if (count($egitimIds) > 0) {
				$conditions['Egitim.id'] = $egitimIds;
			} else {
				$conditions['Egitim.id'] = -1;
			}
		}
		
		$this->Paginator->settings = $this->paginate;
		$this->Paginator->settings = array(
			'conditions' => $conditions,
			'limit' => $this->request->query('limit'),
			'page' => $this->request->query('page')
		);
		
		
		
		if ($this->request->query('sort')) {
			$sortArr = json_decode($this->request->query('sort'), true);
			if (count($sortArr) == 1) {
				$property =  $sortArr[0]['property'];
				$direction =  $sortArr[0]['direction'];
				$this->Paginator->settings['order'] =  array(
					'Egitim.' . $property => $direction
				);
			}			
		}

		// similar to findAll(), but fetches paged results
		$data = $this->Paginator->paginate('Egitim');
		$count = $this->params['paging']['Egitim']['count'];
		$this->set('egitims', $data);
		$this->set('count', $count);
	}
	
	public function save() {
		$this->layout = null ;
		$this->autoRender = false;
		if ($this->request->is('post')) {
			
			$egitimKodu = $this->request->data('kod');
			$kontrol = $this->Egitim->find('first', array(
					'conditions' => array(
							'kod = ' => $egitimKodu,
							'id != ' =>  $this->request->data('id')
					)
			));
				
			CakeLog::debug('kod: '. $egitimKodu. ' id: '. $this->request->data('id'));
			//debug($kontrol, true);
			if (count($kontrol) > 0) {
				echo "{msg:'Egitim Kodu " . $egitimKodu . " kullanılıyor. Başka bir kod giriniz.', success: false}";
				return;
			}
			
			
			$this->Egitim->create();
			$result = $this->Egitim->save($this->request->data);
			if ($result) {
				echo "{msg:'Eğitim Başarıyla Kaydedildi', egitimId:" . $this->Egitim->id .  ", success: true}";
			} else {
				echo "{msg:'hatalı', success: false}";
			}
		}
	}
	
	/**
	 * Eğitmenin girdiği eğitim içeriğini kaydededer
	 * egitim_id, egitmen_id, alt_baslik ve aciklama alanlarının gelmesi gerekir
	 */
	public function saveEgitimIcerik() {
		$this->autoRender = false;
		$this->layout = 'ajax';
		
		$egitimIcerik = ClassRegistry::init('EgitimsIcerik');
		
		
		if ($this->request->is('post')) {
			$result = FALSE;
			$data = $this->request->data;
			$ei = $egitimIcerik->find('first', array(
				'conditions' => array(
					'EgitimsIcerik.egitim_id' => $this->request->data('egitim_id'),
					'EgitimsIcerik.egitmen_id' => $this->request->data('egitmen_id')
				)
			));
			if ($ei) {
				$data['id'] = $ei['EgitimsIcerik'] ['id'];
				$result = $egitimIcerik->save($data);
			} else {
				$egitimIcerik->create();
				$result = $egitimIcerik->save($this->request->data);
			}
			
			if ($result) {
				echo "{msg:'Eğitim İçeriği Başarıyla Kaydedildi', success: true}";
			} else {
				echo "{msg:'hatalı', success: false}";
			}
		}
	}
	
	/**
	 * 
	 * @param string $egitimId
	 * @param string $egitmenId
	 */
	public function loadEgitimIcerik($egitmenId = null, $egitimId = null) {
		
		$this->autoRender = false;
		$this->layout = null;
		
		$egitimIcerik = ClassRegistry::init('EgitimsIcerik');
		//debug($egitimId, true);
		$ei = $egitimIcerik->find('first', array(
				'conditions' => array(
						'EgitimsIcerik.egitim_id' => $egitimId,
						'EgitimsIcerik.egitmen_id' => $egitmenId
				)
		));
		//debug($ei, true);
		if (count($ei) > 0) {
			echo '{data: ' .json_encode($ei['EgitimsIcerik']) . ', success: true}';
		} else {
			//debug($egitimIcerik->create(), true);
			//$ei = $egitimIcerik['EgitimsIcerik'];
			$ei = new Object();
			$ei->egitmen_id = $egitmenId;
			$ei->egitim_id = $egitimId;
			$ei->aciklama = null;
			$ei->alt_baslik = null;
			echo '{data: '. json_encode($ei) . ', success: true}';
		}
	}
	
	public function delete($id = null) {
		//$this->layout = null ;
		$this->autoRender = false;
		$this->layout = 'ajax';
		
		if ($this->isEgitimSilinemez($id)) {
			echo "{msg:'Eğitim Silinemez (Etkinliklerde kullanılmış)', success: false}";
			return;
		}
		
		$this->Egitim->id = $id;
		
		if ($this->Egitim->delete()) {
			echo "{msg:'Eğitim Başarıyla Silindi', success: true}";
		} else {
			echo "{msg:'hatalı', success: false}";
		}
	}
	
	public function deleteUygDokuman ($id = null) {
		$this->autoRender = false;
		$this->layout = 'ajax';
		$uygEgitimDok = ClassRegistry::init('UygEgitimDokumani');
		
		$uygEgitimDok->id = $id;
		
		if (!$this->isAdmin()) {
			//kullanıcı dokümanı silebilir mi?
			$egitmen_id = $uygEgitimDok->read(null, $id)['UygEgitimDokumani']['egitmen_id'];
			if ($egitmen_id != $this->getEgitmenId()) {
				echo "{msg:'Medyayı silmeye yetkili değilsiniz.', success: false}";
				return ;
			}
		}
		
		if (!$uygEgitimDok->exists()) {
			throw new NotFoundException(__('Geçersiz medya'));
		}
		
		if ($uygEgitimDok->delete()) {
			echo "{msg:'Uyg Eğitim Medyası Başarıyla Silindi', success: true}";
		} else {
			echo "{msg:'Hatalı', success: false}";
		}
		
	}
	
	public function load($id = null) {
		$this->layout='ajax' ;
		$this->Egitim->id = $id;
		if (!$this->Egitim->exists()) {
			//throw new NotFoundException(__('Invalid user'));
		}
		$this->set('egitim', $this->Egitim->read(null, $id));
		/*
		if (!$id) {
			throw new NotFoundException(__('Invalid post'));
		}
		$egitim = $this->Egitim->findById($id);
		if (!$egitim) {
			throw new NotFoundException(__('Invalid post'));
		}
		
		$this->set('egitim', $egitim);
		*/
		
	}
	
	/**
	 * Eğitim dokümanları listelenir
	 */
	public function listEgitimDokuman () {
		$this->layout=null ;
		
		$egitimId = $this->request->query('egitimId');
		//debug($this->request->data, true);
		if (!$egitimId) {
			$egitimId = $this->request->data('egitimId');
		}
		
		$egitimDokumani = ClassRegistry::init('EgitimDokumani');
		$data = $egitimDokumani->find('all', array(
			'conditions' => array('EgitimDokumani.egitim_id ' => $egitimId),
		));
		
		$this->set('egitimDokumans', $data);
		$this->set('count', count($data));
		
	}
	
	/**
	 * Projede uygulamasında girilen medyaları gösterir
	 */
	public function listUygEgitimDokuman () {
		$this->layout=null ;
	
		$egitimId = $this->request->query('egitimId');
		$projeId = $this->request->query('projeId');
		$this->UygEgitimDokumani = ClassRegistry::init('UygEgitimDokumani');

		//debug($this->request->data, true);
		if (empty($egitimId)) {
			$egitimId = $this->request->data('egitimId');
		}
		if (empty($projeId)) {
			$projeId = $this->request->data('projeId');
		}
		
		//izinlere göre proje'de olup olmadığına bak
		
		$conditions = array();
		if ($this->isKatilimci()/* empty($projeId)*/) { //kurum yöneticisi ve kullanıcı için
			$projeId = $this->getProjeId();
		}
		
		//TODO eğitimler için de bakılabilir
		if (!empty($projeId)) {
			$conditions['UygEgitimDokumani.proje_id'] = $projeId;
		}
		
		if (!empty($egitimId)) {
			$conditions['UygEgitimDokumani.egitim_id'] = $egitimId;
		}
		
		if ($this->isKatilimci()) {
			$conditions['UygEgitimDokumani.indirilebilir'] = true;
		}
	
	
		$this->paginate['UygEgitimDokumani'] = array(
			'conditions' => $conditions,
			'limit' => $this->request->query('limit'),
			'page' => $this->request->query('page')
		);
		
		if ($this->request->query('sort')) {
			$sortArr = json_decode($this->request->query['sort'], true);
			if (count($sortArr) == 1) {
				$property =  $sortArr[0]['property'];
				$direction =  $sortArr[0]['direction'];
				$this->paginate['UygEgitimDokumani']['order'] =  array(
					'UygEgitimDokumani.' . $property => $direction
				);
			}			
		}


		$this->Paginator->settings = $this->paginate['UygEgitimDokumani'];
		
		// similar to findAll(), but fetches paged results
		$data = $this->Paginator->paginate('UygEgitimDokumani');
		
		// similar to findAll(), but fetches paged results
		//$data = $this->paginate('ToplantiTutanagi');
		$count = $this->params['paging']['UygEgitimDokumani']['count'];
		//debug($data, true);
	
		$this->set('uygEgitimDokumans', $data);
		$this->set('count', $count);
	
	}
	
	public function saveEgitimDokuman () {
		$this->autoRender = false;
		$this->layout = 'ajax';
		if ($this->request->is('post')) {
			$egitimDokumani = ClassRegistry::init('EgitimDokumani');
			try {
				$egitimDokumani->createWithAttachment($this->request->data);
				//$this->Session->setFlash(__('The message has been saved'));
				echo "{msg:'Eğitim Dokümanı Başarıyla Kaydedildi', success: true}";
			} catch (Exception $e) {
				echo "{msg:'Hatalı:". $e->getMessage() . "', success: false}";
				//$this->Session->setFlash($e->getMessage());
			}
		}
	}
	
	/**
	 * güncelleme işlemi de yapılır
	 */
	public function saveUygEgitimDokuman () {
		$this->autoRender = false;
		$this->layout = 'ajax';
		if ($this->request->is('post')) {
			$uygEgitimDokumani = ClassRegistry::init('UygEgitimDokumani');
			$data = $this->request->data;
			$id = $data['id'];
			
			try {
				$msg = '';
				if (!empty($id)) {
					$msg = 'Güncellendi';
				} else {
					$msg = 'Kaydedildi';
				}
				$uygEgitimDokumani->createWithAttachment($data, $this->getEgitmenId());
				echo "{msg:'Uyg Eğitim Medyası Başarıyla  " . $msg . "', success: true}";
			} catch (Exception $e) {
				echo "{msg:'Hatalı:". $e->getMessage() . "', success: false}";
			}
		}
	}
	
	/**
	 * Eğitim dokümanı kaydedilir
	 */
	public function __saveEgitimDokuman () {

		$this->autoRender = false;
		$this->layout = null;
		$media = ClassRegistry::init('Media');
		$egitimDokumani = ClassRegistry::init('EgitimDokumani');
		
		//debug($media, true);
		if ($this->request->is('post')) {
			$egitimDokumani->create();
			$result = FALSE;
			$cv_media_id = null;
			$tempFilePath = $_FILES['dokumandata']['tmp_name'];
			$realFileName = $_FILES['dokumandata']['name'];
		
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
				
			$data = $this->request->data;
			$data['media_id'] = $cv_media_id;
			$data['tur'] = $tur;
			
			$egitimDokumani = ClassRegistry::init('EgitimDokumani');
				
			//Debugger::log($data);
			$result = $egitimDokumani->save($data);
			//Debugger::log($egitimDokumani);
				
			if ($result) {
				echo "{msg:'Eğitim Dokümanı Başarıyla Kaydedildi', success: true}";
			} else {
				echo "{msg:'Hatalı', success: false}";
			}
		}
				
	}
	
	public function loadUygEgitimDokuman($id = null) {
		$this->autoRender = false;
		
		$dokClass = ClassRegistry::init('UygEgitimDokumani');
		
		$dokClass->id = $id;
		if (!$dokClass->exists()) {
			throw new NotFoundException(__('Geçersiz uyg dokumanı'));
		}
		$data = $dokClass->read(null, $id);
		echo '{data: ' .json_encode($data['UygEgitimDokumani']) . ', success: true}';
	}
	
	/**
	 * 
	 * @param string $id eğitim doküman id
	 */
	public function downloadDokuman($id = null) {
		$this->autoRender = false;
		//$this->layout = 'ajax';
		
//		$this->viewClass = 'Media';
		$dokClass = ClassRegistry::init('EgitimDokumani');
		
		$dataEgitimDok = $dokClass->read(null, $id);
		$data = $dataEgitimDok ['EgitimDokumani'];
		
		$this->Eposta = $this->Components->load('Eposta');
		$mimeType = $this->Eposta->mimeContentType( $data['dosya_ismi'] );
		
		$path = APP . DS . WEBROOT_DIR . DS . 'files' . DS . 'egitim_dokumani' . DS . 'dokuman' . DS . $data['dok_dir'] . DS . $data['dosya_ismi'];
		$kullanicininGorecegiDosyaIsmi = $data['baslik'].'.'.$data['uzanti'];
		//debug($path, true);
		
		$this->response->file(
				$path,
				array('download' => true, 'name' => $kullanicininGorecegiDosyaIsmi)
		);
		
	}
	
	public function downloadDokumanXXX($id = null) {
		$this->autoRender = false;
		//$this->layout = 'ajax';
		
//		$this->viewClass = 'Media';
		$dokClass = ClassRegistry::init('EgitimDokumani');
		
		$dataEgitimDok = $dokClass->read(null, $id);
		$data = $dataEgitimDok ['EgitimDokumani'];
		
		$this->Eposta = $this->Components->load('Eposta');
		$mimeType = $this->Eposta->mimeContentType( $data['dosya_ismi'] );
		
		$path = APP . DS . WEBROOT_DIR . DS . 'files' . DS . 'egitim_dokumani' . DS . 'dokuman' . DS . $data['dok_dir'] . DS . $data['dosya_ismi'];
		
		$kullanicininGorecegiDosyaIsmi = $data['baslik'].'.'.$data['uzanti'];
		//debug($path, true);
		
		$this->response->file(
				$path,
				array('download' => true, 'name' => $kullanicininGorecegiDosyaIsmi)				
		);
		
		//echo $kullanicininGorecegiDosyaIsmi;
		
	}
	
	public function downloadUygDokuman($id = null) {
		$this->autoRender = false;
		//$this->layout = 'ajax';
	
		//		$this->viewClass = 'Media';
		$dokClass = ClassRegistry::init('UygEgitimDokumani');
			$inline = $this->request->data('inline');
		if (empty($inline)) {
			$inline = $this->request->query('inline');
		}

		$inline = empty($inline) ? false : $inline === 'true';
		
		$dataEgitimDok = $dokClass->read(null, $id);
		$data = $dataEgitimDok ['UygEgitimDokumani'];
	
		$this->Eposta = $this->Components->load('Eposta');
		$mimeType = $this->Eposta->mimeContentType( $data['dokuman'] );
	
		$path = APP . DS . WEBROOT_DIR . DS . 'files' . DS . 'uyg_egitim_dokumani' . DS . 'dokuman' . DS . $data['dokuman_dir'] . DS . $data['dokuman'];
		$kullanicininGorecegiDosyaIsmi = $data['baslik'].'.'.$data['uzanti'];
	
		$this->response->file(
				$path,
				array('download' => !$inline, 'name' => $kullanicininGorecegiDosyaIsmi)
		);
	
	}
	
	
	public function __downloadDokuman($mediaId = null) {
		$this->autoRender = false;
		$this->layout = 'ajax';
	
		$this->viewClass = 'Media';
		$media = ClassRegistry::init('Media');
		$media->id = $mediaId;
	
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
	
	public function view($id = null) {
		$this->layout='ajax' ;
		$this->Egitim->id = $id;
		if (!$this->Egitim->exists()) {
			throw new NotFoundException(__('Geçersiz Eğitim'));
		}
		$data = $this->Egitim->read(null, $id);
		//debug($data, true);
		$egitimIcerik = ClassRegistry::init('EgitimsIcerik');
		$ei = $egitimIcerik->find('all', array(
				'conditions' => array(
						'EgitimsIcerik.egitim_id' => $id
				)
		));
		
		$this->set('prm', $this->Components->load('Prm'));
		$this->set('icerikler', $ei);
		$this->set('egitim', $data);
	}
	
	/**
	 * Eğitimin silinip silinemeyeceği kontrol edilir<br>
	 * proje ektinliklerinde kullanıldıysa<br>
	 * silinmez
	 * @param unknown $id
	 */
	public function isEgitimSilinemez ($id=null) {
		if (empty($id)) {
			throw new InvalidArgumentException("id null olamaz");
		}
		$this->autoRender = false;
		$this->layout = 'ajax';
		$data = $this->Egitim->query("SELECT count(1) as SAYI FROM projes_grup_program_events where egitim_id = " . $id . ";");
		$sayi = intval($data[0][0]['SAYI']);
	
		return $sayi > 0;
	
	}
	
	public function deleteEgitimDokuman ($id = null) {
		$this->autoRender = false;
		$this->layout = 'ajax';
		
		$egitimDok = ClassRegistry::init('EgitimDokumani');
	
		$egitimDok->id = $id;

		//admin ve egitmenler dışında doküman silme yetkisi yok
		if (!($this->isAdmin() || $this->isEgitmen())) {
			echo "{msg:'Medyayı silmeye yetkili değilsiniz.', success: false}";
			return;	
		}
		//kullanıcı dokümanı silebilir mi?
		if ($this->isEgitmen()) {
			$egitmen_id = $egitimDok->read(null, $id)['EgitimDokumani']['egitmen_id'];
			if ($egitmen_id != $this->getEgitmenId()) {
				echo "{msg:'Medyayı silmeye yetkili değilsiniz.', success: false}";
				return ;
			}
		}
	
		$egitimDok->read();
		
		
		if (!$egitimDok->exists()) {
			throw new NotFoundException(__('Geçersiz medya'));
		}
	
		if ($egitimDok->delete()) {
			echo "{msg:'Eğitim Medyası Başarıyla Silindi', success: true}";
		} else {
			echo "{msg:'Hatalı', success: false}";
		}
	
	}
	

}