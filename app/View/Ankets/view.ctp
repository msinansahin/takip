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
	<?php foreach ($ab as $anketBilgi) {?>

	<table class="view">
		<tr>
			<td rowspan="2"><div class="anket-big-menu"></div></td>
			<td style="font-size: 20px; vertical-align: bottom;"><?php echo $anketBilgi->anketAciklama?></td>
			<td style="vertical-align: bottom;"><?php echo $anketBilgi->doldurulmus ? ('<div class="anket-doldur"><font color="green">Dolduruldu</font></div>') : '<a href="#" onclick="Egitim.view.admin.AnketTanimPanel.anketFormuYarat(' . $anketBilgi->anketTanimId .  ', true);return false;"><font color="red">Doldur</font></a> '?></td>
		</tr>
		<tr>
			<td style="font-size: 20px;"></td>
		</tr>
	</table>
	<?php }?>
	
</div>
