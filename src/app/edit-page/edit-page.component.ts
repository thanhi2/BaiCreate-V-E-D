import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BootService } from '../boot.service';
import { Post } from '../post';
@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.css']
})
export class EditPageComponent {

  constructor(private router: Router, private BootService :BootService, private route: ActivatedRoute) { }

  goBack(): void {
    this.router.navigate(['/Home']);
  };

  getPost(){
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.BootService.getPost(id).subscribe(post => {this.Post = post, console.log("Day la nhii"+ this.Post)})
  }

  Post? : Post

  putUpdate(){
    if(this.Post){
      this.BootService.putPost(this.Post).subscribe(response=>{this.goBack()})
    }
  }
  ngOnInit(){
    this.getPost()
  }
}
