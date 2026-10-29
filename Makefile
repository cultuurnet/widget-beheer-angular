.PHONY: up down bash install serve worktree

up:
	docker compose up -d

down:
	docker compose down

bash:
	docker compose exec node bash

install:
	docker compose exec node yarn install

serve:
	docker compose exec node yarn start:docker

worktree:
	@test -n "$(BRANCH)" || (echo "Usage: make worktree BRANCH=<branch>" && exit 1)
	wt switch --create $(BRANCH) --no-cd
