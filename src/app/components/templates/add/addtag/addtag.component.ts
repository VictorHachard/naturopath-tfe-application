import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TagService} from '../../../../service/Tag.service';
import {TagTypeService} from '../../../../service/TagType.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AbstractComponents} from '../../../commons/AbstractComponents';

@Component({
  selector: 'app-addtag',
  templateUrl: './addtag.component.html',
  styleUrls: ['./addtag.component.css']
})
export class AddtagComponent extends AbstractComponents implements OnInit {
  addTagForm: FormGroup;

  tagTypeList: any;

  constructor(route: ActivatedRoute,
              router: Router,
              private tagService: TagService,
              private tagTypeService: TagTypeService) {
    super(route, router);
  }

  ngOnInit(): void {
    this.tagTypeService.getAllTagType().subscribe(data => {
      this.tagTypeList = data;
      console.log(this.tagTypeList);
      this.init();
    });
  }

  init(): void {
    this.addTagForm = new FormGroup({
      tagType: new FormControl(this.tagTypeList[0].name, Validators.required),
      name: new FormControl('Lorem ipsum dolor sit amet',
        [Validators.required, Validators.minLength(2), Validators.maxLength(32)]),
      content: new FormControl('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        [Validators.required, Validators.minLength(32), Validators.maxLength(1024)]),
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

    this.tagService.addTag({tagTypeId: tagTypeId.toString(),
      content: addTagValue.content,
      name: addTagValue.name}).subscribe(data => {
      this.router.navigate(['/edittag/' + data.toString()]);
    });
  }
}
