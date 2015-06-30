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

class N {
	var $id;
	var $baslik;
	var $kod;
	var $proje_id;
	var $src;

};

class  ProjesController extends AppController {
	public $helpers = array('Html', 'Form');
	public $components = array('Paginator');
	public $paginate = array(
			'limit' => 5,
			'order' => array(
					'Proje.baslik' => 'asc'
			)
	);
	
	public function index() {
		$this->autoRender = false;
		$this->layout = 'ajax';
		
	}	
	
	public function listProje () {
		$this->layout = null ;
		$this->Paginator->settings = $this->paginate;
		$this->Paginator->settings = array(
				'conditions' => array('Proje.baslik LIKE' => $this->request->query('baslik') . '%'),
				'limit' => $this->request->query['limit'],
				'page' => $this->request->query['page']
		);
		
		
		
		if ($this->request->query('sort')) {
			$sortArr = json_decode($this->request->query['sort'], true);
			if (count($sortArr) == 1) {
				$property =  $sortArr[0]['property'];
				$direction =  $sortArr[0]['direction'];
				$this->Paginator->settings['order'] =  array(
						'Proje.' . $property => $direction
				);
			}
		}
		
		$data = $this->Paginator->paginate('Proje');
		$count = $this->params['paging']['Proje']['count'];
		$this->set('projes', $data);
		$this->set('count', $count);
	}
	
	public function save() {
		$this->autoRender = false;
		$this->layout = 'ajax';
		
		$this->controlProjeAuth();
		
		if ($this->request->is('post')) {
			
			$projeKodu = $this->request->data('kod');
			$kontrol = $this->Proje->find('first', array(
					'conditions' => array(
							'kod = ' => $projeKodu,
							'id != ' =>  $this->request->data('id')
					)
			));
				
			CakeLog::debug('kod: '. $projeKodu. ' id: '. $this->request->data('id'));
			//debug($kontrol, true);
			if (count($kontrol) > 0) {
				echo "{msg:'Proje Kodu [" . $projeKodu . "] kullanılıyor. Başka bir kod giriniz.', success: false}";
				return;
			}
			
			$this->Proje->create();
			$result = FALSE;
			$result = $this->Proje->save($this->request->data);
			
			if ($result) {
				echo "{msg:'Proje Başarıyla Kaydedildi', success: true, projeId: " . $this->Proje->id .  "}";
			} else {
				echo "{msg:'hatalı', success: false}";
			}
		}
	}
	
	public function load($id = null) {
		$this->layout='ajax' ;
		$this->Proje->id = $id;
		if (!$this->Proje->exists()) {
			throw new NotFoundException(__('Invalid user'));
		}
		$this->set('proje', $this->Proje->read(null, $id));
	}
	
	public function view($id = null) {
		$this->layout='ajax' ;
		$this->Proje->id = $id;
		if (!$this->Proje->exists()) {
			throw new NotFoundException(__('Geçersiz Project'));
		}
		$data = $this->Proje->read(null, $id);
		//debug($data, true);
		$this->set('prmComponent', $this->Components->load('Prm'));
		$this->set('proje', $data);
	}
	
	public function delete($id = null) {
		//$this->layout = null ;
		$this->autoRender = false;
		$this->layout = 'ajax';
		
		if ($this->isProjeSilinemez($id)) {
			echo "{msg:'Proje Silinemez (Etkinlik veya katılımcı kaydı var)', success: false}";
			return;
		}
	
		$this->controlProjeAuth();
		
		$this->Proje->id = $id;
	
		if ($this->Proje->delete()) {
			echo "{msg:'Proje Başarıyla Silindi', success: true}";
		} else {
			echo "{msg:'hatalı', success: false}";
		}
	}
	
