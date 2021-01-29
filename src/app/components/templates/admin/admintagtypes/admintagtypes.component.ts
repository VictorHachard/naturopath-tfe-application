import { Component, OnInit } from '@angular/core';
import {TagtypeService} from '../../../../service/tagtype.service';

@Component({
  selector: 'app-admintagtypes',
  templateUrl: './admintagtypes.component.html',
  styleUrls: ['./admintagtypes.component.css']
})
export class AdmintagtypesComponent implements OnInit {

  tagTypes: any[];

  constructor(private tagTypeService: TagtypeService) { }

  ngOnInit(): void {
    this.tagTypeService.getAllTagType().subscribe(data => {
      this.tagTypes = data;
      console.log(this.tagTypes);
    });
  }

}
