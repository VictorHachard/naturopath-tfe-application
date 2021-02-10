import {Component, OnInit} from '@angular/core';
import {TagTypeService} from '../../../../service/TagType.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ParatagTypeService} from '../../../../service/ParatagType.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AbstractComponents} from '../../../commons/AbstractComponents';

@Component({
  selector: 'app-addparatagtype',
  templateUrl: './addparatagtype.component.html',
  styleUrls: ['./addparatagtype.component.css']
})
export class AddparatagtypeComponent extends AbstractComponents implements OnInit {
  addTagTypeForm: FormGroup;
  tagTypes: any[];

  constructor(route: ActivatedRoute,
              router: Router,
              private tagTypeService: TagTypeService,
              private paratagTypeService: ParatagTypeService) {
    super(route, router);
  }

  ngOnInit(): void {
    this.tagTypeService.getAllTagType().subscribe(data => {
      this.tagTypes = data;
      console.log(this.tagTypes);
      this.init();
    });
  }

  init(): void {
    this.addTagTypeForm = new FormGroup({
      size: new FormControl('SMALL', Validators.required),
      tagType: new FormControl(this.tagTypes[0].name, Validators.required),
      name: new FormControl('Lorem ipsum dolor.', [Validators.required, Validators.minLength(6), Validators.maxLength(32)]),
      description: new FormControl('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', [Validators.required, Validators.minLength(16), Validators.maxLength(1024)]),
    });
  }

  addParatagType(): void {
    const addTagTypeValue = this.addTagTypeForm.value;
    let tagTypeId: number;

    this.tagTypes.forEach(value => {
      if (addTagTypeValue.tagType === value.name) {
        tagTypeId = value.id;
      }
    });

    this.paratagTypeService.addParatagType({description: addTagTypeValue.description,
      size: addTagTypeValue.size,
      name: addTagTypeValue.name,
      tagTypeId: tagTypeId.toString()}).subscribe(data => {
        this.router.navigate(['/editparatagtype/' + data.toString()]);
    });
  }
}
