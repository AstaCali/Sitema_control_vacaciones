import { Component, OnInit } from '@angular/core';

//declare function customInitFunctions(): void;// FUNCIONA POR EL MOMENTO
declare function customInitFunctions():void;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: []
})
export class PagesComponent implements OnInit{

  ngOnInit(): void {
    customInitFunctions();
  }

}
