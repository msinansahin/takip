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

class AnketBilgi {
	var $projeId;
	var $anketTanimId;
	var $anketAciklama;
	var $doldurulmus;
}

class AnketGenelSonuc {
	var $id;
	var $anket_tanim_id;
	var $ats_id;
	var $soruTipi;
	var $metinVeri;
	var $soru;
	var $soru_data;
	var $cevaplamaSayisi;
}

class AnketSonuc {
	var $soru;
	var $deger;
}

class AnketsController extends AppController {
	public $helpers = array('Html', 'Form');
	public $components = array('Paginator');
	public $paginate = array(
		'limit' => 5,
		'order' => array(
			'Anket.ad' => 'asc'
		)
	);
	
	
	public function view() {
		$this->layout='ajax' ;
		
		$userId = $this->getUserId();
		$projeId = $this->getProjeId();
		
		//kullanıcının doldurması gereken anketleri bul.. burada kaldım
		$projeAnket = ClassRegistry::init('ProjesAnket');
		$dataProjeAnketleri = $projeAnket->find('all', array(
			'conditions' => array(
					'proje_id' => $projeId
			)	
		));
		
		$viewAnketBilgileri = array();
		
		foreach ($dataProjeAnketleri as $dataProjeAnket) {
			$anketTanimId = $dataProjeAnket['ProjesAnket']['anket_id'];
			$proje_id = $dataProjeAnket['ProjesAnket']['proje_id'];
			$anketAciklama = $dataProjeAnket['ProjesAnket']['anket_tanim_baslik'];
			//$data = $this->Anket->query("SELECT count(1) as SAYI " .
			//		 " FROM ankets where anket_tanim_id =" . $anketTanimId . " and user_id = " . $userId .  " and proje_id = " . $projeId . ";");
			//$sayi = intval($data[0][0]['SAYI']);
			
			$anketBilgi = new AnketBilgi();
			$anketBilgi->projeId = $proje_id;
			$anketBilgi->anketTanimId = $anketTanimId;
			$anketBilgi->anketAciklama = $anketAciklama;
			//$anketBilgi->doldurulmus = ($sayi > 0);
			$anketBilgi->doldurulmus = $this->_isAnketVar($anketTanimId, $userId, $projeId);			
			array_push($viewAnketBilgileri, $anketBilgi);
		}
		
		$this->set('ab', $viewAnketBilgileri);
	}
	
	function _isAnketVar ($anketTanimId, $userId, $projeId) {
		$data = $this->Anket->query("SELECT count(1) as SAYI " .
				" FROM ankets where anket_tanim_id =" . $anketTanimId . " and user_id = " . $userId .  " and proje_id = " . $projeId . ";");
		$sayi = intval($data[0][0]['SAYI']);		
		return ($sayi > 0);
	}
	
