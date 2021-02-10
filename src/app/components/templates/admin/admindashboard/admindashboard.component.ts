import {Component, OnInit} from '@angular/core';
import {AbstractComponents} from '../../../commons/AbstractComponents';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent extends AbstractComponents implements OnInit {

  constructor(route: ActivatedRoute,
              router: Router) {
    super(route, router);
  }

  ngOnInit(): void {
  }

}
