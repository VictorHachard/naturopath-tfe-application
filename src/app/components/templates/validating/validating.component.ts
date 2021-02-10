import {Component, OnInit} from '@angular/core';
import {AbstractComponents} from '../../commons/AbstractComponents';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-validating',
  templateUrl: './validating.component.html',
  styleUrls: ['./validating.component.css']
})
export class ValidatingComponent extends AbstractComponents implements OnInit {

  constructor(route: ActivatedRoute,
              router: Router) {
    super(route, router);
  }

  ngOnInit(): void {
  }

}
