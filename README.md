# CSV File Uploader

This project consists of a CSV uploader that allows users to upload CSV files, display data in a table with pagination, and search functionality. The application is built using React for the frontend and Node.js with Express for the backend.

## Table of Contents

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [License](#license)

## Getting Started

Follow these instructions to set up and run the project on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v14 or higher)
- npm (Node package manager)

 ## Backend Setup
1. **Clone the Backend Repository**
   ```bash
   git clone <backend-repo-url>
   cd <backend-directory>
   npm install
   npm run dev
   
The backend will run on http://localhost:8080.

## Frontend Setup
2. **Clone the Frontend Repository**
   ```bash
    git clone <frontend-repo-url>
    cd <front-directory>
    npm install
    Create a .env file and add REACT_APP_BASE_URL=http://localhost:8080/api.
    npm start
The frontend will run on http://localhost:3000.

## Running the Application
After starting both the backend and frontend servers, you can access the application by navigating to http://localhost:3000 in your web browser. 
There might be some issue choosing a file and if that occurs, do drag and drop the desired file from the folder to the web application accordingly.

## API Endpoints
- **Upload CSV**
  - `POST /upload`
  - Description: Uploads a CSV file.
  
- **Fetch Data**
  - `GET /data?page=<page>&limit=<limit>`
  - Description: Retrieves paginated data from the database.

- **Search Data**
  - `GET /search?searchQuery=<query>`
  - Description: Searches for data based on the provided query.
