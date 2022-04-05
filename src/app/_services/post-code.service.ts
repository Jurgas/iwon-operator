import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {firstValueFrom} from 'rxjs';
import {environment} from '../../environments/environment';
import {PostCodeInfo} from '../_interfaces/post-code-info';

@Injectable({
  providedIn: 'root',
})
export class PostCodeService {

  constructor(private http: HttpClient) {
  }

  getPostCodeInfo(postCode: string): Promise<PostCodeInfo[]> {
    return firstValueFrom(this.http.get<PostCodeInfo[]>(environment.postCodeApiUrl + postCode));
  }
}
