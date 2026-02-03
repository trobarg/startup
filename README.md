# German Noun Intuassist

[My Notes](notes.md)

One of the most common obstacles faced by English-speakers trying to learn German is developing an intuition for noun gender. Every German noun has an associated gender, and while there are some guiding patterns for learning them, there are almost as many exceptions. With German Noun Intuassist, users can rapidly practice guessing the gender of various German nouns, track their progress over time, and customize their learning until they reach the intuition they're looking for.


## 🚀 Specification Deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] Proper use of Markdown
- [x] A concise and compelling elevator pitch
- [x] Description of key features
- [x] Description of how you will use each technology
- [x] One or more rough sketches of your application. Images must be embedded in this file using Markdown image references.

### Elevator pitch

Are you trying to learn German? Maybe you've gotten your conjugations down for some irregular verbs and are getting the hang of which prepositions go with which case. You might also be working on adjective endings, and discovering that they depend on knowing the gender of the noun they modify. (You were kind of hoping you wouldn't have to worry so much about those noun genders, right?) Well, I hate to break it to you, but while there's a ton of little patterns for guessing the gender of a noun, they've all got loads of exceptions, and you're probably better off developing an intuition for it through lots of trial and error. And you know what's kind of funny? There isn't a good website out there yet for practicing this sort of thing. That's where German Noun Intuassist comes in. With Intuassist, you can rapidly practice on a vast dataset of nouns customizable to your German-speaking level, celebrate your progress, and motivate other users to keep up the good work! Pretty soon, you'll find yourself forming German sentences without having to think twice about noun genders.

### Design

![Design image](IntuassistSketch.jpeg)

Following is a sequence diagram illustrating a typical flow of user interactions with the backend through the service.

```mermaid
sequenceDiagram
    actor User
    User->>Frontend: Login
    Frontend->>Server: Send Credentials for Login Attempt
    Server->>Frontend: Validate Login Attempt
    User->>Frontend: Start Practicing
    Frontend->>Server: Request Set of Nouns
    Server->>Frontend: Return Set of Nouns
    Frontend->>User: Present Noun for a Guess
    User->>Frontend: Submit Guess for Presented Noun
    Frontend->>User: Display Correct Answer and Present Following Noun
    User->>Frontend: Quit Practice Session
    Frontend->>Server: Store Summary Statistics for User's Practice Session
    User->>Frontend: View Profile
    Frontend->>Server: Request User Statistics
    Server->>Frontend: Return User Statistics
    Frontend->>User: Present User Statistics
```

### Key features

- Users can create an account or login to an existing one with an email address and corresponding password. Users can also create a username associated with their email address for logging in. Logging out is also supported.
- While logged in or not, users can "Start Practicing." If not logged in, result history will not be tracked.
- Users can select a narrow dataset of common nouns for a beginner level, or increasingly wider datasets featuring less-common nouns for more advanced German learners.
- Link provided to open or collapse a list of patterns for guessing the gender of a noun.
- After submitting an answer for a given noun, the correct answer is displayed, and buttons are provided to advance to the next noun (which happens automatically after a short delay), or to pause before moving on.
- In their settings, logged in users can adjust preferences like how quickly the service should advance to the next noun after displaying the result of the user's input.
- Under their profile, logged in users can view statistics such as how many total nouns they've attempted and how their accuracy has changed over time.

### Technologies

I am going to use the required technologies in the following ways.

- **HTML** - Three HTML pages as follows: Home/practice page with list of patterns, sign up/login page, and a user profile and settings/progress page. Hyperlinks provided between pages as necessary.
- **CSS** - Simple but elegant design with sufficient contrast for functional buttons. Central presentation that fits to the space of the screen being used.
- **React** - Presents new nouns for user to practice on, handles opening and collapsing of patterns list and countdown to next noun. Also stores data received from and to be sent to the server. Organizes user statistics for presentation on the user's profile page.
- **Service** - Backend endpoints for the following: login, retrieving a batch of nouns from a particular dataset, submitting a batch of practice statistics to be associated with a user, and retrieving user statistics for presentation.
- **DB/Login** - Stores user information, with passwords encrypted. Also stores summary information about previous practice, such as total nouns attempted, accuracy, etc.
- **WebSocket** - Sends motivating notifications based on activity of other users, such as the following: "3 other users have practiced on 50+ nouns in the last hour!"

## 🚀 AWS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Server deployed and accessible with custom domain name** - [intuassist.click](https://intuassist.click).

## 🚀 HTML deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **HTML pages** - I wound up creating 6 HTML pages, 1 for each of the following: home, practice, login, signup, user profile, and helpful information. 
- [x] **Proper HTML element usage** - I was a little unsure where it was most appropriate to use <div> vs <section>, but I did make use of HTML elements to organize the content of my website pages.
- [x] **Links** - I included links, often embedded in buttons, everywhere I thought it made sense to do so for navigating between pages. I also included the link to this GitHub repository.
- [x] **Text** - I included some text content on the helpful information page to give users some guidance on German noun gender patterns.
- [x] **3rd party API placeholder** - I included a disclaimer for a 3rd-party API call I will make to verify the validity of email addresses provided on signup.
- [x] **Images** - I included an image of the German flag on the home page of my website.
- [x] **Login placeholder** - I created placeholders for the entry of login and signup information.
- [x] **DB data placeholder** - I included placeholders for user statistics that will be displayed on the user profile page after being retrieved from the database.
- [x] **WebSocket placeholder** - I included a placeholder for a message on the practice page that will be provided by WebSocket communication.

## 🚀 CSS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Header, footer, and main content body** - I did not complete this part of the deliverable.
- [ ] **Navigation elements** - I did not complete this part of the deliverable.
- [ ] **Responsive to window resizing** - I did not complete this part of the deliverable.
- [ ] **Application elements** - I did not complete this part of the deliverable.
- [ ] **Application text content** - I did not complete this part of the deliverable.
- [ ] **Application images** - I did not complete this part of the deliverable.

## 🚀 React part 1: Routing deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Bundled using Vite** - I did not complete this part of the deliverable.
- [ ] **Components** - I did not complete this part of the deliverable.
- [ ] **Router** - Routing between login and voting components.

## 🚀 React part 2: Reactivity

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **All functionality implemented or mocked out** - I did not complete this part of the deliverable.
- [ ] **Hooks** - I did not complete this part of the deliverable.

## 🚀 Service deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Node.js/Express HTTP service** - I did not complete this part of the deliverable.
- [ ] **Static middleware for frontend** - I did not complete this part of the deliverable.
- [ ] **Calls to third party endpoints** - I did not complete this part of the deliverable.
- [ ] **Backend service endpoints** - I did not complete this part of the deliverable.
- [ ] **Frontend calls service endpoints** - I did not complete this part of the deliverable.

## 🚀 DB/Login deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **User registration** - I did not complete this part of the deliverable.
- [ ] **User login and logout** - I did not complete this part of the deliverable.
- [ ] **Stores data in MongoDB** - I did not complete this part of the deliverable.
- [ ] **Stores credentials in MongoDB** - I did not complete this part of the deliverable.
- [ ] **Restricts functionality based on authentication** - I did not complete this part of the deliverable.

## 🚀 WebSocket deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Backend listens for WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Frontend makes WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Data sent over WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **WebSocket data displayed** - I did not complete this part of the deliverable.
- [ ] **Application is fully functional** - I did not complete this part of the deliverable.
