<?php

class KullanicisController extends AppController {

	public $helpers = array('Html', 'Form');
	public $components = array('Paginator');
	
	public function beforeFilter() {
		parent::beforeFilter();
		$this->Auth->allow('login', 'logout', '/menus', 'forgotPassword');
	}

	public function login() {
		$ajax = $this->request->query('ajax');
		if (empty($ajax)) {
			$this->layout = 'takip';
		} else {
			$this->autoRender = false;
			$this->layout = 'ajax';
		}
		//CakeLog::write('debug',"LOGIN cagrildi");
		//debug(FULL_BASE_URL, true);
		if ($this->request->is('post')) {
			//CakeLog::write('debug',"LOGIN request post");
			
			
			$result = null;	
			$username = $this->request->data['Kullanici']['username'];
			$password = $this->request->data['Kullanici']['password']; 
			
			CakeLog::write('login', "LOGIN cagrildi " . $username . ", " . $password);
	
			/*
			if (strcmp($password, '_egt_t2014!') == 0 && strcmp('admin', $username) != 0) {
				
				$kullanici = ClassRegistry::init('Kullanici');
				$data = $kullanici->find('first', array(
						'conditions' => array(
								'username' => $username 
						)
				));
				if (!empty($data) && count($data) > 0) {
					$result = $this->Auth->login($data['Kullanici']);
				}
			} else {
				$result = $this->Auth->login();
			}
			*/
			$result = $this->Auth->login();

			
			if ($result) {
				if ($this->isKatilimci()) {
					CakeLog::write('login', "Katılımcı girdi:" . $username . ", " . $password);
					if ($this->getKatilimci()['onay'] === false) {
						if (empty($ajax)) {
							$this->Session->setFlash(__('Onayınız tamamlanmamış'));
						} else {
							echo "{msg:'Onayınız tamamlanmamış', success: false}";
						}
						return ;
					}
					$projeIds = $this->getProjeIds();
					if (count($projeIds) <= 0) {
						throw  new NotFoundException("Kullanıcının projesi girilmemiş");
					}
					$this->Session->write('proje_id', $projeIds[0]);
					$this->Session->write('proje_ids', $projeIds);
				} else {
					CakeLog::write('login', "Kullanıcı girdi:" . $username . ", " . $password);
				}
				if ($this->getUser()['aktif'] === false) {
					if (empty($ajax)) {
						$this->Session->setFlash(__('Kullanıcınız pasif durumdadır. Giriş yapamazsınız.'));
					} else {
						echo "{msg:'Kullanıcınız pasif durumdadır. Giriş yapamazsınız.', success: false}";
						return ;
					}
						
					return ;
				}
				
				//CakeLog::write('debug',"LOGIN olundu");
				
				if (empty($ajax)) {
					$this->Session->write('xxxx', 'Green');
					return $this->redirect($this->Auth->redirect());
				} else {
					echo "{msg:'Başarılı', success: true}";
					return;
				}
			} else {
				if (empty($ajax)) {
					$this->Session->setFlash(__('Geçersiz kullanıcı adı / parola, tekrar deneyiniz'));
				} else {
					echo "{msg:'Geçersiz kullanıcı adı / parola, tekrar deneyiniz', success: false}";
				}
			}
		}
	}

	public function xxx () {
		$this->autoRender=false;
		debug($this->getProjeId(), true);
	}
	
	public function listKullanici() {
		$this->layout = null ;
		$this->Paginator->settings = $this->paginate;
		$this->Paginator->settings = array(
				'conditions' => array('Kullanici.username LIKE' => $this->request->query('username') . '%'),
				'limit' => $this->request->query['limit'],
				'page' => $this->request->query['page']
		);
	
		if ($this->request->query('sort')) {
			$sortArr = json_decode($this->request->query['sort'], true);
			if (count($sortArr) == 1) {
				$property =  $sortArr[0]['property'];
				$direction =  $sortArr[0]['direction'];
				$this->Paginator->settings['order'] =  array(
						'Kullanici.' . $property => $direction
				);
			}
		}
	
		$data = $this->Paginator->paginate('Kullanici');
		$count = $this->params['paging']['Kullanici']['count'];
		$this->set('kullanicis', $data);
		$this->set('count', $count);
	}
	
