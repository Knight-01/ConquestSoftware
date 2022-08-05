import { HttpClient} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title = 'Client';
  users: any;
  selectedFile: any = File;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getUsers();

  
  }

  getUsers() {
    this.http.get("https://developolis.conquest.live:444/api/requests/79")
    .subscribe(response => {
      this.users = response;
      this.users = Array.of(this.users);
    },error => {
      console.log(error);
    })
  }

  getToken() {
    return localStorage.getItem('token');
  }

  onFileSelected(event: any) {
    console.log(event);
    this.selectedFile = <File>event.target.files[0];
  }
    
  onUpload() {
    const fd = new FormData();
    fd.append('image/jpeg', this.selectedFile, "IMG_6006.jpeg");
    const url = "https://developolis.conquest.live:444/api/documents/add_document";
    this.http.post(url, fd ,{
      reportProgress: true,
      observe: 'events',  
  })
    .subscribe(response => {
      console.log(response);
    });
  }

}



