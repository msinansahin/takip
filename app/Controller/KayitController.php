<?php

class KayitController extends AppController {

	var $helpers = array('Html', 'Form');
	
	public function beforeFilter() {
		parent::beforeFilter();
		$this->Auth->allow('login', 'logout', 'index', 'create', 'captcha', 'is__is');
	}
	
	/**
	 * kayit view'ini gösterir
	 */
	public function index () {
		$this->autoRender = true;
		$this->layout=null;
		/*
		 $this->Kullanici->recursive = 0;
		$this->set('kullanicis', $this->paginate());
		*/
		
		//eğer captha doğruysa
		
		$proje = ClassRegistry::init('Proje');
		$projeId = $this->request->query('_pid');
		$proje->id = $projeId;
		$data = $proje->find('first', array(
			'fields' => array('baslik', 'kod', 'kurum'),
			'conditions' => array('id =' => $projeId)
		));
		
// 		debug($data, true);
		$this->set('projeId', $projeId);
		$this->set('proje', count($data) == 0 ? null : $data);
	}
	
	public function captcha() {
		$this->autoRender = false;
		$this->layout='ajax';
	
		$this->autoRender = false;
		$this->layout='ajax';
		if(!isset($this->Captcha))        { //if Component was not loaded throug $components array()
			$this->Captcha = $this->Components->load('Captcha', array(
					'width' => 150,
					'height' => 50,
					'theme' => 'default', //possible values : default, random ; No value means 'default'
			)); //load it
		}
		header('Content-Type: image/jpeg');
		$this->Captcha->create();
	}
	
	function add()        {
		//$this->Captcha = $this->Components->load('Captcha', array('captchaType'=>'math', 'jquerylib'=>true, 'modelName'=>'Signup', 'fieldName'=>'captcha')); //load it
	
		if(!empty($this->request->data))        {
			/*if(!isset($this->Captcha))        { //if Component was not loaded throug $components array()
			 $this->Captcha = $this->Components->load('Captcha'); //load it
			}*/
			
			$this->Signup->setCaptcha($this->Captcha->getVerCode()); //getting from component and passing to model to make proper validation check
			$this->Signup->set($this->request->data);
			if($this->Signup->validates())        { //as usual data save call
				//$this->Signup->save($this->request->data);//save or something
				// validation passed, do something
				$this->Session->setFlash('Data Validation Success', 'default', array('class' => 'notice success'));
			}        else        { //or
				$this->Session->setFlash('Data Validation Failure', 'default', array('class' => 'cake-error'));
				//pr($this->Signup->validationErrors);
				//something do something else
			}
		}
	}
	
	function __isCapthaDogru () {
		//$this->Captcha = $this->Components->load('Captcha', array('captchaType'=>'math', 'jquerylib'=>true, 'modelName'=>'Signup', 'fieldName'=>'captcha')); //load it

		if(!empty($this->request->data)) {
			
			$sec = $this->Session->read('security_code');
			$captha = $this->request->data('captcha');
			return strcasecmp($sec, $captha) === 0;
			
			/*
			if(!isset($this->Captcha)) { //if Component was not loaded throug $components array()
				$this->Captcha = $this->Components->load('Captcha'); //load it
			}
			$this->Signup->setCaptcha($this->Captcha->getVerCode()); //getting from component and passing to model to make proper validation check
			$this->Signup->set($this->request->data);
			if($this->Signup->validates())        { //as usual data save call
				//$this->Signup->save($this->request->data);//save or something
				// validation passed, do something
				//$this->Session->setFlash('Data Validation Success', 'default', array('class' => 'notice success'));
				return true;
			}        
			else { //or
				//$this->Session->setFlash('Data Validation Failure', 'default', array('class' => 'cake-error'));
				//pr($this->Signup->validationErrors);
				//something do something else
				return false;
			}
			*/
		}
		return false;
	}
	
