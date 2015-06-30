<?php
App::uses('CakeEmail', 'Network/Email');
class EmailShell extends AppShell {
	
	public function main() { 
		
		$Email = new CakeEmail('gmail');
           
        $this->out('Gmail-Emailer send test:'); 
        $this->hr(); 
         
        while (empty($email)) { 
          $email = $this->in('Email:'); 
          if (empty($email)) $this->out('Email must not be empty!'); 
        }
        
        while (empty($adSoyad)) {
        	$adSoyad = $this->in('AdSoyad:');
        	if (empty($adSoyad)) $this->out('AdSoyad must not be empty!');
        }
        
        $Email->to($email);
        $Email->subject('Deneme');
        $Email->template('kayit', 'takip');
        $Email->emailFormat('html');
        $Email->viewVars(array('adSoyad' => $adSoyad));
        $Email->send();
        
        /*
        while (empty($pwd1)) { 
          $pwd1 = $this->in('Password:'); 
          if (empty($pwd1)) $this->out('Password must not be empty!'); 
        } 
         
        while (empty($pwd2)) { 
          $pwd2 = $this->in('Password Confirmation:'); 
          if ($pwd1 !== $pwd2) { 
            $this->out('Passwort and confirmation do not match!'); 
            $pwd2 = NULL; 
          } 
        } 
        */
         
        $this->out('email sent to '.$email);
        
    } 
}
?>