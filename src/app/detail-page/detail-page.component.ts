import { Component } from '@angular/core';
import { BootService } from '../boot.service';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../post';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.css']
})
export class DetailPageComponent {
  constructor(private BootService :BootService, private route: ActivatedRoute){}
  goBack(): void{
    this.BootService.goBack()
  }
  getPost(){
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.BootService.getPost(id).subscribe(post => {this.Post = post, console.log("Day la nhii"+ this.Post)})
  }

  Post? : Post

  ngOnInit(){
    this.getPost()
  }
}
