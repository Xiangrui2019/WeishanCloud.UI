default: deps build package

deps:
	npm install
	npm install -dev
	npm install gulp-cli

build:
	npx gulp

package:
	docker build . -t weishan-cloud-ui