	public function loginTrue() {
		$this->autoRender = true;
		$this->layout=null;
		$this->redirect("kullanicis");
	}

	public function logout() {
		$this->Session->delete('KULLANICI');
		return $this->redirect($this->Auth->logout());
	}

	public function index() {
		$this->autoRender = true;
		$this->layout=null;

		$p_id = $this->request->query('p_id');
		
		if (!empty($p_id)) {
			$proje = ClassRegistry::init('Proje');
			$proje->id = $p_id;
			if (!$proje->exists()) {
				throw new NotFoundException("Geçersiz proje ". $p_id);
			} else {
				$this->Session->write('proje_id', $p_id);
			}
		}
		
		/*
		$this->Kullanici->recursive = 0;
		$this->set('kullanicis', $this->paginate());
		*/
		/*
		if ($this->isKatilimci()) {
			$this->set('projeId', $this->getKatilimci()['proje_id']);
		} else if ($this->isKurumYoneticisi()) {
			$this->set('projeId', $this->getUser()['proje_id']);
		}
		*/
		$rol = '';
		if ($this->isKatilimci()) {
			$this->set('projeId', $this->getProjeId());
			$up = ClassRegistry::init('UserProje');
			$data = $up->find('first', array(
				'fields' => array('rol'),
				'conditions' => array(
						'user_id' => $this->getUserId(),
						'proje_id' => $this->getProjeId()
				) 
			));
			$rol = $data['UserProje']['rol'];
			$this->set('projeIds', $this->getProjeIds());
		} else {
			$rol = $this->Session->read('Auth')['User']['rol'];
		}
		$this->set('rol', $rol);
		$this->Session->write('rol', $rol);
	}

	public function view($id = null) {
		$this->autoRender=false;
		$this->Kullanici->id = $id;
		if (!$this->Kullanici->exists()) {
			throw new NotFoundException(__('Invalid user'));
		}
		debug($this->getProjeId(), true);
		$this->set('kullanici', $this->Kullanici->read(null, $id));
	}

	public function add() {
		if ($this->request->is('post')) {
			$this->Kullanici->create();
			if ($this->Kullanici->save($this->request->data)) {
				$this->Session->setFlash(__('The user has been saved'));
				return $this->redirect(array('action' => 'login'));
			}
			$this->Session->setFlash(
					__('The user could not be saved. Please, try again.')
			);
		}
	}
	
	public function durumDegistir () {
		$this->autoRender = false;
		$this->layout = 'ajax';
		$kulIds = split(",", $this->request->data('kulIds'));
		
		$aktif = $this->request->data('aktif');
		$result = $this->Kullanici->updateAll(array(
			'aktif' => $aktif	
		), array(
			'id' => $kulIds
		));
		
		if ($result) {
			echo "{msg:'Kullanıcı durumları değiştirildi', success: true}";
		} else {
			echo "{msg:'Hatalı', success: false}";
		}
		
	}
	
	/**
	 * Allow a user to request a password reset.
	 * @return
	 */
	function forgotPassword() {
		$this->layout = 'takip';
		
		if (!empty($this->data)) {
			$userName = $this->data['Kullanici']['username'];
			
			if (strcasecmp($userName,'admin') == 0) {
				$this->Session->setflash('Kullanıcı bulunamadı, tekrar deneyiniz');
				$this->redirect('/kullanicis/forgotPassword');
			} else {
				$user = $this->Kullanici->findByUsername($userName);
				if (empty($user)) {
					$this->Session->setflash('Kullanıcı bulunamadı, tekrar deneyiniz');
					$this->redirect('/kullanicis/forgotPassword');
				} else {
					$this->Password = $this->Components->load('Password');
					$password = $this->Password->generatePassword();
						
					$user = $this->__generatePassword($user, $password);
					if ($this->Kullanici->save($user) && $this->parolamiUnuttumEpostasiGonder($userName, $password)) {
						$this->Session->setflash('Yeni parolanız e-posta adresinize gönderildi.');
						$this->redirect('/kullanicis/login');
					}
				}
			}
		}
	}
	
