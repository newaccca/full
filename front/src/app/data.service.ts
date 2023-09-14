import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TreeNode } from './app.component';
import { UserData } from './app.component-4';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(public http: HttpClient) {}
  // test the data /////// note the new fromat for angular post data contains next and error columns for handling the data
  //   public saveData(data: any) {
  //     let url = 'http://localhost:5241/api/treedata/new';
  //     this.http
  //       .post<any>(url, data)
  //       // Subscribe to the Observable and handle the response or error
  //       .subscribe({
  //         next: (data) => {                                        //// <== old code
  //           console.log('POST request successful', data);
  //         },
  //         error: (error) => {
  //           console.error('POST request failed', error);
  //         },
  //       });
  //   }
  public saveData() {
    let url = 'http://localhost:5241/api/treedata/new';
    let data: any = []; //this.fortreedataSource.data;
    this.http
      .post<any>(url, data)
      // Subscribe to the Observable and handle the response or error
      .subscribe({
        next: (data) => {
          console.log('POST request successful', data);
        },
        error: (error) => {
          console.error('POST request failed', error);
        },
      });
  }
  // test get global get url from the other end
  getTestData(url: any) {
    return this.http.get(url);
  }
  // test getting the data from the api
  getData() {
    return this.http.get<TreeNode[]>('http://localhost:5241/api/treedata/all');
  }
  public getData_table() {
    return this.http.get<UserData[]>('http://localhost:5241/api/treedata/all');
  }
}
