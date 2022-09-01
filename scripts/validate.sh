#!/bin/bash
# validates the description of discographies using validate.cjs

validateDiscog() {
  node validate.cjs $1 $2
}

# array of discographies
validateDiscog ../data/discogs.json ../schemes/discogs.schema.json

# discographies

