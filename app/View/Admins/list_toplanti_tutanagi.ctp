<?php
/**
 *
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
 * @package       app.View.Emails.text
 * @since         CakePHP(tm) v 0.10.0.1076
 * @license       http://www.opensource.org/licenses/mit-license.php MIT License
 */
?>
<?php 
	class Result {
		var $results;
		var $total;
		var $success;
	}
	
	$result = new Result ();
	//Set::extract('/ToplantiTutanagi/.', $egitims);

	$result->results = Set::extract('/ToplantiTutanagi/.', $tts);
	$result->success = TRUE;
	$result->total = $count;
	echo json_encode( $result );

?>