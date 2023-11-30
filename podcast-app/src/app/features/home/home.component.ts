import { Component } from '@angular/core';
import { Podcast } from '../../core/model/podcast';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  podcast: Podcast = {
    id: 100,
    title: 'Trends in software',
    description: 'The podcast about software trends',
    author: 'James Helmton',
    uri: '/audio/abc.mp3',
    category: 'Software',
    duration: '7.47',
    tags: ["Software", "Technology"],
    createDate: new Date(),
    modifiedDate: new Date()
  };
}