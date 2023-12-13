import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageBroadcasterService } from '../../../core/service/message-broadcaster.service';
import { PodcastService } from '../../../core/service/podcast.service';
import { StaticService } from '../../../core/service/static.service';
import { TagsService } from '../../../core/service/tags.service';
import { PODCAST_ADDED_ERROR, PODCAST_ADDED_SUCCESS, PodcastActionType, ResponseStatusType } from '../../../shared/constants/poadcast-constants';

@Component({
  selector: 'app-add-podcast',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-podcast.component.html',
  styleUrl: './add-podcast.component.css'
})
export class AddPodcastComponent implements OnInit {

  audioFile: Blob = new Blob();
  audioDuration: number = 0;
  addPodCastForm: FormGroup = this.formBuilder.group({
    title: '',
    description: '',
    category: '',
    author: '',
    tags: '',
    duration: ''
  });;
  categories: string[] = [];
  tags: string[] = [];
  selectedTags: string[] = [];

  constructor(private podcastService: PodcastService, private formBuilder: FormBuilder,
    private messageBroadcaster: MessageBroadcasterService, private staticService: StaticService,
    private tagsService: TagsService, public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.getCategories();
  }

  onFileChange(event: any) {
    this.audioFile = event.target.files[0];
    var url = URL.createObjectURL(this.audioFile);
    var audio = new Audio();
    audio.onloadedmetadata = (e) => {
      const min = Math.floor(audio.duration / 60);
      var extraSec = Math.floor(audio.duration % 60);
      this.addPodCastForm.value.duration = Number.parseFloat(min + "."
        + extraSec.toString().padStart(2, '0'));
      URL.revokeObjectURL(audio.src);
    };
    audio.src = url;
  }

  onSubmit(): void {
    this.addPodCastForm.value.tags = this.selectedTags;
    const formData = new FormData();
    formData.append('json', JSON.stringify(this.addPodCastForm.value));
    formData.append('file', this.audioFile);

    // POST
    this.podcastService.addPodcast<any>(formData)
      .subscribe(podcast => {
        if (podcast.title) {
          this.messageBroadcaster.sendMessage({
            action: PodcastActionType.CREATE,
            status: ResponseStatusType.SUCCESS,
            text: PODCAST_ADDED_SUCCESS,
            content: podcast
          });
        } else {
          this.messageBroadcaster.sendMessage({
            status: podcast.status,
            text: PODCAST_ADDED_ERROR
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

}
