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
App::uses('String', 'Utility');

/**
 * Application Controller
 *
 * Add your application-wide methods in the class below, your controllers
 * will inherit them.
 *
 * @package		app.Controller
 * @link		http://book.cakephp.org/2.0/en/controllers.html#the-app-controller
 */
class MainMenu {
	var $title;
	var $iconCls;
	var $items;
}

class Menu {
	var $id;
	var $xtype;
	var $title;
}

class MenuResult {
	var $results;
}

class OnayIcinEpostaBilgisi {
	var $adSoyad;
	var $parola;
	var $kullaniciAdi;
}

class  KatilimcisController extends AppController {
	public $helpers = array('Html', 'Form');
	public $components = array('Paginator');
	public $paginate = array(
			'limit' => 5,
			'order' => array(
					'Katilimci.ad' => 'asc'
			)
	);
	
	public function index() {
		$this->autoRender = false;
		$this->layout = 'ajax';
		
		
		echo "asdas";
	}
	
	public function load($id = null) {
		$this->layout='ajax' ;
		
		if (!$id) {
			$id = $this->request->query("id");
			if (!$id) { //session'dan al
				$id = $this->getKatilimciId();
			}
		}
		
		if (!$id) {
			$this->set('katilimci', array());
			return;
		}
		
		$this->Katilimci->id = $id;
		if (!$this->Katilimci->exists()) {
			//throw new NotFoundException(__('Invalid user'));
		}
		$this->set('katilimci', $this->Katilimci->read(null, $id));
	}
	
	public function listKatilimci () {
		$this->layout = null ;
		
		$projeId = $this->request->query('projeId');
		$userOlanlar = $this->request->query('userOlanlar');
		
		//debug($projeId, true);
		
		$conditions = array();
		$conditions['Katilimci.ad LIKE'] = $this->request->query('ad') . '%';
		$conditions['Katilimci.soyad LIKE'] = $this->request->query('soyad') . '%';
		$conditions['Katilimci.eposta LIKE'] = $this->request->query('eposta') . '%';
		$conditions['Katilimci.grup LIKE'] = $this->request->query('grup') . '%';
		
		if (!empty($projeId)) {
			array_push($conditions, 'exists (select user_id from user_projes up where up.user_id = Katilimci.user_id and up.proje_id = ' . $projeId . ' )');
		}
		
		if ($userOlanlar === '1') {
			$conditions['AND'] = array('Katilimci.user_id is not null');
		}
		
		$this->Paginator->settings = $this->paginate;
		$this->Paginator->settings = array(
				'conditions' => $conditions/*array('Katilimci.ad LIKE' => $this->request->query('ad') . '%')*/,
				'limit' => $this->request->query('limit'),
				'page' => $this->request->query('page')
		);
		
		
		
		if ($this->request->query('sort')) {
			$sortArr = json_decode($this->request->query('sort'), true);
			if (count($sortArr) >= 1) {
				$orderArr = array();
				foreach ($sortArr as $sort) {
					$property =  $sort['property'];
					$direction =  $sort['direction'];
					$orderArr['Katilimci.' . $property] = $direction;
				}
				$this->Paginator->settings['order'] = $orderArr;  
// 				array(
// 						'Katilimci.' . $property => $direction
// 				);
			}
		}
		
		$data = $this->Paginator->paginate('Katilimci');
		$result = array();
		$userProje =  ClassRegistry::init('UserProje');
		foreach ($data as $kat) {
			//debug($kat['Katilimci'], true);
			//array_push($kat['Katilimci'], array('proje_kod' => 'xxx'));
			
			$userProjeVar = $userProje->find('all', array(
				'conditions' => array(
					'user_id' => $kat['Katilimci']['user_id'],
				)	
			));
			$projeKod = "";
			$grup = "";
			$ky = false;
			if (count($userProjeVar) <= 0) {
				$projeKod  = "None"; //$kat['Proje']['kod'];
			} else {
				foreach ($userProjeVar as $up) {
					$projeKod = $projeKod . ',' . $up['UserProje']['proje_kod'];
					if (!empty($projeId)) {
						if (strcasecmp($projeId, $up['UserProje']['proje_id']) == 0 ) {
							$grup = $up['UserProje']['grup'];						
						}
						$ky = strcasecmp($up['UserProje']['rol'], 'KURUM_YONETICISI') == 0;
					}
				}
				$projeKod= ltrim ($projeKod,',');
			}
			$kat['Katilimci']['proje_kod']  = $projeKod;
			$kat['Katilimci']['grup']  = empty($grup) ? '' : $grup;
			$kat['Katilimci']['ky_durumu']  = $ky;
				
			//debug($kat['Katilimci'], true);
			array_push($result, $kat);
		}
		$count = $this->params['paging']['Katilimci']['count'];
		//debug($data, true);
		$this->set('katilimcis', $result);
		$this->set('count', $count);
	}
		
	
	public function save() {
		$this->autoRender = false;
		$this->layout = 'ajax';
		if ($this->request->is('post')) {
			$this->Katilimci->create();
			$result = $this->Katilimci->save($this->request->data);
			if ($result) {
				echo "{msg:'Katılımcı Başarıyla Kaydedildi', katilimciId:" . $this->Katilimci->id .  ", success: true}";
			} else {
				echo "{msg:'hatalı', success: false}";
			}
		}
	}
	