	/**
	 * Proje'ye atanan eğitimleri kaydeder
	 */
	public function saveEgitim () {
		$this->autoRender = false;
		$this->layout = 'ajax';
		
		$this->controlProjeAuth();
		
		$dataSource = $this->Proje->getDataSource();
		
		$projeId = $this->request->data('projeId');
		
		if (empty($projeId)) {
			throw new BadRequestException("saveEgitim projeId boş olamaz");
		}
		
		$egitimIds = split(",", $this->request->data('egitimIds'));
		$egitmenIds = split(",", $this->request->data('egitmenIds'));
		
		CakeLog::write('debug',"egitimIds Str: " . $this->request->data('egitimIds'));
		
		$projesEgitim = ClassRegistry::init('ProjesEgitim');
		
		$result = $projesEgitim->deleteAll(array('proje_id' => $projeId), false);
		CakeLog::write('debug',"RESULT " . $result);
		CakeLog::write('debug',"egitimIds sayısı: " . count($egitimIds));
		
		if ($result) {
			if (count($egitimIds) > 0) {
				$i = 0;
				foreach ($egitimIds as $egitimId) {
					CakeLog::write('debug',"egitimId: " . $egitimId);
					if ($egitimId != NULL) {
						CakeLog::write('debug',"ProjesController saveEgitim egitimId: " . $egitimId);
						$egitmenId = $egitmenIds[$i];
						$projesEgitim->create();
						$projesEgitim->save(array(
								'proje_id' => $projeId,
								'egitim_id' => $egitimId,
								'egitmen_id' => $egitmenId == 0 ? null : $egitmenId
						));
					}
					$i++;
				}
			}
		}
		
		if ($result) {
			$dataSource->commit();
			echo "{msg:'Başarıyla Tamamlandı', success: true}";
		} else {
			$dataSource->rollback();
			echo "{msg:'hatalı', success: false}";
		}
	}
	
	/**
	 * Proje'ye atanan anketleri kaydeder
	 */
	public function saveAnket (){
		$this->autoRender = false;
		$this->layout = 'ajax';
	
		$this->controlProjeAuth();
		
		$dataSource = $this->Proje->getDataSource();
	
		$projeId = $this->request->data('projeId');
		$anketIds = split(",", $this->request->data('anketIds'));
	
		CakeLog::write('debug',"anketIds Str: " . $this->request->data('anketIds'));
	
		$projesAnket = ClassRegistry::init('ProjesAnket');
	
		$result = $projesAnket->deleteAll(array('proje_id' => $projeId), false);
		CakeLog::write('debug',"RESULT " . $result);
		CakeLog::write('debug',"anketIds sayısı: " . count($anketIds));
	
		if ($result) {
			if (count($anketIds) > 0) {
				$i = 0;
				foreach ($anketIds as $anketId) {
					CakeLog::write('debug',"anketId: " . $anketId);
					if ($anketId != NULL) {
						CakeLog::write('debug',"ProjesController saveAnket egitimId: " . $anketId);
						$projesAnket->create();
						$projesAnket->save(array(
								'proje_id' => $projeId,
								'anket_id' => $anketId
						));
					}
					$i++;
				}
			}
		}
	
		if ($result) {
			$dataSource->commit();
			echo "{msg:'Başarıyla Tamamlandı', success: true}";
		} else {
			$dataSource->rollback();
			echo "{msg:'hatalı', success: false}";
		}
	}
	
	/**
	 * Projeye atanan eğitimler listelenir
	 */
	public function listProjeEgitim () {
		$id = $this->request->query('id');
		if (!$id) {
			$id = $this->request->data->id;
		}
		$this->autoRender = false;
		$this->layout = 'ajax';
		$projesEgitim = ClassRegistry::init('ProjesEgitim');
		$egitim = ClassRegistry::init('Egitim');
		
		$resultEgitimler = array();
		
		$table = 'ProjesEgitim';
		$query['conditions'] = array($table.'.proje_id' => $id);
		
		if ($this->isAsistan()) { //aynı zamanda eğitmen demek
			//asistanın ya da eğitmenin proje kapsamında dahil olduğu eğitimler listeleniyor
			$projesGrupProgramEvents = ClassRegistry::init('ProjesGrupProgramEvents');
			$egitimIds = $projesGrupProgramEvents->find('list', array(
					'fields'=>'egitim_id',
					'conditions'=> array(
							'ProjesGrupProgramEvents.proje_id' => $id,
							'ProjesGrupProgramEvents.egitmen_id' => $this->getEgitmenId()
					),
					'group' => 'egitim_id'));
			if (count($egitimIds) > 0) {
				$conditions['Egitim.id'] = $egitimIds;
			} else {
				$conditions['Egitim.id'] = -1;
			}
			$query['conditions'][$table.'.egitim_id'] = $egitimIds;
		}
		
		$query['fields'] = array('egt.id',
				'egt.baslik');
		
        // To do joining to get attribute with value
        $query['joins'] = array(
            array(
                    'table' => $egitim,
                    'alias' => 'egt',
                    'type' => 'INNER',
                    'conditions' => array('egt.id = '.$table.'.egitim_id')
                )
        );
        //$query['order'] = array($table.'.updated_date' => 'DESC');

        $egitimler = $projesEgitim->find('all', $query);		
        foreach ($egitimler as $egitim) {
        	//debug($egitim, true);
        	$node = new N();
        	$node->id = $egitim['egt']['id'];
        	$node->baslik = $egitim['egt']['baslik'];
        	$node->src = 'egitimapp/resources/images/egitim_big.png';
        	array_push($resultEgitimler, $node);
        }
        
		echo "{results:" . json_encode($resultEgitimler) . "}";
	}
	
	
	
