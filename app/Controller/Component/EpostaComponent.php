<?php  

App::uses('Component', 'Controller');
App::uses('CakeEmail', 'Network/Email');

class EpostaComponent extends Component { 
  
	const EPOSTA_PROFILE = 'gmail'; //Test ortamında gmail'i "takip" yap
	/** 
	 * Katılımcı kaydı için katılımcıya eposta gönderir
	 * 
	 */ 
    public function gonderKatilimciKayitEposta ($adSoyad = null, $eposta = null){ 
    	$Email = new CakeEmail('takip'); 
    	
    	CakeLog::write('eposta',"KatilimciKayitEposta->".$adSoyad.", ".$eposta);
    	 
    	$Email->to($eposta);
    	$Email->subject('Eğitim Takip Sistem Kaydı');
    	$Email->template('kayit', 'takip');
    	$Email->emailFormat('html');
    	$Email->viewVars(array(
    		'adSoyad' => $adSoyad
    	));
    	$Email->send();
    }
    
    public function gonderKatilimciOnayEposta ($adSoyad = null, $kullaniciAdi = null, $parola = null){
    	$Email = new CakeEmail('takip');
    	 
    	CakeLog::write('eposta',"KatilimciOnayEposta->".$kullaniciAdi.", ".$parola);
    
    	$Email->to($kullaniciAdi);
    	$Email->subject('Eğitim Takip Sistem Onayı');
    	$Email->template('onay', 'takip');
    	$Email->emailFormat('html');
    	$Email->viewVars(array(
    			'adSoyad' => $adSoyad,
    			'kullaniciAdi' => $kullaniciAdi,
    			'parola' => $parola
    	));
    	$Email->send();
    }
    
    public function gonderParolamiUnuttumEposta ($kullaniciAdi = null, $parola = null){
    	$Email = new CakeEmail('takip');
    
    	CakeLog::write('eposta',"ParolamiUnuttumEposta->".$kullaniciAdi.", ".$parola);
    
    	$Email->to($kullaniciAdi);
    	$Email->subject('Eğitim Takip Sistemi Parola Kurtarma İsteği');
    	$Email->template('parolamiunuttum', 'takip');
    	$Email->emailFormat('html');
    	$Email->viewVars(array(
    			'kullaniciAdi' => $kullaniciAdi,
    			'parola' => $parola
    	));
    	$Email->send();
    }
    
    public function mimeContentType($filename) {

    	$mime_types = array(
    	
    			'txt' => 'text/plain',
    			'htm' => 'text/html',
    			'html' => 'text/html',
    			'php' => 'text/html',
    			'css' => 'text/css',
    			'js' => 'application/javascript',
    			'json' => 'application/json',
    			'xml' => 'application/xml',
    			'swf' => 'application/x-shockwave-flash',
    			'flv' => 'video/x-flv',
    	
    			// images
    			'png' => 'image/png',
    			'jpe' => 'image/jpeg',
    			'jpeg' => 'image/jpeg',
    			'jpg' => 'image/jpeg',
    			'gif' => 'image/gif',
    			'bmp' => 'image/bmp',
    			'ico' => 'image/vnd.microsoft.icon',
    			'tiff' => 'image/tiff',
    			'tif' => 'image/tiff',
    			'svg' => 'image/svg+xml',
    			'svgz' => 'image/svg+xml',
    	
    			// archives
    			'zip' => 'application/zip',
    			'rar' => 'application/x-rar-compressed',
    			'exe' => 'application/x-msdownload',
    			'msi' => 'application/x-msdownload',
    			'cab' => 'application/vnd.ms-cab-compressed',
    	
    			// audio/video
    			'mp3' => 'audio/mpeg',
    			'qt' => 'video/quicktime',
    			'mov' => 'video/quicktime',
    	
    			// adobe
    			'pdf' => 'application/pdf',
    			'psd' => 'image/vnd.adobe.photoshop',
    			'ai' => 'application/postscript',
    			'eps' => 'application/postscript',
    			'ps' => 'application/postscript',
    	
    			// ms office
    			'docx' => 'application/msword',
    			'doc' => 'application/msword',
    			'rtf' => 'application/rtf',
    			'xlsx' => 'application/vnd.ms-excel',
    			'xls' => 'application/vnd.ms-excel',
    			'ppt' => 'application/vnd.ms-powerpoint',
    	
    			// open office
    			'odt' => 'application/vnd.oasis.opendocument.text',
    			'ods' => 'application/vnd.oasis.opendocument.spreadsheet'
    	);
    	
    	$var = explode('.', $filename);
    	$var = end($var);
    	$ext = strtolower($var);
    	
    	if (array_key_exists($ext, $mime_types)) {
    		return $mime_types[$ext];
    	}
    	elseif (function_exists('finfo_open')) {
    		$finfo = finfo_open(FILEINFO_MIME);
    		$mimetype = finfo_file($finfo, $filename);
    		finfo_close($finfo);
    		return $mimetype;
    	}
    	else {
    		return 'application/octet-stream';
    	}
    	     	
    }
    
} 
?>