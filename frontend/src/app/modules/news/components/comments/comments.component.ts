import { Component, Input } from '@angular/core';
import { Comment } from 'src/app/models/news';

/**
 * # CommentsComponent
 * ## Description
 * ## Example Usage
 */
@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent {

  @Input() public comments: Comment[] | null = null;

  /**
   * # Description
   * Constructs an instance of {@link CommentsComponent}
   */
  constructor() { }

}
