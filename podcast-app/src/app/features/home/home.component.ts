import { Component, OnInit } from '@angular/core';
import { Podcast } from '../../core/model/podcast';
import { PodcastListService } from '../../core/service/podcast-list.service';
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

  constructor(private podcastListService: PodcastListService) { }

  ngOnInit(): void {
    this.getPodcasts();
  }

  getPodcasts(): void {
    this.podcastListService.getAllPodcasts().subscribe(
      podcasts => this.podcasts = podcasts);
  };

}
