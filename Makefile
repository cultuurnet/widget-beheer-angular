.PHONY: up down bash install serve

up:
	docker-compose up -d

down:
	docker-compose down

bash:
	docker-compose exec node bash

install:
	docker-compose exec -d node npm i --force

serve:
	docker-compose exec -d node npm run start:docker
