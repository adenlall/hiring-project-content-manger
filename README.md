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


## Security

 Here are some of the security measures I've implemented:

### HELMET

I use Helmet.js to set various HTTP headers to help protect my app from some well-known web vulnerabilities:

- XSS Protection
- Prevention of clickjacking
- Strict Transport Security
- Content Security Policy
- And more...

Helmet helps in securing my Express apps by setting various HTTP headers.

### HTTP Rate Limiting

To prevent abuse and ensure fair usage of my API, I've implemented HTTP rate limiting. This helps to:

- Prevent brute-force attacks
- Reduce the impact of DoS attacks
- Manage API traffic

I use [name of rate limiting library, e.g., express-rate-limit] to implement this feature. The current rate limit is set to [your rate limit, e.g., 100 requests per 15 minutes] per IP address.

### Authenticated Routes

All sensitive operations and data access points in my API are protected by authentication. I use JSON Web Tokens (JWT) for stateless authentication. Here's how it works:

1. Users log in with their credentials and receive a JWT.
2. This token must be included in the Authorization header for all protected API requests.
3. The server verifies the token before processing the request.
4. If the token is invalid or expired, the request is denied.

This ensures that only authenticated and authorized users can access sensitive parts of the application.

### Best Practices

- All passwords are hashed using bcrypt before storage.
- I use HTTPS to encrypt all data in transit.
- Regular security audits are conducted to identify and address potential vulnerabilities.
- I keep all my dependencies up to date to ensure I have the latest security patches.


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