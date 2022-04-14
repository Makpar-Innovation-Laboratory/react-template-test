import React, { useState } from "react";
import editIcon from "../assets/icon/edit-icon.svg";
import removeIcon from "../assets/icon/remove-icon.svg";
import viewIcon from "../assets/icon/right_arrow_icon.svg";

export default function Archive() {

  // Connected

  const blogs = [
    { title: "Lorem Ipsum Dolor Dit Amet 1", author: "John Doe", submitted: "02-12-2022", feature_image: "image_1" },
    { title: "Lorem Ipsum Dolor Dit Amet 2", author: "John Doe", submitted: "02-13-2022", feature_image: "image_1" },
    { title: "Lorem Ipsum Dolor Dit Amet 3", author: "John Doe", submitted: "02-14-2022", feature_image: "image_1" },
    { title: "Lorem Ipsum Dolor Dit Amet 4", author: "John Doe", submitted: "02-15-2022", feature_image: "image_1" },
    { title: "Lorem Ipsum Dolor Dit Amet 5", author: "John Doe", submitted: "02-15-2022", feature_image: "image_1" }
  ];

  return (
    <div className="archive-container" style={{ padding: "3rem 0 0 0" }}>
      <div className="white-text page-header">
        <div style={{ width: "20%", textAlign: "right" }}>
          <h3 className="mr-2">ARCHIVE</h3>
        </div>

        <div style={{ width: "80%", display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
          <h5 className="mat-title">LOREM IPSUM DOLOR SIT AMET</h5>
          <div className="header-border"></div>
          <p className="mat-subheading-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam. Consectetur adipiscing elit, sed do eiusmod tempor incididunt.
          </p>
        </div>
      </div>

      <div className="blogs-search">
        <input type="text" placeholder="Search.." name="search"></input>
        <button className="btn-primary ml-1" type="submit">Search</button>
      </div>

      {/* <div class="blog-container" *ngFor="let blog of blogs"> */}
      <div className="blogs">
        { blogs ? blogs.map((blog, bid) => {
          return (
            <div key={bid} className="blog-container bg-primary white-text">
              <div className="blog-container-image bg-white">
                  {/* <img [src]="blog.feature_image" alt="Cover-image"> */}
                  {blog.feature_image}
              </div>
              <div className="blog-container-details">
                  {/* <h3>{{blog.title}}: {{blog.submitted}}</h3> */}
                  <h5>{blog.title}</h5>
                  <div className="mt-1" style={{ display: "flex", justifyContent: "space-between" }}>
                    <p>Author: {blog.author}</p>
                    <p>{blog.submitted}</p>
                  </div>
              </div>
              <div className="blog-container-actions">
                  {/* <button mat-raised-button id="view-action" [routerLink]="['/blog', blog.news_id]">View</button> */}
                  <a className="white-text ml-2">
                    <u>View Post</u>
                  </a>
                  <div className="mr-2" style={{ display: "flex", alignItems: "center" }}>
                    {/* <button mat-raised-button id="edit-action" [routerLink]="['/admin/update-blog', blog.news_id]">Edit</button> */}
                    <a className="mr-1">
                      <img src={editIcon}></img>
                    </a>
                    {/* <button mat-raised-button id="delete-action" (click)="delete_single_blog(blog.news_id)" >Delete</button> */}
                    <a>
                      <img src={removeIcon}></img>
                    </a>
                  </div>
              </div>
            </div>
          )
        }) : "No blogs found"}
      </div>
    </div>
  );
}