	public function delete ($id = null) {
		$this->autoRender = false;
		$this->layout = 'ajax';

		
		
		//TODO kullanıcıyı pasif yap
		$this->Katilimci->id = $id;
		
		$data = $this->Katilimci->find ('first', array(
			'fields' => array('user_id'),
			'conditions' => array(
				'Katilimci.id' => $id
			)	
		));
		
		if (!empty($data['Katilimci']['user_id'])) {
			echo "{msg:'Katılımcının kullanıcısı mevcut silemezsiniz.', success: false}";
			return;
		}
		
		//katılımcını kullanıcısı oluştuysa silinemez
		
		if ($this->Katilimci->delete()) {
			echo "{msg:'Katılımcı Başarıyla Silindi', success: true}";
		} else {
			echo "{msg:'hatalı', success: false}";
		}
	}
	
	/**
	 * Seçilen katılımcıları kurum yöneticisi durumunu değiştirir<br>
	 * ilgili kullanıcısı varsa rollerine KURUM_YONETICISI ekler ya da rollerden çıkarır
	 */
	public function _kyDegistir () {
		$this->autoRender = false;
		$this->layout = 'ajax';
		$katilimciIds = split(",", $this->request->data('katilimciIds'));
		//debug($katilimciIds, true);
		//debug($projeId, true);
		//CakeLog::write('debug',"GRUP ADI " . $grupAdi);
		$katilimci = ClassRegistry::init('Katilimci');
		$ky_durumu = $this->request->data('ky_durumu');
		
		$dataSource = $katilimci->getDataSource();
		$dataSource->begin();
		
		$result = $katilimci->updateAll(
				array('ky_durumu' => $ky_durumu),
				array(
						'Katilimci.id' => $katilimciIds
				)
		);
		if ($result) { //ilgili kullanıcısındaki rolleri değiştir
			$rol = NULL;
			if ($ky_durumu === 'true') {
				$rol = 'KURUM_YONETICISI';
			} else {
				$rol = 'KATILIMCI';
			}
			$kullaniciIdsData = $katilimci->find('all', array(
				'fields' => array('user_id'),
				'conditions' => array('Katilimci.id in' => $katilimciIds)	
			));
			$kullaniciIds = array();
			if (count($kullaniciIdsData) <= 0) {
				array_push($kullaniciIds, -1);
				array_push($kullaniciIds, -2);
			} else {
				foreach ($kullaniciIdsData as $kullaniciIdData) {
					//debug($kullaniciIdsData, true);
					array_push($kullaniciIds, $kullaniciIdData['Katilimci']['user_id']);
				}
			}
			
			$kullanici = ClassRegistry::init('Kullanici');
			$kullanici->updateAll(
					array('rol' => "'".$rol."'"),
					array(
							'Kullanici.id' => $kullaniciIds
					)
			);
		}
		
		if ($result) {
			$dataSource->commit();
		} else {
			$dataSource->rollback();
		}
		
		if ($result) {
			echo "{msg:'Katılımcı(lar) kurum yöneticisi durumları değiştirildi.', success: true}";
		} else {
			echo "{msg:'Hatalı', success: false}";
		}
		
	}
	
