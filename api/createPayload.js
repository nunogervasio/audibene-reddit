const fetch = require("node-fetch");

/**
 *
 * @param {number} id  - id of user to find
 * @param {array} users - list of all users
 * @returns {array} - list of users selected subreddits
 */
function getUserSubreddits(id, users) {
  const user = users.find((user) => user.id === id);
  // TODO: ERROR HANDLE FOR USER NOT FOUND
  const userSubreddits = user.subreddits;
  return userSubreddits;
}

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

async function createPayloadForNewsletter(id, users) {
  const userSubreddits = getUserSubreddits(id, users);

  let listOfSubredditData = [];

  for (let i = 0; i < userSubreddits.length; i++) {
    const redditfeed = await getRedditFeeds(userSubreddits[i]);
    
    for (let j = 0; j < redditfeed.length; j++) {
        const redditFeedData = await extractDataForPayoad(redditfeed[j])
        listOfSubredditData.push(redditFeedData);
    }
    // return redditfeed
  }
    return listOfSubredditData;
}

/**
 * 
 * @param {array} redditfeed 
 * @returns 
 */
async function extractDataForPayoad(redditfeed) {

    const payloadDataObject = {}
    payloadDataObject.subreddit = redditfeed.data.subreddit
    payloadDataObject.headline = redditfeed.data.title
    payloadDataObject.score = redditfeed.data.score
    payloadDataObject.url_path = `https://www.reddit.com/r/${redditfeed.data.subreddit}`

    return payloadDataObject
  

    // data.preview.images[0].resolutions[0]
}


// function createNewsletterHeaders(subreddit) {
//     const headersObject = {}

//     headersObject.subreddit_name = subreddit
//     headersObject.subreddit_url_path = `https://www.reddit.com/r/${subreddit}/top`
//     headersObject.data = []

    
//     return headersObject
// }

module.exports = { createPayloadForNewsletter };
