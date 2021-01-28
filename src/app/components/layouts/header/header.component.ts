import {Component, OnInit} from '@angular/core';
import {User} from '../../../model/view/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user: User;

  constructor() { }

  ngOnInit(): void {
    this.user = new User(1, 'test');
  }

}
