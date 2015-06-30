drop table egitmens;

drop table egitims_iceriks;
CREATE TABLE egitims (
	id INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
	kod VARCHAR(50),
	kategori INTEGER UNSIGNED,
	baslik VARCHAR(200) NOT NULL,
	kazanimlar TEXT,
	formati_suresi VARCHAR (20),
	egitim_sekli VARCHAR (20),
	katilimci_profili TEXT,
	created DATETIME,
	modified DATETIME,
	egitmen_id INTEGER UNSIGNED, 
	PRIMARY KEY (id)
) ENGINE=InnoDB;

CREATE TABLE egitims_iceriks (
	id INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
	egitmen_id INTEGER UNSIGNED NOT NULL,
	egitim_id INTEGER UNSIGNED NOT NULL,
	alt_baslik VARCHAR(500),
	aciklama TEXT,
	created DATETIME,
	modified DATETIME,
	PRIMARY KEY (id)
) ENGINE=InnoDB;


CREATE TABLE egitmens (
	id INTEGER NOT NULL AUTO_INCREMENT,
	kod VARCHAR(50),
	ad VARCHAR(50),
	soyad VARCHAR(50),
	eposta VARCHAR(200),
	tel VARCHAR(15),
	mobil VARCHAR(15),
	dogumTarihi DATE,
	web VARCHAR(1000),
	sokak VARCHAR(20),
	cadde VARCHAR(20),
	ulke VARCHAR(20),
	il VARCHAR(20),
	ilce VARCHAR(20),
	adres VARCHAR(1000),
	cv_media_id INTEGER,
	created DATETIME,
	modified DATETIME,
	PRIMARY KEY (id)
) ENGINE=InnoDB;

CREATE TABLE katilimcis (
	id INTEGER NOT NULL AUTO_INCREMENT,
	ad VARCHAR(50),
	soyad VARCHAR(50),
	eposta VARCHAR(200),
	tel VARCHAR(15),
	mobil VARCHAR(15),
	dogumTarihi DATE,
	sokak VARCHAR(20),
	cadde VARCHAR(20),
	ulke VARCHAR(20),
	il VARCHAR(20),
	ilce VARCHAR(20),
	adres VARCHAR(1000),
	grup VARCHAR(200),
	proje_id INTEGER UNSIGNED,
	user_id INTEGER UNSIGNED,
	created DATETIME,
	modified DATETIME,
	PRIMARY KEY (id)
) ENGINE=InnoDB;

CREATE TABLE egitims_egitmens (
	id INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
	egitmen_id INTEGER NOT NULL,
	egitim_id INTEGER NOT NULL,
	created DATETIME,
	modified DATETIME,
	PRIMARY KEY (id),
	UNIQUE (egitmen_id, egitim_id)
) ENGINE=InnoDB;

drop table tnm_egitim_kategoris

CREATE TABLE tnm_egitim_kategoris (
	id INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
	ad VARCHAR(50),
	parent_id INTEGER DEFAULT NULL,
	lft INTEGER DEFAULT NULL,
    rght INTEGER DEFAULT NULL,
	created DATETIME,
	modified DATETIME,
	PRIMARY KEY (id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `media` ( 
  `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT, 
  `name` varchar(50) NOT NULL, 
  `ext` varchar(10) NOT NULL, 
  `content` longblob, 
  `size` int(11) NOT NULL, 
  `created` datetime NOT NULL, 
  `modified` datetime NOT NULL, 
  `type` varchar(20) NOT NULL, 
  PRIMARY KEY  (`id`) 
) ENGINE=InnoDB; 


CREATE TABLE projes (
	id INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
	kod VARCHAR(50),
	baslik VARCHAR(500),
	kurum VARCHAR(500),
	katilimci_profili VARCHAR(500),
	il VARCHAR(20),
	otel VARCHAR(500),
	aciklama TEXT,
	hazirlik_bas_tarihi DATE,
	hazirlik_bit_tarihi DATE,
	uygulama_bas_tarihi DATE,
	uygulama_bit_tarihi DATE,
	takip_bas_tarihi DATE,
	takip_bit_tarihi DATE,
	sonuc_raporlama_bas_tarihi DATE,
	sonuc_raporlama_bit_tarihi DATE,
	created DATETIME,
	modified DATETIME,
	PRIMARY KEY (id)
) ENGINE=InnoDB;

CREATE TABLE `kullanicis` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(50) COLLATE utf8_turkish_ci DEFAULT NULL,
  `password` varchar(50) COLLATE utf8_turkish_ci DEFAULT NULL,
  `rol` varchar(30) COLLATE utf8_turkish_ci DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci$$;

CREATE TABLE `menus` (
  `id` varchar(16) COLLATE utf8_turkish_ci NOT NULL,
  `parent` varchar(16) COLLATE utf8_turkish_ci NOT NULL,
  `level` int(10) unsigned NOT NULL,
  `xtype` varchar(30) COLLATE utf8_turkish_ci NOT NULL,
  `rol` varchar(30) COLLATE utf8_turkish_ci NOT NULL,
  `icon` varchar(45) COLLATE utf8_turkish_ci NOT NULL,
  `title` varchar(45) COLLATE utf8_turkish_ci NOT NULL,
  `sort` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci$$;

CREATE TABLE `menus_rols` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `menu_id` int(10) unsigned NOT NULL,
  `rol` varchar(30) COLLATE utf8_turkish_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci$$;

drop table projes_egitims
CREATE TABLE projes_egitims (
	id INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
	proje_id INTEGER NOT NULL,
	egitim_id INTEGER NOT NULL,
	egitmen_id INTEGER,
	created DATETIME,
	modified DATETIME,
	PRIMARY KEY (id),
	UNIQUE (egitmen_id, egitim_id)
) ENGINE=InnoDB;

CREATE TABLE toplanti_tutanagis (
	id INTEGER NOT NULL AUTO_INCREMENT,
	tarih DATE,
	saat VARCHAR(50),
	yer VARCHAR(200),
	katilimcilar VARCHAR(1000),
	konu VARCHAR(1000),
	aciklama TEXT,
	dokuman_media_id INTEGER,
	created DATETIME,
	modified DATETIME,
	PRIMARY KEY (id)
) ENGINE=InnoDB;