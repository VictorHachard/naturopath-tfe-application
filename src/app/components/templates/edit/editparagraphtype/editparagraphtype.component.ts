import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {TagTypeService} from '../../../../service/TagType.service';
import {ParagraphTypeService} from '../../../../service/ParagraphType.service';

@Component({
  selector: 'app-editparagraphtype',
  templateUrl: './editparagraphtype.component.html',
  styleUrls: ['./editparagraphtype.component.css']
})
export class EditparagraphtypeComponent implements OnInit {
  editParagraphTypeForm: FormGroup;

  private id: string;

  paragraphType: any;

  constructor(private route: ActivatedRoute, private paragraphTypeService: ParagraphTypeService, private router: Router) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.paragraphTypeService.getParagraphType(this.id).subscribe(data => {
      console.log(data);
      this.paragraphType = data;
      this.init();
    });
  }

  init(): void {
    this.editParagraphTypeForm = new FormGroup({
      name: new FormControl(this.paragraphType.name,
        [Validators.required, Validators.minLength(6), Validators.maxLength(32)]),
      description: new FormControl(this.paragraphType.description,
        [Validators.required, Validators.minLength(16), Validators.maxLength(1024)]),
    });
  }

  update(): void {
    const editTagTypeValue = this.editParagraphTypeForm.value;
    this.paragraphTypeService.updateParagraphType(this.paragraphType.id.toString(),
      {description: editTagTypeValue.description,
        name: editTagTypeValue.name});
  }
}
