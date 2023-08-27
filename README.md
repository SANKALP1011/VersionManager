# Version Analysis Backend

- Built using node.js and express.js , this is the backend repository for the version analysis.
- This backend performs authentication of the user with the Github as our choice of Identity Provider with the help of an authentication middleware using Oauth as the authentication strategy.
- Once Authnetication is done , user performs some steps i.e fetching various types of data from the github rest api.
- Once the data is fetched , we perform the analysis of the data based on various categories and send this data to the user with the help of our various analysis endpoints.
- In our frontend , there would be a dashboard that would showcase all these analysis data to the user.

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

- ## Deployment ✅

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

# Steps for docker Containerisation

 - Build the docker image on your local machiene with the help of following command 
   
   > docker build -t versionanalysis .

 - Run the docker on your local image with the help of following command
   
   >  docker run -p 3004:3004 versionanalysis 
 