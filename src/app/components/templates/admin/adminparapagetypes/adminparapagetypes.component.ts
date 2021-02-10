import {Component, OnInit} from '@angular/core';
import {AbstractComponents} from '../../../commons/AbstractComponents';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-adminparapagetypes',
  templateUrl: './adminparapagetypes.component.html',
  styleUrls: ['./adminparapagetypes.component.css']
})
export class AdminparapagetypesComponent extends AbstractComponents implements OnInit {

  constructor(route: ActivatedRoute,
              router: Router) {
    super(route, router);
  }

  ngOnInit(): void {
  }

}
