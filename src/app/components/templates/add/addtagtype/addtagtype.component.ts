import {Component, OnInit} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {TagTypeService} from '../../../../service/TagType.service';
import {AbstractComponents} from '../../../commons/AbstractComponents';
import {UserSecurityService} from '../../../../service/security/UserSecurity.service';
import {CookieService} from 'ngx-cookie-service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-addtagtype',
  templateUrl: './addtagtype.component.html',
  styleUrls: ['./addtagtype.component.css']
})
export class AddtagtypeComponent extends AbstractComponents implements OnInit {

  addTagTypeForm: UntypedFormGroup;

  constructor(private userSecurityService: UserSecurityService,
              private cookieService: CookieService,
              private route: ActivatedRoute,
              private router: Router,
              private tagTypeService: TagTypeService) {
    super();
  }

  ngOnInit(): void {
    this.init();
  }

  init(): void{
    this.addTagTypeForm = new UntypedFormGroup({
      name: new UntypedFormControl('Lorem ipsum dolor.', [Validators.required, Validators.minLength(6), Validators.maxLength(32)]),
      description: new UntypedFormControl('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', [Validators.required, Validators.minLength(16), Validators.maxLength(1024)]),
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
