import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Division } from "../models/division";
import 'rxjs/add/operator/map';

@Injectable()
export class DivisionService {

    constructor(private http: HttpClient) {}

    /**
     * Получение списка всех подразделений
     * @returns {Observable<Division[]>}
     */
    list(): Observable<Division[]> {
        return this.http.get<Division[]>('http://localhost:3000/division')
            .map((division) => {
                return division;
            });
    }

    /**
     * Получение данных о подразделении
     * @param id
     * @returns {Observable<Division>}
     */
    getOne(id: any): Observable<Division> {
        let options = {
            params: new HttpParams().set('id', id)
        };
        return this.http.get<Division>('http://localhost:3000/division', options)
            .map(response => {
                return response[0];
            });
    }

    /**
     * Обновление данных
     * @param {Division} division
     * @returns {Observable<boolean>}
     */
    update(division: Division): Observable<boolean> {
        return this.http.put<any>('http://localhost:3000/division',division)
            .map(response => {
                return response.affectedRows === 1 ? true : false;
            });
    }

    /**
     * Добавить новое
     * @param {Division} division
     * @returns {Observable<boolean>}
     */
    addOne(division: Division): Observable<boolean> {
        return this.http.post<any>('http://localhost:3000/division', division)
            .map(response => {
                return response.success ? true : false;
            })
    }

    /**
     * Удалить
     * @param id
     * @returns {Observable<boolean>}
     */
    removeOne(id: any): Observable<boolean> {
        let options = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
            body: {id:id}
        };
        return this.http.delete<any>('http://localhost:3000/division', options)
            .map(response => {
                return response.affectedRows === 1 ? true : false;
            });
    }
}