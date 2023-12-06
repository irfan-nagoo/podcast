import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { SearchComponent } from './features/search/search.component';
import { AddPodcastComponent } from './features/podcast/add-poadcast/add-podcast.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Home Page'
    },
    {
        path: 'search',
        component: SearchComponent,
        title: 'Search Page'
    },
    {
        path: 'create',
        component: AddPodcastComponent,
        title: 'Create Podcast Page'
    }
];
