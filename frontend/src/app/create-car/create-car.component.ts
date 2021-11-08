import { environment } from './../../environments/environment';
import { takeUntil } from 'rxjs/operators';
import { AdminService } from '../services/admin.service';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
  isButtonDisabled: boolean = false;
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
    this.isButtonDisabled = true;
    const file: File = event.target.files[0];
    if (file) {
      this.fileName = file.name;
      const formData = new FormData();
      formData.append("file", file);
      this.adminService.uploadCarImage(formData).pipe(takeUntil(this.unsubscribe)).subscribe((res: any) => { this.fileKey = res.imageKey; console.log(res); this.isButtonDisabled = false });
    }
  }

  ngOnDestroy() {
    this.unsubscribe.unsubscribe();
  }

}
