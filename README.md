## Greatest Games of All Time Repo
This project aims to list and determine the greatest video games of all time, based on critical reception. More detailed
information can be found on [greatestgamesofalltime.com](https://greatestgamesofalltime.com/about.html)

### Pre-requisits
- NodeJS >= 16.xx (may run on older versions, but untested)
- Python >= 3.9
- make (any recent version should do)
- If deploying to an S3 instance, ensure the following are set up:
  - aws-cli >= 2 (if deploying to AWS)
  - Ensure that the appropriate S3 credentials pointing to an S3 bucket through the 
  `CLOUDFRONT_DIST_ID` environment variable
  - The `GGOAT_S3` environment variable is set to the name of the S3 bucket, **NOT** including the `s3://` prefix
  - Ensure the S3 bucket is set up for [Static Web Hosting](https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html)
- If running a version of macOS >= 12 on Apple Silicon, run the following to properly install the NodeJS SQLite dependency
- Run `npm i --legacy-peer-deps` to install dependencies (this specific command is required due to dependency conflicts)
```zsh
npm install sqlite3 --build-from-source --sqlite=/opt/homebrew/opt/sqlite --save
```
### Running/Deploying
#### Dev
1. To import any changes made to the CSV files, run `make run_import`
2. If trying to run the dev environment, ensure that the `APP_ENV=dev`. If it is not,
run `export APP_ENV=dev` within your terminal session.
3. Run `make start_server_dev` to start the application. By default, it will run on `localhost:5000`

#### Deployment
1. Run `make run_import` to import any changes to the CSV files
2. Run `make start_server_deploy`
3. To export to static files (without deploying), run the following series of commands:
```bash
npm run clean
APP_ENV=deploy npm run build
npm run export-static
```
4. If deploying to AWS, you can run the `make deploy`, which will export the static files and deploy them to the specified S3 bucket
  denoted with the `GGOAT_S3` variable, while also invalidating the Cloudfront cache specified with the `CLOUDFRONT_DIST_ID` variable.

If you would like to skip Cloudfront cache invalidation, simply run the `aws s3 cp out s3://${GGOAT_S3} --recursive ` command

### Todo
- [ ] Create an API to modify the SQLite DB metadata for each game
- [ ] Update individual game tables to showcase their total, cumulative score 
      similar to how it appears on the main table
- [ ] Better and more refined search bar
- [ ] Add other lists and formulas to correspond to them, including:
  - [ ] Game of the Decade lists
  - [ ] Greatest Game on X Console/PC
  - [ ] Incorporate review scores