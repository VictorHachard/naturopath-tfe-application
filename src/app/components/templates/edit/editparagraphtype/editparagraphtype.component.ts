import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
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
  editParagraphTypeForm: FormGroup;
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
    this.editParagraphTypeForm = new FormGroup({
      name: new FormControl(this.paragraphType.name,
        [Validators.required, Validators.minLength(6), Validators.maxLength(32)]),
      description: new FormControl(this.paragraphType.description,
        [Validators.required, Validators.minLength(16), Validators.maxLength(1024)]),
      alert: new FormControl(this.paragraphType.alert)
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
