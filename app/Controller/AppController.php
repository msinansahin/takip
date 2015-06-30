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


class AppController extends Controller {
	public $components = array(
			'Session',
			'Auth' => array(
					'actionPath' => 'controllers/',
					'loginAction' => array(
							'controller' => 'kullanicis',
							'action' => 'login',
							'plugin' => false,
							'admin' => false
					),
					'loginRedirect' => array('controller' => 'kullanicis','action' => 'index'),
					'logoutRedirect' => array('controller' => 'kullanicis','action' => 'login'),
					'authenticate' => array(
							'Form' => array(
									'userModel' => 'Kullanici'
							)
					)					
			)
	);
	
	
	public function beforeFilter() {
		parent::beforeFilter();
		$this->Auth->allow('login', 'logout', 'kayit*');
	}
	
	/**
	 * array(
	'id' => 'x',
	'username' => 'username',
	'rol' => 'ROL',
	'proje_id' => '...'
	'created' => '2014-01-07 23:35:25'
)
	 */
	public function getUser () {
		return AuthComponent::user();
	}
	
	/**
	 * projeye bağlı kullanıcılın projelerini getirir
	 */
	public function getProjeIds () {
		$kullanici = ClassRegistry::init('Kullanici');
		$data = $kullanici->query("select proje_id from user_projes where user_id = " . $this->getUserId());
		$sonuc = array();
		foreach ($data as $p) {
			array_push($sonuc, $p['user_projes']['proje_id']);
		}
		return $sonuc;
	}
	
	public function getProjeId () {
		return $this->Session->read('proje_id');
		//return $this->getUser()['proje_id'];
		//return $this->getUser()['projes'];
	}
	
	public function getUserId () {
		return AuthComponent::user('id');
	}

	public function getUserRol () {
		return AuthComponent::user('rol');
	}
	
	public function isAdmin () {
		return $this->getUserRol () === 'ADMIN';
	}
	
	public function isKatilimci () {
		return $this->getUserRol () === 'KATILIMCI' || $this->isKurumYoneticisi();
	}
	
	public function isKurumYoneticisi () {
		return $this->getUserRol () === 'KURUM_YONETICISI';
	}
	
	public function isAsistan () {
		return $this->getUserRol () === 'ASISTAN' || $this->isEgitmen();
	}
	
	public function isEgitmen () {
		return $this->getUserRol () === 'EGITMEN';
	}
	
	/**
	 * Eğer sisteme giren kullanıcı katılımcı tipindeyse, katılımcıs tablosundaki id'yi döner
	 * @return sisteme giren kullanıcı KATILIMCI değilse null döner
	 */
	public function getKatilimciId () {
		if (!$this->isKatilimci()) {
			return null;
		}
		$katilimci = ClassRegistry::init('Katilimci');
		$data = $katilimci->find('first', array(
			'fields' => array('id'),
			'conditions' => array('Katilimci.user_id = ' . $this->getUserId())
		));
		return $data['Katilimci']['id'];
	}
	
	public function getEgitmenId () {
		if (!$this->isAsistan()) {
			return null;
		}
		return $this->getEgitmen()['id'];
	}
	
	public function getEgitmen () {
		if (!$this->isAsistan()) {
			return null;
		}
		$egitmen = ClassRegistry::init('Egitmen');
		$data = $egitmen->find('first', array(
				'fields' => array('id'),
				'conditions' => array('Egitmen.user_id = ' . $this->getUserId())
		));
		return $data['Egitmen'];
	}
	
	
	public function getKatilimci () {
		if (!$this->isKatilimci()) {
			return null;
		}
		$katilimci = ClassRegistry::init('Katilimci');
		$data = $katilimci->find('first', array(
				'conditions' => array('Katilimci.user_id = ' . $this->getUserId())
		));
		return $data['Katilimci'];
	}
	
	public function existsKullanici ($eposta = null) {
		$kullanici =  ClassRegistry::init('Kullanici');
		$data = $kullanici->find('first', array(
				'fields' => array('id'),
				'conditions' => array(
						'username = ' => $eposta
				)
		));
		return count($data) > 0;
	}
	
	public function existsKatilmci ($eposta = null) {
		$katilimci =  ClassRegistry::init('Katilimci');
		$data = $katilimci->find('first', array(
				'fields' => array('id'),
				'conditions' => array(
						'eposta = ' => $eposta
				)
		));
		return count($data) > 0;
	}
	
	/**
	 * proje yönetim işlemlerine yetkili mi
	 */
	public function controlProjeAuth() {
		if (!$this->isAdmin()) {
			throw new ForbiddenException("saveEgitim Yasaklı işlem");
		}
	}
	
}