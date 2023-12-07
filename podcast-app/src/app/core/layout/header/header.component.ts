import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserActionType } from '../../../shared/constants/poadcast-constants';
import { PermissionService } from '../../service/permission.service';
import { AddPodcastComponent } from '../../../features/podcast/add-poadcast/add-podcast.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule, AddPodcastComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  query: string = '';
  userLevelPermissions: string[] = [];

  constructor(private router: Router, private permissionService: PermissionService, private modalService: NgbModal) { }

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
        const modalRef = this.modalService.open(AddPodcastComponent);
        modalRef.componentInstance.name = 'Add Podcast';
        break;
      case UserActionType.APPROVE:
      //
    }
  }


}
