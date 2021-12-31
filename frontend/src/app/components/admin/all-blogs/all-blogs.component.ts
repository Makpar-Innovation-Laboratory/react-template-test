
import { BlogService } from './../../../services/blog.service';
import { Component, OnInit, } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-all-blogs',
  templateUrl: './all-blogs.component.html',
  styleUrls: ['./all-blogs.component.css']
})



export class AllBlogsComponent implements OnInit {

  constructor(private blog_service: BlogService, 
              private dialog: MatDialog) {}

  ngOnInit() {
  }
 

}