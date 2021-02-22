import {Component, OnInit} from '@angular/core';
import {AbstractComponents} from '../../commons/AbstractComponents';

@Component({
  selector: 'app-validating',
  templateUrl: './validating.component.html',
  styleUrls: ['./validating.component.css']
})
export class ValidatingComponent extends AbstractComponents implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
