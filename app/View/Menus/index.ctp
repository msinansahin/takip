<?php

	//header('Content-Type: text/html; charset=utf-8');
	
	class MainMenu {
		var $title;
		var $iconCls;
		var $items;
	}

	class Menu {
		var $id;
		var $xtype;
		var $title;
		var $modal;
		var $menuCls;
	}
	//$rol = $_SESSION['Auth']['User']['rol'];
	$rol = $_SESSION['rol'];
	
	class Result {
		var $results;
	}
	$result = new Result();
	
	if (strcasecmp($rol, 'ADMIN') == 0) {
		
		$menu = new Menu();
		$menu->id = "menuid";
		$menu->xtype = "egitimform";
		$menu->title = "Eğitim";
		
		$menu1 = new Menu();
		$menu1->id = "menuid1";
		$menu1->xtype = "egitimlist";
		//$menu1->xtype = "fileselectorpanel";		
		$menu1->title = "Eğitim Listesi";
			
		$menu2 = new Menu();
		$menu2->id = "menuid2";
		$menu2->xtype = "menuxtype2";
	
		$menu3 = new Menu();
		$menu3->id = "menuid3";
		$menu3->xtype = "egitmenlist";
		$menu3->title = "Eğitmen Listesi";
		
		$menu4 = new Menu();
		$menu4->id = "menuid4";
		$menu4->xtype = "egitmenform";
		$menu4->title = "Yeni Eğitmen";
	
		$menu5 = new Menu();
		$menu5->id = "menuid5";
		$menu5->xtype = "egitimkategoritree";
		$menu5->title = "Eğitim Türleri";
		
		/***/
		$menuPY = new Menu();
		$menuPY->id = "menuidPY";
		$menuPY->xtype = "projetabpanel";
		$menuPY->title = "Yeni Proje";
		$menuPY->modal = true;
		
		$menuPL = new Menu();
		$menuPL->id = "menuidPL";
		$menuPL->xtype = "projelist";
		$menuPL->title = "Proje Listesi";
	
		$menuTT = new Menu();
		$menuTT->id = "menuidTT";
		$menuTT->xtype = "toplantitutanagiform";
		$menuTT->iconCls = "tt";
		$menuTT->menuCls = "tt";
		$menuTT->title = "Yeni Toplantı Tutanağı";
		
		$menuTTL = new Menu();
		$menuTTL->id = "menuidTTL";
		$menuTTL->xtype = "toplantitutanagilist";
		$menuTTL->iconCls = "tt";
		$menuTTL->menuCls = "tt";
		$menuTTL->title = "Toplantı Tutanağı Listesi";
		
		$menuKatL = new Menu();
		$menuKatL->id = "menuidKatL";
		$menuKatL->xtype = "katilimcilist";
		$menuKatL->title = "Katılımcı Listesi";
		
		$menuAT = new Menu();
		$menuAT->id = "menuidAT";
		$menuAT->xtype = "ankettanimlist";
		$menuAT->title = "Anket Tanımları";
		
		$menuAS = new Menu();
		$menuAS->id = "menuidAS";
		$menuAS->xtype = "anketsonucpanel";
		$menuAS->title = "Anket Sonuçları";

		$menuKUL = new Menu();
		$menuKUL->id = "menuKUL";
		$menuKUL->xtype = "kullanicilist";
		$menuKUL->title = "Kullanıcılar";
		
		$menugr = new Menu();
		$menugr->id = "menuidgr";
		$menugr->xtype = "gunlukraporlist";
		$menugr->title = "Günlük Raporlar";
		$menugr->iconCls = "gunluk-rapor";
		
		
		$egitimMenu = new MainMenu ();
		$egitimMenu->title = "Eğitim";
		$egitimMenu->iconCls = "egitim";
		$egitimMenu->items = array ($menu, $menu1, $menu2);
		
		$egitimMenu1 = new MainMenu ();
		$egitimMenu1->title = "Eğitmen";
		$egitimMenu1->iconCls = "egitmen";
		$egitimMenu1->items = array ($menu4, $menu3);
		
		$egitimMenu2 = new MainMenu ();
		$egitimMenu2->title = "Tanımlar";
		$egitimMenu2->iconCls = "tanimlar";
		$egitimMenu2->items = array ($menu5, $menuAT, $menuAS);
		
		$egitimMenu3 = new MainMenu ();
		$egitimMenu3->title = "Proje";
		$egitimMenu3->iconCls = "proje";
		$egitimMenu3->items = array ($menuPY, $menuPL);
		
		$egitimMenu4 = new MainMenu ();
		$egitimMenu4->title = "Diğer";
		$egitimMenu4->iconCls = "diger";
		$egitimMenu4->items = array ($menuTT, $menuTTL, $menugr, $menuKatL, $menuKUL);
		
		$result->results = array ($egitimMenu, $egitimMenu1, $egitimMenu3, $egitimMenu2, $egitimMenu4);
	} else if (strcasecmp($rol,'KATILIMCI') == 0) {
		$katilimci = new MainMenu ();
		$katilimci->title = "Katilimci";
		$katilimci->iconCls = "katilimci-menu";
		
		$menu1 = new Menu();
		$menu1->id = "menuid1";
		$menu1->xtype = "egitimlist";
		$menu1->title = "Eğitimler";
		$menu1->iconCls = "egitim";
		$menu1->menuCls = "egitim-big-menu";
	
		$menu2 = new Menu();
		$menu2->id = "menuid2";
		$menu2->xtype = "anketform";
		$menu2->title = "Anketler";
		$menu2->iconCls = "anket";
		$menu2->menuCls = "anket-big-menu";

		$menu3 = new Menu();
		$menu3->id = "menuid3";
		$menu3->xtype = "projegrupprogramcontainer";
		$menu3->title = "Takvim";
		$menu3->iconCls = "takvim";
		$menu3->menuCls = "takvim-big-menu";

		$menuGR = new Menu();
		$menuGR->id = "menuid3";
		$menuGR->xtype = "uygegitimdokumanlist";
		$menuGR->title = "Görseller";
		$menuGR->iconCls = "gorsel";
		$menuGR->menuCls = "gorsel-big-menu";
		
		$menu4 = new Menu();
		$menu4->id = "menuid4";
		$menu4->xtype = "katilimciform"; //eğitmen için değişik olacak
		$menu4->title = "Profil";
		$menu4->iconCls = "profil";
		$menu4->menuCls = "profil-big-menu";
		$katilimci->items = array ($menu1, $menu3, $menu2, $menuGR, $menu4);
		
		$result->results = array ($katilimci);
		
	} else if (strcasecmp($rol, 'KURUM_YONETICISI') == 0) {
		$ky = new MainMenu ();
		$ky->title = "Kurum Yöneticisi";
		$ky->iconCls = "katilimci-menu";
		
		$menug = new Menu();
		$menug->id = "menuidg";
		$menug->xtype = "katilimcilist";
		$menug->title = "Gruplar";
		$menug->iconCls = "grup";
		$menug->menuCls = "grup-big-menu";
		
		$menu1 = new Menu();
		$menu1->id = "menuid1";
		$menu1->xtype = "egitimlist";
		$menu1->title = "Eğitimler";
		$menu1->iconCls = "egitim";
		$menu1->menuCls = "egitim-big-menu";
	
		$menu2 = new Menu();
		$menu2->id = "menuid2";
		$menu2->xtype = "anketform";
		$menu2->title = "Anketler";
		$menu2->iconCls = "anket";
		$menu2->menuCls = "anket-big-menu";

		$menu3 = new Menu();
		$menu3->id = "menuid3";
		$menu3->xtype = "projegrupprogramcontainer";
		$menu3->title = "Takvim";
		$menu3->iconCls = "takvim";
		$menu3->menuCls = "takvim-big-menu";

		$menuTTL = new Menu();
		$menuTTL->id = "menuidTTL";
		$menuTTL->xtype = "toplantitutanagilist";
		$menuTTL->iconCls = "tt";
		$menuTTL->menuCls = "tt-big-menu";
		$menuTTL->title = "Toplantı Tutanakları";
		
		$menugr = new Menu();
		$menugr->id = "menuidgr";
		$menugr->xtype = "gunlukraporlist";
		$menugr->title = "Günlük Raporlar";
		$menugr->iconCls = "gunluk-rapor";
		$menugr->menuCls = "gunluk-rapor-big-menu";
		
		$menuGR = new Menu();
		$menuGR->id = "menuidGR";
		$menuGR->xtype = "uygegitimdokumanlist";
		$menuGR->title = "Görseller";
		$menuGR->iconCls = "gorsel";
		$menuGR->menuCls = "gorsel-big-menu";
		
		$menu4 = new Menu();
		$menu4->id = "menuid4";
		$menu4->xtype = "katilimciform"; //eğitmen için değişik olacak
		$menu4->title = "Profil";
		$menu4->iconCls = "profil";
		$menu4->menuCls = "profil-big-menu";
		$ky->items = array ($menug, $menu1, $menu3, $menu2, $menugr, $menuTTL, $menuGR, $menu4);
		
		$result->results = array ($ky);
		
	}
	
	if (strcasecmp($rol, 'EGITMEN') == 0 || strcasecmp($rol, 'ASISTAN') == 0) {
		$egt = new MainMenu ();
		$egt->title = "Asistan-Eğitmen";
		$egt->iconCls = "egitmen-menu";
		
		$menup = new Menu();
		$menup->id = "menuidp";
		$menup->xtype = "projelist";
		$menup->title = "Projeler";
		$menup->iconCls = "proje";
		$menup->menuCls = "proje-big-menu";
		
		$menupr = new Menu();
		$menupr->id = "menuidpr";
		$menupr->xtype = "egitmenform";
		$menupr->title = "Profil";
		$menupr->iconCls = "profil";
		$menupr->menuCls = "profil-big-menu";
		
		$menugr = new Menu();
		$menugr->id = "menuidgr";
		$menugr->xtype = "gunlukraporlist";
		$menugr->title = "Günlük Raporlar";
		$menugr->iconCls = "gunluk-rapor";
		$menugr->menuCls = "gunluk-rapor-big-menu";
		$egt->items = array ($menup, $menugr, $menupr);
		
		$result->results = array ($egt);
	}

	echo json_encode ( $result );

?>