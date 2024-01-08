import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-entity-buttons',
  templateUrl: './entity-buttons.component.html',
  styleUrls: ['./entity-buttons.component.scss']
})
export class EntityButtonsComponent implements OnInit {

  @Input() entityName: string;

  @Output() clicked: EventEmitter<string>;

  constructor() {
    this.clicked = new EventEmitter<string>();
  }

  ngOnInit(): void {
  }

  emitAction(actionType) {
    this.clicked.emit(actionType);
  }

}
