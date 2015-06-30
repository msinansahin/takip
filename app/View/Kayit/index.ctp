<?php 

	if (!$projeId || !$proje) {
		echo  "Geçersiz istek";
		exit();
	} else {
		//echo "pid:". $projeId;
	}
	$base = "";	
	$projeIcerik = $proje['Proje']['baslik'];
	$projeKurum = $proje['Proje']['kurum'];
?>

<html>
<head>
    <title>Eğitim Uygulaması - Katılımcı Kaydı</title>
	<meta charset="UTF-8">
	
	
</head>
<body>
	<link rel="stylesheet" type="text/css" href="<?php echo $base?>egitimapp/resources/css/egitim.css">
	<div id="kay-form-bilgi" style="width: 100%; text-align: center;   margin-top: 50px;">Css yükleniyor...</div>
	<link rel="stylesheet" type="text/css" href="<?php echo $base?>egitimapp/resources/css/chooser.css">
	<link rel="stylesheet" type="text/css" href="<?php echo $base?>egitimapp/resources/css/calendar.css">
    <link rel="stylesheet" type="text/css" href="<?php echo $base?>extjs/resources/css/ext-all-neptune.css">
	<script type="text/javascript">document.getElementById('kay-form-bilgi').innerHTML = 'Kütüphane yükleniyor...'; </script>
    <script type="text/javascript" src="<?php echo $base?>extjs/ext-all.js"></script>
	<script type="text/javascript">
		var pid = '<?php echo $projeId?>';
		var YETKI = {
			pid: pid,
			proje: {
				baslik: '<?php echo $projeIcerik?>',
				kurum: '<?php echo $projeKurum?>'
			}
		};
	</script>
    
	<script type="text/javascript">document.getElementById('kay-form-bilgi').innerHTML = 'Uygulama yükleniyor...'; </script>
	<script type="text/javascript" src="<?php echo $base?>init.js"></script>
	<script type="text/javascript" src="<?php echo $base?>appk.js?237"></script>
    <script type="text/javascript" src="<?php echo $base?>egitimapp/resources/resources_tr.js"></script>
	<script type="text/javascript">document.getElementById('kay-form-bilgi').style.display = 'none'; </script>
    
	
<div id="kat-form-id" class="centered-kay-form" style="overflow: auto;"></div>
</body>
<div style="display: none;">
	<iframe id="downloadFrame"></iframe>
</div>
</html>