	/**
	 * id: proje'nin id'si
	 */
	public function _listProjeGrup () {
		$id = $this->request->query('id');
		if (empty($id)) {
			$id = $this->request->data('id');
		}
		$this->autoRender = false;
		$this->layout = 'ajax';
		$katilimci = ClassRegistry::init('Katilimci');
		
		$data = $katilimci->find('all', 
				array('fields' => array('DISTINCT Katilimci.grup'),
						'conditions' => array('Katilimci.proje_id' => $id )));
		//debug($data, true);
		$result = array();
		foreach ($data as $grup) {
			$n = new N();
			$n->id = $grup['Katilimci']['grup'];
			if (!$n->id) {
				continue;
			}
			$n->baslik = $grup['Katilimci']['grup'];
			$n->proje_id = $id;
			$n->src = 'egitimapp/resources/images/grup_big.png';
			array_push($result, $n);
		}
		echo "{results:" . json_encode($result) . "}";
		
	}
	
	/**
	 * id: proje'nin id'si
	 */
	public function listProjeGrup () {
		$id = $this->request->query('id');
		if (empty($id)) {
			$id = $this->request->data('id');
		}
		
		if (empty($id)) {
			throw new NotFoundException('Id boş olamaz');
		}
		
		$this->autoRender = false;
		$this->layout = 'ajax';
		//$katilimci = ClassRegistry::init('Katilimci');
		$userProje = ClassRegistry::init('UserProje');
		
		$data = $userProje->find('all',
				array('fields' => array('DISTINCT UserProje.grup'),
						'conditions' => array('UserProje.proje_id' => $id )));
		//debug($data, true);
		$result = array();
		foreach ($data as $grup) {
			$n = new N();
			$n->id = $grup['UserProje']['grup'];
			if (!$n->id) {
				continue;
			}
			$n->baslik = $grup['UserProje']['grup'];
			$n->proje_id = $id;
			$n->src = 'egitimapp/resources/images/grup_big.png';
			array_push($result, $n);
		}
		echo "{results:" . json_encode($result) . "}";
	
	}
	
	/**
	 * Proje tanımındaki katılımcıların listesindeki gruplama işlemini gerçekleştirir
	 */
	public function _grupla() {
		$this->autoRender = false;
		$this->layout = 'ajax';
		
		$katilimci = ClassRegistry::init('Katilimci');
		$dataSource = $katilimci->getDataSource();
		
		$grupAdi = $this->request->data('grupAdi');
		$projeId = $this->request->data('projeId');
		$katilimciIds = split(",", $this->request->data('katilimciIds'));
		//debug($katilimciIds, true);
		//debug($projeId, true);
		CakeLog::write('debug',"GRUP ADI " . $grupAdi);
				
		$grupAdi = "'" . $grupAdi . "'";
		$result = $katilimci->updateAll(
			array('grup' => "$grupAdi"), 
			array(
				'Katilimci.id' => $katilimciIds, 
				'proje_id' => $projeId //gönderilmeyebilir de 		
			)
		);
		if ($result) {
			echo "{msg:'Başarıyla Tamamlandı', success: true}";
		} else {
			echo "{msg:'hatalı', success: false}";
		} 
	}
	
	/**
	 * Proje tanımındaki katılımcıların listesindeki gruplama işlemini gerçekleştirir<br>
	 * Gruplar user_projes üzerinde yapılır
	 */
	public function grupla() {
		$this->autoRender = false;
		$this->layout = 'ajax';
	
		//$katilimci = ClassRegistry::init('Katilimci');
		$userProje = ClassRegistry::init('UserProje');
	
		$grupAdi = $this->request->data('grupAdi');
		$projeId = $this->request->data('projeId');
		//$katilimciIds = split(",", $this->request->data('katilimciIds'));
		$userIds = split(",", $this->request->data('userIds'));
		//debug($katilimciIds, true);
		//debug($projeId, true);
		CakeLog::write('debug',"GRUP ADI " . $grupAdi);
	
		$grupAdi = "'" . $grupAdi . "'";
		$result = $userProje->updateAll(
				array('grup' => "$grupAdi"),
				array(
						'user_id' => $userIds,
						'proje_id' => $projeId //gönderilmeyebilir de
				)
		);
		if ($result) {
			echo "{msg:'Başarıyla Tamamlandı', success: true}";
		} else {
			echo "{msg:'hatalı', success: false}";
		}
	}
	
