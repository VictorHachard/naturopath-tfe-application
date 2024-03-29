import {Component, OnInit} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {TagTypeService} from '../../../../service/TagType.service';
import {AbstractComponents} from '../../../commons/AbstractComponents';
import {UserSecurityService} from '../../../../service/security/UserSecurity.service';
import {CookieService} from 'ngx-cookie-service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-edittagtype',
  templateUrl: './edittagtype.component.html',
  styleUrls: ['./edittagtype.component.css']
})
export class EdittagtypeComponent extends AbstractComponents implements OnInit {
  editTagTypeForm: UntypedFormGroup;
  private id: string;
  tagType: any;

  constructor(private userSecurityService: UserSecurityService,
              private cookieService: CookieService,
              private route: ActivatedRoute,
              private router: Router,
              private tagTypeService: TagTypeService) {
    super();
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.tagTypeService.getTagType(this.id).subscribe(data => {
      this.tagType = data;
      this.init();
    });
  }

  init(): void {
    this.editTagTypeForm = new UntypedFormGroup({
      name: new UntypedFormControl(this.tagType.name,
        [Validators.required, Validators.minLength(6), Validators.maxLength(32)]),
      description: new UntypedFormControl(this.tagType.description,
        [Validators.required, Validators.minLength(16), Validators.maxLength(1024)]),
    });
  }

  update(): void {
    const editTagTypeValue = this.editTagTypeForm.value;
    this.tagTypeService.updateTagType(this.tagType.id.toString(),
      {description: editTagTypeValue.description,
        name: editTagTypeValue.name}).subscribe(value => {
      this.ngOnInit();
    });
  }
}
