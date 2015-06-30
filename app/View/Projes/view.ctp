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
	App::uses('CakeTime', 'Utility');
	$ilAdi = $prmComponent->getIlAdi($proje['Proje']['il']);
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
			<td rowspan="2"><div class="proje-big-menu"></div></td>
			<td style="font-size: 20px; vertical-align: bottom;"><?php echo $proje['Proje']['kod']?></td>
		</tr>
		<tr>
			<td style="font-size: 20px;"><?php echo $proje['Proje']['baslik']?></td>
		</tr>
	</table>
	
	<table class="view">
		<tr>
			<td class="baslik">Açıklama:</td>
			<td><?php echo $proje['Proje']['aciklama']?></td>
		</tr>
		<tr>
			<td class="baslik">Kurum:</td>
			<td><?php echo $proje['Proje']['kurum']?></td>
		</tr>
		<tr>
			<td class="baslik">Katılımcı Profili:</td>
			<td><?php echo $proje['Proje']['katilimci_profili']?></td>
		</tr>
	</table>
	
	<br>
	
	<fieldset title="Dönemler"  style="border: medium;">
	<table class="view">
		<tr>
			<td class="baslik">Hazırlık:</td>
			<td><?php echo CakeTime::format($proje['Proje']['hazirlik_bas_tarihi'], '%d-%m-%Y', '')?></td>
			<td> - </td>
			<td><?php echo CakeTime::format($proje['Proje']['hazirlik_bit_tarihi'], '%d-%m-%Y', '')?></td>
		</tr>
		<tr>
			<td class="baslik">Uygulama:</td>
			<td><?php echo CakeTime::format($proje['Proje']['uygulama_bas_tarihi'], '%d-%m-%Y', '')?></td>
			<td> - </td>
			<td><?php echo CakeTime::format($proje['Proje']['uygulama_bit_tarihi'], '%d-%m-%Y', '')?></td>
			</tr>
		<tr>
			<td class="baslik">Takip:</td>
			<td><?php echo CakeTime::format($proje['Proje']['takip_bas_tarihi'], '%d-%m-%Y', '')?></td>
			<td> - </td>
			<td><?php echo CakeTime::format($proje['Proje']['takip_bit_tarihi'], '%d-%m-%Y', '')?></td>
		</tr>
		<tr>
			<td class="baslik">Sonuç ve Raporlama:</td>
			<td><?php echo CakeTime::format($proje['Proje']['sonuc_raporlama_bas_tarihi'], '%d-%m-%Y', '')?></td>
			<td> - </td>
			<td><?php  echo CakeTime::format($proje['Proje']['sonuc_raporlama_bit_tarihi'], '%d-%m-%Y', '')?></td>
		</tr>
	</table>	
	</fieldset>
	<br>
	<table class="view">
		<tr>
			<td class="baslik">İl:</td>
			<td><?php echo $ilAdi?></td>
		</tr>
		<tr>
			<td class="baslik">Otel:</td>
			<td><?php echo $proje['Proje']['otel']?></td>
		</tr>
	</table>

</div>
