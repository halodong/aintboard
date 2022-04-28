# Contributing Guidelines

## Tech Stack

- NextJS
- MongoDB
- Redux Toolkit
- Chai

## Backend

For backend we are using Next Connect through NextJS API Routes

All db functions should be tested.

To test all files run `npm run test`

To test a single file run `npm run test <relative path>`

## Migrations

To create migrations you need to have migrate-mongo installed globally.

To create a migration run `migrate-mongo create <file_name>`

## SVGS

To convert svgs to React components

Use stdin / stdout, run:
`npx @svgr/cli < bronze.svg > Bronze.js`
