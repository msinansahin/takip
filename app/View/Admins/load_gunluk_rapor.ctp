<?php 
	class Result {
		var $data;
		var $success;
	}
	
	$result = new Result ();


	$result->data = Set::extract('/GunlukRapor/.', $gr)[0];
	$result->success = TRUE;
	echo json_encode( $result );

?>