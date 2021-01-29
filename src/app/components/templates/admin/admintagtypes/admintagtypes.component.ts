import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../../../../service/category.service';
import {TagtypeService} from '../../../../service/tagtype.service';

@Component({
  selector: 'app-admintagtypes',
  templateUrl: './admintagtypes.component.html',
  styleUrls: ['./admintagtypes.component.css']
})
export class AdmintagtypesComponent implements OnInit {

  tagType: any[];

  constructor(private tagTypeService: TagtypeService) { }

  ngOnInit(): void {
    this.tagTypeService.getAllTagType().subscribe(data => {
      this.tagType = data;
      console.log(this.tagType);
    });
  }


}
