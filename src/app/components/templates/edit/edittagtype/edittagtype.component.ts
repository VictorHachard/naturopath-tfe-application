import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoryService} from '../../../../service/Category.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TagTypeService} from '../../../../service/TagType.service';

@Component({
  selector: 'app-edittagtype',
  templateUrl: './edittagtype.component.html',
  styleUrls: ['./edittagtype.component.css']
})
export class EdittagtypeComponent implements OnInit {

  editTagTypeForm: FormGroup;

  private id: string;

  tagType: any;

  constructor(private route: ActivatedRoute, private tagTypeService: TagTypeService, private router: Router) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.tagTypeService.getTagType(this.id).subscribe(data => {
      console.log(data);
      this.tagType = data;
      this.init();
    });
  }

  init(): void {
    this.editTagTypeForm = new FormGroup({
      name: new FormControl(this.tagType.name,
        [Validators.required, Validators.minLength(6), Validators.maxLength(32)]),
      description: new FormControl(this.tagType.description,
        [Validators.required, Validators.minLength(16), Validators.maxLength(1024)]),
    });
  }

  update(): void {
    const editTagTypeValue = this.editTagTypeForm.value;
    this.tagTypeService.updateTagType(this.tagType.id.toString(),
      {description: editTagTypeValue.description,
        name: editTagTypeValue.name});
  }
}
