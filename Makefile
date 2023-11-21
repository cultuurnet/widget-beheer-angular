.PHONY: up down bash

up:
	docker-compose up -d

down:
	docker-compose down

bash:
	docker-compose exec node bash

serve:
	docker-compose exec -d node npm run start:docker
