import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserSecurityService} from '../../../service/security/UserSecurity.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {

  error: any;

  constructor(private route: ActivatedRoute, private userSecurityService: UserSecurityService) { }

  ngOnInit(): void {
    this.userSecurityService.resetAccount({token: this.route.snapshot.paramMap.get('token')}).subscribe(value => {
      console.log(value);
    }, error => {
      this.error = error;
      console.log(error);
    });
  }

}
