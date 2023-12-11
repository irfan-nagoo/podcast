import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddPodcastComponent } from '../../../features/podcast/add-poadcast/add-podcast.component';
import { UserActionType } from '../../../shared/constants/poadcast-constants';
import { MessageComponent } from '../../../shared/message/message.component';
import { MessageBroadcasterService } from '../../service/message-broadcaster.service';
import { PermissionService } from '../../service/permission.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule, AddPodcastComponent, MessageComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  query: string = '';
  userLevelPermissions: string[] = [];
  message: any = {
    status: "",
    text: ""
  };

  constructor(private router: Router, private permissionService: PermissionService,
    private messageBroadcaster: MessageBroadcasterService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.subscribeToUpdates();
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
        this.modalService.open(AddPodcastComponent);
        break;
      case UserActionType.APPROVE:
      //
    }
  }

  subscribeToUpdates() {
    this.messageBroadcaster.recieveMessage()
      .subscribe(
        message => this.message = message
      )
  };


}
