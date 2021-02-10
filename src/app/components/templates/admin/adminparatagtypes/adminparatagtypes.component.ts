import {Component, OnInit} from '@angular/core';
import {ParatagTypeService} from '../../../../service/ParatagType.service';
import {AbstractComponents} from '../../../commons/AbstractComponents';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-adminparatagtypes',
  templateUrl: './adminparatagtypes.component.html',
  styleUrls: ['./adminparatagtypes.component.css']
})
export class AdminparatagtypesComponent extends AbstractComponents implements OnInit {

  paratagTypes: any[];

  constructor(route: ActivatedRoute,
              router: Router,
              private paratagtypeService: ParatagTypeService) {
    super(route, router);
  }

  ngOnInit(): void {
    this.paratagtypeService.getAllParatagType().subscribe(data => {
      this.paratagTypes = data;
      console.log(this.paratagTypes);
    });
  }

}
