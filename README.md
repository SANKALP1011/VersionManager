# Version Analysis Backend

- Built using node.js and express.js , this is the backend repository for the version analysis.
- This backend performs authentication of the user with the Github as our choice of Identity Provider with the help of an authentication middleware using Oauth as the authentication strategy.
- Once Authnetication is done , user performs some steps i.e fetching various types of data from the github rest api.
- Once the data is fetched , we perform the analysis of the data based on various categories and send this data to the user with the help of our various analysis endpoints.
- In our frontend , there would be a dashboard that would showcase all these analysis data to the user.

# NOTE / TO ADD
- Currently , I am working on the scheduler code and process for the api which need to be added.
- It would done as soon as possible.

# Tech Stack

- ## Backend

``` javascript
   - Node.js 
   - Express.js;
```

- ## Authentication Middleware 🔐

``` javascript
   - Passport.js;

// WOULD BE USED FOR PERFROMING THE OAuth OF THE USER FOR      GITHUB IDENTITY PROVIDER.
```

- ## Database ☁︎

``` c++
   - Mongo DB
```

- ## Deployment ✅ (TO BE DONE BY THIS WEEK)

``` javascript
    - Amazon EC2 Instance
    - Heroku
```

- ## Scheduler ⏳

``` javascript
     - Node Cron
```

- ## Container 🐬

```docker
     - Docker
```

- ## Documentation
  
  ``` javascript
     - Swagger.js
  ```

# Folder Structure 🗂️

- ## App.js ( This is our main server file that contains all routes , configurations )
  
  ``` javascript
     - app.js
  ```

- ## Github Service (This folder conatains all the code for fetching the data from the github rest api)
  
  ``` javascript
     - profile.service.js 
     - repo.service.js
  ```

- ## Utils (This folder contains various utils that would be required all over our backend)
  
  ``` javascript
    - baseUrl.util.js
  ```

- ## Errors (This folder contains various custom errors that may occur while hitting our endpoints)
  
  ``` javascript
    - customApi.error.js (Main error parent class)
      
      - Auth
        - userAuth.error.js
      
      - Database
        - databaseError.error.js
      
      - Github Api
        - githubApi.error.js

      - Server
        - server.error.js

      - Repo
        - repo.error.js

      - Analysis
        - analysis.error.js
  ```

- ## Config (This folder contains the key configuration of our Github Oauth provider)
   
   ``` javascript
    - keys.config.js
   ```

- ## Model (This folder contains our database schema design)

   ``` javascript
    - Model

      - User.Model.js
      - UserPullRequest.model.js
      - UserRepo.model.js

   ```

- ## Controller (This folder contains the entire controller functions for our api)
   
   ``` javascript
    - Controller 

      - initial.controller.js
      - githubOAuth.controller.js (Authentication Setup)
      - gitHubStrategies.controller.js (Passport Startegy)
      - repo.controller.js (Fetching various data)
      - userStatisticalAnalysis.controller.js (Entire analysis)

   ```

- ## Middleware (Contains minimal middleware code)
   
   ``` javascript
    - Middleware
     
      - checkLoggedStatus.middleware.js
   ```

- ## Routes (Contains all the routes)
  
  ``` javascript
    - Routes
      
      - Initial
        - initial.router.js
      
      - Auth
        - githubAuth.router.js

      - Repository
        - repos.router.js

      - Analysis
        - profileAnalysis.router.js
    
  ```

- ## Helpers (This folder contains all the helper code i.e repetitive code etc for modularity)
  
  ``` javascript
    - Helpers
    
      - Database Helpers
        - database.helpers.js

      - Job Helpers
        - profileJob.helpers.js
  ```

- ## Schedulers (This folder contains the code for scheduled activity which would be run by node cron)

  ``` javascript
    - Scheduler
      - profile.scheduler.js
  ```

