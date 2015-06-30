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
	}
	
	$menu = new Menu();
	$menu->id = "menuid";
	$menu->xtype = "egitimform";
	$menu->title = "Eğitim";
	
	$menu1 = new Menu();
	$menu1->id = "menuid1";
	$menu1->xtype = "egitimlist";
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
	
	$menuPL = new Menu();
	$menuPL->id = "menuidPL";
	$menuPL->xtype = "projelist";
	$menuPL->title = "Proje Listesi";

	$menuTT = new Menu();
	$menuTT->id = "menuidTT";
	$menuTT->xtype = "toplantitutanagiform";
	$menuTT->title = "Yeni Toplantı Tutanağı";
	
	$menuTTL = new Menu();
	$menuTTL->id = "menuidTTL";
	$menuTTL->xtype = "toplantitutanagilist";
	$menuTTL->title = "Toplantı Tutanağı Listesi";
	
	$menuAT = new Menu();
	$menuAT->id = "menuidAT";
	$menuAT->xtype = "ankettanimlamapanel";
	$menuAT->title = "Anket";
	
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
	$egitimMenu2->items = array ($menu5, $menuAT);
	
	$egitimMenu3 = new MainMenu ();
	$egitimMenu3->title = "Proje";
	$egitimMenu3->iconCls = "proje";
	$egitimMenu3->items = array ($menuPY, $menuPL);
	
	$egitimMenu4 = new MainMenu ();
	$egitimMenu4->title = "Diğer";
	$egitimMenu4->iconCls = "diger";
	$egitimMenu4->items = array ($menuTT, $menuTTL);
	
	class Result {
		var $results;
	}
	$result = new Result();
	$result->results = array ($egitimMenu, $egitimMenu1, $egitimMenu3, $egitimMenu2, $egitimMenu4);

	echo json_encode ( $result );

?>