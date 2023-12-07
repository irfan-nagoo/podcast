import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageBroadcasterService } from '../../../core/service/message-broadcaster.service';
import { PodcastService } from '../../../core/service/podcast.service';
import { StaticService } from '../../../core/service/static.service';
import { PODCAST_ADDED_ERROR, PODCAST_ADDED_SUCCESS, PodcastActionType, ResponseStatusType } from '../../../shared/constants/poadcast-constants';

@Component({
  selector: 'app-add-podcast',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-podcast.component.html',
  styleUrl: './add-podcast.component.css'
})
export class AddPodcastComponent implements OnInit {

  audioFile: Blob = new Blob;
  addPodCastForm: FormGroup = this.formBuilder.group({
    title: '',
    description: '',
    category: '',
    author: '',
    tags: ''
  });;
  categories: string[] = [];

  constructor(private podcastService: PodcastService, private formBuilder: FormBuilder,
    private messageBroadcaster: MessageBroadcasterService, private staticService: StaticService,
    public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.getCategories();
  }

  onFileChange(event: any) {
    this.audioFile = event.target.files[0];
  }

  onSubmit(): void {
    const formData = new FormData();
    formData.append('json', JSON.stringify(this.addPodCastForm.value));
    formData.append('file', this.audioFile);
    // POST
    this.podcastService.addPodcast(formData)
      .subscribe(podcast => {
        if (podcast.title) {
          console.info(podcast);
          this.messageBroadcaster.sendMessage({
            action: PodcastActionType.CREATE,
            status: ResponseStatusType.SUCCESS,
            text: PODCAST_ADDED_SUCCESS,
            content: podcast
          });
        } else {
          console.error(podcast);
          this.messageBroadcaster.sendMessage({
            action: PodcastActionType.CREATE,
            status: ResponseStatusType.ERROR,
            text: PODCAST_ADDED_ERROR,
            content: podcast
          });
        }
      });

    this.activeModal.close();

  }

  getCategories() {
    this.staticService.getCategories()
    .subscribe(json => this.categories = json.categories);
  }

}
