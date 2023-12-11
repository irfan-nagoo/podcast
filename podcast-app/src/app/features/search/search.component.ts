import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Podcast } from '../../core/model/podcast';
import { MessageBroadcasterService } from '../../core/service/message-broadcaster.service';
import { PodcastListService } from '../../core/service/podcast-list.service';
import { SearchType, SortByType } from '../../shared/constants/poadcast-constants';
import { DataGridComponent } from '../../shared/data-grid/data-grid.component';
import { MessageComponent } from '../../shared/message/message.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [DataGridComponent, MessageComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {

  searchQuery!: string;

  podcasts: Podcast[] = [];
  filterMap: Map<string, string[]> = new Map<string, string[]>();
  sortBy: SortByType = SortByType.DEFAULT
  pageNo: number = 0;
  pageSize: number = 5;

  constructor(private route: ActivatedRoute, private podcastListService: PodcastListService,
    private messageBroadcaster: MessageBroadcasterService) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.pageNo = 0;
        this.searchQuery = params["searchQuery"];
        this.searchPodcasts(SearchType.NEW_SEARCH);
      });
  }

  searchPodcasts(searchType: Number): void {
    this.podcastListService.searchPodcasts<any>(this.filterMap, this.searchQuery, this.sortBy, this.pageNo, this.pageSize)
      .subscribe(
        podcasts => this.podcasts = (searchType === SearchType.NEXT_PAGE) ? [...this.podcasts, ...podcasts] : podcasts
      );
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
    this.podcastListService.searchPodcasts<any>(this.filterMap, this.searchQuery, this.sortBy, this.pageNo, this.pageSize)
      .subscribe(
        podcasts => this.podcasts = podcasts
      );
  }

  onScrollDown(event: any) {
    this.pageNo++;
    this.searchPodcasts(SearchType.NEXT_PAGE);
  }

}
