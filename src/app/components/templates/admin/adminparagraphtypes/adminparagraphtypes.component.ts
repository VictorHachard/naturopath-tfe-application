import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../../../../service/category.service';
import {ParagraphtypeService} from '../../../../service/paragraphtype.service';

@Component({
  selector: 'app-adminparagraphtypes',
  templateUrl: './adminparagraphtypes.component.html',
  styleUrls: ['./adminparagraphtypes.component.css']
})
export class AdminparagraphtypesComponent implements OnInit {

  parapgraphType: any[];

  constructor(private paragraphTypeService: ParagraphtypeService) { }

  ngOnInit(): void {
    this.paragraphTypeService.getAllParagraphType().subscribe(data => {
      this.parapgraphType = data;
      console.log(this.parapgraphType);
    });
  }

}
