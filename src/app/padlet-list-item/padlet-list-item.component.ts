import {Component, OnInit, Input} from '@angular/core';
import {Padlet, User} from "../shared/padlet";
import {formatDate} from "@angular/common";

@Component({
  selector: 'a.bs-padlet-list-item',
  templateUrl: './padlet-list-item.component.html',
  styles: [
  ]
})
export class PadletListItemComponent implements OnInit {
  @Input() padlet: Padlet | undefined
  @Input() user: User | undefined

  dateString : string = "";

  constructor() {
  }
  ngOnInit() {
    if(this.padlet) {
      this.dateString = formatDate(this.padlet!.created_at, 'dd/MM/yyyy', 'en-US');
    }

  }
}