	public function create () {
		$this->layout='ajax' ;
		$this->autoRender = false;

		$userId = $this->getUserId();
		$projeId = $this->getProjeId();
		
		//Kullanıcı anketi dolduabilir mi? kontrol et
		$anketTanimId = $this->request->data('anket_tanim_id');
		if ($this->_isAnketVar($anketTanimId, $userId, $projeId)) {
			echo "{msg:'Anket önceden doldurulmuş', success: false}";
			return ;	
		}
		
		$anket = ClassRegistry::init('Anket');
		$dataSource = $anket->getDataSource();
		$dataSource->begin();
		
		/**
		 * id
anket_tanim_id
proje_id
user_id
created
modified
		 */
		
		$anketData = array(
			'anket_tanim_id' => $anketTanimId,
			'proje_id' => $projeId,
			'user_id' => $userId
		);
		
		//debug($this->request->data, true);
		
		$anket->create();
		$result = $anket->save($anketData);

		$anketVeri = ClassRegistry::init('AnketVeri');
		$veriKeys = array_keys($this->request->data);
		
		foreach ($veriKeys as $veriKey) {
			/**
			 *  anket_id   |
			 soru_tipi  |
			 anahtar    |
			 deger      |
			 metin_veri |
			 created    |
			 modified   |
			 */
			$log = '';
			if (substr($veriKey, 0, strlen('veri_')) === 'veri_') {
				$soruTipi = null;
				if (strrpos ($veriKey, 'f_') > 0) $soruTipi = 'M';
				else if (strrpos ($veriKey, 'ehrb_') > 0) $soruTipi = 'EH';
				else if (strrpos ($veriKey, 'sb_') > 0) $soruTipi = 'S';
				else if (strrpos ($veriKey, 'cb_') > 0) $soruTipi = 'CS';
				else if (strrpos ($veriKey, 'krb_') > 0) $soruTipi = 'K';
				$anketVeriData = array(
						'anket_id' => $anket->id,
						'soru_tipi' => $soruTipi,
						'anahtar' => $veriKey,
						'metin_veri' => $this->request->data($veriKey)
				);
				$anketVeri->create();
				$anketVeri->save($anketVeriData);
				$log = $log . implode(",", $anketVeriData);
			}
			CakeLog::write('anket','userid: '. $userId . ', projeid: '. $projeId . ': '. $log);
				
		}
		
		if ($result) {
			$dataSource->commit();
		} else {
			$dataSource->rollback();
		}
		
		if ($result) {
			echo "{msg:'Anket başarıyla dolduruldu.', success: true}";
		} else {
			echo "{msg:'Hatalı', success: false}";
		}
	}
	
	public function viewGenelSonuc($projeId = null, $anketTanimId = null) {
		$this->layout='ajax' ;
		$this->autoRender = false;
		
		if (empty($projeId)) {
			$projeId = $this->request->query('projeId');
		}
		if (empty($anketTanimId)) {
			$anketTanimId = $this->request->query('anketTanimId');
		}
		
		$data = $this->Anket->query("select ".
				"av.soru_tipi as soru_tipi, ".
				"a.anket_tanim_id as anket_tanim_id," .
				"av.anahtar as anahtar, ".
				//"av.metin_veri, " .
				"ats.id as ats_id, ".
				"count(1) as sayi, ".
				"concat(ats.soru_metin, ': ', ats.soru_alt_bilgi) as soru, ".
				"ats.soru_data as soru_data " .
				"from anket_veris av, ankets a, anket_tanim_sorus ats ".
				"where av.anket_id = a.id ".
				"and a.proje_id = " . $projeId . " and a.anket_tanim_id = " . $anketTanimId . " ". 
				"and a.anket_tanim_id = ats.anket_tanim_id ".
				"and substring_index(av.anahtar, '_', -1) = ats.id ".
				"and av.soru_tipi in ('S', 'EH') ".
				"group by av.soru_tipi, av.anahtar " . //, av.metin_veri ".
				"order by ats.id");
		$sonuc = array();
		foreach ($data as $p) {
			$ags = new AnketGenelSonuc();
			$ags->id = $p['av']['anahtar'];
			$ags->soruTipi = $p['av']['soru_tipi'];
			$ags->soru = $p[0]['soru'];
			$ags->cevaplamaSayisi = $p[0]['sayi'];
			$ags->ats_id = $p['ats']['ats_id'];
			$ags->soru_data = $p['ats']['soru_data'];
			$ags->anket_tanim_id = $p['a']['anket_tanim_id'];
			array_push($sonuc, $ags);
		}
		echo ("{results: " . json_encode($sonuc) . "}");
		//$this->set('ags', $sonuc);	
		//$this->set('count', count($sonuc));
	}
	
