import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Padlet, User} from '../shared/padlet';
import {Entrie} from "../shared/entrie";
import {PadletService} from "../shared/padlet.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PadletFactory} from "../shared/padlet-factory";
import {UserFactory} from "../shared/user-factory";
import {EntrieFactory} from "../shared/entrie-factory";
import {RatingFactory} from "../shared/rating-factory";
import {Rating} from "../shared/rating";
import {Comment} from "../shared/comment";
import {formatDate} from "@angular/common";

@Component({
  selector: 'bs-padlet-details',
  templateUrl: './padlet-details.component.html',
  styles: [
  ]
})

export class PadletDetailsComponent implements OnInit {

  padlet: Padlet = PadletFactory.empty();
  dateString : string = "";

  constructor(
    private bs: PadletService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    const params = this.route.snapshot.params;
    this.bs.getSinglePadlet(params['id'])
      .subscribe((p: Padlet) => {
        this.padlet = p;
        this.getRatings();
        this.getComments();
        console.log(p);
      });
  }

  getRatings() : void {
    for(let entrie of this.padlet?.entries) {
      this.bs.getRatingsForEntrie(entrie.id).subscribe((res: Rating[]) => {
        entrie.ratings = res;
      })
    }
  }

  getComments() : void {
    for (let entrie of this.padlet?.entries) {
      this.bs.getCommentsForEntrie(entrie.id).subscribe((res: Comment[]) => {
        entrie.comments = res;
      });
    }
  }
}
