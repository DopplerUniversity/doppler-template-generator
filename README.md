# Doppler Template Generator

Useful for dynamically generating Doppler templates of any size for testing and reproducing customer environments.

NOTE: Now now at least, this is only designed for use by Doppler staff for testing and debugging purposes.

## Setup

```sh
npm install
```

## Usage

Open `generate-doppler-template.js` and adjust the values as needed. This script would definitely benefit from being generic and configurable but it serves its purpose adequately well for now.

Then run the script and save the output to a `doppler-template.yaml` file:

```sh
node generate-template.js > doppler-template.yaml
```
