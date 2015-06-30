<?php 
	class Result {
		var $data;
		var $success;
	}
	
	$result = new Result ();

	$result->data = Set::extract('/AnketTanim/.', $at)[0];
	$result->success = TRUE;
	echo json_encode( $result );

?>