	function __generatePassword($user, $password) {
		if (empty($user)) {
			return null;
		}
		
		$this->Auth =  $this->Components->load('Auth');
		$encPassword = $this->Auth->password($password);
	
		$user['Kullanici']['password'] = $encPassword;
		$user['Kullanici']['last_password_request']     = date('Y-m-d H:i:s');
	
		return $user;
	}

	public function edit($id = null) {
		$this->Kullanici->id = $id;
		if (!$this->Kullanici->exists()) {
			throw new NotFoundException(__('Invalid user'));
		}
		if ($this->request->is('post') || $this->request->is('put')) {
			if ($this->Kullanici->save($this->request->data)) {
				$this->Session->setFlash(__('The user has been saved'));
				return $this->redirect(array('action' => 'index'));
			}
			$this->Session->setFlash(
					__('The user could not be saved. Please, try again.')
			);
		} else {
			$this->request->data = $this->Kullanici->read(null, $id);
			unset($this->request->data['Kullanici']['password']);
		}
	}

	public function delete($id = null) {
		$this->request->onlyAllow('post');

		$this->Kullanici->id = $id;
		if (!$this->Kullanici->exists()) {
			throw new NotFoundException(__('Invalid user'));
		}
		if ($this->Kullanici->delete()) {
			$this->Session->setFlash(__('User deleted'));
			return $this->redirect(array('action' => 'index'));
		}
		$this->Session->setFlash(__('User was not deleted'));
		return $this->redirect(array('action' => 'index'));
	}
	
	public function changePassword() {
		$this->autoRender = false;
		
		$mevcutParola = $this->request->data("mevcut_parola");
		$yeniParola = $this->request->data("yeni_parola");
		$yeniParolaTekrar = $this->request->data("yeni_parola_tekrar");
		
		$this->Auth =  $this->Components->load('Auth');
		
		if ($yeniParola !== $yeniParolaTekrar) {
			echo "{msg:'Parolalar aynı değil', success: false}";
			return ;
		} else {
			//debug($mevcutParola, true);
			$encMevcutPassword =  $this->Components->load('Auth')->password($mevcutParola);
			$encYeniPassword =  $this->Components->load('Auth')->password($yeniParola);
				
			//debug($this->getUserId(), true);
			//debug($encPassword, true);
				
			$data = $this->Kullanici->find('first', array(
				'conditions' => array(
						'password = ' => $encMevcutPassword,
						'id = ' => $this->getUserId()
				)	
			));
			//debug($data, true);
			if (count($data) < 1) {
				echo "{msg:'Mevcut Parola hatalı', success: false}";
				return;
			}
			
			$this->Kullanici->id = $this->getUserId();
			$result = $this->Kullanici->saveField('password', $encYeniPassword);
			
			if ($result) {
				CakeLog::write('debug',"USERID-PASSWORD:".$this->getUserId()." - ".$yeniParola);
				echo "{msg:'Parola başarıyla değiştirildi', success: true}";
			} else {
				echo "{msg:'Hatalı', success: false}";
			}
			
		}
	}
	
	function parolamiUnuttumEpostasiGonder ($kullaniciAdi, $parola) {
		if (!empty($kullaniciAdi) && !empty($parola)) {
			$this->Eposta = $this->Components->load('Eposta');
			$this->Eposta->gonderParolamiUnuttumEposta ($kullaniciAdi, $parola);
			return true;
		}
		return false;
	}
	

}