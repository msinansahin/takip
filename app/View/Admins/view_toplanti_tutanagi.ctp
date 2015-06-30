<?php 
	App::uses('CakeTime', 'Utility');
	$tt = $toplantiTutanagi['ToplantiTutanagi'];
?>
<style>
<!--
.baslik {
	font-size: 15px;
	font-style: italic;
	vertical-align: top;
}
-->
</style>

<div class="view" style="padding: 10px;">
	<table class="view">
		<tr>
			<td rowspan="2"><div class="tt-big-menu"></div></td>
			<td style="font-size: 20px; vertical-align: bottom;">
				<?php echo CakeTime::format($tt['tarih'], '%d-%m-%Y');?> / <?php echo $tt['saat']?>
			</td>
		</tr>
		<tr>
			<td style="font-size: 20px;"><?php echo $tt['proje_kod']?>, <?php echo $tt['proje_baslik']?></td>
		</tr>
	</table>
	
	<table class="view">
		<tr>
			<td class="baslik">Konu:</td>
			<td><?php echo $tt['konu']?></td>
		</tr>
		<tr>
			<td class="baslik">Yer:</td>
			<td><?php echo $tt['yer']?></td>
		</tr>
		<tr>
			<td class="baslik">Katılımcılar:</td>
			<td><?php echo $tt['katilimcilar']?></td>
		</tr>		
		<tr>
			<td class="baslik">Açıklama:</td>
			<td><?php echo $tt['aciklama']?></td>
		</tr>
		<?php if (!empty($tt['dokuman_media_id'])) {?>
		<tr>
			<td class="baslik">Dokuman:</td>
			<td><a class="dokuman-download" href="#" onclick="Egitim.lib.Utility.ttDokumanGor('<?php echo $tt['id']?>')">İndir</a></td>
		</tr>		
		<?php }?>
	</table>
	
</div>