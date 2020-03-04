# Crash Stats Trade Calculator

This is a private application to compare NHL players based on their 2018 - 2019 season statistics. All data was taken from the NHL public api at: https://statsapi.web.nhl.com/api/v1/ .

The NHL public api is available under the following copyright:

  "copyright" : "NHL and the NHL Shield are registered trademarks of the National Hockey League. NHL and NHL team marks are the property of the NHL and its teams. © NHL 2019. All Rights Reserved."

# Info

The Overall scores of each player are related to their in game stats with different weight assigned to each stat category.

A good trade is when the two teams Total Value is within %5 of the other team.
A bad trade is when one of the teams pays more than %5 to make the trade.

# To Use

1. clone this repo
2. In the root directory of the repo run
  - npm install
  - npm run build

3. Prepare MongoDB
  - Make sure MongoDB is available locally.
  - Follow instructions provided in the mongoDB docs here:
      https://docs.mongodb.com/manual/administration/install-community/
  - Make sure the mongo service is started and running

4. Seed Database
  - In the root directory run
    - npm run create
  - Find the players.json file
  - Add a single open bracket "[" as the very first character of the file
  - Remove very last character of the file (a comma)
  - Add a single closing bracket "]" as the very last character of the file
  - In the root directory run
    - npm run seed
      (You should see the message "Database complete" on your terminal)

5. Start the local Express server
  - In the terminal run
    - npm start

6. The Application is ready to use:
  - Navigate to 'http://localhost:7000' on any browser
