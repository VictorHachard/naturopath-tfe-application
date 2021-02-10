import {Component, OnInit} from '@angular/core';
import {AbstractComponents} from '../../commons/AbstractComponents';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent extends AbstractComponents implements OnInit {

  constructor(route: ActivatedRoute,
              router: Router) {
    super(route, router);
  }

  ngOnInit(): void {
  }

}
