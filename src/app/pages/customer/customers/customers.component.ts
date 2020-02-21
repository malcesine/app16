import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { CustomersDataSource, CustomersItem } from './customers-datasource';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<CustomersItem>;
  dataSource: CustomersDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. test */
  displayedColumns = ['id', 'name', 'surname'];

  constructor(private ccS: CustomerService) { }
  ngOnInit() {
    this.dataSource = new CustomersDataSource(this.ccS);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
