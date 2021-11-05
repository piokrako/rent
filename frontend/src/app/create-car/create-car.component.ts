import { environment } from './../../environments/environment';
import { takeUntil } from 'rxjs/operators';
import { AdminService } from '../services/admin.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-create-car',
  templateUrl: './create-car.component.html',
  styleUrls: ['./create-car.component.scss']
})
export class CreateCarComponent implements OnInit, OnDestroy {

  fileName = '';
  fileKey = '';
  private unsubscribe = new Subject();

  path: String = environment.baseUrl;

  constructor(private http: HttpClient, private adminService: AdminService) { }

  ngOnInit(): void {
  }

  onCreate(form: NgForm) {
    this.adminService.createCar(form.value.brand, form.value.model, form.value.power, form.value.seats, this.fileKey).subscribe(res => { console.log(res) });
    this.fileName = '';
    this.fileKey = '';
    form.resetForm();
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.fileName = file.name;
      const formData = new FormData();
      formData.append("file", file);
      this.http.post('http://localhost:3000/api/admin/save-image', formData).pipe(takeUntil(this.unsubscribe)).subscribe((res: any) => { this.fileKey = res.imageKey; console.log(res) });
    }
  }

  ngOnDestroy() {
    this.unsubscribe.unsubscribe();
  }

}
