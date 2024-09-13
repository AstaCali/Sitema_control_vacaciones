import { Component, OnInit } from '@angular/core';
import { Vacations } from 'src/app/models/vacation.model';
import { VacationService } from 'src/app/services/vacation.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vacation',
  templateUrl: './vacation.component.html',
  styleUrls: ['./vacation.component.css']
})
export class VacationComponent implements OnInit {

  public vacationUser: Vacations[] = [];
  //public vacationUser: any;
  public totalVacations : number = 0;
  public desde : number = 0;

  constructor ( private vacationservice: VacationService){}

  ngOnInit(): void {

    this.cargarVacations();
    
  }

  cargarVacations(termino: string = '') {
    //this.cargando = true;
    this.vacationservice.cargarVacations(termino, this.desde)
      .subscribe( ({total, vacations}) => {
        console.log("==>",total,vacations);
        this.totalVacations = total;
        this.vacationUser = vacations;
    })
  }

  cambiarPagina( valor : number){
    console.log('cambia', valor);
    this.desde += valor; 
    if (this.desde < 0){
      this.desde = 0;
    } else if ( this.desde >= this.totalVacations){
      this.desde -= valor;
    }
    this.cargarVacations();
  }

  //---ELIMINAR VACATION-
  eliminarVacation( vacations : Vacations )
  {
    Swal.fire({
      title: '¿Borrar Usuario?',
      text: `Esta a punto de borrar a ${ vacations.name } ${vacations.last_name}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if (result.value) {
        
        //this.medicoService.borrarMedico( medico._id )
        this.vacationservice.deleteVacation( vacations.id )
          .subscribe( resp => {
            Swal.fire(
              'Vacacion borrado',
              `${ vacations.name } fue eliminado correctamente`,
              'success'
            );
            this.cargarVacations();
            
          });

      }
    })
  }

}
