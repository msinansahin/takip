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
 * @package       app.View.Emails.html
 * @since         CakePHP(tm) v 0.10.0.1076
 * @license       http://www.opensource.org/licenses/mit-license.php MIT License
 */
?>
<?php
/*
$content = explode("\n", $content);

foreach ($content as $line):
	echo '<p> ' . $line . "</p>\n";
endforeach;
*/
?>
<html>
<head>
<title>E&#287;itim Takip Sistemi Onay&#305;</title>
<meta content="text/html; charset=UTF-8" http-equiv="content-type">
<style type="text/css">
@import
	url('https://themes.googleusercontent.com/fonts/css?kit=wAPX1HepqA24RkYW1AuHYA')
	;

ol {
	margin: 0;
	padding: 0
}

.c4 {
	vertical-align: middle;
	width: 109.6pt;
	border-style: solid;
	border-color: #000000;
	border-width: 0pt;
	padding: 0.8pt 0.8pt 0.8pt 0.8pt
}

.c8 {
	vertical-align: middle;
	width: 61.2pt;
	border-style: solid;
	border-color: #000000;
	border-width: 0pt;
	padding: 0.8pt 0.8pt 0.8pt 0.8pt
}

.c9 {
	margin-right: auto;
	border-collapse: collapse
}

.c7 {
	max-width: 453.6pt;
	background-color: #ffffff;
	padding: 70.8pt 70.8pt 70.8pt 70.8pt
}

.c0 {
	height: 11pt;
	direction: ltr
}

.c1 {
	line-height: 1.0;
	padding-bottom: 0pt
}

.c6 {
	color: inherit;
	text-decoration: inherit
}

.c2 {
	direction: ltr
}

.c5 {
	font-weight: bold
}

.c3 {
	height: 0pt
}

.title {
	padding-top: 24pt;
	line-height: 1.1500000000000001;
	text-align: left;
	color: #000000;
	font-size: 36pt;
	font-family: "Calibri";
	font-weight: bold;
	padding-bottom: 6pt
}

.subtitle {
	padding-top: 18pt;
	line-height: 1.1500000000000001;
	text-align: left;
	color: #666666;
	font-style: italic;
	font-size: 24pt;
	font-family: "Georgia";
	padding-bottom: 4pt
}

li {
	color: #000000;
	font-size: 11pt;
	font-family: "Calibri"
}

p {
	color: #000000;
	font-size: 11pt;
	margin: 0;
	font-family: "Calibri"
}

h1 {
	padding-top: 24pt;
	line-height: 1.1500000000000001;
	text-align: left;
	color: #000000;
	font-size: 24pt;
	font-family: "Calibri";
	font-weight: bold;
	padding-bottom: 6pt
}

h2 {
	padding-top: 18pt;
	line-height: 1.1500000000000001;
	text-align: left;
	color: #000000;
	font-size: 18pt;
	font-family: "Calibri";
	font-weight: bold;
	padding-bottom: 4pt
}

h3 {
	padding-top: 14pt;
	line-height: 1.1500000000000001;
	text-align: left;
	color: #000000;
	font-size: 14pt;
	font-family: "Calibri";
	font-weight: bold;
	padding-bottom: 4pt
}

h4 {
	padding-top: 12pt;
	line-height: 1.1500000000000001;
	text-align: left;
	color: #000000;
	font-size: 12pt;
	font-family: "Calibri";
	font-weight: bold;
	padding-bottom: 2pt
}

h5 {
	padding-top: 11pt;
	line-height: 1.1500000000000001;
	text-align: left;
	color: #000000;
	font-size: 11pt;
	font-family: "Calibri";
	font-weight: bold;
	padding-bottom: 2pt
}

h6 {
	padding-top: 10pt;
	line-height: 1.1500000000000001;
	text-align: left;
	color: #000000;
	font-size: 10pt;
	font-family: "Calibri";
	font-weight: bold;
	padding-bottom: 2pt
}
</style>
</head>
<body class="c7">
	<p class="c2">
		<span class="c5"><b>E&#287;itim Takip Sistemi Onay&#305;</b></span>
	</p>
	<br>
	<p class="c2">
		<span>Say&#305;n <b><?php echo $adSoyad?></b>,</span>
	</p>
	<p class="c1 c2">
		<span>E&#287;itim Takip Sistemi&rsquo;ne onay&#305;n&#305;z
			tamamlanm&#305;&#351;t&#305;r.</span>
	</p>
	<p class="c1 c2">
		<span>Sisteme giri&#351; yapabilirsiniz.</span>
	</p>
	<br>
	<p class="c0 c1">
		<span></span>
	</p>
	<a href="#" name="7b9fd363e49c56fa1516a21153dd8d922ccfddaf"></a>
	<a href="#" name="0"></a>
	<table cellpadding="0" cellspacing="0" class="c9">
		<tbody>
			<tr class="c3">
				<td class="c8"><p class="c1 c2">
						<span>Kullan&#305;c&#305; Ad&#305;:</span>
					</p></td>
				<td class="c4"><p class="c1 c2">
						<span><a class="c6" href="mailto:<?php echo $kullaniciAdi?>"><?php echo $kullaniciAdi?></a>
						</span>
					</p></td>
			</tr>
			<tr class="c3">
				<td class="c8"><p class="c1 c2">
						<span>Parola:</span>
					</p></td>
				<td class="c4"><p class="c1 c2">
						<span><?php echo $parola?></span>
					</p></td>
			</tr>
			<tr class="c3">
				<td class="c8"><p class="c0 c1">
						<span></span>
					</p></td>
				<td class="c4"><p class="c0 c1">
						<span></span>
					</p></td>
			</tr>
		</tbody>
	</table>
	<br>
	<p class="c1 c2">
		<a name="h.gjdgxs"></a><span>Te&#351;ekk&uuml;r eder, iyi
			&ccedil;al&#305;&#351;malar dileriz.</span>
	</p>
	<p class="c1 c2">
		<span>Sayg&#305;lar&#305;m&#305;zla,</span>
	</p>
	<p class="c0 c1">
		<span></span>
	</p>
	<br>
	<p class="c1 c2">
		<span>Dr. Ala Training &amp; Consultancy</span>
	</p>
	<p class="c1 c2">
		<span>http://www.egitimtakipsistemi.com</span>
	</p>
	<p class="c0">
		<span></span>
	</p>
	<p class="c0">
		<span></span>
	</p>
	<p class="c0">
		<span></span>
	</p>
</body>
</html>



