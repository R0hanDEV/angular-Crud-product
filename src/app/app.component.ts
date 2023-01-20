import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  title = 'angular-material-ui';



  displayedColumns: string[] = ['productName', 'date', 'category', 'freshness', 'price', 'comment', 'Action'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;




  constructor(private dialog: MatDialog, private Api: ApiService) { }

  ngOnInit(): void {
   this.getProduct()
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '30%'
    }).afterClosed().subscribe((val) => {
      if (val == 'save') {
        this.getProduct()
      }
    });
  }

  getProduct() {
    this.Api.getProduct().subscribe({
      next: (res) => {
        console.log(res)
        this.dataSource = new MatTableDataSource(res)
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort
        console.log(res)
      },
      error(err) {
        alert(err)
      },
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  editProduct(row: any) {
    this.dialog.open(DialogComponent, {
      width: "30%",
      data: row,
    }).afterClosed().subscribe((val) => {
      if (val == 'update') {
        this.getProduct()
      }
    })
  }


  DeleteProduct(id: number) {
    this.Api.deleteProduct(id).subscribe({
      next: (res) => {
        this.getProduct()
        alert("product deleted successfully")
      },
      error(err) {
        alert(err)
      },
    })
  }


}
