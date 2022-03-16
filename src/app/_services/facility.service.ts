import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Facility} from '../_interfaces/facility';

@Injectable({
  providedIn: 'root',
})
export class FacilityService {

  constructor(private http: HttpClient) {
  }

  fetchFacilities(): Observable<Facility[]> {
    return this.http.get<Facility[]>(`${environment.apiUrl}facilities`);
  }

  addFacilities(facilities: Facility[]): Observable<Facility[]> {
    return this.http.post<Facility[]>(`${environment.apiUrl}facilities`, facilities);
  }

  updateFacility(id: number, facility: Facility): Observable<Facility> {
    return this.http.put<Facility>(`${environment.apiUrl}facility/${id}`, facility);
  }

  deleteFacility(id: number): Observable<Facility> {
    return this.http.delete<Facility>(`${environment.apiUrl}facility/${id}`);
  }
}