	public function  saveGrupProgramEvent () {
		$this->layout = null ;
		$this->autoRender = false;
		
		$this->controlProjeAuth();
		
		$grupProgramEvent = ClassRegistry::init('ProjesGrupProgramEvents');
		if ($this->request->is('post')) {
			$grupProgramEvent->create();
			$result = $grupProgramEvent->save($this->request->data);
			if ($result) {
				echo "{msg:'İşlem Başarıyla Tamamlandı', grupProgramEventId:" . $grupProgramEvent->id .  ", success: true}";
			} else {
				echo "{msg:'hatalı', success: false}";
			}
		}
	}
	
	
	public function listGrupProgramEvent () {
		$this->layout = null ;
		$this->autoRender = false;
		
		$result = array();
		
		$projeId = $this->request->query('projeId');
		if (!$projeId) {
			$projeId = $this->request->data->projeId;
		}
		$grup = $this->request->query('grup');
		if (!$projeId) {
			$projeId = $this->request->data->grup;
		}
		$grupProgramEvent = ClassRegistry::init('ProjesGrupProgramEvents');
		$data = $grupProgramEvent->find('all', array(
				'conditions' => array(
						'proje_id' => $projeId,
						'grup' => $grup
				)
		));
		//debug($data, true);
		
		$data = Set::extract('/ProjesGrupProgramEvents/.', $data);
		
		echo "{evts:" . json_encode($data) . ", success: true}";
		
		
	}
	
	public function  grupProgramEventView ($eventId=null) {
		$this->layout='ajax' ;
		$grupProgramEvent = ClassRegistry::init('ProjesGrupProgramEvents');
		$egitim = ClassRegistry::init('Egitim');
		
		$data = $grupProgramEvent->read(null, $eventId);
		$genelBilgi = $egitim->find('first', array(
				'fields' => array('kazanimlar'),
				'conditions' => array(
						'Egitim.id' => $data['ProjesGrupProgramEvents']['egitim_id']
				)
		));
		$this->set('prmComponent', $this->Components->load('Prm'));
		
		if (!empty($genelBilgi['Egitim'])) {
			$this->set('genelBilgi', $genelBilgi['Egitim']['kazanimlar']);
		} else {
			$this->set('genelBilgi', '');
		}
		$this->set('event', $data);
	}
	
	/**
	 * Projeye atanan anketler listelenir
	 */
	public function listProjeAnket ($id = null) {
		if (empty($id)) {
			$id = $this->request->query('id');
		}
		if (empty($id)) {
			$id = $this->request->data('id');
		}
		
		$this->autoRender = false;
		$this->layout = 'ajax';
		$projesAnket = ClassRegistry::init('ProjesAnket');
		$anket = ClassRegistry::init('AnketTanim');
		
		$resultAnketler = array();
		
		$table = 'ProjesAnket';
		$query['conditions'] = array($table.'.proje_id' => $id);
		
		$query['fields'] = array('anket.id', 'anket.baslik', 'anket.kod');
		
        // To do joining to get attribute with value
        $query['joins'] = array(
            array(
                    'table' => $anket,
                    'alias' => 'anket',
                    'type' => 'INNER',
                    'conditions' => array('anket.id = '.$table.'.anket_id')
                )
        );
        //$query['order'] = array($table.'.updated_date' => 'DESC');

        $anketler = $projesAnket->find('all', $query);		
        foreach ($anketler as $anket) {
        	//debug($egitim, true);
        	$node = new N();
        	$node->id = $anket['anket']['id'];
        	$node->kod = $anket['anket']['kod'];
        	$node->baslik = $anket['anket']['baslik'];
        	$node->src = 'egitimapp/resources/images/anket_big.png';
        	array_push($resultAnketler, $node);
        }
        
		echo "{results:" . json_encode($resultAnketler) . "}";
	}
	
	/**
	 * Projenin silinip silinemeyeceği kontrol edilir<br>
	 * program events yaratıldıysa<br>
	 * katılımcı eklendiyse<br>
	 * silinmez
	 * @param unknown $id
	 */
	public function isProjeSilinemez ($id=null) {
		if (empty($id)) {
			throw new InvalidArgumentException("id null olamaz");
		}
		$this->autoRender = false;
		$this->layout = 'ajax';
		$data = $this->Proje->query("SELECT count(1) as SAYI FROM projes_grup_program_events where proje_id = " . $id . ";");
		$sayi = intval($data[0][0]['SAYI']); 
		
		if ($sayi <= 0) {
			$data = $this->Proje->query("SELECT count(1) as SAYI FROM katilimcis where proje_id = " . $id . ";");
			$sayi = intval($data[0][0]['SAYI']);
		}
		
		return $sayi > 0;
		
	}

}
