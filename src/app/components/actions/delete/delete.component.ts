import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserSecurityService} from '../../../service/security/UserSecurity.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  error: any;

  constructor(private route: ActivatedRoute, private userSecurityService: UserSecurityService) { }

  ngOnInit(): void {
    this.userSecurityService.deleteAccount({token: this.route.snapshot.paramMap.get('token')}).subscribe(value => {
      console.log(value);
    }, error => {
      this.error = error;
      console.log(error);
    });
  }

}
