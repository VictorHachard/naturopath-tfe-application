import {Component, OnInit} from '@angular/core';
import {ParagraphTypeService} from '../../../../service/ParagraphType.service';
import {AbstractComponents} from '../../../commons/AbstractComponents';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-adminparagraphtypes',
  templateUrl: './adminparagraphtypes.component.html',
  styleUrls: ['./adminparagraphtypes.component.css']
})
export class AdminparagraphtypesComponent extends AbstractComponents implements OnInit {

  parapgraphTypes: any[];

  constructor(route: ActivatedRoute,
              router: Router,
              private paragraphTypeService: ParagraphTypeService) {
    super(route, router);
  }

  ngOnInit(): void {
    this.paragraphTypeService.getAllParagraphType().subscribe(data => {
      this.parapgraphTypes = data;
      console.log(this.parapgraphTypes);
    });
  }

}
