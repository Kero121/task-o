import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';




@Injectable({
  providedIn: 'root'
})
export class ApisService {
  userData: any;
  change: any;
  finalChange: any  = new BehaviorSubject(null); ;
 
  constructor(private http: HttpClient , private Router:Router) { 
    if(localStorage.getItem('User'))
    this.getData();
  }


  login(formdata:any) {
		return this.http.post( 'https://dummyjson.com/auth/login',formdata,
			{
				headers: new HttpHeaders()
					.set('Content-Type', 'application/json')
			}
		);



	}
  // get data of user from local storage
  getData(): any {
    this.userData = localStorage.getItem("User");
    this.change = JSON.parse(this.userData);
    this.finalChange.next(this.change)
    console.log(this.finalChange);

  }
  // get all products
  getProducts():Observable<any>{
    return this.http.get( 'https://dummyjson.com/products',
		
		);
  
  }
// get all categories
  getCategories():Observable<any>{
    return this.http.get( 'https://dummyjson.com/products/categories',
		
		);
  
  }
  // search a product
  search(term:any):Observable<any>{
    return this.http.get( `https://dummyjson.com/products/search?q=${term}`,
		
		);
  
  }
// filter specific category
filterCategory(cat:any){
  return this.http.get( `https://dummyjson.com/products/category/${cat}`,
		
		);
  
}
signOut()
{
  localStorage.removeItem("User");
  this.finalChange.next(null);
  this.Router.navigate(['/login'])
}
}




