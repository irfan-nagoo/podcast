import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { Podcast } from '../../core/model/podcast';
import { StaticService } from '../../core/service/static.service';
import { TagsService } from '../../core/service/tags.service';

@Component({
  selector: 'app-data-grid',
  standalone: true,
  imports: [CommonModule, InfiniteScrollModule],
  templateUrl: './data-grid.component.html',
  styleUrl: './data-grid.component.css'
})
export class DataGridComponent implements OnInit {

  @Input() podcasts!: Podcast[];

  @Output() filterChangeEvent: EventEmitter<any> = new EventEmitter();

  @Output() scrollDownEvent: EventEmitter<any> = new EventEmitter();

  categories: string[] = [];
  tags: string[] = [];
  durations: string[] = [];
  sortFields: string[] = [];
  showFilterBy: boolean = false;
  selectedSortBy: string = "Newest";

  constructor(private staticService: StaticService, private tagsService: TagsService) { }

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
    this.tagsService.getTags().subscribe(json => {
      if (json.length >= 0) {
        this.tags = json.map((e: { name: string; }) => e.name);
      }
    });
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
