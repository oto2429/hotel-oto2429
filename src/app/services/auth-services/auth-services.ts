import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthServices {



  public http = inject(HttpClient)

  signUp(info: any) {
    return this.http.post("https://api.everrest.educata.dev/auth/sign_up", info)

  }
  signIn(info: any) {
    return this.http.post("https://api.everrest.educata.dev/auth/sign_in", info)
  }
  getUser() {
    return this.http.get("https://api.everrest.educata.dev/auth", { headers: { Authorization: ` Bearer ${sessionStorage.getItem('user')}` } })

  }

}
