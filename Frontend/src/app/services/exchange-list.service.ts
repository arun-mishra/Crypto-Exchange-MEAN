import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
const APIKEY = 'FDAB8705-CEAA-4A23-8A5B-6CC30B8D44D9';
const API = 'http://localhost:4000';

@Injectable({
  providedIn: 'root',
})
export class ExchangeListService {
  constructor(private http: HttpClient) {}

  refreshExchangeList() {
    return this.http.post(`${API}/exchange/postExchange`, {});
  }
  getExchangeList(pageNumber: number) {
    return this.http.get(`${API}/exchange/getExchange?p=${pageNumber}`);
  }
  searchExchange(searchString: string, pageNumber: number) {
    return this.http.get(
      `${API}/exchange/searchExchange?search=${searchString}&p=${pageNumber}`
    );
  }
}
