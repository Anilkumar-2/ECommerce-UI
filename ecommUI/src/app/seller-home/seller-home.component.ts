import { Component, OnInit } from '@angular/core';
import { Product } from '../data-types';
import { ProductService } from '../services/product.service';
import { faCoffee, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrl: './seller-home.component.css'
})
export class SellerHomeComponent implements OnInit {
  
  productList:any
  deleteIcon=faTrash
  editIcon=faEdit

  constructor(private product:ProductService){}
  
    ngOnInit(): void {
      this.list();
    }

    deleteProduct(id:any){
      this.product.deleteProduct(id).subscribe((res)=>{
        if(res){
          alert('Product deleted succesfully!')
          this.list()
        }
      })
      this.list()
    }

    list(){
      this.product.productList().subscribe((res)=>{
        this.productList=res
      })
    }
}
