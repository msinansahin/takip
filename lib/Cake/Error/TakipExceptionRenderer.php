<?php 
App::uses('ExceptionRenderer', 'Error');

class TakipExceptionRenderer extends ExceptionRenderer {

	protected function _outputMessage($template) {
		$this->controller->layout = 'takip';
		parent::_outputMessage($template);
	}

}

?>