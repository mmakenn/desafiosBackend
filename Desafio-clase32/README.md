## ----------------------- IN PRODUCTION ----------------------- ##
## ------------------- Running this server: -------------------- ##


## Fork Mod (default):
#   CLI execute:
    node src/main.js server_mode=fork 
    node src/main.js
#   or
    npm start
    npm run start:fork

## Cluster Mod:
#   CLI execute:
    node src/main.js server_mode=cluster 
#   or
    npm run start:cluster

## ----------------------- IN DEVELOPMENT----------------------- ##
## ------------------- Running this server: -------------------- ##

## Fork Mod (default):
#   CLI execute:
    npm run start:dev

## Cluster Mod:
#   CLI execute:
    npm run start:devCluster

## Testing performance with Artillery @ Fork Mode:
#   1) Start server with node profiler:
    Command:
        MONGO_USER=mmakenn MONGO_PASSWORD=coderhouse MONGO_DATABASE=desafioclase30 node --prof src/main.js 
#   2) Start test:
    Using 50 conections of 20 request for each one.
#   Endpoint /api/info adding a console.log() in code to show status of response. Save result @ result_info_with.txt
        Command:
            artillery quick --count 50 -n 20 http://localhost:8080/api/info > result_info_with.txt
#   Endpoint /api/info without a console.log() in code. Save result @ result_info.txt
        Command:
            artillery quick --count 50 -n 20 http://localhost:8080/api/info > result_info.txt

# -----> RESULT:
