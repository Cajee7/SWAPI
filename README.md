# SWAPI

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.2.4.

An Angular application that fetches and displays data from the Star Wars API (SWAPI). It includes caching and clean api services for films, characters and starships.

Setup Instructions:

1. Clone the SWAPI repo 
  Enter the following command in your terminal: 
    git clone https://github.com/cajee7/swapi.git
  Thereafter navigate to the folder:
    cd swapi

2. Install Dependencies
  Once opened, install the dependencies by running the following command:
    npm install 

3. Run development server
  Once all the dependencies are installed, build and run the application with the following      command:
    ng serve -o

   This should launch in the browser automatically, if not, navigate to: http://localhost:4200

5. OPTIONAL: Run in Docker
   This project does have a docker file, so if you want to containerize the app and run it        with docker, use the following commands:
     docker build -t swapi-app
     docker run -d -p 8080:80 swapi-app

   Thereafter open: http://localhost:8080

The application is live at: https://cajee7.github.io/SWAPI

Archtecture:

This frontend application is built using the modular angualr framework that seperates presentation, logic and data access layers. Components handle the user interface and interactions while the services connect to the api and cache the data. The models or interfaces define the structure of the API responses, ensuring type safety and consistency. The application makes use of local storage for shorrt term caching to minimize redundant network calls and improve performance. The app is also containerized with Docker for lightweight and scalable deployment.


Design Decisions:

Modular Angular Structure: The app is organized into components, services and models to promote seperation, reusability, and a losely coupled app.

Local Storage Caching: Implemented a 5 minute cache to prevent repetitive and redundant api calls.

Models or Interfaces: Used strong typing to ensure data consistency.

Docker Containerization: To ensure scalability and portable hosting.

Clean UI: Designed with familiar UI to give users familiar look and feel of application.

Auto Deploy: Implemented github actions to automaticall deploy the master branch when new changes have been pushed on it.


Future Improvements/Still to do:
-Rate limiting
-Pagination
-Endpoint Authentication
-Visual Appeal
