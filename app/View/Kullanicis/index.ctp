 <?php
 /* 
	session_name('CAKEPHP');
	session_start();
	//print_r($_SESSION);
	$abc = $_SESSION["xxxx"];
	*/
	$username = $_SESSION['Auth']['User']['username'];
	//$rol = $_SESSION['Auth']['User']['rol'];
	$PROJE_ID = '';
	$PROJE_IDS = '';
	if (!empty($projeId)) {
		$PROJE_ID = $projeId;
	}
	if(!empty($projeIds)) {
		$PROJE_IDS = "[" . implode(",", $projeIds) . "]";
	} else {
		$PROJE_IDS = '[]';
	}
?>

<html>
<head>
    <title>Eğitim Takip Sistemi</title>
	<meta charset="UTF-8">
	<link rel="shortcut icon" type="image/ico" href="favicon.ico" />
	<script type="text/javascript">
		var YETKI = { //TODO session'dan al
			rol: '<?php echo $rol?>',
			kullaniciAdi: '<?php echo $username?>', //TODO session'dan al
			projeId: '<?php echo $PROJE_ID ?>', //katılımcılar için geçerli, katılımcılar birden fazla proje için tanımlanırsa bunun da geçerliliği kalmayacak
			projeIds: <?php echo $PROJE_IDS ?>,
			isAdmin:function () {
				return this.rol === 'ADMIN';
			},
			isEgitmen:function () {
				return this.rol === 'EGITMEN';
			},
			isKatilimci:function () {
				return this.rol === 'KATILIMCI';
			},
			isKurumYoneticisi:function () {
				return this.rol === 'KURUM_YONETICISI';
			},
			isAsistan:function () {
				return this.rol === 'ASISTAN';
			}
		};
	
	</script>
    

</head>
<body>
	<div id="kay-form-bilgi" style="width: 100%; text-align: center;   margin-top: 50px;">Css yükleniyor...</div>
    <link rel="stylesheet" type="text/css" href="extjs/resources/css/ext-all-neptune.css">
	<link rel="stylesheet" type="text/css" href="egitimapp/resources/css/egitim.css?4">
	<link rel="stylesheet" type="text/css" href="egitimapp/resources/css/chooser.css">
	<link rel="stylesheet" type="text/css" href="egitimapp/resources/css/calendar.css">
	<script type="text/javascript">document.getElementById('kay-form-bilgi').innerHTML = 'Kütüphane yükleniyor...'; </script>
	
    <script type="text/javascript" src="extjs/ext-all.js"></script>
	<script type="text/javascript">document.getElementById('kay-form-bilgi').innerHTML = 'Uygulama yükleniyor...'; </script>
    <script type="text/javascript" src="init.js?5"></script>
	<script type="text/javascript" src="app.js"></script>
	<script type="text/javascript">document.getElementById('kay-form-bilgi').innerHTML = 'Uygulama kaynakları yükleniyor...'; </script>
    <script type="text/javascript" src="egitimapp/resources/resources_tr.js"></script>
	<script type="text/javascript">document.getElementById('kay-form-bilgi').style.display = 'hidden'; </script>
	

</body>
<div style="display: none;">
	<iframe id="downloadFrame"></iframe>
</div>
</html>