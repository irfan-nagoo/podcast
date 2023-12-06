import { Component, OnInit } from '@angular/core';
import { Podcast } from '../../core/model/podcast';
import { PodcastListService } from '../../core/service/podcast-list.service';
import { SortByType } from '../../shared/constants/poadcast-constants';
import { DataGridComponent } from '../../shared/data-grid/data-grid.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DataGridComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  podcasts: Podcast[] = [];
  filterMap: Map<string, string[]> = new Map<string, string[]>();
  pageNo: number = 0;
  pageSize: number = 5;

  constructor(private podcastListService: PodcastListService) {}

  ngOnInit(): void {
    this.getAllPodcasts();
  }

  getAllPodcasts(): void {
    this.podcastListService.getAllPodcasts(this.filterMap, SortByType.DEFAULT, this.pageNo, this.pageSize)
      .subscribe(
        podcasts => this.podcasts = [...this.podcasts, ...podcasts]);
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
    this.podcastListService.getAllPodcasts(this.filterMap, event.sortByField, this.pageNo, this.pageSize)
      .subscribe(
        podcasts => this.podcasts = podcasts);
  }

  onScrollDown(event: any) {
    this.pageNo++;
    this.getAllPodcasts();
  }

}
