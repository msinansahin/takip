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
	$egt = $egitim['Egitim'];
?>
<style>
<!--
.baslik {
	font-size: 15px;
	font-style: italic;
	vertical-align: top;
}

.esf {
	font-size: 15px;
	font-style: normal;
	vertical-align: top;
}
ul {
	list-style-image:url('../egitimapp/resources/icons/sari.png');
}
-->
</style>
<div class="view" style="padding: 10px;">
	<table class="view">
		<tr>
			<td rowspan="2"><div class="egitim-big-menu"></div></td>
			<td style="font-size: 20px; vertical-align: bottom;"><?php echo $egitim['Egitim']['kod']?></td>
		</tr>
		<tr>
			<td style="font-size: 20px;"><?php echo $egitim['Egitim']['baslik']?></td>
		</tr>
	</table>
	
	<table class="view">
		<tr>
			<td class="baslik">Grubu:</td>
			<td><?php echo $egitim['Egitim']['kategori_adi']?></td>
		</tr>
		<tr>
			<td class="baslik">Genel Bilgi:</td>
			<td><?php echo $egitim['Egitim']['kazanimlar']?></td>
		</tr>
		
	</table>
	<br>
	<fieldset title="Eğitim Formatı/Süresi" style="border: 1px solid #666666;">
		<legend class="baslik">Eğitim Formatı/Süresi</legend>
		<div class="view" style="padding: 2px;">
		<ul>
		<?php if ($egt['esf_seminer']) {?>
			<li class="esf">Seminer, <?php echo strcasecmp('_DIGER', $egt['esf_seminer_sure']) == 0 ?  $egt['esf_seminer_diger_aciklama'] : $prm->getEgitimSuresiText($egt['esf_seminer_sure'])?>
			</li>
		<?php }?>
		<?php if ($egt['esf_egitim']) {?>
			<li class="esf">Eğitim, <?php echo strcasecmp('_DIGER', $egt['esf_egitim_sure']) == 0 ?  $egt['esf_egitim_diger_aciklama'] : $prm->getEgitimSuresiText($egt['esf_egitim_sure'])?>
			</li>
		<?php }?>
		<?php if ($egt['esf_kurs']) {?>
			<li class="esf">Kurs, <?php echo strcasecmp('_DIGER', $egt['esf_kurs_sure']) == 0 ?  $egt['esf_kurs_diger_aciklama'] : $prm->getEgitimSuresiText($egt['esf_kurs_sure'])?>
			</li>
		<?php }?>
		<?php if ($egt['esf_aktivite']) {?>
			<li class="esf">Aktivite, <?php echo strcasecmp('_DIGER', $egt['esf_aktivite_sure']) == 0 ?  $egt['esf_aktivite_diger_aciklama'] : $prm->getEgitimSuresiText($egt['esf_aktivite_sure'])?>
			</li>
		<?php }?>
		<?php if ($egt['esf_uygulama']) {?>
			<li class="esf">Uygulama, <?php echo strcasecmp('_DIGER', $egt['esf_uygulama_sure']) == 0 ?  $egt['esf_uygulama_diger_aciklama'] : $prm->getEgitimSuresiText($egt['esf_uygulama_sure'])?>
			</li>
		<?php }?>
		</ul>
		</div>
	</fieldset>
	<br>
	
	<table class="view">
		<tr>
			<td colspan="2"><b>Eğitim İçerikleri</b></td>
		</tr>	
		<tr>
			<td colspan="2"><hr></td>
		</tr>
		<?php foreach ($icerikler as $icerik) {?>
			<tr style="background-color: #F1F5FB">
				<td class="baslik">Alt Başlık:</td>
				<td><?php echo $icerik['EgitimsIcerik'] ['alt_baslik']?></td>
			</tr>
			<tr style="background-color: #F1F5FB">
				<td class="baslik">Açıklama:</td>
				<td><?php echo $icerik['EgitimsIcerik'] ['aciklama']?></td>
			</tr>
			<tr>
				<td colspan="2"><hr></td>
			</tr>
		<?php }?>
	</table>
	
</div>
