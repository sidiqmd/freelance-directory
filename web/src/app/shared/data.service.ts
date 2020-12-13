import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from 'rxjs';
import { tap, switchMap } from "rxjs/operators";

import { UserModel } from '../model/user.model';

@Injectable()
export class DataService {
    private _getUrl = '';
    private _serviceUrl = '/freedir';

    constructor(private http: HttpClient) {
        this._getUrl = location.origin + this._serviceUrl;
    }

    getProjectName() {
        return 'Freelancer Directory';
    }

    getUserAll(): Observable<UserModel[]> {
        return this.http
            .get<UserModel[]>(`${this._getUrl}/user`)
            .pipe(
                tap(_ => console.log('Got User'))
            );
    }

    getUserExists(username: string): Observable<boolean> {
        var httpParams = new HttpParams();
        if (username != null) {
            httpParams = httpParams.set('username', username);
        }
        return this.http
            .get<boolean>(`${this._getUrl}/user/exists`, { params: httpParams })
            .pipe(
                tap(_ => console.log('Got User'))
            );
    }

    store(data: UserModel): Observable<UserModel[]> {
        return this.http
            .post<UserModel[]>(`${this._getUrl}/user`, data)
            .pipe(
                tap(_ => console.log('User Saved')),
                switchMap(() => this.getUserAll())
            );
    }
    update(data: UserModel, uid: string): Observable<UserModel[]> {
        return this.http
            .put<UserModel[]>(`${this._getUrl}/user/${uid}`, data)
            .pipe(
                tap(_ => console.log('User Updated')),
                switchMap(() => this.getUserAll())
            );
    }

    delete(uid: string): Observable<UserModel[]> {
        return this.http
            .delete<UserModel[]>(`${this._getUrl}/user/${uid}`)
            .pipe(
                tap(_ => console.log('User Removed')),
                switchMap(() => this.getUserAll())
            );
    }

}