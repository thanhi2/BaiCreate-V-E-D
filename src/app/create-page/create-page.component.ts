import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../post';
import { BootService } from '../boot.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.css']
})
export class CreatePageComponent {
  
  constructor(private Router: Router, private BootService :BootService, private route: ActivatedRoute, private formBuilder: FormBuilder) { }
  goBack(): void {
    this.Router.navigate(['/Home']);
  };
  checkoutForm = this.formBuilder.group({
    title: '',
    body: ''
  });

  submit(){ 
    const data:Post={
      title : this.checkoutForm.get('title')?.value??'',
      body : this.checkoutForm.get('body')?.value??''
    }
    console.log(data)
    this.BootService.postPost(data).subscribe(response => {this.goBack()})
  }
  
}
