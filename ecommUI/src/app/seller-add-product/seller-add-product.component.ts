import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Product } from '../data-types';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrl: './seller-add-product.component.css'
})
export class SellerAddProductComponent {

  addProductForm: FormGroup;

  constructor(private fb: FormBuilder, private product:ProductService) {
    this.addProductForm = fb.group({
      name: '',
      price: '',
      color: '',
      category: '',
      description: '',
      imageUrl: ''
    });
   }

  addProduct(data:Product){
    this.product.addProduct(data).subscribe((res:any)=>{
      alert('Product added successfully')
    })
  }

}
