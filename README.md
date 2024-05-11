# GuestBook
Shhh! There's a kid here...
This app is a profanity filter using API provided by Gemini https://aistudio.google.com/app/prompts/new_data

## TODO
Add "your learning" into this README.md and try to make this README.md beautiful to make it representative enough
Learn networking and further workings of Docker:
- https://stackoverflow.com/questions/35548843/does-ports-on-docker-compose-yml-have-the-same-effect-as-expose-on-dockerfile
- https://stackoverflow.com/questions/35414479/containerized-node-server-inaccessible-with-server-listenport-127-0-0-1/35414537#35414537
- https://docs.docker.com/network/
- https://docs.docker.com/reference/dockerfile/#expose
- https://docs.docker.com/reference/cli/docker/network/
- https://docs.docker.com/engine/swarm/secrets/
- https://stackoverflow.com/questions/68463928/what-is-the-best-way-to-structure-two-docker-containers-that-depend-on-common-co
- https://www.youtube.com/watch?v=BTXfR76WmCw

# Code
Removed all unnecessary console.logs from server.js
Use "mongodb://127.0.0.1" instead of "localhost"
Use filter_domain = "127.0.0.1" instead of "http://127.0.0.1"
Use 2 ".env" files in both apps, one for server, and one for api. Store both of them in respective folders.
For home/.env:
```bash
MONGO_URI=[MongoDB_Atlas_Cluster_Address]
```
For profanity_filter_api/.env:
```bash
GEMINI_API_KEY=[API_KEY_FROM_AI_STUDIO_GOOGLE]
```