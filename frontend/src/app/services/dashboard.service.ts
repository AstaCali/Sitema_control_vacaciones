import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

const base_url = environment.serverBaseUrl;

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http : HttpClient) { }

  totalUser(){
    const url = `${ base_url }/persons`;
    return this.http.get(url).pipe(
      map((res:any) => res.totalEmpleados)
    );
  }
  totalRoles() {
    const url = `${ base_url }/roles/totalgetrole`;
    return this.http.get( url )
              .pipe(
                map((resp: any) => resp.roles)
              );
  }
}
