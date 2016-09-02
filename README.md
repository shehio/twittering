# twittering
This is a standalone service to fetch chuncks of tweets' properties, given a city, and a query, more features to be added.
Usage: 
npm start
&& 
curl -X POST -H  "Content-Type: application/json" -d '{"city": "san francisco", "query": "ellie"}' localhost:3000