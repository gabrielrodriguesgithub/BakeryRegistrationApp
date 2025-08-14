import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class Api {
  private baseUrl = 'https://localhost:7210';

  constructor(private http: HttpClient) {}

  login(userName: string, password: string) {
    return this.http.post(`${this.baseUrl}/api/UserExterna/Login`, { Username: userName, Password: password });
  }

  getBakeries() {
  const token = localStorage.getItem('token');
  return this.http.get(`${this.baseUrl}/api/BakeriesExterna/List`, {
    headers: { Authorization: `Bearer ${token}` }
  })}
  
  logout() {
  const token = localStorage.getItem('token');
  return this.http.post(`${this.baseUrl}/api/UserExterna/Logout`, {}, {
    headers: { Authorization: `Bearer ${token}` }
  });
}
}