	/**
	 * Seçilen katılımcıları kurum yöneticisi durumunu değiştirir<br>
	 * ilgili kullanıcısı varsa rollerine KURUM_YONETICISI ekler ya da rollerden çıkarır
	 */
	public function kyDegistir () {
		$this->autoRender = false;
		$this->layout = 'ajax';
		$userIds = split(",", $this->request->data('userIds'));
		$projeId = $this->request->data('projeId');
		
		if (empty($projeId)) {
			echo "{msg:'Proje id boş olamaz', success: false}";
			return;
		}
		
		//debug($katilimciIds, true);
		//debug($projeId, true);
		//CakeLog::write('debug',"GRUP ADI " . $grupAdi);
		//$katilimci = ClassRegistry::init('Katilimci');
		$userProje = ClassRegistry::init('UserProje');
		$ky_durumu = $this->request->data('ky_durumu');
	
		$dataSource = $userProje->getDataSource();
		$dataSource->begin();
	
		
		$rol = NULL;
		if ($ky_durumu === 'true') {
			$rol = 'KURUM_YONETICISI';
		} else {
			$rol = 'KATILIMCI';
		}
		
			
		$result = $userProje->updateAll(
				array('rol' => "'".$rol."'"),
				array(
						'UserProje.user_id' => $userIds,
						'UserProje.proje_id' => $projeId
				)
		);
	
		if ($result) {
			$dataSource->commit();
		} else {
			$dataSource->rollback();
		}
	
		if ($result) {
			echo "{msg:'Katılımcı(lar) kurum yöneticisi durumları değiştirildi.', success: true}";
		} else {
			echo "{msg:'Hatalı', success: false}";
		}
	
	}
	
	public function projedenCikart () {
		$this->autoRender = false;
		$this->layout = 'ajax';
		$userIds = split(",", $this->request->data('userIds'));
		$projeId = $this->request->data('projeId');
		
		$up =  ClassRegistry::init('UserProje');
		$result = $up->deleteAll(array(
				'UserProje.user_id' => $userIds,
				'UserProje.proje_id' => $projeId
		), false);
		CakeLog::write('projeden_cikart', $projeId . ' => User ids: ' . String::toList($userIds));
		
		echo "{msg:'Katılımcı(lar) projeden çıkarıldı. Çıkarılan Katılımcı Sayısı: " . (count($userIds) - 1) . "', success: true}";
	}
	
	public function onayDegistir () {
		
		$this->autoRender = false;
		$this->layout = 'ajax';
		$katilimciIds = split(",", $this->request->data('katilimciIds'));
		//debug($katilimciIds, true);
		//debug($projeId, true);
		//CakeLog::write('debug',"GRUP ADI " . $grupAdi);
		$katilimci = ClassRegistry::init('Katilimci');
		$onay = $this->request->data('onay');
		
		$gonderilecekler = array();
		$pasifYapilacakKullanicilarIdsData = array(); //sistem kullanıcıları
		CakeLog::debug("Onay: ".$onay);
		CakeLog::write('onay', $onay.' =>'.String::toList($katilimciIds));
		
		if ($onay === 'true') {
				
			$gonderilecekler = $katilimci->find('all',array(
					'conditions' => array(
						'Katilimci.id' => $katilimciIds,
						'Katilimci.onay' => false
					)
			));
				
		} else {
			$pasifYapilacakKullanicilarIdsData = $katilimci->find('all',array(
					'fields' => array('user_id'),
					'conditions' => array(
							'Katilimci.id' => $katilimciIds
							//'Katilimci.onay' => false //onaya bakmadan pasif yapılacak kullanıcıları bul
					)
			));
		}
		
		$dataSource = $katilimci->getDataSource();
		$dataSource->begin();
		
		$result = $katilimci->updateAll(
				array('onay' => $onay),
				array(
					'Katilimci.id' => $katilimciIds
				)
		);
		$onayEpostaGonderilecek = count($gonderilecekler) > 0;
		//CakeLog::debug("RESUUUULT ".$result);
		
		$onayIcinEpostaBilgisiArr = array(); 
		if ($result) {
			if ($onayEpostaGonderilecek) { //kullanıcı kaydı gerekir
				CakeLog::debug("EPOSTA gönderilecek");
				
				foreach ($gonderilecekler as $kat) {
					if (!empty($kat['Katilimci']['user_id'])) {
						continue;
					}
					$eposta = $kat['Katilimci']['eposta'];
					$kullanici = $this->kullaniciKaydet($eposta, $kat['Katilimci']['ky_durumu'], $kat['Katilimci']['proje_id']);
					//debug($kullanici, true);
					$katilimci->updateAll(
							array('user_id' => $kullanici['kullanici_id']),
							array(
									'Katilimci.id' => $kat['Katilimci']['id']
							)
					);
						
					$onayIcinEpostaBilgisi = new OnayIcinEpostaBilgisi();
					$onayIcinEpostaBilgisi->adSoyad = $kat['Katilimci']['ad'].' '.$kat['Katilimci']['soyad'];
					$onayIcinEpostaBilgisi->kullaniciAdi = $eposta;
					$onayIcinEpostaBilgisi->parola = $kullanici['uretilen_parola'];
					CakeLog::write('onay', 'epostabilgisi =>'. $onayIcinEpostaBilgisi->kullaniciAdi. ' :: '. $onayIcinEpostaBilgisi->parola);
						
					array_push($onayIcinEpostaBilgisiArr, $onayIcinEpostaBilgisi);
				}
			}
			
			//pasif yapılacak kullanıcıları pasifleştir
			$userIdArr = array();
			if (count($pasifYapilacakKullanicilarIdsData) > 0) {
				foreach ($pasifYapilacakKullanicilarIdsData as $pasifYapilacakKullanicilarIdData) {
					array_push($userIdArr, $pasifYapilacakKullanicilarIdData['Katilimci']['user_id']);
				}
				$kullanici =  ClassRegistry::init('Kullanici');
				$kullanici->updateAll(array(
					'aktif' => false	
				), array(
						'Kullanici.id' => $userIdArr
				));
			}
		}
		
		if ($result) {
			$dataSource->commit();
		} else {
			$dataSource->rollback();
		}
		
		if ($result) {
			// eposta gönder
			if ($onayEpostaGonderilecek) {
				CakeLog::debug("Gönderilecekler Sayısı: ".count($gonderilecekler));
				foreach ($onayIcinEpostaBilgisiArr as $gon) {
					$this->onayEpostasiGonder($gon);
					/*
					$this->Eposta = $this->Components->load('Eposta');
					$adSoyad = $kat['Katilimci']['ad'].' '.$kat['Katilimci']['soyad'];
					$kullaniciAdi = $kat['Katilimci']['eposta'];
					$this->Eposta->gonderKatilimciOnayEposta ($adSoyad, $kullaniciAdi);
					*/
				}
				if (count($gonderilecekler) > 0) {
					echo "{msg:'Katılımcı(lar) onayı değiştirildi. Onaylananlara eposta gönderildi.', success: true}";
				} else {
					echo "{msg:'Katılımcı(lar) onayı değiştirildi', success: true}";
				}
			} else {
				echo "{msg:'Katılımcı(lar) onayı değiştirildi', success: true}";
			}
		} else {
			echo "{msg:'Hatalı', success: false}";
		}
	}

