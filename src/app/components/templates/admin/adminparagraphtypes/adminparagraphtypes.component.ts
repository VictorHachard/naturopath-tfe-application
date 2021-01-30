import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../../../../service/Category.service';
import {ParagraphTypeService} from '../../../../service/ParagraphType.service';

@Component({
  selector: 'app-adminparagraphtypes',
  templateUrl: './adminparagraphtypes.component.html',
  styleUrls: ['./adminparagraphtypes.component.css']
})
export class AdminparagraphtypesComponent implements OnInit {

  parapgraphTypes: any[];

  constructor(private paragraphTypeService: ParagraphTypeService) { }

  ngOnInit(): void {
    this.paragraphTypeService.getAllParagraphType().subscribe(data => {
      this.parapgraphTypes = data;
      console.log(this.parapgraphTypes);
    });
  }

}
