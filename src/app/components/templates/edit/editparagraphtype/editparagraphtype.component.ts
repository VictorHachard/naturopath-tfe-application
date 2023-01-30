import {Component, OnInit} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {ParagraphTypeService} from '../../../../service/ParagraphType.service';
import {AbstractComponents} from '../../../commons/AbstractComponents';
import {UserSecurityService} from '../../../../service/security/UserSecurity.service';
import {CookieService} from 'ngx-cookie-service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-editparagraphtype',
  templateUrl: './editparagraphtype.component.html',
  styleUrls: ['./editparagraphtype.component.css']
})
export class EditparagraphtypeComponent extends AbstractComponents implements OnInit {
  editParagraphTypeForm: UntypedFormGroup;
  private id: string;
  paragraphType: any;

  constructor(private userSecurityService: UserSecurityService,
              private cookieService: CookieService,
              private route: ActivatedRoute,
              private router: Router,
              private paragraphTypeService: ParagraphTypeService) {
    super();
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.paragraphTypeService.getParagraphType(this.id).subscribe(data => {
      this.paragraphType = data;
      this.init();
    });
  }

  init(): void {
    this.editParagraphTypeForm = new UntypedFormGroup({
      name: new UntypedFormControl(this.paragraphType.name,
        [Validators.required, Validators.minLength(6), Validators.maxLength(32)]),
      description: new UntypedFormControl(this.paragraphType.description,
        [Validators.required, Validators.minLength(16), Validators.maxLength(1024)]),
      alert: new UntypedFormControl(this.paragraphType.alert)
    });
  }

  update(): void {
    const editTagTypeValue = this.editParagraphTypeForm.value;
    this.paragraphTypeService.updateParagraphType(this.paragraphType.id.toString(),
      {description: editTagTypeValue.description,
        alert: editTagTypeValue.alert,
        name: editTagTypeValue.name}).subscribe(value => {
      this.ngOnInit();
    });
  }
}
