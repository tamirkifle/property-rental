import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Property } from 'src/app/property/property';
import { User } from '../../user/user';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  propertiesNo: Number;
  usersNo: Number;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.propertiesNo = this.route.parent.snapshot.data.properties.length;
    this.usersNo = this.route.parent.snapshot.data.users.length;
  }

}
