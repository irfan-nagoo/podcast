import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Podcast } from '../../../core/model/podcast';
import { ConfigService } from '../../../core/service/config.service';
import { MessageBroadcasterService } from '../../../core/service/message-broadcaster.service';
import { PodcastService } from '../../../core/service/podcast.service';
import { StaticService } from '../../../core/service/static.service';
import { TagsService } from '../../../core/service/tags.service';
import { PODCAST_MODIFIED_ERROR, PODCAST_MODIFIED_SUCCESS, PodcastActionType, ResponseStatusType } from '../../../shared/constants/poadcast-constants';

@Component({
  selector: 'app-view-edit-podcast',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './view-edit-podcast.component.html',
  styleUrl: './view-edit-podcast.component.css'
})
export class ViewEditPodcastComponent implements OnInit {

  @Input() id!: number;
  podcast: Podcast = new Podcast();
  audioFile: Blob = new Blob();
  audioDuration: number = 0;
  audioBaseUri: string = '';
  addPodCastForm: FormGroup = this.formBuilder.group({});
  categories: string[] = [];
  tags: string[] = [];
  selectedTags: string[] = [];
  isViewMode: boolean = true;
  action: string = "Edit";

  constructor(private podcastService: PodcastService, private formBuilder: FormBuilder,
    private messageBroadcaster: MessageBroadcasterService, private staticService: StaticService,
    private tagsService: TagsService, private configService: ConfigService, public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.getCategories();
    this.getPodcast();
    this.audioBaseUri = this.configService.getApiBaseUrl();
  }

  getPodcast() {
    this.podcastService.getPodcast<any>(this.id).subscribe(podcast => {
      this.podcast = podcast;
      this.selectedTags = podcast.tags;
      this.addPodCastForm = this.formBuilder.group({
        title: new FormControl(this.podcast.title),
        description: new FormControl(this.podcast.description),
        category: new FormControl(this.podcast.category),
        author: new FormControl(this.podcast.author),
        duration: new FormControl(this.podcast.duration)
      });
    })
  }

  onFileChange(event: any) {
    this.audioFile = event.target.files[0];
    var url = URL.createObjectURL(this.audioFile);
    var audio = new Audio(url);
    audio.addEventListener("loadedmetadata", (e) => {
      this.addPodCastForm.value.duration = (audio.duration) / 60;
      URL.revokeObjectURL(audio.src);
    });
  }


  onSubmit(): void {
    // update fields
    this.podcast.title = this.addPodCastForm.value.title;
    this.podcast.description = this.addPodCastForm.value.description;
    this.podcast.category = this.addPodCastForm.value.category;
    this.podcast.author = this.addPodCastForm.value.author;
    this.podcast.duration = this.addPodCastForm.value.duration;
    this.podcast.tags = this.selectedTags;

    const formData = new FormData();
    formData.append('json', JSON.stringify(this.podcast));
    formData.append('file', this.audioFile);
    
    // PUT
    this.podcastService.updatePodcast<any>(this.id, formData)
      .subscribe(podcast => {
        if (podcast.title) {
          this.messageBroadcaster.sendMessage({
            action: PodcastActionType.MODIFY,
            status: ResponseStatusType.SUCCESS,
            text: PODCAST_MODIFIED_SUCCESS,
            content: podcast
          });
        } else {
          this.messageBroadcaster.sendMessage({
            status: podcast.status,
            text: PODCAST_MODIFIED_ERROR
          });
        }
      });

    this.activeModal.close();
  }

  getCategories() {
    this.staticService.getCategories()
      .subscribe(json => this.categories = json.categories);
  }

  onTagKeyup(event: any) {
    this.tagsService.searchTags(event.target.value)
      .subscribe(json => {
        if (json.length >= 0) {
          this.tags = json.map((e: { name: string; }) => e.name);
        }
      });
  }

  onTagEnter(event: any) {
    event.preventDefault();
    this.selectedTags.push(event.target.value);
    event.target.value = "";
  }

  onTagCancel(tag: any) {
    this.selectedTags = this.selectedTags.filter(e => e !== tag);
  }

  onEditMode() {
    this.isViewMode = false;
    this.action = 'Submit';
  }

}
