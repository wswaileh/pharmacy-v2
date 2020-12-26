import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-entity-context-menu',
  templateUrl: './entity-context-menu.component.html',
  styleUrls: ['./entity-context-menu.component.scss']
})
export class EntityContextMenuComponent implements OnInit {

  @ViewChild('cm') cm;
  @Input() items: MenuItem[];

  constructor() { }

  ngOnInit(): void {
  }

  show(x) {
    this.cm.show(x);
  }

}
