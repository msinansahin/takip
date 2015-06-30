 <?php
 /* 
	session_name('CAKEPHP');
	session_start();
	//print_r($_SESSION);
	$abc = $_SESSION["xxxx"];
	*/
	$username = $_SESSION['Auth']['User']['username'];
	$rol = $_SESSION['Auth']['User']['rol'];

?>

<html>
<head>
    <title>Eğitim Uygulaması</title>
	<meta charset="UTF-8">
    <link rel="stylesheet" type="text/css" href="extjs/resources/css/ext-all-neptune.css">
    <script type="text/javascript" src="extjs/ext-all-debug.js"></script>
    <script type="text/javascript" src="init.js"></script>
	<script type="text/javascript">
	
		var YETKI = { //TODO session'dan al
			rol: '<?php echo $rol?>',
			kullaniciAdi: '<?php echo $username?>', //TODO session'dan al
			isAdmin:function () {
				return this.rol === 'ADMIN';
			}
		};
	
	</script>
    
    
    <script type="text/javascript" src="app.js"></script>
    <script type="text/javascript" src="egitimapp/resources/resources_tr.js"></script>
	<link rel="stylesheet" type="text/css" href="egitimapp/resources/css/egitim.css">
	<link rel="stylesheet" type="text/css" href="egitimapp/resources/css/chooser.css">
	<link rel="stylesheet" type="text/css" href="egitimapp/resources/css/calendar.css">

</head>
<body></body>
<div style="display: none;">
	<iframe id="downloadFrame"></iframe>
</div>
</html>