import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  constructor(public http: HttpClient) { }

  getAllCommits() {
    return this.http.get<any>('Ahttps://api.github.com/repos/widjesh/SatyamModule/commits');
  }

}
