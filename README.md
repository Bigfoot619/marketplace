# Bigfoot's Marketplace

Bigfoot's Marketplace is a full-stack web application built using TypeScript (TSX) with a **NestJS** backend and a **React** frontend. This project includes several core services, providing a range of functionalities such as user authentication, trading, and product management. The backend follows a 3-layer architecture and interacts with **MongoDB** and **AWS S3** for data storage and asset management.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [License](#license)

## Features

- **User Registration & Authentication**: Users can sign up, log in, and manage their accounts.
- **Trading & Product Management**: Buy and sell products, track trading activities.
- **AWS S3 Integration**: Store and retrieve assets in AWS S3.
- **MongoDB Integration**: Persistent data storage with MongoDB.

## Tech Stack

- **Frontend**: React, TypeScript (TSX)
- **Backend**: NestJS, TypeScript
- **Database**: MongoDB
- **Cloud Storage**: AWS S3

## Project Structure

### Backend

The backend follows a 3-layer architecture with **Controller**, **Service**, and **Repository** layers for each module. Key services include:

- **User**: Handles user data and profile management.
- **Auth**: Manages authentication and authorization.
- **Trade**: Supports trading actions like buying and selling products.
- **Products**: Handles product-related data and functionalities.

Each module directory contains:
- `schema.ts` - Defines the data model/schema for MongoDB.
- `controller.ts` - Manages request handling and routing.
- `service.ts` - Implements business logic.
- `repository.ts` - Handles database interactions.

### Frontend

The frontend is a React application that interacts with the backend to provide a seamless user experience. It includes pages and components for:

- User registration and login
- Product listing and trading
- Weather display and other interactive features

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+)
- [MongoDB](https://www.mongodb.com/)
- AWS account for S3 setup

### Installation

1. Clone the repository:
   git clone <repository_url>
   cd <project_directory>

2. Install backend dependencies:
    cd server 
    npm install

3. Install frontend dependencies:
    cd client
    npm install

## Running The Application

    npm start

    - The website is: http://localhost:5173/home

## Environment Variables

Set up the environment variables in .env file in the backend directory:
- APP_PORT
- APP_PREFIX
- MONGO_URI
- AWS_S3_REGION
- S3_BUCKET_NAME
- NODE_ENV

