import { Component } from '@angular/core';
import { BootService } from '../boot.service';
import { Post } from '../post';
import { EditPageComponent } from '../edit-page/edit-page.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  
  constructor(private BootService: BootService){}
  getListPost(){
    this.BootService.getListPost().subscribe(post => {this.post = post});
  
  }

  post: Post[]=[]

  delete(post: Post): void {
    this.post = this.post.filter(h => h !== post);
    this.BootService.deletePost(post.id).subscribe(response => {window.alert('Đã xóa thành công')});
  }
  
  ngOnInit(){
    this.getListPost()
  }

}
