# Deploying the stack

1. Check out project and:
```bash
npm install
```

2. Deploy the lambda function that will act has the 'viewer-request' handler. This checks for UserAgent and only allows Chrome browsers to access index.html
```bash
sam deploy -t template.yml --stack-name cloudfrontEdgeLambda --resolve-s3 --capabilities=CAPABILITY_IAM
```

3. Take note of the output (function  arn and version) in the above command, and paste the arn and function version in line 103 in cloudfront.yaml. It says ADD-FUNCTION-ARN and ADD-FUNCTION-VERSION

4. Deploy cloudfront.yaml (This deploys a cloudfront distribution with an S3 origin)
```bash
sam deploy -t cloudfront.yaml --stack-name cloudfrontEdgeResources --resolve-s3 --capabilities=CAPABILITY_IAM
```

5. Add index.html and unsupported.html in the root of the S3 bucket created in step 3.

6. Go to the cloudfront distribution domain name. Only Chrome browsers should work.