import { Component, OnInit } from '@angular/core';
import { ApisService } from '../apis.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  error_messg: string = ''
  getProducts: any
  getCategories: any
  term: any
  productDiscount:any
  cat:any
  filteredProducts:any
  constructor(private ApisService: ApisService) { }

  ngOnInit(): void {
    this.getAllProducts()
    this.getAllCategories()
  }
  getAllProducts() {
    this.ApisService.getProducts().subscribe(
      (res: any) => {

        this.getProducts = res.products;
        console.log(this.getProducts);
        // productDiscount 
      },
      (err: any) => {
        this.error_messg = err.error.message
        console.log(err);


      }
    )
  }

  getAllCategories() {
    this.ApisService.getCategories().subscribe(
      (res: any) => {

        this.getCategories = res;

      },
      (err: any) => {
        this.error_messg = err.error.message
        console.log(err);


      }
    )
  }
  searchTerm(term: any) {
    this.ApisService.search(term.value).subscribe(
      (res: any) => {
        
        
        this.getProducts = res.products;

      },
      (err: any) => {
        this.error_messg = err.error.message
        console.log(err);


      }
    )
  }

  filterCategory(cat:any,inp:any){
    console.log(inp);
    
    if(inp.target.checked == true){
    this.ApisService.filterCategory(cat).subscribe(
      (res: any) => {
        this.filteredProducts = res.products
        this.getProducts = this.filteredProducts
      },
      (err: any) => {
       
        this.error_messg = err.error.message
        console.log(err);


      }
    )
  }
  else{
    this.getAllProducts()
  }
  }
  logOut()
  {
    this.ApisService.signOut();
  }
}
