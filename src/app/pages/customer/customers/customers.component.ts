import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { CustomersDataSource, CustomersItem } from './customers-datasource';
import { CustomerService, Customer } from '../customer.service';
import { tap } from 'rxjs/operators';
import { TimeoutError } from 'rxjs';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  // @ViewChild(MatTable) table: MatTable<CustomersItem>;
  dataSource: MatTableDataSource<Customer> = new MatTableDataSource();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. test */
  displayedColumns = ['id', 'name', 'surname'];

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
