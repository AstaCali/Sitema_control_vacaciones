import { Injectable } from '@angular/core';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';

@Injectable({
  providedIn: 'root'
})
export class ImpresionService {

  constructor() { }

  // imprimirReport(encabezado : string[], cuerpo : Array<any>, titulo : string, guardar : boolean)
  imprimirReport(encabezado : string[], cuerpo : any[], titulo : string, guardar : boolean)
  {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: 'letter'
    });
    doc.text(titulo, doc.internal.pageSize.width /2, 25, {align: 'center'});
    // Convertir el objeto cuerpo a un array de arrays (filas de la tabla)
    const cuerpoTabla = cuerpo.map((obj) => [
      obj.id,
      obj.nombre_completo,
      // obj.name,
      // obj.last_name,
      // obj.ci,
      // obj.cellphone,
      // obj.email,
      obj.start_date,
      obj.end_date,
      obj.reason,
      obj.total_tomadas,
      obj.total_day,
      obj.entry_date
      // obj.observations,
      // obj.gender,
    ]);
    autoTable(doc, {
      head: [encabezado],
      body: cuerpoTabla, // Aquí pasamos el cuerpo ya convertido en filas de la tabla
    });
    // autoTable(doc,{
    //   head: [encabezado],
    //   body: [cuerpo],
    // });

    if(guardar)
    {
      const hoy = new Date();
      doc.save(hoy.getDate() + hoy.getMonth() + hoy.getFullYear() + hoy.getTime() +'.pdf')
    }
    else{
      // Abre la ventana de impresión
      doc.autoPrint();
      window.open(doc.output('bloburl'), '_blank');
    }
  }
}
