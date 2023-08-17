all: main docker

.PHONY: main
main: 
	@echo "Building main"
	yarn

.PHONY: docker
docker:
	@echo "Building docker container for frontend component"
	docker build . -t k8s_sample_frontend