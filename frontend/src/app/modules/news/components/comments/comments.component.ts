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

  /**
   * # Description
   * Constructs an instance of {@link CommentsComponent}
   */
  constructor() { }

}
