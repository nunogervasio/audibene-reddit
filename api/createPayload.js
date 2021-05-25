const fetch = require("node-fetch");

/**
 *
 * @param {string} subreddit
 * @returns {object}
 */
async function getRedditFeeds(subreddit) {
  try {
    const response = await fetch(
      `https://www.reddit.com/r/${subreddit}/top/.json?limit=3`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const res = await response.json();
    return res.data.children;
  } catch (error) {
    console.log(error.message);
  }
}

/**
 *
 * @param {object} user
 * @returns {array}
 */
async function createPayloadForNewsletter(user) {
  const userSubreddits = user.subreddits;

  let listOfSubredditData = [];

  for (let i = 0; i < userSubreddits.length; i++) {
    const redditfeed = await getRedditFeeds(userSubreddits[i]);

    for (let j = 0; j < redditfeed.length; j++) {
      const redditFeedData = await extractDataForPayoad(redditfeed[j], user);

      listOfSubredditData.push(redditFeedData);
    }
  }
  return listOfSubredditData;
}

/**
 *
 * @param {array} redditfeed
 * @param {object} user
 * @returns {object}
 */
async function extractDataForPayoad(redditfeed, user) {
  const payloadDataObject = {};
  payloadDataObject.subreddit = redditfeed.data.subreddit;
  payloadDataObject.headline = redditfeed.data.title;
  payloadDataObject.score = redditfeed.data.score;
  payloadDataObject.url_path = `https://www.reddit.com/r/${redditfeed.data.subreddit}`;
  payloadDataObject.user_name = user.name;
  payloadDataObject.newsletter_sendout = user.newsletter_sendout;
  payloadDataObject.newsletter_active = user.newsletter_active;

  return payloadDataObject;
}

module.exports = { createPayloadForNewsletter };
