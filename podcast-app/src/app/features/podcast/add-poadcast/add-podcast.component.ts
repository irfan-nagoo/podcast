import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PodcastService } from '../../../core/service/podcast.service';
import { MessageComponent } from '../../../shared/message/message.component';

@Component({
  selector: 'app-podcast',
  standalone: true,
  imports: [MessageComponent, ReactiveFormsModule],
  templateUrl: './add-podcast.component.html',
  styleUrl: './add-podcast.component.css'
})
export class AddPodcastComponent implements OnInit {

  message: any = {
    level: "",
    text: ""
  };

  audioFile: Blob
  addPodCastForm: any;

  constructor(private router: Router, private podcastService: PodcastService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.addPodCastForm = this.formBuilder.group({
      title: '',
      description: '',
      category: '',
      author: '',
      tags: '',
      file: ''
    });
  }

  onFileChange(event: any) {
    this.audioFile = event.target.files[0];
  }

  onSubmit(): void {
    const formData = new FormData();
    this.addPodCastForm.removeControl('file');
    formData.append('json', JSON.stringify(this.addPodCastForm.value));
    formData.append('file', this.audioFile);
    // POST
    this.podcastService.addPodcast(formData)
      .subscribe(error => console.log(error));

    this.router.navigate(['/']);
  }

}
