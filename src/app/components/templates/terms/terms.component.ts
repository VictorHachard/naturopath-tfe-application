import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AbstractComponents} from '../../commons/AbstractComponents';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.css']
})
export class TermsComponent extends AbstractComponents implements OnInit {

  constructor(route: ActivatedRoute,
              router: Router) {
    super(route, router);
  }

  ngOnInit(): void {
  }

}
