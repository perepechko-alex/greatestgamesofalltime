run_import:
	python3 ./lib/main.py

install_python_dependencies:
	python -m pip install -r requirements.txt

install_node_dependencies:
	npm i --legacy-peer-deps

start_api:
	flask --app ./lib/api/routes.py run

start_server_dev:
	APP_ENV=dev node server.mjs

start_server_deploy:
	APP_ENV=deploy node server.mjs

export_static:
	npm run clean && APP_ENV=deploy npm run build && npm run export-static

deploy:
	npm run clean && APP_ENV=deploy npm run build && npm run export-static && aws s3 cp out s3://${GGOAT_S3} --recursive \
	&& 	aws cloudfront create-invalidation --distribution-id ${CLOUDFRONT_DIST_ID} --paths "/*" > /dev/null

clean:
	rm -rf out; rm -rf .next