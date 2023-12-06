import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Podcast } from '../../core/model/podcast';
import { PodcastListService } from '../../core/service/podcast-list.service';
import { SearchType, SortByType } from '../../shared/constants/poadcast-constants';
import { DataGridComponent } from '../../shared/data-grid/data-grid.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [DataGridComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {

  searchQuery!: string;

  podcasts: Podcast[] = [];
  filterMap: Map<string, string[]> = new Map<string, string[]>();
  pageNo: number = 0;
  pageSize: number = 5;

  constructor(private route: ActivatedRoute, private podcastListService: PodcastListService) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.pageNo = 0;
        this.searchQuery = params["searchQuery"];
        this.searchPodcasts(SearchType.NEW_SEARCH);
      });
  }

  searchPodcasts(searchType: Number): void {
    this.podcastListService.searchPodcasts(this.filterMap, this.searchQuery, SortByType.DEFAULT, this.pageNo, this.pageSize)
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
    this.pageNo = 0;
    this.podcastListService.searchPodcasts(this.filterMap, this.searchQuery, event.sortByField, this.pageNo, this.pageSize)
      .subscribe(
        podcasts => this.podcasts = podcasts);
  }

  onScrollDown(event: any) {
    this.pageNo++;
    this.searchPodcasts(SearchType.NEXT_PAGE);
  }

}
