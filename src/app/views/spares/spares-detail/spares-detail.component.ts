import { Component, OnInit , Inject} from '@angular/core';
import { Router } from '@angular/router';
import { ApiService, UtilsService } from '../../../_services';
import { Spares } from '../../../_models';

@Component({
  selector: 'app-spares-detail',
  templateUrl: './spares-detail.component.html',
  styleUrls: ['./spares-detail.component.scss']
})
export class SparesDetailComponent implements OnInit {
  spares: Array<Spares>;
  spare: Spares;

  id = '';
  code= '';
  name = '';
  measure = '';
  model = '';
  make = '';
  category = '';
  description= '';
  parent_spare_id= '';
  split_gain= '';
  splittable='';
  depletion= '';
  reorder_level= '';
  reorder_quantity='';
  unit_price= '';
  supplier_id= '';
  is_usability = '';
  photo = '';

  response: any;
  success = false;
  message = '';

  constructor( private router: Router, private apiService: ApiService, private utilsService: UtilsService) { }


  ngOnInit() {
    const spareId = window.localStorage.getItem('spareDetailId');
    if (!spareId) {
      alert('Invalid action.');
      this.router.navigate(['/spares']); // list-spare
      return;
    }

    this.spare = this.utilsService.cleanObject(this.getRecord(spareId));

    this.id = this.spare.id || '';
    this.name = this.spare.name || '';
    this.measure = this.spare.measure || '';
    this.model = this.spare.model ||'';
    this.make = this.spare.make || '';
    this.category = this.spare.category || '';
    this.description = this.spare.category || '';
    this.parent_spare_id = this.spare.parent_spare_id ||'';
    this.split_gain = this.spare.split_gain.toString(10) ;
    this.splittable = this.spare.splittable.toString();
    this.depletion = this.spare.depletion.toString(10);
    this.reorder_level = this.spare.reorder_level.toString(10);
    this.reorder_quantity = this.spare.reorder_level.toString(10);
    this.unit_price = this.spare.unit_price.toString(10);
    this.supplier_id = this.spare.supplier_id ||'';
    this.is_usability = this.spare.is_usability.toString();
    this.photo = this.spare.photo ||'';
    

    console.log('\nSpares Name', typeof this.spare, this.spare);
  }

  getRecord(SpareId) {
    console.log('\nSpare Id ', SpareId);
    const storedRecords = window.localStorage.getItem('spares');
    const updated = window.localStorage.getItem('spare_updated');
    if (storedRecords) {
      this.spares = JSON.parse(storedRecords);
      this.success = true;
      this.message = `Records retrieved since ${updated}`;
    }
    const t = this.apiService.getOneSpare(this.spares, SpareId);
    return t[0];
  }

  sparesEdit(spare: Spares): void {
    window.localStorage.removeItem('sparesEditId');
    window.localStorage.setItem('sparesEditId', spare.id);
    this.router.navigate(['spares/spares-edit']);
  }

  sparesAdd(): void {
    this.router.navigate(['spares/spares-add']);
  }

  goBack() {
    this.router.navigate(['/spares']);
  }

}
