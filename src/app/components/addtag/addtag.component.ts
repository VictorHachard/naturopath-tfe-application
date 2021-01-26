import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CategoryService} from '../../service/category.service';
import {TagService} from '../../service/tag.service';
import {TagtypeService} from '../../service/tagtype.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-addtag',
  templateUrl: './addtag.component.html',
  styleUrls: ['./addtag.component.css']
})
export class AddtagComponent implements OnInit {
  addTagForm: FormGroup;

  tagTypeList: any;

  constructor(private router: Router, private tagService: TagService, private tagTypeService: TagtypeService) { }

  ngOnInit(): void {
    this.init();
    this.tagTypeService.getAllTagType().subscribe(data => {
      this.tagTypeList = data;
      console.log(this.tagTypeList);
    });
  }

  init(): void {
    this.addTagForm = new FormGroup({
      tagType: new FormControl('Famille', Validators.required),
      name: new FormControl('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', [Validators.required, Validators.minLength(8), Validators.maxLength(128)]),
      content: new FormControl('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', [Validators.required, Validators.minLength(64), Validators.maxLength(1024)]),
    });
  }

  addTag(): void {
    const addTagValue = this.addTagForm.value;
    let tagTypeId: number;

    this.tagTypeList.forEach(value => {
      if (addTagValue.tagType === value.name) {
        tagTypeId = value.id;
      }
    });

    console.log(tagTypeId);

    this.tagService.addTag({tagTypeId: tagTypeId.toString(),
      content: addTagValue.content,
      name: addTagValue.name,
      userId: '1'}).subscribe(data => {
      this.router.navigate(['/edittag/' + data.toString()]);
    });
  }
}
