dev.b:
	docker compose build

dev.u:
	"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" http://localhost:3000
	docker compose up

dev.d:
	docker compose down

dev.ub:
	docker compose up --build

prod.b:
	docker compose -f docker-compose-prod build

prod.u:
	docker compose -f docker-compose-prod up

prod.d:
	docker compose -f docker-compose-prod down

prod.ub:
	docker compose -f docker-compose-prod up --build