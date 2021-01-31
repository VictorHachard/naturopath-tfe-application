import {Component, OnInit} from '@angular/core';
import {TagTypeService} from '../../../../service/TagType.service';

@Component({
  selector: 'app-admintagtypes',
  templateUrl: './admintagtypes.component.html',
  styleUrls: ['./admintagtypes.component.css']
})
export class AdmintagtypesComponent implements OnInit {

  tagTypes: any[];

  constructor(private tagTypeService: TagTypeService) { }

  ngOnInit(): void {
    this.tagTypeService.getAllTagType().subscribe(data => {
      this.tagTypes = data;
      console.log(this.tagTypes);
    });
  }

}
