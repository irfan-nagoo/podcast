import { Component, Input } from '@angular/core';
import { PodcastService } from '../../core/service/podcast.service';

@Component({
  selector: 'app-podcast',
  standalone: true,
  imports: [],
  templateUrl: './add-podcast.component.html',
  styleUrl: './add-podcast.component.css'
})
export class PodcastComponent {

    @Input() id!: number;

    constructor(private podcastService : PodcastService){}

}
