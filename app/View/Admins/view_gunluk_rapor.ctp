<?php 
	App::uses('CakeTime', 'Utility');
	$gr = $gunlukRapor['GunlukRapor'];
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
			<td rowspan="2"><div class="gunluk-rapor-big-menu"></div></td>
			<td style="font-size: 20px; vertical-align: bottom;">
				<?php echo CakeTime::format($gr['tarih'], '%d-%m-%Y');?>
			</td>
		</tr>
		<tr>
			<td style="font-size: 20px;"><?php echo $gr['proje_kod']?>, <?php echo $gr['proje_baslik']?></td>
		</tr>
	</table>
	
	<table class="view">
		<tr>
			<td class="baslik">Konu:</td>
			<td><?php echo $gr['konu']?></td>
		</tr>
		<tr>
			<td class="baslik">Açıklama:</td>
			<td><?php echo $gr['aciklama']?></td>
		</tr>
		<?php if (!empty($gr['dokuman_media_id'])) {?>
		<tr>
			<td class="baslik">Dokuman:</td>
			<td><a class="dokuman-download" href="#" onclick="Egitim.lib.Utility.grDokumanGor('<?php echo $gr['id']?>')">İndir</a></td>
		</tr>		
		<?php }?>
	</table>
	
</div>