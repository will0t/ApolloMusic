# ApolloMusic

SWEN90014 Team PM

# Local development

## Subsystem-specific instructions

The different high-level components of the system (i.e. backend, frontend, and truffle) have their own `README`s with further instructions.

## Whole-system instructions

### Step 1: build

From the project root directory, run the following command to build all the containers:

`docker-compose build`

**Note**: sometimes you may need to rebuild and restart containers, e.g. when installing dependencies sometimes they won't work until you rebuild the container.

#### Option 1: start the entire application

**Definition**: run all parts of the application at the same time. This is necessary for integration and end-to-end testing.

**Command**:

`docker-compose up`

#### Option 2: start a specific part of the application

**Note**: more detail for each subsystem can be found in the associated README, e.g. `./frontend/README.md` to see detailed instructions for the frontend.

**Definition**: run a particular subunit of the application. This may be helpful during development to avoid running the all of the containers if you are only working on a single component, such as just the frontend.

**Where are the names of the available services?** You can find the name of the service in `docker-compose.yml`

**Command**:

`docker-compose run <service-name>`
