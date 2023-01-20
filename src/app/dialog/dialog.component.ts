import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { inject } from '@angular/core';
import { Inject } from '@angular/core';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  freshness = ['Brand New', 'Second New', "Refurbished"]
  actionBtn: string = 'save'

  productForm: FormGroup;

  /* 

    always create a private variable for import modules,
    in case of dailogRef you have to provide the reference of component
  
  */
  constructor(private formbuilder: FormBuilder, private Api: ApiService, private dialog: MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) public editData: any) { }

  // this.productForm = new
  ngOnInit(): void {
    this.productForm = this.formbuilder.group({
      productName: ['', Validators.required],
      category: ['', Validators.required],
      freshness: ['', Validators.required],
      price: ['', Validators.required],
      comment: ['', Validators.required],
      date: ['', Validators.required]

    })


    if (this.editData) {
      this.actionBtn = "update"
      this.productForm.controls['productName'].setValue(this.editData.productName)
      this.productForm.controls['category'].setValue(this.editData.category)
      this.productForm.controls['freshness'].setValue(this.editData.freshness)
      this.productForm.controls['price'].setValue(this.editData.price)
      this.productForm.controls['comment'].setValue(this.editData.comment)
      this.productForm.controls['date'].setValue(this.editData.date)
    }
  }


  addProduct() {
    if (!this.editData) {
      if (this.productForm.valid) {
        this.Api.postProduct(this.productForm.value).subscribe({
          next: (res) => {
            alert('product add sucessfully')
            this.productForm.reset()
            this.dialog.close('save')
          },
          error(err) {
            alert(err)
          },
        })
      }
    } else {
      this.updateProduct()
    }
    console.log(this.productForm.value)
  }


  updateProduct() {
    this.Api.putProduct(this.productForm.value, this.editData.id).subscribe({
      next: (res) => {
        this.productForm.reset()
        this.dialog.close('update')
        alert("update successFull")
      },
      error(err) {
        alert(err)
      },
    })
  }




}
