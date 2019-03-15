import { Component, OnInit , Inject} from '@angular/core';
import { Router } from '@angular/router';
import { ApiService, UtilsService } from '../../../../_services';
import { SpareCategory } from '../../../../_models';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.scss']
})
export class CategoryDetailComponent implements OnInit {

  sparecategories: Array<SpareCategory>;
  sparecategory: SpareCategory;

    id = '';
    name =''; // string;
    description = ''; //string;

  response: any;
  success = false;
  message = '';

  constructor( private router: Router, private apiService: ApiService, private utilsService: UtilsService) { }


  ngOnInit() {
    const sparecategoryId = window.localStorage.getItem('sparecategoryDetailId');
    if (!sparecategoryId) {
      alert('Invalid action.');
      this.router.navigate(['/spares/category']); // list-spare category
      return;
    }

    this.sparecategory = this.utilsService.cleanObject(this.getRecord(sparecategoryId));

    this.id = this.sparecategory.id || '';
    this.name = this.sparecategory.name ||''; // string;
    this.description = this.sparecategory.description || ''; //string;
    

    console.log('\nSpareCategory Name', typeof this.sparecategory, this.sparecategory);
  }

  getRecord(SpareCategoryId) {
    console.log('\nSpareCategory Id ', SpareCategoryId);
    const storedRecords = window.localStorage.getItem('sparecategory');
    const updated = window.localStorage.getItem('spare_updated');
    if (storedRecords) {
      this.sparecategory = JSON.parse(storedRecords);
      this.success = true;
      this.message = `Records retrieved since ${updated}`;
    }
    const t = this.apiService.getOneSpareCategory(this.sparecategory, SpareCategoryId);
    return t[0];
  }

  sparecategoryEdit(sparecategory: SpareCategory): void {
    window.localStorage.removeItem('sparecategoryEditId');
    window.localStorage.setItem('sparecategoryEditId', sparecategory.id);
    this.router.navigate(['/spares/category-edit']);
  }

  sparecategoryAdd(): void {
    this.router.navigate(['/spares/category-add']);
  }

  goBack() {
    this.router.navigate(['/spares/category']);
  }

}
