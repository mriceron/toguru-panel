#!/usr/bin/env bash
# Description: Deploy to Amazon S3
# Requires: aws cli (https://aws.amazon.com/cli/)
# Usage: deploy-s3 [--dryrun]

__deploy_s3() {
  # settings
  local additional_args="$*"
  local build_directory="./dist"
  local s3_bucket="${S3_BUCKET}"
  local storage_class="STANDARD"

  # base sync command
  local sync_command="aws s3 sync \
                      $build_directory \
                      s3://$s3_bucket \
                      --acl public-read \
                      --storage-class $storage_class \
                      $additional_args"

  # sync html and xml files with cache expiry of 60 seconds
  printf "\n%s\n\n" \
    "uploading html and xml files with cache expiry of 60 seconds..."
  $sync_command \
  --exclude "*" \
  --include "*.html" \
  --include "*.xml" \
  --cache-control "max-age=60"

  # sync non-html and non-xml files with cache expiry of 1 year...
  printf "\n%s\n\n" \
    "uploading non-html and non-xml files with cache expiry of 1 year..."
  $sync_command \
  --exclude "*.html" \
  --exclude "*.xml" \
  --cache-control "max-age=31536000"
}

gulp dist:production

echo "${CONFIG_JSON}" > './dist/config.json'

__deploy_s3 "$@"
