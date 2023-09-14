import {
  AfterViewInit,
  Component,
  ViewChild,
  OnInit,
  ChangeDetectorRef,
  ElementRef,
  Renderer2,
} from '@angular/core';
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

// for the tables testing
import { HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';

// for the tables testing
export interface UserData {
  id: string;
  name: string;
  progress: string;
  fruit: string;
  detailRow: boolean;
}
/** Constants used to fill up our data base. */
const FRUITS: string[] = ['blueberry', 'guava', 'orange', 'banana'];
const NAMES: string[] = ['Maia', 'Levi', 'Elizabeth'];

@Component({
  selector: 'app-root',
  templateUrl: './app.component-2.html',
  styleUrls: ['./app.component-2.css'],
})
export class AppComponent2 {
  displayedColumns: string[] = ['id', 'name', 'progress', 'fruit', 'button'];
  clickedRows = new Set<UserData>();
  dataSource = new MatTableDataSource<UserData>();
  leng = 10;
  pgsize = 0;
  listprog: any = []; // meaining this one too
  listfruit: any = []; // thoses two in the back for the table filtrations
  // table expnadtion
  expandedElement: UserData | null | undefined;
  columnsToDisplayWithExpand = [...this.displayedColumns, 'detailRow'];
  callmain(url:any) {
    this.router.navigate([url]);
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
  // row click function for the tables
  rowclick(event: MouseEvent, row: any) {
    // Find the index of the row in the data source
    event.stopPropagation();
    const index = this.dataSource.data.indexOf(row);
    console.log(index + 1);
    this.expandedElement = this.expandedElement === row ? null : row;
    // add or remove the clicked row from the set
  }
  select_rowclick(event: MouseEvent, row: any) {
    // add or remove the clicked row from the set
    if (this.clickedRows.has(row)) {
      this.clickedRows.delete(row);
    } else {
      this.clickedRows.add(row);
    }
  }

  showdialog(event: MouseEvent) {
    event.stopPropagation();
  }
  // on start code initiation
  ngOnInit() {
    // filtering repeated from the names
    for (let uu of this.dataSource.data) {
      if (!this.listnames.includes(uu.name)) {
        this.listnames.push(uu.name);
      }
    }

    // filtering repeated from the names
    for (let uu of this.dataSource.data) {
      if (!this.listprog.includes(uu.progress)) {
        this.listprog.push(uu.progress);
      }
    }
    // filtering repeated from the names
    for (let uu of this.dataSource.data) {
      if (!this.listfruit.includes(uu.fruit)) {
        this.listfruit.push(uu.fruit);
      }
    }
  }
  // creating data randomly ///// radom data for testing
  createNewUser(id: number): UserData {
    const name =
      NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
      ' ' +
      NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
      '.';

    return {
      id: id.toString(),
      name: name,
      progress: Math.round(Math.random() * 100).toString(),
      fruit: FRUITS[Math.round(Math.random() * (FRUITS.length - 1))],
      detailRow: false,
    };
  }
  title = 'ttt';
  users_out: any;
  constructor(
    private cd: ChangeDetectorRef,
    private http: HttpClient,
    private Dialog1: MatDialog,
    private router: Router,
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) {
    this.fortreedataSource.data = this.TREE_DATA;
    const users = Array.from({ length: 50 }, (_, k) =>
      this.createNewUser(k + 1)
    );
    this.getData().subscribe((data) => {
      console.log('data-------');
      this.fortreedataSource.data = data;
      console.log(JSON.stringify(this.fortreedataSource.data));
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
    this.leng = 15;
    this.paginator.pageSize = this.leng;
    this.dataSource.paginator = this.paginator;
    console.log('clicked');
  }
  // applying the filter to the tablev
  fruit: any;
  listnames: any = [];

  // filters fro dropdowns
  applyFilter3(column: string, event: any) {
    const filterValue = this.fruit;

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
  public saveData() {
    let url = 'http://localhost:5241/api/treedata/new';
    let data: any = this.fortreedataSource.data;
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

  // test getting the data from the api
  getData() {
    return this.http.get<TreeNode[]>('http://localhost:5241/api/treedata/all');
  }
  selectedType2: any;
  opendialog_function(dialog_name: any) {
    const dialog_configurtion = new MatDialogConfig();
    dialog_configurtion.autoFocus = true;
    dialog_configurtion.width = 'auto';
    dialog_configurtion.height = 'auto';
    let ref = this.Dialog1.open(dialog_name, dialog_configurtion);
  }
}

// tree ///// for tree data initiaion
export interface TreeNode {
  Id: any;
  name: any;
  ParentId: number | any;
  Children?: TreeNode[] | any;
}
