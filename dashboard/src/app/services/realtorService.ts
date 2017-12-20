import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { Realtor } from "../models/realtor";
import 'rxjs/add/operator/map';

@Injectable()
export class RealtorService {


    constructor(private http: HttpClient) { }

    /**
     * Получение списка всех риелторов
     * @returns {Observable<Realtor[]>}
     */
    list(): Observable<Realtor[]> {
        return this.http.get<Realtor[]>('http://localhost:3000/realtor')
            .map((realtor) => {
                return realtor;
            });
    }


    /**
     * Получеине данных риелтора по ID
     * @param id
     * @returns {Observable<Realtor>}
     */
    getOne(id: any): Observable<Realtor> {
        let options = {
            params: new HttpParams().set('id', id)
        };
        return this.http.get<Realtor>('http://localhost:3000/realtor', options)
            .map(response => {
                return response[0];
            });
    }

    /**
     * Обновление данных риелтора
     * @param {Realtor} realtor
     * @returns {Observable<boolean>}
     */
    update(realtor: Realtor): Observable<boolean> {
        return this.http.put<any>('http://localhost:3000/realtor',realtor)
            .map(response => {
                return response.affectedRows === 1 ? true : false;
            });
    }

    /**
     * Добавить нового риелтора
     * @param {Realtor} realtor
     * @returns {Observable<boolean>}
     */
    addOne(realtor: Realtor): Observable<boolean> {
        return this.http.post<any>('http://localhost:3000/realtor', realtor)
            .map(response => {
                return response;
            })
    }

    /**
     * Удалить риелтора
     * @param id
     * @returns {Observable<boolean>}
     */
    removeOne(id: any): Observable<boolean> {
        let options = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
            body: {id:id}
        };
        return this.http.delete<any>('http://localhost:3000/realtor', options)
            .map(response => {
                return response.affectedRows === 1 ? true : false;
            });
    }
}