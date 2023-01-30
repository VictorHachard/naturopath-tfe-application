import {Component, OnInit} from '@angular/core';
import {AbstractComponents} from '../../../commons/AbstractComponents';
import {UserSecurityService} from '../../../../service/security/UserSecurity.service';
import {CookieService} from 'ngx-cookie-service';
import {ActivatedRoute, Router} from '@angular/router';
import {ParagraphTypeService} from '../../../../service/ParagraphType.service';
import {ParapageTypeService} from '../../../../service/parapage-type.service';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-addparapagetype',
  templateUrl: './addparapagetype.component.html',
  styleUrls: ['./addparapagetype.component.css']
})
export class AddparapagetypeComponent extends AbstractComponents implements OnInit {
  addParapageTypeForm: UntypedFormGroup;

  constructor(private userSecurityService: UserSecurityService,
              private cookieService: CookieService,
              private route: ActivatedRoute,
              private router: Router,
              private parapagetypeService: ParapageTypeService) {
    super();
  }

  ngOnInit(): void {
    this.init();
  }

  init(): void{
    this.addParapageTypeForm = new UntypedFormGroup({
      name: new UntypedFormControl('Lorem ipsum dolor.', [Validators.required, Validators.minLength(6), Validators.maxLength(32)]),
      description: new UntypedFormControl('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', [Validators.required, Validators.minLength(16), Validators.maxLength(1024)]),
      alert: new UntypedFormControl(false)
    });
  }

  addParapageType(): void {
    const addPrapageTypeValue = this.addParapageTypeForm.value;

    this.parapagetypeService.addParapageType({description: addPrapageTypeValue.description,
      alert: addPrapageTypeValue.isAlert,
      name: addPrapageTypeValue.name}).subscribe(data => {
      this.router.navigate(['/editparapagetype/' + data.toString()]);
    });
  }

}
