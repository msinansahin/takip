<div class="kullanicis form">
<fieldset>
	 <legend>
            <?php echo __('Lütfen kullanıcı adınızı giriniz'); ?>
        </legend>
	<?php echo $this->Form->create(null, array('action' => 'forgotPassword', 'id' => 'web-form')); ?>
	<?php echo $this->Form->input('Kullanici.username', array('label' => 'Kullanıcı Adı', 'between'=>'<br />', 'type'=>'text')); ?>
	<?php echo $this->Form->submit('Parola Gönder', array('class' => 'submit', 'id' => 'submit')); ?>
	<?php echo $this->Form->end(); ?>
<fieldset>
</div>
