import { Component, OnInit } from '@angular/core';
import {TagtypeService} from '../../../../service/tagtype.service';
import {ParatagtypeService} from '../../../../service/paratagtype.service';

@Component({
  selector: 'app-adminparatagtypes',
  templateUrl: './adminparatagtypes.component.html',
  styleUrls: ['./adminparatagtypes.component.css']
})
export class AdminparatagtypesComponent implements OnInit {

  paratagTypes: any[];

  constructor(private paratagtypeService: ParatagtypeService) { }

  ngOnInit(): void {
    this.paratagtypeService.getAllParatagType().subscribe(data => {
      this.paratagTypes = data;
      console.log(this.paratagTypes);
    });
  }

}
