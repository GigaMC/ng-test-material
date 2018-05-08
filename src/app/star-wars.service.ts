import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of, pipe} from 'rxjs';
import {mergeMap, map} from 'rxjs/operators';

export interface ContactCard {
  name: string;
  gender: 'male' | 'female';
}

@Injectable({
  providedIn: 'root'
})

export class StarWarsService {

  private baseUrl = 'https://swapi.co/api/';

  constructor(private http: HttpClient) {
  }

  private static mapResponseToContactCards(response: any): Observable<ContactCard[]> {

    return of(response.results.
      map((result: any) => {
        return {
          name: result.name,
          gender: result.gender,
        };
      }));
  }


  public searchForCharacter(name: string): Observable<ContactCard[]> {
    return this.http.get(`${this.baseUrl}people/?search=${name}`)
      .pipe(
        mergeMap((response: any) => StarWarsService.mapResponseToContactCards(response))
      );
  }

}
