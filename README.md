# Hiring Test - Janah Bilal

## Features

- **Content Management**: Create, read, update, and delete content entries.
- **Content Analysis**: Automatically generate statistics and insights for each content entry.
- **Web Scraping**: Scrape content from specified web sources for comparison.
- **Content Comparison**: Compare user-generated content with scraped content to identify similarities and differences.
- **User Authentication**: Secure user accounts and content management with full jwt features.
- **API Access**: RESTful API for programmatic access to the system.

## Technology Stack

- Backend: [Node.js, Express]
- Database: [MongoDB]
- Authentication: JWT (JSON Web Tokens)
- API Documentation: OpenAPI 3.0

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

### Installation

1. Clone the repository:

        git clone https://github.com/adenlall/hiring-project-content-manger.git

2. Navigate to the project directory:

        cd hiring-project-content-manger

3. Install dependencies:

        pnpm i

4. Set up environment variables:
    - Copy `.env.example` to `.env`
    - Fill in the required environment variables

5. Start the development server:

        npm run dev

## API Documentation

The API documentation is available in OpenAPI 3.0 format. You can find the YAML file in the `__docs__` directory.