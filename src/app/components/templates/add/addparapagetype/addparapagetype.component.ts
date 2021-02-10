import {Component, OnInit} from '@angular/core';
import {AbstractComponents} from '../../../commons/AbstractComponents';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-addparapagetype',
  templateUrl: './addparapagetype.component.html',
  styleUrls: ['./addparapagetype.component.css']
})
export class AddparapagetypeComponent extends AbstractComponents implements OnInit {

  constructor(route: ActivatedRoute,
              router: Router) {
    super(route, router);
  }

  ngOnInit(): void {
  }

}