	/**
	 * Katılımcıyla yaratılır
	 */
	public function create () {
		$this->autoRender = false;
		$this->layout = 'ajax';
		$katilimci =  ClassRegistry::init('Katilimci');
		
		if ($this->request->is('post')) {
			/*
			if (!$this->__isCapthaDogru()) {
				echo "{msg:'Resimdeki değeri yanlış girdiniz. Yenileyip tekrar deneyin.', success: false}";
				return;
			}
			*/
			
			$katilimciData = $this->request->data;
			$eposta = $katilimciData['eposta'];
			
			if ( $this->existsKatilmci($eposta) || $this->existsKullanici($eposta)) {
				echo "{msg:'". $eposta . " Daha önce kullanılmış', success: false}";
				return;
			}
			
			$dataSource = $katilimci->getDataSource();
			$dataSource->begin();
				
			/*			
			$kullanici =  ClassRegistry::init('Kullanici');
			$kullanici->create();
			$this->Auth =  $this->Components->load('Auth');
			$kullaniciData = array(
					'rol' => 'KATILIMCI',
					'username' => $this->request->data['eposta'],
					'password' => $this->Auth->password($password)
			);
			
			$result = $kullanici->save($kullaniciData);
			CakeLog::write('debug',"USERNAME-PASSWORD:".$kullaniciData['username']." - ".$password);
			$katilimciData['user_id'] = $kullanici->id;
			*/

			$katilimci->create();
			$result = $katilimci->save($katilimciData);
			
			if ($result) {
				$dataSource->commit();
			} else {
				$dataSource->rollback();
			}
			
			if ($result) {
				$adSoyad = $katilimciData['ad'].' '.$katilimciData['soyad'];
				$this->Eposta = $this->Components->load('Eposta');
				$this->Eposta->gonderKatilimciKayitEposta ($adSoyad, $eposta);
				
				//$test = $kullaniciAdi.'-'.$password;
				echo "{msg:'Katılımcı Başarıyla Kaydedildi. Eposta gelen kutusunu kontrol ediniz.', katilimciId:" . $katilimci->id .  ", success: true}";
			} else {
				echo "{msg:'hatalı', success: false}";
			}
		}
			
	}
	
	public function mevcutKatilimciProjeEkle () {
		$this->autoRender = false;
		$this->layout = 'ajax';
	
		if ($this->request->is('post')) {
			/*
				if (!$this->__isCapthaDogru()) {
			echo "{msg:'Resimdeki değeri yanlış girdiniz. Yenileyip tekrar deneyin.', success: false}";
			return;
			}
			*/
				
			$kullaniciData = $this->request->data;
			$username = $kullaniciData['kullaniciAdi'];
			$password = $kullaniciData['parola']; 
			$projeId = $kullaniciData['proje_id']; 

			$kullanici =  ClassRegistry::init('Kullanici');
			$this->Auth =  $this->Components->load('Auth');
			$kullaniciVar = $kullanici->find('first', array(
					'fields' => array('id'),
					'conditions' => array(
						'username' => $username,
						'password' => $this->Auth->password($password)
					)
			));
			
			if (count($kullaniciVar) <= 0) { //kullanıcı geçersiz
				echo "{msg:'Kullanıcı/Parola geçersiz', success: false}";
				return;
			}
			
			$userId = $kullaniciVar['Kullanici']['id'];
		
			$userProje =  ClassRegistry::init('UserProje');
			$userProjeVar = $userProje->find('first', array(
				'field' => array('id'),
				'conditions' => array(
					'user_id' => $userId,
					'proje_id' => $projeId
				)	
			));
			
			if (count($userProjeVar) > 0) { //önceden kayıt yapılmış
				echo "{msg:'Kaydınız önceden yapılmış', success: false}";
				return;
			}
			
			
			$userProjeData = array(
				'user_id' => $userId,
				'proje_id' => $projeId,
				'rol' => 'KATILIMCI'
			);
			$userProje->create();
			$result = $userProje->save($userProjeData);
				
				
			if ($result) {
				echo "{msg:'Projeye kaydınız başarıyla yapıldı', success: true}";
			} else {
				echo "{msg:'Hatalı', success: false}";
			}
		}
			
	}
	
	public function is__is () {
		$this->autoRender = false;
		$this->layout=null;
		if ($this->request->is('post')) {
			$eposta =  $this->request->data('v');
			$exists = $this->existsKullanici($eposta);
			
			if ($exists) {
				echo "{msg:'Daha önce kullanılmış', success: false}";
			} else {
				echo "{success: true}";
			}
		}
	}

}