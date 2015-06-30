<?php 
	App::uses('CakeTime', 'Utility');
	$gpe = $event['ProjesGrupProgramEvents'];
	$egitimBaslik = $gpe['egitim_baslik'];
	$egitmenAdi = $gpe['egitmen_adsoyad'];
	$renkAdi = $prmComponent->getRenkAdi($gpe['renk']);
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
			<td rowspan="2"><div class="event-big-menu"></div></td>
			<td style="font-size: 20px; vertical-align: bottom;"><?php echo $gpe['grup']?></td>
		</tr>
		<tr>
			<td style="font-size: 20px;"><?php echo $egitimBaslik . ' - ' . $gpe['etkinlik_adi']?></td>
		</tr>
	</table>
		
	<br>
	
	<fieldset title="Dönemler"  style="border: medium;">
	<table class="view">
		<tr>
			<td colspan="2">Ne zaman?</td>
		</tr>
		<tr>
			<td>
			<?php echo CakeTime::format($gpe['bas_tarihi'], '%d-%m-%Y', ''). ' / ' . $gpe['bas_saati']?>
			&nbsp;&nbsp;-&nbsp;&nbsp;
			<?php echo CakeTime::format($gpe['bit_tarihi'], '%d-%m-%Y', ''). ' / ' . $gpe['bit_saati']?>
			</td>
		</tr>
	</table>	
	</fieldset>
	<br>
	<table class="view">
		<?php if (!empty($egitmenAdi)) {?>
			<tr>
				<td class="baslik">Eğitmen:</td>
				<td><?php echo $egitmenAdi?></td>
			</tr>
		<?php }?>
		<tr style="display: none;">
			<td class="baslik">Notlar:</td>
			<td><?php echo $gpe['notlar']?></td>
		</tr>
	</table>
	<div style="width: 100%; height: 5px; background-color: <?php echo $renkAdi?>;"></div>
	<br>
	<?php echo nl2br($genelBilgi)?>
</div>