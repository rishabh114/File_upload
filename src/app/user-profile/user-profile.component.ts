import { Component, OnInit } from '@angular/core';
import { XssService } from '../xss.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  constructor(private xssService: XssService) {}

  ngOnInit(): void {
    this.xssService.processUserProfile();
  }
}