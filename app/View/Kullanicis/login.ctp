<div class="kullanicis form">
<?php echo $this->Form->create('Kullanici'); ?>
    <fieldset>
        <legend>
            <?php echo __('Lütfen kullanıcı adınızı ve parolanızı giriniz'); ?>
        </legend>
        <?php echo $this->Form->input('username', array(
        		'label' => 'Kullanıcı Adı'
        ));
        echo $this->Form->input('password', array(
			'label' => 'Parola'
		));
    ?>
    </fieldset>
<?php echo $this->Form->end(__('Giriş')); ?>
<p><?php echo $this->Html->link('Parolamı Unuttum', '/kullanicis/forgotPassword'); ?></p>

</div>