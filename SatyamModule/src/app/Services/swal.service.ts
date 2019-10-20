import { Injectable } from '@angular/core';
import Swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class SwalService {

  constructor() { }

  notify(s1: string, s2: string, s3: string) {
    Swal(s1, s2, s3);
    //check
  }
}
