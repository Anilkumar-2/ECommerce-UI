import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../data-types';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  popularProducts:Product[] | undefined
  trendyProducts:Product[] | undefined


  constructor(private product:ProductService){}
  
  ngOnInit(): void {
    this.product.popularProducts().subscribe((res)=>{
      this.popularProducts=res
    })

    this.product.trendyProducts().subscribe((data)=>{
      this.trendyProducts=data;
    })
  }
}
