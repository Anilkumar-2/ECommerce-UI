import { Component } from '@angular/core';
import { Product } from '../data-types';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  searchResult:undefined|Product[]
  constructor(private activeRoute: ActivatedRoute, private product:ProductService, private route:Router) { }

  ngOnInit(): void {
    let query = this.activeRoute.snapshot.paramMap.get('query');
    console.warn(query);
    query && this.product.searchProducts(query).subscribe((result)=>{
      this.searchResult=result;      
    })        
  }

  render(val:string){
    this.route.navigate([`/details/${val}`])
  }

}
