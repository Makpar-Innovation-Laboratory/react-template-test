import { Component, EventEmitter, Output } from '@angular/core';

/** ToolbarComponent
   * Hook into menu clicks using the output from this component's event emitter,
   *        <app-toolbar (menuClick)="doSomething()"></app-toolbar>
   */
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {
  @Output() public menuClick : EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  public emitClick(): void{ this.menuClick.emit(true); }

}
