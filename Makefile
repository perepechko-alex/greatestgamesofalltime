run_import:
	python3 ./lib/main.py

install_dependencies:
	npm i --legacy-peer-deps

start_server_dev:
	APP_ENV=dev node server.mjs

start_server_deploy:
	APP_ENV=deploy node server.mjs

deploy:
	npm run clean && APP_ENV=deploy npm run build && npm run export-static && aws s3 cp out s3://${GGOAT_S3} --recursive \
	&& 	aws cloudfront create-invalidation --distribution-id ${CLOUDFRONT_DIST_ID} --paths "/*" > /dev/null

clean:
	rm -rf out; rm -rf .next