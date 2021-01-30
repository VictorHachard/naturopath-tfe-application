import { Component, OnInit } from '@angular/core';
import {TagTypeService} from '../../../../service/TagType.service';
import {ParatagTypeService} from '../../../../service/ParatagType.service';

@Component({
  selector: 'app-adminparatagtypes',
  templateUrl: './adminparatagtypes.component.html',
  styleUrls: ['./adminparatagtypes.component.css']
})
export class AdminparatagtypesComponent implements OnInit {

  paratagTypes: any[];

  constructor(private paratagtypeService: ParatagTypeService) { }

  ngOnInit(): void {
    this.paratagtypeService.getAllParatagType().subscribe(data => {
      this.paratagTypes = data;
      console.log(this.paratagTypes);
    });
  }

}
