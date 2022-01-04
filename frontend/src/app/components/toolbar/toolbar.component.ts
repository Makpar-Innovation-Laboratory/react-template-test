import { Component, EventEmitter, Input, Output } from '@angular/core';

/** 
   * # ToolbarComponent
   * 
   * ## Description
   * 
   * 
   * ## Example Usage
   * 
   * Hook into menu clicks using the output from this component's event emitter. 
   * 
   *        <app-toolbar (menuClick)="doSomething()"></app-toolbar>
   * 
   * Pass in menu tooltip with {@link menuTooltip},
   * 
   *      <app-toolbar menuTooltip="This is a tooltip!"></app-toolbar>
   */
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {

  @Output() 
  public menuClick : EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input()
  public menuTooltip !: string;

  /**
   * Constructs an instance of {@link ToolbarComponent}
   */
  constructor() { }

  /**
   * @event boolean signal to parent component menu button has been clicked
   */
  public emitClick(): void{ this.menuClick.emit(true); }

}
