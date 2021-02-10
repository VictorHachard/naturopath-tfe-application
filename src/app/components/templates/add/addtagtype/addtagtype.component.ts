import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {TagTypeService} from '../../../../service/TagType.service';
import {AbstractComponents} from '../../../commons/AbstractComponents';

@Component({
  selector: 'app-addtagtype',
  templateUrl: './addtagtype.component.html',
  styleUrls: ['./addtagtype.component.css']
})
export class AddtagtypeComponent extends AbstractComponents implements OnInit {

  addTagTypeForm: FormGroup;

  constructor(route: ActivatedRoute,
              router: Router,
              private tagTypeService: TagTypeService) {
    super(route, router);
  }

  ngOnInit(): void {
    this.init();
  }

  init(): void{
    this.addTagTypeForm = new FormGroup({
      name: new FormControl('Lorem ipsum dolor.', [Validators.required, Validators.minLength(6), Validators.maxLength(32)]),
      description: new FormControl('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', [Validators.required, Validators.minLength(16), Validators.maxLength(1024)]),
    });
  }

  addTagType(): void {
    const addTagTypeValue = this.addTagTypeForm.value;

    this.tagTypeService.addTagType({description: addTagTypeValue.description,
      name: addTagTypeValue.name}).subscribe(data => {
      this.router.navigate(['/edittagtype/' + data.toString()]);
    });
  }
}
