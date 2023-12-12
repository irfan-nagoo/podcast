import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageBroadcasterService } from '../../../core/service/message-broadcaster.service';
import { PodcastService } from '../../../core/service/podcast.service';
import { PODCAST_DELETE_ERROR, PODCAST_DELETE_SUCCESS, PodcastActionType, ResponseStatusType } from '../../../shared/constants/poadcast-constants';

@Component({
  selector: 'app-delete-podcast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-podcast.component.html',
  styleUrl: './delete-podcast.component.css'
})
export class DeletePodcastComponent {

  @Input() id!: number;

  constructor(private podcastService: PodcastService, private messageBroadcaster: MessageBroadcasterService, 
     public activeModal: NgbActiveModal) { }

  onSubmit(): void {
    this.podcastService.deletePodcast<any>(this.id).subscribe(result => {
      if (!result.status) {
        this.messageBroadcaster.sendMessage({
          action: PodcastActionType.DELETE,
          status: ResponseStatusType.SUCCESS,
          text: PODCAST_DELETE_SUCCESS,
          content: this.id
        });
      } else {
        this.messageBroadcaster.sendMessage({
          status: result.status,
          text: PODCAST_DELETE_ERROR
        });
      }
    })
    this.activeModal.close();
  }
}
