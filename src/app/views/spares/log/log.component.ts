import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../_services';
import { Router } from '@angular/router';
import { Spares, SpareLog, ApiResponse } from '../../../_models';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss']
})
export class LogComponent implements OnInit {
  response: any;
  success = false;
  message = '';
  sparelog: Array<SpareLog>;

  constructor(private router: Router, private apiService: ApiService) { }

  ngOnInit() {
     if (!window.localStorage.getItem('token')) {
    this.router.navigate(['login']);
    return;
  }
  const storedRecords = window.localStorage.getItem('sparelog');
  const updated = window.localStorage.getItem('sparelog_updated');
  if (storedRecords && updated) {
      this.sparelog = JSON.parse(storedRecords);
      this.success = true;
      this.message = `Records retrieved since ${updated}`;
  } else {
    this.sparelogRetrieve();
  }
}

sparelogRetrieve(): void {
  this.apiService.retrieveSpareLog().subscribe(data => {
    this.response = data;
    this.sparelog = this.response.payload;
    this.success = this.response.success;
    this.message = this.response.message;
    if (this.response.success) {
      window.localStorage.setItem('sparelog', JSON.stringify(this.response.payload));
      window.localStorage.setItem('sparelog_updated', JSON.stringify(new Date()));
    }
  });
}

sparelogDetail(sparelog: SpareLog): void {
  window.localStorage.removeItem('sparelogDetailId');
  window.localStorage.setItem('sparelogDetailId', sparelog.id);
  this.router.navigate(['spares/log-detail'])
    .then(nav => { console.log(nav); }, err => {console.log(err); });
  console.log('Navigating to log detail');
  return;
}

sparelogDelete(sparelog: SpareLog): void {
  this.apiService.deleteSpareLog(sparelog.id).subscribe( data => {
      this.sparelog = this.sparelog.filter(i => i.id !== sparelog.id);
      window.localStorage.setItem('sparelog', JSON.stringify(this.sparelog));
    });
}

sparelogEdit(sparelog: SpareLog): void {
  window.localStorage.removeItem('sparelogEditId');
  window.localStorage.setItem('sparelogEditId',sparelog.id);
  this.router.navigate(['spares/log-edit']);
}

sparelogAdd(): void {
  this.router.navigate(['spares/log-add']);
}

}
