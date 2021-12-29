import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SensorData } from '../models/sensorData.model';

const baseUrl = 'http://localhost:8080/api/sensorInput';

@Injectable({
  providedIn: 'root'
})
export class ApiServicesService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<SensorData[]> {
    return this.http.get<SensorData[]>(baseUrl);
  }

  get(id: any): Observable<SensorData> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByTitle(title: any): Observable<SensorData[]> {
    return this.http.get<SensorData[]>(`${baseUrl}?title=${title}`);
  }
}
