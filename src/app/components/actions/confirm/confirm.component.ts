import {Component, OnInit} from '@angular/core';
import {UserSecurityService} from '../../../service/security/UserSecurity.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

  error: any;

  constructor(private route: ActivatedRoute, private userSecurityService: UserSecurityService) { }

  ngOnInit(): void {
    this.userSecurityService.confirmAccount({token: this.route.snapshot.paramMap.get('token')}).subscribe(value => {
      console.log(value);
    }, error => {
      this.error = error;
      console.log(error);
    });
  }

}
