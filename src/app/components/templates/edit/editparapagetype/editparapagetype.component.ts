import {Component, OnInit} from '@angular/core';
import {AbstractComponents} from '../../../commons/AbstractComponents';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserSecurityService} from '../../../../service/security/UserSecurity.service';
import {CookieService} from 'ngx-cookie-service';
import {ActivatedRoute, Router} from '@angular/router';
import {ParapageTypeService} from '../../../../service/parapage-type.service';

@Component({
  selector: 'app-editparapagetype',
  templateUrl: './editparapagetype.component.html',
  styleUrls: ['./editparapagetype.component.css']
})
export class EditparapagetypeComponent extends AbstractComponents implements OnInit {
  editParapageForm: FormGroup;
  parapage;
  private id: string;

  constructor(private userSecurityService: UserSecurityService,
              private cookieService: CookieService,
              private route: ActivatedRoute,
              private router: Router,
              private parapagetypeService: ParapageTypeService) {
    super();
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.parapagetypeService.getParapageType(this.id).subscribe(data => {
      console.log(data);
      this.parapage = data;
      this.init();
    });
  }

  init(): void {
    this.editParapageForm = new FormGroup({
      name: new FormControl(this.parapage.name,
        [Validators.required, Validators.minLength(6), Validators.maxLength(32)]),
      alert: new FormControl(this.parapage.alert),
      description: new FormControl(this.parapage.description,
        [Validators.required, Validators.minLength(16), Validators.maxLength(1024)]),
    });
  }

  update(): void {
    const editParapageTypeValue = this.editParapageForm.value;

    this.parapagetypeService.updateParapageType(this.parapage.id.toString(),
      {description: editParapageTypeValue.description,
        name: editParapageTypeValue.name,
        alert: editParapageTypeValue.alert}).subscribe(value => {
      this.ngOnInit();
    });
  }

}
