import {Component, OnInit} from '@angular/core';
import {TagTypeService} from '../../../../service/TagType.service';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {ParatagTypeService} from '../../../../service/ParatagType.service';
import {AbstractComponents} from '../../../commons/AbstractComponents';
import {UserSecurityService} from '../../../../service/security/UserSecurity.service';
import {CookieService} from 'ngx-cookie-service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-addparatagtype',
  templateUrl: './addparatagtype.component.html',
  styleUrls: ['./addparatagtype.component.css']
})
export class AddparatagtypeComponent extends AbstractComponents implements OnInit {
  addTagTypeForm: UntypedFormGroup;
  tagTypes: any[];

  constructor(private userSecurityService: UserSecurityService,
              private cookieService: CookieService,
              private route: ActivatedRoute,
              private router: Router,
              private tagTypeService: TagTypeService,
              private paratagTypeService: ParatagTypeService) {
    super();
  }

  ngOnInit(): void {
    this.tagTypeService.getAllTagType().subscribe(data => {
      this.tagTypes = data;
      this.init();
    });
  }

  init(): void {
    this.addTagTypeForm = new UntypedFormGroup({
      size: new UntypedFormControl('SMALL', Validators.required),
      tagType: new UntypedFormControl(this.tagTypes[0].name, Validators.required),
      name: new UntypedFormControl('Lorem ipsum dolor.', [Validators.required, Validators.minLength(6), Validators.maxLength(32)]),
      description: new UntypedFormControl('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', [Validators.required, Validators.minLength(16), Validators.maxLength(1024)]),
      alert: new UntypedFormControl(false)
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
      alert: addTagTypeValue.isAlert,
      tagTypeId: tagTypeId.toString()}).subscribe(data => {
        this.router.navigate(['/editparatagtype/' + data.toString()]);
    });
  }
}
