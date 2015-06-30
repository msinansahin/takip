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
class local_MainMenu {
	var $title;
	var $iconCls;
	var $items;
}

class local_Menu {
	var $id;
	var $xtype;
	var $title;
}

class local_MenuResult {
	var $results;
}
class  MenusController extends AppController {
	var $helpers = array('Captcha');
	
	public function beforeFilter() {
		parent::beforeFilter();
		$this->Auth->allow('captcha');
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
		//header('Content-Type: image/jpeg');
		$this->Captcha->create();
	}
	
	public function index() {
		//$this->autoRender = false;
		$this->layout = null;

		/*
		 * 		$this->redirect('../usermenu.php');
		if (true) {
			return;
		}
		

		$kullanici = $this->Session->read('KULLANICI');

		if ($kullanici && $kullanici['rol']) {
			$rol = $kullanici['rol'];

			$menusRol = ClassRegistry::init('MenusRol');
			$menu_ids = $menusRol->find('all', array(
					'conditions' => array('MenusRol.rol' => $rol),
					'fields' => array('MenusRol.menu_id')
			));

			$menu_id_arr = array();

			foreach ($menu_ids as $menu_id) {
				array_push($menu_id_arr, $menu_id['MenusRol']['menu_id']);
			}

			$menu = $this->Menu->find('all', array(
					'conditions' => array('Menu.id' => $menu_id_arr),
					'order' => array('Menu.parent ASC', 'Menu.level ASC', 'Menu.parent ASC')
			));

			$result = new local_MenuResult();
			$result->results = array();
			$local_mainmenu = null;
			$local_menu = null;

			foreach ($menu as $tmp_menux) {
				$tmp_menu = $tmp_menux['Menu'];
				if ($tmp_menu['level'] == '0') {
					if (!$local_mainmenu) {
						$local_mainmenu = new local_MainMenu();
						$local_mainmenu->title = $tmp_menu['title'];
						$local_mainmenu->iconCls = $tmp_menu['icon'];
						$local_mainmenu->items = array();
					} else {
						array_push($result->results, $local_mainmenu);
						$local_mainmenu = new local_MainMenu();
						$local_mainmenu->title = $tmp_menu['title'];
						$local_mainmenu->iconCls = $tmp_menu['icon'];
						$local_mainmenu->items = array();
					}
				}
				else {
					$local_menu = new local_Menu();
					$local_menu->id = $tmp_menu['id'];
					$local_menu->xtype = $tmp_menu['xtype'];
					$local_menu->title = $tmp_menu['title'];
					// 					debug($local_menu, true);
					array_push($local_mainmenu->items, $local_menu);
				}
			}
		}

		echo json_encode ( $result );
		*/
	}

}
