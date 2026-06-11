# Express Weather API

A simple Express.js API for fetching weather information.

## Prerequisites

* Node.js 22 or higher
* npm

## Installation

Clone the repository:

```bash
git clone <repository-url>
cd <project-folder>
```

Install dependencies:

```bash
npm install
```

## Environment Variables

Create a `.env` file in the project root:

```env
PORT=3000
WEATHER_API_KEY=your_api_key
```

## Running the Application

Start the application using Node.js:

```bash
node index.js
```

The API will be available at:

```text
http://localhost:3000
```

## Example Request

### POST Weather Request

```bash
curl --location 'http://localhost:3000/api/weather' \
--header 'Content-Type: application/json' \
--data '{
  "city": "London"
}'
```
## Available Scripts

Install dependencies:

```bash
npm install
```

Run the application:

```bash
node index.js
```