	/**
	 * array--
	 * 			'rol' => 'KATILIMCI',
				'username' => $eposta,
				'password' => $this->Auth->password($password)
	 * 			'uretilen_parola'
	 * 			'kullanici_id'
	 * döner
	 * @param unknown $eposta
	 * @return multitype:string unknown NULL
	 */
	function kullaniciKaydet ($eposta, $ky_durumu, $proje_id) {
		$this->Password = $this->Components->load('Password');
		$password = $this->Password->generatePassword();
		$kullanici =  ClassRegistry::init('Kullanici');
		$kullanici->create();
		$this->Auth =  $this->Components->load('Auth');
		$kullaniciData = array(
				'rol' => $ky_durumu === true ? 'KURUM_YONETICISI': 'KATILIMCI',
				'proje_id' => $proje_id,
				'aktif' => true,
				'username' => $eposta,
				'password' => $this->Auth->password($password)
		);
			
		$result = $kullanici->save($kullaniciData);
		CakeLog::write('debug',"USERNAME-PASSWORD:".$kullaniciData['username']." - ".$password);
		//$kullanici['Kullanici']['uretilen_parola'] = $password; //epostayla gönderilecek
		$kullaniciData['uretilen_parola'] = $password;
		$kullaniciData['kullanici_id'] = $kullanici->id;
		
		$up =  ClassRegistry::init('UserProje');
		$upData = array(
				'rol' => $ky_durumu === true ? 'KURUM_YONETICISI': 'KATILIMCI',
				'proje_id' => $proje_id,
				'user_id' => $kullanici->id
		);
		$result = $up->save($upData);
		
		
		return $kullaniciData;
	}
	
	function onayEpostasiGonder ($gon) {
		$this->Eposta = $this->Components->load('Eposta');
		$adSoyad = $gon->adSoyad;
		$parola = $gon->parola;
		$kullaniciAdi = $gon->kullaniciAdi;
		$this->Eposta->gonderKatilimciOnayEposta ($adSoyad, $kullaniciAdi, $parola);
	}
}