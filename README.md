# San Diego County Dog Rescue Classifieds
Link to live app: https://sd-dog-rescue.jrb5004.now.sh/

## App Summary
A full stack app for the large community of dog lovers in the San Diego area to browse listings of adoptable dogs in their region, contact their current caretakers about adoption opportunities, and post/edit their own listings.

## API Documentation 
- API Base URL: https://nameless-sierra-59942.herokuapp.com
  - Regions Endpoints:
    - '/api/regions'
      - Accepts GET requests to return data on all regions in the database.
    - '/api/regions/:region_id'
      - Accepts GET requests to return data on a specific region.  Include the region ID as a request parameter.
  - Dogs Endpoints
    - '/api/dogs'
      - Accepts GET requests to return all dog listings in the database.
      - Accepts POST requests to submit new listings.  Name, breed, size, gender, age, regionid, story, and email are all required body parameters.
    - '/api/dogs/:dog_id
      - Accepts GET requests to return data on a specific dog listing.  Include the dog ID as a request parameter.
      - Appecpts PATCH requests to allow for updates to specific rows of data in database.  Name, breed, size, gender, age, regionid, story, and email are required body parameters.
    
    


## Technologies Used
JavaScript/React/CSS/Node.js/Express/PostreSQL  (This repository is for the server/Node.JS files associated with this project.  Please see my 'sd-dog-rescue-classifieds' repository for the front end JavaScript/React files.)

## Testing
Steps for running endpoint tests:
- Install PostgreSQL
- Create a new database from command line ('CREATE DATABASE `name`')
- Create Regions table using Migration scripts: root directory --> migrations --> 001.do.create_regions
- Create Dogs table using Migration scripts: root directory --> migrations --> 002.do.create_dogs
  - Make sure to have installed postgrator
  - 'npm run migrate' from command line
- 'npm test' from command line
