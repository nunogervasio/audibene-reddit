# audibene-reddit
 
 
Hello AudiBene Team 👋 <br>  
I had a lot of fun working on this challenge. Thank you for the opportunity.
 
 
# installation 
```bash
git clone https://github.com/nunogervasio/audibene-reddit.git
cd audibene-reddit
npm i
```
# running server
```bash
node app.js
```
Server will be running on [localhost](https://localhost:3000)
 
 
 
# notes
 
Considering time constraints plus 80% but 100% done, rather than 100% but 80% 👍 I had to make some executive decisions. So everything is not how I would like it to be.
 
Everything works assuming the "Happy Path", meaning all user input is valid. There is minimal error handling and validation as well as the occasional repetition of code.
 
### If I had for time I would:👨‍💻<br> 
  * Use a unique user id 
  * Add more validation to the incoming data<br>  
  * Format the payload for the newsletter more efficiently<br>
  * Add tests<br> 
  * Reduce the repetition of code (DRY)<br> 
  * The list goes on...
 
 
 
# what you asked
 
**1. creating and updating users**<br>
create user with POST request to /api/users<br>
update users with PATCH request to /api/users/:id<br>
 
```json
{"name":"Walter"}
```
**2. creating and updating a users favourite subreddits**<br>
create/update users favourite subreddits with PATCH request to /api/users/:id<br>
 
```json
{"subreddits":"math"}
```
 
**3. setting the newsletter send out time for each user (default: 8am)**<br>
update users newsletter send out time with PATCH request to /api/users/:id<br>
 
```json
{"newsletter_sendout":"12:00"}
```
 
**4. Turning on and off the newsletter send out for a specific user**<br>
update users newsletter send out time with PATCH request to /api/users/:id<br>
 
```json
{"newsletter_active": "false"}
```
 
**5. triggering the send of a newsletter to each respective users email at each users specified send out time (more on this in the section: "Our part")**<br>
making a POST request to /api/newsletter/:id will return a payload with a users subreddit data needed for a newsletter trigger<br>
 

