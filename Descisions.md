# Implementation Notes

## Design Decisions

* Used a weather API that does not require latitude and longitude coordinates. This avoids making an additional geocoding request to convert a city name into coordinates before fetching weather data.
* Used `dotenv` to store API keys and configuration values outside the source code.
* Used transformers to normalize third-party API responses into a consistent response format for frontend consumption.
* Used `express-validator` for request validation and input sanitization.

## Security

Due to time constraints, the following middleware was not configured but would be included in a production-ready implementation:

* `helmet` for common HTTP security headers.

## Application Structure

For simplicity, the application currently uses a single route in `index.js`.

In a production implementation, the structure would be organized as follows:

* Routes grouped by module and moved into dedicated route files.
* Each route would invoke a controller method.
* Controllers would handle request processing following an MVC-style architecture.
* Business logic would be separated from routing concerns.

Example:

```text
routes/
├── weather.routes.js

controllers/
├── weather.controller.js

services/
├── weather.service.js
```

## Third-Party API Integration

The weather API is currently called directly from `index.js`.

In a larger application, external API integrations would be separated into dedicated files:

```text
apis/
├── weather.api.js
├── geocoding.api.js
```

This would improve maintainability, testability, and separation of concerns.

## Error Handling

The application uses `try/catch` blocks for error handling.

In a production-ready implementation:

* Custom error classes would be introduced.
* Different error types would be handled appropriately.
* A centralized Express error-handling middleware would be used.
* Errors would be logged and monitored.

## Development Improvements

For development environments, `nodemon` would be configured to provide:

* Automatic server restarts on file changes.
* Faster development workflow.
* Improved developer experience.

Example:

```bash
npm install --save-dev nodemon
```

Run:

```bash
npx nodemon index.js
```
