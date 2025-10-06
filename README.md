📖 Biblical Quotes Bot

A fully automated Twitter bot that posts random Bible verses on beautiful nature backgrounds — completely serverless.

🌿 How It Works

Every few hours, the bot:

Fetches a random Bible verse from a public API.

Selects a random background image from a local folder.

Generates a new image combining the verse and background.

Posts it automatically to X (Twitter) with relevant hashtags like
#Bible #BibleVerses #Faith #Christianity.

All posts are fully automated — no human input, no server to manage.

⚙️ Tech Stack

Node.js – main runtime for the bot

twitter-api-v2 – for posting media and text to Twitter

Bible API – for fetching random verses

GitHub Actions – used as a free serverless scheduler (posts 4x per day)

🧠 What I Learned

This project helped me:

Understand how APIs interact in real projects.

Learn how to use GitHub Actions as a “free cloud worker.”

Practice working with environment variables to keep tokens safe.

Explore backend automation and task scheduling with Node.js.

🕒 Posting Schedule

The bot posts 4 times per day, automatically, using GitHub Actions cron jobs:

08:00

12:00

16:00

20:00 (Bangkok time, UTC+7)

🔐 Environment Variables

To keep credentials safe, all sensitive values (like API keys) are stored in GitHub Secrets, not in the public code.

Example of required environment variables:

TWITTER_API_KEY
TWITTER_API_SECRET
TWITTER_ACCESS_TOKEN
TWITTER_ACCESS_SECRET
BEARER_TOKEN
BIBLE_API_URL


Never hard-code these values in your files.

🚀 How to Run Locally (optional)

If you want to run your own version:

Clone the repo

Run npm install

Create a .env file with your own API keys (same names as above)

Run node index.js

🙌 Credits

Bible API
 – for the verses

twitter-api-v2
 – for Twitter integration

Nature images are locally stored (no external licensing issues).

💬 Connect

Built by @ReniltoSilva

If you like this project, feel free to give it a ⭐ on GitHub!

✅ License

This project is open-source under the MIT License
.
