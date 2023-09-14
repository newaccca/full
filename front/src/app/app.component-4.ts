import {
  AfterViewInit,
  Component,
  ViewChild,
  OnInit,
  ChangeDetectorRef,
  ElementRef,
  Renderer2,
  HostListener ,
} from '@angular/core';
import { NgToastService } from 'ng-angular-popup';

// treeeeee
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { NestedTreeControl } from '@angular/cdk/tree';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogModule,
  matDialogAnimations,
  MatDialogConfig,
} from '@angular/material/dialog';

// table controls
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from './data.service';
// for the tables testing
import { HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';
import { ThisReceiver } from '@angular/compiler';

// for the tables testing
export interface UserData {
  dcombobox: string;
  dcombobox_Check: string;
  dtextbox: string;
  dradio_btn: string;
  dcheck: string;
  dtoggle: string;
  detailRow: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component-4.html',
  styleUrls: ['./app.component-4.css'],
})

export class AppComponent4 implements AfterViewInit {
  dataNotSaved = false;

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.dataNotSaved) {
      $event.returnValue = true;
    }
  }

  displayedColumns: string[] = [
    'dcombobox',
    'dcombobox_Check',
    'dtextbox',
    'dradio_btn',
    'dcheck',
    'dtoggle',
  ];
  clickedRows = new Set<UserData>();
  dataSource = new MatTableDataSource<UserData>();
  leng = 10;
  pgsize = 0;
  dialog_leng = 10;
  dialog_pgsize = 0;
  filter_dcombobox: any = [];
  filter_dcombobox_Check: any = [];
  filter_dtextbox: any = [];
  filter_dradio_btn: any = [];
  filter_dcheck: any = [];
  filter_dtoggle: any = [];

  expandedElement: UserData | null | undefined;
  columnsToDisplayWithExpand = [...this.displayedColumns, 'detailRow'];
  callmain() {
    this.router.navigate(['/main']);
  }

  isExpansionDetailRow = (index: number, row: any) =>
    row.hasOwnProperty('detailRow');
  isRowExpanded(row: UserData): boolean {
    return this.expandedElement === row;
  }

  expandRow(event: MouseEvent, row: any) {
    // Find the index of the row in the data source
    event.stopPropagation();
    const index = this.dataSource.data.indexOf(row);
    console.log(index + 1);
    this.expandedElement = this.expandedElement === row ? null : row;
  }

  // initaion for sorting and pagintaing for the tables
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  isRowClicked(row: any): boolean {
    return this.clickedRows.has(row);
  }

  // row click function for the tables
  rowclick(event: MouseEvent, row: any) {
    // Find the index of the row in the data source
    event.stopPropagation();
    const index = this.dataSource.data.indexOf(row);
    console.log(index + 1);
    this.expandedElement = this.expandedElement === row ? null : row;
    // add or remove the clicked row from the set
  }
  getData_forthetable_http() {
    return this.http.get<any>('http://localhost:5241/api/TreeData/newww');
  }
  getData_clickedrows_http() {
    return this.http.get<any>('http://localhost:5241/api/TreeData/clickedRows');
  }
  ngAfterViewInit(): void {
    this.getData_forthetable_http().subscribe((data) => {
      this.dataSource.data = data;
      this.onSelectChange2(5);
      this.cd.detectChanges();
      this.dataSource.sort = this.sort;
      this.filter_call();
    });

    this.getData_clickedrows_http().subscribe((data: any[]) => {
      console.log(data)
      //Map the data to match the UserData interface
      const mappedData = data.map(item => {
        return {
          dcombobox: item.dcombobox,
          dcombobox_Check: item.dcombobox_Check,
          dtextbox: item.dtextbox,
          dradio_btn: item.dradio_btn,
          dcheck: item.dcheck,
          dtoggle: item.dtoggle,
          detailRow: item.detailRow
        } as UserData;
      });

      // Convert the mapped data into a Set
      this.clickedRows = new Set<UserData>(mappedData);
            this.cd.detectChanges();
    });
    this.cd.detectChanges();

  }
  select_rowclick(event: MouseEvent, row: any) {
    // add or remove the clicked row from the set
    if (this.clickedRows.has(row)) {
      this.clickedRows.delete(row);
    } else {
      this.clickedRows.add(row);
    }
    if (Array.from(this.clickedRows).length === 0){
      this.dataNotSaved=false
    }else{
      this.dataNotSaved=true
    }
    console.log((row));
  }

  // on start code initiation
  ngOnInit() {
    // filtration on loading
    this.goten_value_dcombobox_Check = [];
    this.filter_call();
  }
  novalidata='';
  novali(validation:any, dialog_name: any){
    if (validation === '') {
      this.novalidata="*missing"
     }else{
      this.novalidata=""



      if (dialog_name._declarationTContainer.localNames[0] == 'delete_dialog') {
        this.delete_from_db_function(validation);
      } else if (dialog_name._declarationTContainer.localNames[0] == 'delete_clicked_dialog')  {
        this.delete_from_clicked_db_function(validation);
      }
      let inputField = document.getElementById('validation2') as HTMLInputElement;
      inputField.value = '';
     }
  }

  delete_from_clicked_db_function(validation:string){
    let dd = validation;
    let del= Array.from(this.clickedRows)

    console.log(validation)
    if (validation === '') {
  this.novalidata="*missing"
 }else{
  this.novalidata=""
  fetch('http://localhost:5241/api/TreeData/clickedRows', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },

    body: JSON.stringify({ del, dd })

  })
  .then(data => {console.log(data);
  if (data.status==200){
    this.novalidata=''
    this.toast.success({detail:'Success',summary:'Items has been deleted successfully',position:'topRight', duration:1500});
    this.dataSource.data=[];
    this.public_clsoe_Dialog()
    this.filter_call()
    this.ngAfterViewInit()
  }else{
    this.novalidata = 'Error ' + (data.status == 401 ? '401 Unauthorized' : data.status)
    this.toast.error({detail:'Error',summary:('Error ' + (data.status == 401 ? '401 Unauthorized' : data.status)),position:'topRight', duration:1500});
  }
  } )

  .catch((error) => {
    this.novalidata = 'Error ' + error
    console.error('Error:', error);this.toast.error({detail:'Error',summary:('Error' +error),position:'topRight', duration:1500});

  });

 }
    // this is delete command but with no data input thats why we used fetch above
    // this.http.delete('http://localhost:5241/api/TreeData/newww'
    // ).subscribe(response => {
    //   console.log(response);
    // }, error => {
    //   console.error(error);
    // });
  }

  delete_from_db_function(validation:string){
    console.log(validation)
    if (validation === '') {
  this.novalidata="*missing"
 }else{
  this.novalidata=""
  fetch('http://localhost:5241/api/TreeData/newww', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(validation) // replace 'yourData' with the data you want to send

  })
  .then(data => {console.log(data);
  if (data.status==200){
    this.novalidata=''
    this.toast.success({detail:'Success',summary:'Items has been deleted successfully',position:'topRight', duration:1500});
    this.dataSource.data=[];
    this.public_clsoe_Dialog()
    this.filter_call()
  }else{
    this.novalidata = 'Error ' + (data.status == 401 ? '401 Unauthorized' : data.status)
    this.toast.error({detail:'Error',summary:('Error ' + (data.status == 401 ? '401 Unauthorized' : data.status)),position:'topRight', duration:1500});
  }
  } )

  .catch((error) => {
    this.novalidata = 'Error ' + error
    console.error('Error:', error);this.toast.error({detail:'Error',summary:('Error' +error),position:'topRight', duration:1500});

  });
  this.filter_call()

 }
    // this is delete command but with no data input thats why we used fetch above
    // this.http.delete('http://localhost:5241/api/TreeData/newww'
    // ).subscribe(response => {
    //   console.log(response);
    // }, error => {
    //   console.error(error);
    // });
  }
  // filtering function
  filter_call() {
    for (let uu of this.dataSource.data) {
      if (!this.filter_dcombobox.includes(uu.dcombobox)) {
        this.filter_dcombobox.push(uu.dcombobox);
      }
    }

    // filtering repeated from the names
    for (let uu of this.dataSource.data) {
      if (!this.filter_dcombobox_Check.includes(uu.dcombobox_Check)) {
        this.filter_dcombobox_Check.push(uu.dcombobox_Check);
      }
    }
    // filtering repeated from the names
    for (let uu of this.dataSource.data) {
      if (!this.filter_dtextbox.includes(uu.dtextbox)) {
        this.filter_dtextbox.push(uu.dtextbox);
      }
    }
    for (let uu of this.dataSource.data) {
      if (!this.filter_dradio_btn.includes(uu.dradio_btn)) {
        this.filter_dradio_btn.push(uu.dradio_btn);
      }
    }
    for (let uu of this.dataSource.data) {
      if (!this.filter_dcheck.includes(uu.dcheck)) {
        this.filter_dcheck.push(uu.dcheck);
      }
    }
    for (let uu of this.dataSource.data) {
      if (!this.filter_dtoggle.includes(uu.dtoggle)) {
        this.filter_dtoggle.push(uu.dtoggle);
      }
    }
  }
  title = 'ttt';
  users_out: any;
  constructor(
    private cd: ChangeDetectorRef,
    private http: HttpClient,
    private Dialog1: MatDialog,
    private router: Router,
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private dataservice: DataService,
    private toast:NgToastService,
  ) {
    this.fortreedataSource.data = this.TREE_DATA;
    const users: any = this.dataservice.getData_table();
    this.dataservice.getData().subscribe((data) => {
      this.fortreedataSource.data = data;
    });
    this.users_out = users;
  }
  getfromtree_function_node(name: any, node: any) {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource = new MatTableDataSource(this.users_out);
    this.leng = 5;
    this.paginator.pageSize = this.leng;
    this.dataSource.paginator = this.paginator;

    console.log(name);
  }
  getfromtree_function(name: any, node: any) {
    if (this.fortreetreeControl.isExpanded(node)) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource = new MatTableDataSource(this.users_out);
      this.leng = 2;
      this.paginator.pageSize = this.leng;
      this.dataSource.paginator = this.paginator;
      const element =
        this.elementRef.nativeElement.querySelector('.right-section');

      // Add or remove the CSS class
      //this.renderer.addClass(element, 'hidden');
      this.renderer.removeClass(element, 'hidden');
    } else {
      let emty: any = [];
      //this.users_out = [];
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource = new MatTableDataSource(emty);
      this.leng = 0;
      this.paginator.pageSize = this.leng;
      this.dataSource.paginator = this.paginator;

      const element =
        this.elementRef.nativeElement.querySelector('.right-section');

      // Add or remove the CSS class
      this.renderer.addClass(element, 'hidden');
      // this.renderer.removeClass(element, 'hidden');
    }
    console.log(name);
  }
  calloninit() {
    // a function for calling at the begging
    this.leng = 15;
    this.paginator.pageSize = this.leng;
    this.dataSource.paginator = this.paginator;
  }
  // applying the filter to the tablev
  empty_data: any = [];
  // filters fro dropdowns
  applyFilter3(column: string, event: any) {
    const filterValue = this.empty_data;
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      return data[column].toLowerCase().includes(filter);
    };
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  //filters for textboxes
  applyFilter2(column: string, event: any) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      return data[column].toLowerCase().includes(filter);
    };
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  // on chsnge of the filter
  onSelectChange2(event: any) {
    // handle the change event here
    if (!event) {
      event = 1;
    } else {
      //nothing
    }
    this.leng = event;
    this.paginator.pageSize = this.leng;
    this.dataSource.paginator = this.paginator;
    console.log('Selected value:', event);
  }
  // filtering for all
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  // //////////////////////////////tree controls //////////////////////////////////
  // contructor   =>     this.fortreedataSource.data = this.TREE_DATA;
  TREE_DATA: TreeNode[] = [];
  fortreetreeControl = new NestedTreeControl<TreeNode>((node) => node.Children);
  fortreedataSource = new MatTreeNestedDataSource<TreeNode>();
  hasChild = (_: number, node: TreeNode) =>
    !!node.Children && node.Children.length > 0;
  parentNode: any;
  // change for the textboxexs
  selectedType: string = ''; // for textbox1
  find_parent(event: any) {
    let newdat = this.fortreedataSource.data;
    let inputValue = event;
    this.parentNode = this.findNode(inputValue, newdat);
    if (this.parentNode === 0 && event != '') {
      this.parentNode = ['null'];
    }
    let parentNodeWithZeros = this.parentNode.map((value: any) =>
      value === null ? 0 : value
    );
    this.parentNode = parentNodeWithZeros;
    console.log('getting the node ----');
    console.log(this.parentNode);
    console.log('Gotten ----');
    console.log(JSON.stringify(newdat));
  }
  // find the node parentid in the list //// can be modified to get also the id throught adding (node.Id)
  findNode(name: string, nodes: TreeNode[]): any {
    let result: any = [];
    for (let node of nodes) {
      if (node.name === name) {
        result.push(node.ParentId);
      }
      if (node.Children) {
        result.push(...this.findNode(name, node.Children));
      }
    }
    return result;
  }
  expandNode(node: any) {
    console.log('expandNode called with node:', node);
  }
  onTypeChange(value: any) {
    return value;
  }
  lengg: any;
  selectedType2: any;
  public_clsoe_Dialog(){
    this.ref_pub.close()
    this.ref_pub = ""
  }
  ref_pub: any;
  pupblic_opendialog_function(dialog_name: any , width: any, hight:any) {
    if (dialog_name._declarationTContainer.localNames[0] == 'delete_dialog'){
      this.toast.warning({detail:'Warning',summary:'You are about to delete the whole db',position:'topRight', duration:1500});
    }
    const dialog_configurtion = new MatDialogConfig();
    dialog_configurtion.autoFocus = true;
    dialog_configurtion.width = width;
    dialog_configurtion.height = hight;
    let ref = this.Dialog1.open(dialog_name, dialog_configurtion);
    this.ref_pub=ref
    ref.afterOpened().subscribe(() => {
      console.log('Dialog opened', dialog_name._declarationTContainer.localNames[0]);
    });
    ref.afterClosed().subscribe(() => {
      console.log('Dialog closed', dialog_name);
    });
  }

  opendialog_function(dialog_name: any) {
    const dialog_configurtion = new MatDialogConfig();
    dialog_configurtion.autoFocus = true;
    dialog_configurtion.width = 'auto';
    dialog_configurtion.height = 'auto';
    let ref = this.Dialog1.open(dialog_name, dialog_configurtion);
    ref.afterOpened().subscribe(() => {
      console.log('Dialog opened');
      this.dataSource.sort = this.sort;
      this.dialog_leng = this.dataSource.data.length;
      this.paginator.length = this.dialog_pgsize;
      this.paginator.pageSize = this.dialog_leng;
      this.dataSource.paginator = this.paginator;
    });
    ref.afterClosed().subscribe(() => {
      console.log('Dialog closed');
      this.leng = 5;
      this.paginator.pageSize = this.leng;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  isBold = false;
  selectedFood: string[] = [];
  optg = ['Part1', 'Part2', 'Part3'];
  options = [
    'Extra cheese',
    'Mushroom',
  ];
  optionsMap: { [key: string]: string[] } = {
    'Part1': ['Extra cheese', 'Mushroom'],
    'Part2': ['Onion', 'Pepperoni'],
    'Part3': ['Sausage', 'Tomato']
};
stoppad(event: MouseEvent , uu:string){
  event.stopPropagation();
  console.log(uu)
}
  group_fun(event: MouseEvent, food: string) {
    console.log(food);
    this.isBold = !this.isBold;
    const index = this.selectedFood.indexOf(food);
    if (index > -1) {
      // If the food is already selected, remove it from the list
      this.selectedFood.splice(index, 1);
      for (let value of this.optionsMap[food]) {
        console.log('remove Value:', value);
        let index2 = this.goten_value_dcombobox_Check.indexOf(value);
        if (index2 > -1) {
          this.goten_value_dcombobox_Check.splice(index2, 1);
        }
        this.cd.detectChanges();
      }
    } else {
      // If the food is not selected, add it to the list
      this.selectedFood.push(food);
      for (let value of this.optionsMap[food]) {
        console.log('pushed Value:', value);;
        if (!this.goten_value_dcombobox_Check.includes(value)) {
            this.goten_value_dcombobox_Check.push(value);
        }        this.cd.detectChanges();
      }
    }


    console.log(this.goten_value_dcombobox_Check.length)
    for (let v of this.goten_value_dcombobox_Check){
      console.log(v)
    }
    this.error_check()
  }
  fn_savedt() {
    console.log(JSON.stringify(this.dataSource.data));
  }
  goten_value_dcombobox_Check: any = [];
  goten_value_dradio_btn: any = [];
  goten_value_dcheck: any = [];
  get_from_html_function(): UserData {
    let value_dcombobox = document.getElementById(
      'value_dcombobox'
    ) as HTMLInputElement;
    let goten_value_dcombobox = value_dcombobox.value;
    let value_dtextbox = document.getElementById(
      'value_dtextbox'
    ) as HTMLInputElement;
    let goten_value_dtextbox = value_dtextbox.value;
    let phrase = this.goten_value_dcombobox_Check.join('","');
    let phrase_1 = this.options.filter(
      (option, index) => this.goten_value_dcheck[index]
    );
    console.log(this.goten_value_dcombobox_Check);
    console.log('---------');
    console.log(phrase);
    return {
      dcombobox: goten_value_dcombobox,
      dcombobox_Check: `"${phrase}"`,
      dtextbox: goten_value_dtextbox,
      dradio_btn: this.goten_value_dradio_btn,
      dcheck: `"${phrase_1}"`,
      dtoggle: 'testing',
      detailRow: false,
    };
  }
  l: number = 1;
  error: any = '';
  save_from_html_function() {

    let data = this.get_from_html_function();
    if (this.goten_value_dcombobox_Check.length === 0) {
      // this.goten_value_dcombobox_Check is empty
      this.error = '*missing';
    } else {
      this.error = '';
        this.toast.success({detail:'Success',summary:'Added the data to the table',position:'topRight', duration:1500});
      // this.goten_value_dcombobox_Check is not empty
      for (let value of this.goten_value_dcombobox_Check) {
        let newData = { ...data };
        newData.dcombobox_Check = value + ' - ' + this.l;
        this.dataSource.data.push(newData);
        this.l = this.l + 1;
      }
          this.dataSource.sort = this.sort;
    this.filter_call();
    this.onSelectChange2(5);
    this.cd.detectChanges();
    this.dataNotSaved=true;
    }
  }
  datttt: any;
  save_from_html_toclickeddb_function() {
    if (window.confirm('Are you sure you want to save all of the selected items ?')) {
    console.log((this.clickedRows));
    this.datttt =  Array.from(this.clickedRows);  // this must be converted to arry
    this.http
      .post<any>('http://localhost:5241/api/TreeData/clickedRows', this.datttt)
      .subscribe({
        next: (data) => {
          //// <== old code
          console.log('POST request successful', data);
          this.toast.success({detail:'Success',summary:'Saved new clickedrows data to the database',position:'topRight', duration:1500});
                this.dataNotSaved = false;
        },
        error: (error) => {
          console.error('POST request failed', error);
          this.toast.error({detail:'Error',summary:( 'This is Error'),position:'topRight', duration:1500});
        },
      });
    } else {
      // User clicked 'Cancel', do not perform the action
    }

  }
  save_from_html_todb_function() {
    console.log(JSON.stringify(this.dataSource.data));
    this.datttt = this.dataSource.data;
    this.http
      .post<any>('http://localhost:5241/api/TreeData/newww', this.datttt)
      .subscribe({
        next: (data) => {
          //// <== old code
          console.log('POST request successful', data);
          this.toast.success({detail:'Success',summary:'Saved new data to the database',position:'topRight', duration:1500});
                this.dataNotSaved = false;
        },
        error: (error) => {
          console.error('POST request failed', error);
          this.toast.error({detail:'Error',summary:'This is Error',position:'topRight', duration:1500});
        },
      });
  }
  error_check() {
    if (this.goten_value_dcombobox_Check.length === 0) {
      this.error = '*missing';
    } else {
      this.error = '';
    }
  }
}
// tree ///// for tree data initiaion
export interface TreeNode {
  Id: any;
  name: any;
  ParentId: number | any;
  Children?: TreeNode[] | any;
}
