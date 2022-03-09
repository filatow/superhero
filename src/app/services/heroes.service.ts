import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Hero } from "../shared/interfaces";


@Injectable({ providedIn: 'root' })
export class HeroesService {


  constructor(
    private http: HttpClient
  ) { }

  search(searchedString: string): Observable<Array<Hero>> {
    return this.http.get(`${environment.heroDbUrl}/search/${searchedString}`)
      .pipe(
        map((response: { [key: string]: any }) => {
          if (response.hasOwnProperty('error')) {
            return [];
          }

          return response.results;
        })
      )
  }
}
