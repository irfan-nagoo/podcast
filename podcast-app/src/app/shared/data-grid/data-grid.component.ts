import { Component, Input } from '@angular/core';
import { Podcast } from '../../core/model/podcast';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-data-grid',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './data-grid.component.html',
  styleUrl: './data-grid.component.css'
})
export class DataGridComponent {

  @Input() podcasts!: Podcast[];

}
