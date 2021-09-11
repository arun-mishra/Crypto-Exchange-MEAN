import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import {
  map,
  debounceTime,
  distinctUntilChanged,
  switchMap,
} from 'rxjs/operators';
import { ExchangeListService } from './services/exchange-list.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'MEAN-Assignment';
  exchangeList: any[] = [];
  searchString = new Subject<any>();
  search: string | null = null;
  currentPage: number = 1;
  isLoading: boolean = false;
  config: any;
  constructor(private exchangeListService: ExchangeListService) {}

  ngOnInit() {
    this.getExchangeList(1);
  }
  ngAfterViewInit() {
    this.searchString
      .pipe(
        map((e: any) => e.target.value),
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((searchString) =>
          this.exchangeListService.searchExchange(
            searchString,
            this.currentPage
          )
        )
      )
      .subscribe(
        (res: any) => {
          console.log(res);
          this.exchangeList = res.result;
          this.config = {
            currentPage: this.currentPage,
            itemsPerPage: 10,
            totalItems: res.totalItems,
          };
        },
        (err) => {
          this.exchangeList = [];
        }
      );
  }
  refreshExchangeList() {
    this.isLoading = true;
    this.exchangeListService.refreshExchangeList().subscribe(
      (res) => {
        console.log(res);
        this.getExchangeList(1);
      },
      (err) => {
        console.log(err);
        this.isLoading = false;
        this.exchangeList = [];
      }
    );
  }
  getExchangeList(pageNumber: number) {
    console.log('hello');
    this.exchangeListService.getExchangeList(pageNumber).subscribe(
      (res: any) => {
        console.log(res);
        this.exchangeList = res.exchangeList;
        this.config = {
          currentPage: this.currentPage,
          itemsPerPage: 10,
          totalItems: res.totalItems,
        };
        this.isLoading = false;
      },
      (err) => {
        console.log(err);
        this.isLoading = false;
        this.exchangeList = [];
      }
    );
  }
  onSearch(searchString: any) {
    this.searchString.next(searchString);
  }
  pageChange(newPage: number) {
    this.currentPage = newPage;
    this.getExchangeList(newPage);
  }
}
