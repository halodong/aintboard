This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Technologies need before anything else (for super newbie)

Download the following:

For Windows only.

GITBASH: https://git-scm.com/downloads

MongoDB: https://www.mongodb.com/try/download/community

NodeJS(LTS): https://nodejs.org/en/

## Adding SSH key to your Github account

First check if you have existing SSH key: https://docs.github.com/en/github/authenticating-to-github/checking-for-existing-ssh-keys

Otherwise create one here: https://docs.github.com/en/github/authenticating-to-github/adding-a-new-ssh-key-to-your-github-account

Now if you have your SSH key installed check it here: C:\Users\admin\.ssh

1. Open your SSH key with notepad and copy key to clipboard
2. Go to Github login. In the upper-right corner of any page, click your profile photo, then click Settings.
3. In the user settings sidebar, click "SSH and GPG keys".
4. Click New SSH key or Add SSH key.
5. In the "Title" field, add a descriptive label for the new key. For example, if you're using a personal Mac, you might call this key "Personal MacBook Air".
6. Paste your key into the "Key" field.
7. Click Add SSH key.
8. If prompted, confirm your GitHub password.

## Cloning

1. Create a folder or directory in your C: drive.
2. Open Gitbash and type`"cd" then your created folder or directory`
3. Go to Github search for the repository.
4. Click "CODE" then select "SSH" on the tab selection.
5. Copy the link and go back to Gitbash.
6. Type `git clone` and the link you copied from Github.

## Running with Localhost

First, run the development server in this order:

1. Open `CMD` then `cd` then repository directory.
2. Create .env file by using the command 'touch .env'.
3. Now open .env.example file using command 'open .env.example'.
4. Copy all the content of .env.example and paste it into .env file.
5. Type `mongod`.
6. Type `npm install` then `npm run dev`.

```bash
docker-compose up -d
npm run dev
npm run migrate:up
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

# Backend

For backend we are using Next Connect through NextJS API Routes

All db functions should be tested.

To test all files run `npm run test`

To test a single file run `npm run test <relative path>`

# Migrations

To create migrations you need to have migrate-mongo installed globally.

To create a migration run `migrate-mongo create <file_name>`

# SVGS

To convert svgs to React components

Use stdin / stdout, run:
`npx @svgr/cli < bronze.svg > Bronze.js`
