import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {ScrapyConfig} from '../_interfaces/scrapy-config';
import {ScrapyResponse} from '../_interfaces/scrapy-response';

@Injectable({
  providedIn: 'root',
})
export class ScrapyService {

  constructor(private http: HttpClient) {
  }

  getScrapyData(scrapyConfig: ScrapyConfig): Observable<ScrapyResponse> {
    return this.http.post<ScrapyResponse>(`${environment.scrapyUrl}crawl.json`, scrapyConfig);
  }
}
