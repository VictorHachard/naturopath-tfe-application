import {Component, OnInit} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {ParatagTypeService} from '../../../../service/ParatagType.service';
import {TagTypeService} from '../../../../service/TagType.service';
import {AbstractComponents} from '../../../commons/AbstractComponents';
import {UserSecurityService} from '../../../../service/security/UserSecurity.service';
import {CookieService} from 'ngx-cookie-service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-editparatagtype',
  templateUrl: './editparatagtype.component.html',
  styleUrls: ['./editparatagtype.component.css']
})
export class EditparatagtypeComponent extends AbstractComponents implements OnInit {
  editParatagTypeForm: UntypedFormGroup;
  private id: string;
  paratagType: any;
  tagTypes: any[];

  constructor(private userSecurityService: UserSecurityService,
              private cookieService: CookieService,
              private route: ActivatedRoute,
              private router: Router,
              private tagTypeService: TagTypeService,
              private paratagtypeService: ParatagTypeService) {
    super();
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.paratagtypeService.getParatagType(this.id).subscribe(data => {
      this.paratagType = data;
      this.tagTypeService.getAllTagType().subscribe(data1 => {
        this.tagTypes = data1;
        this.init();
      });
    });
  }

  init(): void {
    this.editParatagTypeForm = new UntypedFormGroup({
      size: new UntypedFormControl(this.paratagType.size, Validators.required),
      tagType: new UntypedFormControl(this.paratagType.tagType.name, Validators.required),
      name: new UntypedFormControl(this.paratagType.name,
        [Validators.required, Validators.minLength(6), Validators.maxLength(32)]),
      alert: new UntypedFormControl(this.paratagType.alert),
      description: new UntypedFormControl(this.paratagType.description,
        [Validators.required, Validators.minLength(16), Validators.maxLength(1024)]),
    });
  }

  update(): void {
    const editParatagTypeValue = this.editParatagTypeForm.value;
    let tagTypeId: number;

    this.tagTypes.forEach(value => {
      if (editParatagTypeValue.tagType === value.name) {
        tagTypeId = value.id;
      }
    });

    this.paratagtypeService.updateParatagType(this.paratagType.id.toString(),
      {description: editParatagTypeValue.description,
        size: editParatagTypeValue.size,
        name: editParatagTypeValue.name,
        alert: editParatagTypeValue.alert,
        tagTypeId: tagTypeId.toString()}).subscribe(value => {
      this.ngOnInit();
    });
  }

}
