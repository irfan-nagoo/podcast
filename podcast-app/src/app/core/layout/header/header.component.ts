import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { PermissionService } from '../../service/permission.service';
import { CommonModule } from '@angular/common';
import { UserActionType } from '../../../shared/constants/poadcast-constants';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  query: string;
  userLevelPermissions: string[];

  constructor(private router: Router, private permissionService: PermissionService) {
    this.query = '';
    this.userLevelPermissions = [];
  }

  ngOnInit(): void {
    this.getUserLevelPermissions();
  }

  onEnter(event: any) {
    this.router.navigate(['search'],
      {
        queryParams: { searchQuery: this.query }
      });
  }

  getUserLevelPermissions() {
    this.permissionService.getUserLevelPermissions()
      .subscribe(json => this.userLevelPermissions = json.permissions);
  }

  onPermissionClick(event: any) {
    switch (event.target.id) {
      case UserActionType.CREATE:
        this.router.navigate(['create']);
        break;
      case UserActionType.APPROVE:
      //
    }
  }

}
