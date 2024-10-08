import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  //styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{

  //menuItems: any[];
  public usuario: Usuario;

  constructor( public sidebarService : SidebarService, 
              private usuarioservice:UsuarioService ){
    // this.menuItems = sidebarService.menu;
    // console.log(this.menuItems);
    this.usuario = usuarioservice.usuario;
  }

  ngOnInit(): void {
    
  }

}
