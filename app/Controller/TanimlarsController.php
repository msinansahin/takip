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
	var $children;
	var $text;
	var $id;
	var $leaf;
	var $expanded;
	
};

class ComboItem {
	var $key;
	var $name;
	var $leaf; //boolean
};

class TanimlarsController extends AppController {
	public $helpers = array('Html', 'Form');
	public $components = array('Paginator');
	public $paginate = array(
		'limit' => 20
	);
	
	public function beforeFilter() {
		parent::beforeFilter();
		$this->Auth->allow('listIlce');
	}
	
	public function index() {
		$egitimKategori = ClassRegistry::init('TnmEgitimKategori');
		$data = $egitimKategori->generateTreeList(
				
		);
		debug($data); die;
	}
	
	public function listIlce ($il=NULL) {
		$this->layout = 'ajax';
		
		if (!$il) {
			$il = $this->request->query('il');
		}
		
		$ilce = ClassRegistry::init("TnmIlce");
		$data = $ilce->find('all', array(
				'conditions' => array(
						'il = ' => $il
				)
		));
		$this->set("ilces", $data);
	}
	
	public function listEgitimKategori () {
		
		$this->autoRender = false;
		$this->layout = 'ajax';
		
		$egitimKategori = ClassRegistry::init('TnmEgitimKategori');
				
		$resultRoot = array();
		
		$result = array();
		
		$kokler = $egitimKategori->find('all', array('conditions' => array('TnmEgitimKategori.parent_id' => null)));
		foreach ($kokler as $kok) {
			$node = new N();
			//debug($kok, true);
			$node->text = $kok['TnmEgitimKategori']['ad'];
			$node->id = $kok['TnmEgitimKategori']['id'];
			$node->leaf = false;
			$node->expanded = true;
			//debug($kok['TnmEgitimKategori']);
			$children =  $egitimKategori->find('all', array('conditions' => array('parent_id' => $node->id)));
			$childrenArray = array();
			foreach ($children as $child) {
				$nodeC = new N();
				$nodeC->text = $child['TnmEgitimKategori']['ad'];
				$nodeC->id = $child['TnmEgitimKategori']['id'];
				$nodeC->leaf = true;
				array_push($childrenArray, $nodeC);
			}	
			$node->children = $childrenArray;
			array_push($result, $node);
				
		}
		//$result = Set::extract('/children/.', $result);
		$nodeRoot = new N();
		$nodeRoot->text = 'Kategoriler';
		$nodeRoot->id = 'Root';
		$nodeRoot->leaf = false;
		$nodeRoot->children = $result;
		$nodeRoot->expanded = true;
		$resultRoot[] =$nodeRoot;
		
		echo json_encode($resultRoot);
		
	}
	
	public function listEgitimKategoriForCombo () {
	
		$this->autoRender = false;
		$this->layout = 'ajax';
	
		$egitimKategori = ClassRegistry::init('TnmEgitimKategori');
	
		$result = array();
		$all = $egitimKategori->find('all', array('conditions' => array('TnmEgitimKategori.parent_id' => null)));
		
		foreach ($all as $ea) {
			$ci = new ComboItem();
			$ci->key = $ea['TnmEgitimKategori']['id'];
			$ci->name = $ea['TnmEgitimKategori']['ad'];
			$ci->leaf= $ea['TnmEgitimKategori']['parent_id'] != NULL;
			array_push($result, $ci);
			
			//çocukları bul
			$children =  $egitimKategori->find('all', array('conditions' => array('parent_id' => $ci->key)));
				
			foreach ($children as $child) {
				$ciC = new ComboItem();
				$ciC->key = $child['TnmEgitimKategori']['id'];
				$ciC->name = $child['TnmEgitimKategori']['ad'];
				$ciC->leaf= $child['TnmEgitimKategori']['parent_id'] != NULL;
				array_push($result, $ciC);
			}
		}
		
		$resultRoot = array();
		
		echo '{results:' . json_encode($result) .  '}';
	
	}
	
	public function xxx(){
		debug($this->Session, true);
	}
	
	public function saveEgitimKategori () {

		//debug($this, true);
		
		$this->autoRender = false;
		$this->layout = 'ajax';
		$result = FALSE;
		$egitimKategori = ClassRegistry::init('TnmEgitimKategori');
		$result = $egitimKategori->save($this->request->data);
		//debug($egitimKategori, true);
		
		if ($result) {
			echo "{msg:'Eğitim Kategori Başarıyla Kaydedildi', success: true, newId:'" . $egitimKategori->id . "'}";
		} else {
			echo "{msg:'hatalı', success: false}";
		}
		
	}
	
	public function deleteEgitimKategori ($id = null) {
		$this->autoRender = false;
		$this->layout = 'ajax';

		$result = false;
		
		$egitimKategori = ClassRegistry::init('TnmEgitimKategori');
		
		//debug($egitimKategori, true);
		
		//debug($id, true);
		
		$dataSource = $egitimKategori->getDataSource();
		$dataSource->begin();
		
		$result = $egitimKategori->deleteAll(array('parent_id' => $id), false);
		if ($result) {
			$egitimKategori->id = $id;
			$result = $egitimKategori->delete();
		}
		
		if ($result) {
			$dataSource->commit();
		} else {
			$dataSource->rollback();
		}
		
		if ($result) {
			echo "{msg:'Eğitim Kategori Başarıyla Silindi', success: true}";
		} else {
			echo "{msg:'hatalı', success: false}";
		}
		
		
	}

}
