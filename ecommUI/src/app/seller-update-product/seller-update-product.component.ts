import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { Product } from '../data-types';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrl: './seller-update-product.component.css'
})
export class SellerUpdateProductComponent implements OnInit{

  updateProductForm: FormGroup;
  productData:Product | undefined;

  constructor(private fb: FormBuilder, private product: ProductService, private route:ActivatedRoute) {
    this.updateProductForm = fb.group({     
      name: '',
      price: '',
      color: '',
      category: '',
      description: '',
      imageUrl: ''
    });
  }

  ngOnInit(): void {
    let productId=this.route.snapshot.paramMap.get('id')
    this.product.getProduct(productId).subscribe((res)=>{
      this.productData=res
    })
  }

  updateProduct(data: Product) {
    if(this.productData){
      data.id=this.productData.id
    }
    this.product.updateProduct(data).subscribe((res: any) => {
      if(res){
        alert('Product updated successfully')
      }
    })
  }
 
}
