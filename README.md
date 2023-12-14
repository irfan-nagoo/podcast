
# podcast

<br/>

![image](https://github.com/irfan-nagoo/podcast/assets/96521607/c5fae18f-a8f1-49ce-af49-e8c4fc593fdb)


This project implements use case for publishing and discovering the Podcasts. The podcast-app is a front application fully coded in latest [Angular](https://angular.io/) technology. This application provides features to discovery, search, listen, publish and manage podcasts. The podcast-app could also be used to publish audio content like songs, news item, reports etc. This application does support mobile devices as well (turn "desktop site" option ON for better UX). This project used [Figma](https://www.figma.com/) to design initial UI/UX wireframes. The Podcast application uses SSR (Server Side Rendering) technology for rapid startup and better performance. This project also includes mock-json-server module which provides the required REST APIs to make podcast-app fully functional. The mock-json-server is a test only server customized to support the uses cases of podcast-app.


## Features

The podcast-app offer major uses cases to publish and discovery Podcasts. Here is the list of features:

  1. **Paginated and Sorted Home page**: The home page lists all the Podcasts with latest at the top and supports infinity scroll.
  2. **Paginated Search Page**: The search page lists all the Podcasts as per the input search query and supports infinity scroll.
  3. **Sort options**: The app provides various sort options in both home and search page with infinity scroll.
  4. **Filter options**: The app also provides flexible multi select and dynamic filter options which could be used in combination together.
  5. **Create New Podcast**: A feature to create and publish Podcast (once created, the Podcast will be listed immediately at the top of home page provided sort option is "Newest").
  6. **View Modify Podcast**: This feature provides ability to listen to Podcast, view Podcast details and also to modify the Podcast (once modified, same as above).
  7. **Delete Podcast**: A feature to delete and unlist the Podcast.
  8. **Tags feature**: The podcast tags could be dynamically searched for auto complete, selected/unselected through create/modify pages. The new user defined tags could also be used however, they would not be available for filtering.
  9. **REST APIs**: The mock-json-server module provides the REST APIs for podcast-app. The PUT and POST methods are customized for media content handling and, many other static REST APIs have been added to support the application.


### Extendibility

The podcast-app could be extended to include features like user account creation, login, approval to publish the podcast (if required), sharing or rating of the podcast and many more. These features could be easily integrated in the Podcast application by either generating a new Angular component or a service.


## Technology

The podcast-app is coded with Angular 17 best practices as per the [Angular docs](https://angular.io/docs). The application uses [ng-bootstrap](https://ng-bootstrap.github.io/#/getting-started) and [Bootstrap](https://getbootstrap.com/docs/5.3/getting-started/introduction/) core for CSS. The application also uses [RxJS](https://rxjs.dev/guide/overview) for reactive programming in [TypeScript](https://www.typescriptlang.org/docs/).


## Configuration


**Tech Stack**: Angular 17, Bootstrap 5, Angular SSR, RxJS, Ngx Infinites Scroll, Ng Bootstrap, Node 20, Json Server


The podcast-app needs the backend REST API server (or mock-json-server) up and running to work. As a prerequisite, install Node 20 and for each module run **npm install** to install the required packages. The following command could be used to start the application:


  1. **mock-json-server**: Change the directory to mock-json-server and run this command to boot json-server:
     
              node --watch server.js
     
  3. **podcast-app**:
     
     - Mobile deployment:
       
         1. Change the "apiBaseUrl" in config.json with the IP address of the box on which mock-json-server is running.
         2. Run this command to start the application at the host IP address:
            
                ng serve --host 0.0.0.0

            **Note**: Turn "desktop site" option ON for better UX on mobile browser.
            
     - Local deployment: Just run this command to start the application:

               ng server

The Podcast application could be accessed @ http://localhost:4200/  
  
