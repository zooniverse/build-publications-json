# Build `publications.json`

Pull down publication data from Contentful, build a `publications.json` file for Panoptes Front End, and upload it to S3.

## Running locally

```
npm install
npm start
```

## Configuration

The app is configured using the following environment variables:

- `AWS_ACCESS_KEY`
- `AWS_SECRET_ACCESS_KEY`
- `CONTENTFUL_ACCESS_TOKEN`
- `CONTENTFUL_SPACE`
- `S3_BUCKET`
- `S3_KEY` - defaults to `publications/publications.json`
- `S3_REGION` - region of the target bucket

These can be saved in a `.env` file if running locally:

```
AWS_ACCESS_KEY=here-is-your-access-key
AWS_SECRET_ACCESS_KEY=...
```
