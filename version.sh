#!/bin/bash

# List of packages to update
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

# Loop through packages and increment version number
for package in "${PACKAGES[@]}"; do
  ( cd "./libs/$package" && echo "Updating $package..." && # ls -la &&
    npm version patch --no-git-tag-version
    ) # Change into package directory

  # List files in package directory
    # npm publish --access=public --dry-run  # Publish package to NPM
  #  cd ../.. # Change back to parent directory
done
yarn nx affected --target build --all=true

echo "All packages updated!"


#  PACKAGE_FILE="./dist/libs/$package/package.json"
#   VERSION=$(jq -r '.version' "$PACKAGE_FILE")
#   NEW_VERSION=$(npm version "$VERSION" | cut -c 2-)
#   echo "Updating $package to version $NEW_VERSION"
#   jq ".version |= \"$NEW_VERSION\"" "$PACKAGE_FILE" > temp.json && mv temp.json "$PACKAGE_FILE"