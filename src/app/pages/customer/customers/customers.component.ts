import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { CustomersDataSource, CustomersItem } from './customers-datasource';
import { CustomerService, Customer } from '../customer.service';
import { tap } from 'rxjs/operators';
import { TimeoutError } from 'rxjs';
import {SelectionModel} from '@angular/cdk/collections';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  dataSource: MatTableDataSource<Customer> = new MatTableDataSource();
  displayedColumns = ['select', 'id', 'name', 'surname'];
  selection = new SelectionModel<CustomersItem>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: CustomersItem): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  constructor(private ccS: CustomerService) {
    // this.dataSource.filterPredicate = this.myFilter;
  }
  ngOnInit() {

  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.ccS.getCustomers().pipe(
      tap(data => this.dataSource.data = data)
    ).subscribe()
    // // this.table.dataSource = this.dataSource;
  }

  private myFilter(data: Customer, filter: string): boolean {
    return true;
  }
}
