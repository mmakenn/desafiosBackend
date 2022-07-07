## -------------------------------------------- ##
## ----------- Running this server: ----------- ##

## Fork Mod (default):
#   CLI execute:
    node src/server.js server_mode=fork 
    node src/server.js
#   or
    npm start
    npm run start:fork

## Cluster Mod:
#   CLI execute:
    node src/server.js server_mode=cluster 
    node src/server.js
#   or
    npm start
    npm run start:cluster