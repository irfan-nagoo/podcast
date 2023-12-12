import { Component, OnInit } from '@angular/core';
import { Podcast } from '../../core/model/podcast';
import { MessageBroadcasterService } from '../../core/service/message-broadcaster.service';
import { PodcastListService } from '../../core/service/podcast-list.service';
import { API_INVOCATION_ERROR, PodcastActionType, ResponseStatusType, SortByType } from '../../shared/constants/poadcast-constants';
import { DataGridComponent } from '../../shared/data-grid/data-grid.component';
import { MessageComponent } from '../../shared/message/message.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DataGridComponent, MessageComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  podcasts: Podcast[] = [];
  filterMap: Map<string, string[]> = new Map<string, string[]>();
  sortBy: SortByType = SortByType.DEFAULT;
  pageNo: number = 0;
  pageSize: number = 5;

  constructor(private podcastListService: PodcastListService, private messageBroadcaster: MessageBroadcasterService) { }

  ngOnInit(): void {
    this.subscribeToUpdates();
    this.getAllPodcasts();
  }


  getAllPodcasts(): void {
    this.podcastListService.getAllPodcasts<any>(this.filterMap, this.sortBy, this.pageNo, this.pageSize)
      .subscribe(podcasts => {
        if (podcasts.length >= 0) {
          this.podcasts = [...this.podcasts, ...podcasts];
        } else {
          this.messageBroadcaster.sendMessage({
            status: podcasts.status,
            text: API_INVOCATION_ERROR
          });
        }
      });
  };


  onFilterChange(event: any) {

    if (event.filterEvent) {
      // update filter map if filter event
      const key = event.filterEvent.target.name;
      const value = event.filterEvent.target.value;
      if (event.filterEvent.target.checked) {
        if (this.filterMap.has(key)) {
          this.filterMap.get(key)?.push(value);
        } else {
          this.filterMap.set(key, [value]);
        }
      } else {
        const newArray = this.filterMap.get(key)?.filter(element => element != value)!;
        this.filterMap.set(key, newArray);
      }
    }

    this.sortBy = event.sortByField;
    this.pageNo = 0;
    this.podcastListService.getAllPodcasts<any>(this.filterMap, this.sortBy, this.pageNo, this.pageSize)
      .subscribe(
        podcasts => {
          if (podcasts.length >= 0) {
            this.podcasts = podcasts;
          } else {
            this.messageBroadcaster.sendMessage({
              status: podcasts.status,
              text: API_INVOCATION_ERROR
            });
          }
        }
      );
  }

  onScrollDown(event: any) {
    this.pageNo++;
    this.getAllPodcasts();
  }

  subscribeToUpdates() {
    this.messageBroadcaster.recieveMessage().subscribe(message => {
      if (message.status === ResponseStatusType.SUCCESS) {
        switch (message.action) {
          case PodcastActionType.CREATE:
            this.podcasts.unshift(message.content);
            break;
          case PodcastActionType.MODIFY:
            const podcast = message.content;
            const index: number = this.podcasts.findIndex(e => e.id === podcast.id);
            if (index !== -1) {
              if (this.sortBy === SortByType.NEWEST || this.sortBy === SortByType.DEFAULT) {
                this.podcasts = this.podcasts.filter(e => e.id !== podcast.id);
                this.podcasts.unshift(podcast);
              } else {
                this.podcasts[index] = podcast;
              }
            }
            break;
          case PodcastActionType.DELETE:
            const id = message.content;
            this.podcasts = this.podcasts.filter(e => e.id !== id);
        }
      }
    });
  }

}
