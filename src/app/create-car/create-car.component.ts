import { AdminService } from './../admin.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-create-car',
  templateUrl: './create-car.component.html',
  styleUrls: ['./create-car.component.scss']
})
export class CreateCarComponent implements OnInit {

  fileName = '';

  constructor(private http: HttpClient, private adminService: AdminService) { }

  ngOnInit(): void {
  }

  onCreate(form: NgForm) {
    this.adminService.createCar(form.value.brand, form.value.model, form.value.power, form.value.seats, this.fileName);
    form.resetForm();
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.fileName = file.name
      const formData = new FormData();
      formData.append("file", file, this.fileName);
      this.http.post('http://localhost:3000/api/admin/save-image', formData).subscribe(res => console.log(res));
    }
  }

  // ngOnDestroy() {
  //   this.unsubscribe.unsubscribe();
  // }

}
