import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Podcast } from '../../core/model/podcast';
import { StaticService } from '../../core/service/static.service';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@Component({
  selector: 'app-data-grid',
  standalone: true,
  imports: [CommonModule, InfiniteScrollModule],
  templateUrl: './data-grid.component.html',
  styleUrl: './data-grid.component.css'
})
export class DataGridComponent implements OnInit {

  @Input() podcasts!: Podcast[];

  @Output() filterChangeEvent: EventEmitter<any>;

  @Output() scrollDownEvent: EventEmitter<any>;

  categories: string[];
  tags: string[];
  durations: string[];
  sortFields: string[];
  showFilterBy: boolean;
  selectedSortBy: string;


  constructor(private staticService: StaticService) {
    this.categories = [];
    this.tags = [];
    this.durations = [];
    this.sortFields = [];
    this.showFilterBy = false;
    this.selectedSortBy = "Newest";
    // event emitters
    this.filterChangeEvent = new EventEmitter<any>();
    this.scrollDownEvent = new EventEmitter<any>();
  }

  ngOnInit(): void {
    this.getCategories();
    this.getTags();
    this.getDurations();
    this.getSortFields();
  }


  toggleShowFilterBy(event: any) {
    this.showFilterBy = !this.showFilterBy;
  }

  toggleSortBy(event: any) {
    this.selectedSortBy = event.target.text;
    this.filterChangeEvent.emit({
      sortByField: this.selectedSortBy
    });
  }


  getCategories() {
    this.staticService.getCategories().subscribe(json => this.categories = json.categories);
  }

  getTags() {
    this.staticService.getTags().subscribe(json => this.tags = json.tags);
  }

  getDurations() {
    this.staticService.getDurations().subscribe(json => this.durations = json.durations);
  }

  getSortFields() {
    this.staticService.getSortFields().subscribe(json => this.sortFields = json.sortFields);
  }

  OnfilterChange(event: any) {
    this.filterChangeEvent.emit({
      filterEvent: event,
      sortByField: this.selectedSortBy
    });
  }

  onScroll() {
    this.scrollDownEvent.emit("scrollDownEvent");
  }

}
