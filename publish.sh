#!/bin/bash

# List of packages to publish
PACKAGES=(
 "scooter-bubble-menu"
 "scooter-image"
 "scooter-claim"
 "scooter-claims"
 "scooter-table-head-cell"
 "scooter-code-block"
 "scooter-shared-utils"
 "scooter-table-row"
 "scooter-core"
 "scooter-slash-commands"
 "scooter-tagore"
 "scooter-taskitem"
 "scooter-embed"
 "scooter-table"
 "scooter-tasklist"
 "scooter-fixed-menu"
 "scooter-table-cell"
 "scooter-ui"
)

# Loop through packages and publish each one
for package in "${PACKAGES[@]}"; do
 ( cd "./dist/libs/$package" && echo "Publishing $package..." && # ls -la &&
 echo "$package npm publish --access=public --scope=@factly"
 npm publish --access=public --scope=@factly #--dry-run
 ) # Change into package directory
 # List files in package directory
 # npm publish --access=public --dry-run  # Publish package to NPM
 #  cd ../.. # Change back to parent directory
done

echo "All packages published!"