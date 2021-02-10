import {Component, OnInit} from '@angular/core';
import {TagTypeService} from '../../../../service/TagType.service';
import {AbstractComponents} from '../../../commons/AbstractComponents';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-admintagtypes',
  templateUrl: './admintagtypes.component.html',
  styleUrls: ['./admintagtypes.component.css']
})
export class AdmintagtypesComponent extends AbstractComponents implements OnInit {

  tagTypes: any[];

  constructor(route: ActivatedRoute,
              router: Router,
              private tagTypeService: TagTypeService) {
    super(route, router);
  }

  ngOnInit(): void {
    this.tagTypeService.getAllTagType().subscribe(data => {
      this.tagTypes = data;
      console.log(this.tagTypes);
    });
  }

}
