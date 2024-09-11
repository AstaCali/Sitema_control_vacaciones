const getMenuFrontEnd = (role = 1) => {

    const menu = [
        {
          titulo: 'Citas Medica',
          icono: 'mdi mdi-gauge',
          submenu: [
            { titulo: 'Dashboard', url: '/' },
            { titulo: 'Agendar Cita', url: 'programar_cita' },//--Titulo nombre para la Vista y la ure ek mismo que esTa en pagues rouTing
            //{ titulo: 'Proforma Dental', url: 'proforma' }, //2024 aumente el 16/04/2024
            // { titulo: 'Progress', url: 'progress' },// no se usara
            // { titulo: 'Grafica1', url: 'grafica1' }, // no se usara
            //{ titulo: 'Programar Cita', url: 'programar_cita' },
            //{ titulo: 'Rxjs', url: 'rxjs' }, // no se usara
          ]
        },
        {
          titulo: 'Accesos',
          icono: 'mdi mdi-folder-lock-open',
          submenu: [
            { titulo: 'Usuario', url: 'usuario' },
            { titulo: 'Odontologo', url: 'odontologos' },
          ]
        },
        {
          titulo: 'Clinica',
          icono: 'mdi mdi-stethoscope',
          submenu: [
            { titulo: 'Diente', url: 'diente' },
            { titulo: 'Tratamiento', url: 'tratamientos' },
          ]
        }
    ];

    //-----condison de que quiero submenu quiero que se le muesTre ael y no al resto--
    // if ( role === 'ADMINISTRADOR') {
    //     menu[2]
    // }

    // return menu;
    // Si el rol es ADMINISTRADOR, añadir el submenú 'Clinica'
    // if (role === 1) {
    //     menu.push(
    //         {
    //             titulo: 'Clinica',
    //             icono: 'mdi mdi-stethoscope',
    //             submenu: [
    //                 { titulo: 'Diente', url: 'diente' },
    //                 { titulo: 'Tratamiento', url: 'tratamientos' },
    //             ]
    //         }
    //     );
    // }
    //----SECRETARIA---
    if (role === 4) {
        return [
            {
                titulo: 'Citas Medica',
                icono: 'mdi mdi-gauge',
                submenu: [
                    { titulo: 'Main', url: '/' },
                    { titulo: 'Agendar Cita', url: 'programar_cita' },
                    //{ titulo: 'Rxjs', url: 'rxjs' }, // no se usara
                ]
            },
            {
                titulo: 'Accesos',
                icono: 'mdi mdi-folder-lock-open',
                submenu: [
                    { titulo: 'Odontologo', url: 'odontologos' },
                ]
            },
            {
                titulo: 'Clinica',
                icono: 'mdi mdi-stethoscope',
                submenu: [
                    { titulo: 'Diente', url: 'diente' },
                    { titulo: 'Tratamiento', url: 'tratamientos' },
                ]
            }
        ];
    }
    //-----HASTA AQUI---
    //----ODONTOLOGO---
    if (role === 3) {
        return [
            {
                titulo: 'Citas Medica',
                icono: 'mdi mdi-gauge',
                submenu: [
                    //{ titulo: 'Main', url: '/' },
                    { titulo: 'Agendar Cita', url: 'programar_cita' },
                    //{ titulo: 'Rxjs', url: 'rxjs' }, // no se usara
                ]
            },
            // {
            //     titulo: 'Accesos',
            //     icono: 'mdi mdi-folder-lock-open',
            //     submenu: [
            //         { titulo: 'Odontologo', url: 'odontologos' },
            //     ]
            // }
        ];
    }
    //-----HASTA AQUI---
    // Menú específico para 'PACIENTE'
    if (role === 2) {
        return [
            {
                titulo: 'Citas Medica',
                icono: 'mdi mdi-gauge',
                submenu: [
                    //{ titulo: 'Main', url: '/' },
                    { titulo: 'Agendar Cita', url: 'programar_cita' },
                    //{ titulo: 'Rxjs', url: 'rxjs' }, // no se usara
                ]
            }
        ];
    }

    return menu;
}

module.exports = {
    getMenuFrontEnd,
}