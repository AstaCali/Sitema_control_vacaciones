import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [
    {
      titulo: 'Dashboard',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Dashboard ', url: '/' },
        // { titulo: 'Progress', url: 'progress' },
        // { titulo: 'Grafica1', url: 'grafica1' },
        // { titulo: 'Rxjs', url: 'rxjs' },
      ]
    },
    {
      titulo: 'Sis_Vacaciones',
      icono: 'mdi mdi-folder-lock-open',
      submenu: [
        { titulo: 'Usuario', url: 'usuario' },
        { titulo: 'Vacaciones', url: 'vacation' },
        // { titulo: 'Odontologo', url: 'odontologos' },
      ]
    },
  ];

  // menu: any[] = [
  //   {
  //     titulo: 'Citas Medica',
  //     icono: 'mdi mdi-gauge',
  //     submenu: [
  //       { titulo: 'Main', url: '/' },
  //       { titulo: 'Progress', url: 'progress' },
  //       { titulo: 'Grafica1', url: 'grafica1' },
  //       { titulo: 'Rxjs', url: 'rxjs' },
  //     ]
  //   },
  //   {
  //     titulo: 'Accesos',
  //     icono: 'mdi mdi-folder-lock-open',
  //     submenu: [
  //       { titulo: 'Usuario', url: 'usuario' },
  //       { titulo: 'Vacaciones', url: 'vacation' },
  //       // { titulo: 'Odontologo', url: 'odontologos' },
  //     ]
  //   },
  //   {
  //     titulo: 'Clinica',
  //     icono: 'mdi mdi-stethoscope',
  //     submenu: [
  //       { titulo: 'Diente', url: 'diente' },
  //       { titulo: 'Tratamiento', url: 'tratamientos' },
  //     ]
  //   }
  // ];

  constructor() { }
}
