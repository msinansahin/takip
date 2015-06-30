<?php
App::uses('SimplePasswordHasher', 'Controller/Component/Auth');
class Kullanici extends AppModel{
	public $validate = array(
			'username' => array(
					'required' => array(
							'rule' => array('notEmpty'),
							'message' => 'A username is required'
					)
			),
			'password' => array(
					'required' => array(
							'rule' => array('notEmpty'),
							'message' => 'A password is required'
					)
			),
			'role' => array(
					'valid' => array(
							'rule' => array('inList', array('KATILIMCI', 'EGITMEN', 'ASISTAN','ADMIN', 'KURUM_YONETICISI')),
							'message' => 'Please enter a valid role',
							'allowEmpty' => false
					)
			)
	);
	
// 	public function beforeSave($options = array()) {
// 		if (isset($this->data[$this->alias]['password'])) {
// 			$passwordHasher = new SimplePasswordHasher();
// 			$this->data[$this->alias]['password'] = $passwordHasher->hash(
// 					$this->data[$this->alias]['password']
// 			);
// 		}
// 		return true;
// 	}
}