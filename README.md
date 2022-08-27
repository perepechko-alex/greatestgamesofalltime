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

### Running/Deploying
#### Dev
1. To generate `data/out/ggoat.db` and/or import any changes made to the CSV files, run `make run_import`
2. Run `make start_api` to start the Flask API.
3. Run `make start_server_dev` to start the application. By default, it will run on `localhost:5000`

#### Deployment
1. To generate `data/out/ggoat.db` and/or import any changes made to the CSV files, run `make run_import`
2. Run `make start_api` to start the Flask API. 
3. Run `make start_server_deploy`
4. To export to static files (without deploying), run `make export_static`
5. If deploying to AWS, you can run the `make deploy`, which will export the static files and deploy them to the specified S3 bucket
  denoted with the `GGOAT_S3` variable, while also invalidating the Cloudfront cache specified with the `CLOUDFRONT_DIST_ID` variable.

If you would like to skip Cloudfront cache invalidation, simply run the `aws s3 cp out s3://${GGOAT_S3} --recursive ` command

### Todo
- [ ] Create an API to modify the SQLite DB metadata for each game
- [ ] Update individual game tables to showcase their total, cumulative score 
      similar to how it appears on the main table
- [ ] Better and more refined search bar
- [ ] Finish adding genres for all the games on the list
- [ ] Add other lists and formulas to correspond to them, including:
  - [ ] Game of the Decade lists
  - [ ] Greatest Game on X Console/PC
  - [ ] Incorporate review scores