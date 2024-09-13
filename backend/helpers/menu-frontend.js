const getMenuFrontEnd = (role = 1) => {

    const menu = [
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
    //----SECRETARIA---
    // if (role === 4) {
    //     return [
    //         {
    //             titulo: 'Citas Medica',
    //             icono: 'mdi mdi-gauge',
    //             submenu: [
    //                 { titulo: 'Main', url: '/' },
    //                 { titulo: 'Agendar Cita', url: 'programar_cita' },
    //                 //{ titulo: 'Rxjs', url: 'rxjs' }, // no se usara
    //             ]
    //         },
    //         {
    //             titulo: 'Accesos',
    //             icono: 'mdi mdi-folder-lock-open',
    //             submenu: [
    //                 { titulo: 'Odontologo', url: 'odontologos' },
    //             ]
    //         },
    //         {
    //             titulo: 'Clinica',
    //             icono: 'mdi mdi-stethoscope',
    //             submenu: [
    //                 { titulo: 'Diente', url: 'diente' },
    //                 { titulo: 'Tratamiento', url: 'tratamientos' },
    //             ]
    //         }
    //     ];
    // }
    //-----HASTA AQUI---
    //----ODONTOLOGO---
    // if (role === 3) {
    //     return [
    //         {
    //             titulo: 'Citas Medica',
    //             icono: 'mdi mdi-gauge',
    //             submenu: [
    //                 //{ titulo: 'Main', url: '/' },
    //                 { titulo: 'Agendar Cita', url: 'programar_cita' },
    //                 //{ titulo: 'Rxjs', url: 'rxjs' }, // no se usara
    //             ]
    //         },
    //         // {
    //         //     titulo: 'Accesos',
    //         //     icono: 'mdi mdi-folder-lock-open',
    //         //     submenu: [
    //         //         { titulo: 'Odontologo', url: 'odontologos' },
    //         //     ]
    //         // }
    //     ];
    // }
    //-----HASTA AQUI---
    // Menú específico para 'PACIENTE'
    // if (role === 2) {
    //     return [
    //         {
    //             titulo: 'Citas Medica',
    //             icono: 'mdi mdi-gauge',
    //             submenu: [
    //                 //{ titulo: 'Main', url: '/' },
    //                 { titulo: 'Agendar Cita', url: 'programar_cita' },
    //                 //{ titulo: 'Rxjs', url: 'rxjs' }, // no se usara
    //             ]
    //         }
    //     ];
    // }

    return menu;
}

module.exports = {
    getMenuFrontEnd,
}