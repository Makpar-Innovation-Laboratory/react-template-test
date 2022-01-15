import { Component, Input } from '@angular/core';
import { Comment } from 'src/app/models/news';

/**
 * # CommentsComponent
 * ## Description
 * Component for rendering a nested array of {@link Comment}. Pass in the array through the {@link comments} property.
 * ## Example Usage
 * ```html
 * <app-comments [comments]="theseComments"></app-comments>
 * ```
 */
@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent {

  @Input() public comments: Comment[] | null = null;

  showReply:boolean = false;
  buttonId:number | null = -1;

  /**
   * # Description
   * Constructs an instance of {@link CommentsComponent}
   */
  constructor() { }

  public showReplyToggle(comment_id: number | null) {
    this.showReply = !this.showReply;
    this.buttonId = comment_id;
  }

}