	public function viewAnketMetinVerileriToplu($projeId = null, $anketTanimId = null) {
		$this->layout='ajax' ;
		$this->autoRender = false;
		
		if (empty($projeId)) {
			$projeId = $this->request->query('projeId');
		}
		if (empty($anketTanimId)) {
			$anketTanimId = $this->request->query('anketTanimId');
		}
		
		$data = $this->Anket->query("select ".
				"av.soru_tipi as soru_tipi, ".
				"a.anket_tanim_id as anket_tanim_id," .
				"av.anahtar as anahtar, ".
				"av.metin_veri, " .
				"ats.id as ats_id, ".
				"count(1) as sayi, ".
				"concat(ats.soru_metin, ': ', ats.soru_alt_bilgi) as soru, ".
				"ats.soru_data as soru_data " .
				"from anket_veris av, ankets a, anket_tanim_sorus ats ".
				"where av.anket_id = a.id ".
				"and a.proje_id = " . $projeId . " and a.anket_tanim_id = " . $anketTanimId . " ".
				"and a.anket_tanim_id = ats.anket_tanim_id ".
				"and substring_index(av.anahtar, '_', -1) = ats.id ".
				"and av.soru_tipi in ('M') ".
				"group by av.soru_tipi, av.anahtar " . //, av.metin_veri ".
				"order by ats.id");
		$sonuc = array();
		foreach ($data as $p) {
			$ags = new AnketGenelSonuc();
			$ags->id = $p['av']['anahtar'];
			$ags->soruTipi = $p['av']['soru_tipi'];
			$ags->soru = $p[0]['soru'];
			$ags->cevaplamaSayisi = $p[0]['sayi'];
			$ags->metinVeri = $p['av']['metin_veri'];
			$ags->ats_id = $p['ats']['ats_id'];
			$ags->soru_data = $p['ats']['soru_data'];
			$ags->anket_tanim_id = $p['a']['anket_tanim_id'];
			array_push($sonuc, $ags);
		}
		echo ("{results: " . json_encode($sonuc) . "}");
		//$this->set('ags', $sonuc);
		//$this->set('count', count($sonuc));
	}
	
	
	public function viewAnketGrafik($anketTanimId = null, $anahtar = null, $soruData = null, $soruTipi = null) {
		$this->layout='ajax' ;
		$this->autoRender = false;
		
		if (empty($anahtar)) {
			$anahtar = $this->request->query('anahtar');
		}
		if (empty($anketTanimId)) {
			$anketTanimId = $this->request->query('anketTanimId');
		}
		if (empty($soruData)) {
			$soruData = $this->request->query('soruData');
		}
		if (empty($soruTipi)) {
			$soruTipi = $this->request->query('soruTipi');
		}
		
		if (strcasecmp('EH', $soruTipi) == 0) {
			$soruData = '[{"soru":"Evet", "id":"E"}, {"soru": "Hayır", "id": "H"}]';
		}
		
		$data = $this->Anket->query("SELECT av.anahtar, av.metin_veri ".
				"FROM anket_veris av, ankets a ".
				"where av.anket_id = a.id and ". 
				"a.anket_tanim_id = " . $anketTanimId . " and " .
				"anahtar = '" . $anahtar . "'");
		//debug($soruData, true);
		$sorular = json_decode($soruData, TRUE);
		//var_dump($sorular);
		//debug(count($sorular));
		//debug($sorular, true);
		$sonucData = array();
		
		foreach ($sorular as $soru) {
			$sonucData[$soru['soru']] = 0;
		}
		
		foreach ($data as $p) {
			$ag = new Object();
			$veri = $p['av']['metin_veri'];
			$soru = $this->_sorulardanBul($sorular, $veri);
			if (!isset($sonucData[$soru])) {
				$sonucData[$soru] = 1;
			} else {
				$sonucData[$soru] = $sonucData[$soru] + 1;
			}
		}
		
		$sonuc = array();
		$arrKeys = array_keys($sonucData);
		foreach ($arrKeys as $key) {
			$as = new AnketSonuc();
			$as->soru = $key;
			$as->deger = $sonucData[$key];
			array_push($sonuc, $as);
		}
		
		echo ("{results: " . json_encode($sonuc) . "}");
	}
	
	function _sorulardanBul ($sorular, $id) {
		foreach ($sorular as $soru) {
			if (strcasecmp($soru['id'], $id) == 0) {
				return $soru['soru'];
			}
		}
		return "";
	}
	
}
