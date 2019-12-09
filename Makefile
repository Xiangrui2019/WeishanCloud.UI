default: deps build package push

deps:
	npm install
	npm install -dev

build:
	npx gulp

package:
	docker build . -t weishancloud/weishancloud-ui

push:
	docker push weishancloud/weishancloud-ui