# Routes / Endpoints 
 
  - ## Authentication through Github
  
  ``` javascript
      - GithubRouter.get("/github", githubAuth);
      - GithubRouter.get("/github/callback",             githubAuthCallback);
  ```

  - ## Initial / Welcome Route

  ``` javascript
      - InitialRouter.get("/", initial);
  ```

  - ## Repository 

  ``` javascript
      - ReposRouter.get("/user/repos", getUserRepository);
      - ReposRouter.get("/user/repos/getRepoByName",  getRepositoryByName);
      - ReposRouter.get( "/user/repos/repo/getPullRequest",getRepositoryClosedPullRequest);
      - ReposRouter.get("/user/repos/repo/getRepoTopics", getRepositoryTopic);
      - ReposRouter.get("/user/repos/repo/getRepoLang", getRepositoryLanguages);
      - ReposRouter.get("/user/repos/repo/getBranches", getRepositoryBranchList);
      - ReposRouter.get("/user/repos/repo/getIssues", getRepositoryIssue);
      - ReposRouter.get("/user/repos/repo/getCommits", getRepositoryCommits);
  ```

  - ## Analysis

  ``` javascript
      - ProfileAnalysisRouter.get("/user/profileAnalysis/followerAnalysis",getFollowerCountAnalysis);
      - ProfileAnalysisRouter.get("/user/profileAnalysis/followingAnalysis",getFollowingCountAnalysis);
      - ProfileAnalysisRouter.get("/user/profileAnalysis/followerToFollowingRatio",  getFollowerToFollowingCountAnalysis);
      - ProfileAnalysisRouter.get("/user/profileAnalysis/repoCountAnalysis", getNumberOfPublicAndPrivateRepoAnalysis);
      - ProfileAnalysisRouter.get("/user/profileAnalysis/tsotalLanguageCountsAnalysi",getLanguagesUsedAnalysis);
      - ProfileAnalysisRouter.get("/user/profileAnalysis/totalTopicsCounts",getMostUsedTopicAnalysis);
      - ProfileAnalysisRouter.get("/user/profileAnalysis/totalClosedIssuesCounts",
      getTotalClosedIssueAnalysis);
      - ProfileAnalysisRouter.get("/user/profileAnalysis/totalOpenIssuesCounts",getTotalOpenIssueAnalysis);
      - ProfileAnalysisRouter.get("/user/profileAnalysis/totalLinesOfCodePushed",getNumberOfLinesOfCodePushedAnalysis);
      - ProfileAnalysisRouter.get("/user/profileAnalysis/totalStarsCounts",getTotalStarsForProfileAnalysis);
      - ProfileAnalysisRouter.get("/user/profileAnalysis/oldestNewestRepo",getNewestAndOldestRepoAnalysis);
      - ProfileAnalysisRouter.get("/user/profileAnalysis/getCompanyNameAnalysis",getOrganisationAnalysis);
      - ProfileAnalysisRouter.get("/user/profileAnalysis/getTopRepoAnalysis",getTopRepositoryAnalysis);
      - ProfileAnalysisRouter.get("/user/profileAnalysis/getRecentCommitAnalysis",getMostRecentRepositoryCommitAnalysis);
      - ProfileAnalysisRouter.get("/user/profileAnalysis/getPullRequestAnalysis",getTotalPullRequestCountAnalysis);
      - ProfileAnalysisRouter.get( "/user/profileAnalysis/getUserPushEventsAnalysis",getUserPushEventsAnalysis);
      - ProfileAnalysisRouter.get("/user/profileAnalysis/getUserPullEventsAnalysis",getUserPullEventAnalysis);
      - ProfileAnalysisRouter.get("/user/profileAnalysis/getUserWatchEventsAnalysis", getUserWatchEventAnalysis;


  ```

# Steps for docker image

 - Build the docker image on your local machiene with the help of following command 
   
   > docker build -t versionanalysis .

 - Run the docker on your local image with the help of following command
   
   >  docker run -p 3004:3004 versionanalysis 

# Steps for running the api

 - Clone the api with the following command 

   > git clone https://github.com/SANKALP1011/VersionManager.git

 - Configure your github app key in the following file
   
   ``` javascript
    - Config
       - keys.congig.js

       // Add your key here
     
       GithubKey: 
       {
       ClientId: "YOUR ID",
       ClientSecret: "YOUR CLIENT SECRET",
       CallbackUrl: "http://localhost:3004/auth/github/callback",
       },
   ```

  - Run your backend with the help of following
  
    > nodemon app.js
  
  - You can run your docker image with the help of following command

    > docker run -p 3004:3004 versionanalysis 
 