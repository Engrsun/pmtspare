import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../_services';
import { Router } from '@angular/router';
import { Spares, SpareCategory, SpareLog, ApiResponse } from '../../../_models';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  response: any;
  success = false;
  message = '';
  sparecategory: Array<SpareCategory>;

  constructor(private router: Router, private apiService: ApiService) { }

  ngOnInit() {
     if (!window.localStorage.getItem('token')) {
    this.router.navigate(['login']);
    return;
  }
  const storedRecords = window.localStorage.getItem('sparecategory');
  const updated = window.localStorage.getItem('sparecategory_updated');
  if (storedRecords && updated) {
      this.sparecategory = JSON.parse(storedRecords);
      this.success = true;
      this.message = `Records retrieved since ${updated}`;
  } else {
    this.sparecategoryRetrieve();
  }
}

sparecategoryRetrieve(): void {
  this.apiService.retrieveSpareCategory().subscribe(data => {
    this.response = data;
    this.sparecategory = this.response.payload;
    this.success = this.response.success;
    this.message = this.response.message;
    if (this.response.success) {
      window.localStorage.setItem('sparecategory', JSON.stringify(this.response.payload));
      window.localStorage.setItem('sparecategory_updated', JSON.stringify(new Date()));
    }
  });
}

sparecategoryDetail(sparecategory: SpareCategory): void {
  window.localStorage.removeItem('sparecategoryDetailId');
  window.localStorage.setItem('sparecategoryDetailId', sparecategory.id);
  this.router.navigate(['spares/category-detail'])
    .then(nav => { console.log(nav); }, err => {console.log(err); });
  console.log('Navigating to category detail');
  return;
}

sparecategoryDelete(sparecategory: SpareCategory): void {
  this.apiService.deleteSpareCategory(sparecategory.id).subscribe( data => {
      this.sparecategory = this.sparecategory.filter(i => i.id !== sparecategory.id);
      window.localStorage.setItem('sparecategory', JSON.stringify(this.sparecategory));
    });
}

sparecategoryEdit(sparecategory: SpareCategory): void {
  window.localStorage.removeItem('sparecategoryEditId');
  window.localStorage.setItem('sparecategoryEditId',sparecategory.id);
  this.router.navigate(['spares/category-edit']);
}

sparecategoryAdd(): void {
  this.router.navigate(['spares/category-add']);
}

}
