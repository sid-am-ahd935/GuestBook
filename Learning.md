## Environment Variables in Docker
- The environment variables declared in Dockerfile only runs/updates when the image is being build. If suppose you change the value but you used the already built image, the environment variables will not be updated.
- ON the other hand, the environment variables defined in docker-compose.yml are run/updated when the image is being run, and on the contrary, it is not updated when the image is being built.
- I noticed there is some difference in 'docker-compose up --build' & 'docker-compose build && docker-compose up'. Maybe difference in caching, or maybe the above may be responsible somehow. in any way, the former gives the previous errors a lot often than latter.
- Also there is a precedence tree, you should check it out from docker website.
  
