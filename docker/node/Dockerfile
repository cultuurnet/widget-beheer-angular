FROM ubuntu:20.04

RUN apt-get update && apt-get install -y --no-install-recommends ca-certificates curl gnupg vim libffi-dev git

RUN mkdir -p /etc/apt/keyrings

RUN curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg

RUN echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_18.x nodistro main" | tee /etc/apt/sources.list.d/nodesource.list

RUN apt-get update && apt-get install -y --no-install-recommends nodejs

RUN npm install -g @angular/cli

RUN npm i

ENTRYPOINT ["tail", "-f", "/dev/null"]
