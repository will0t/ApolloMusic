# Set up: Docker

## Start the container

Before we can compile, deploy and interact with the Smart Contract we need to start the Docker container with Truffle.

**Warning**: the below command needs to be executed from the project root folder (above), which contains `docker-compose.yml`. The below commands will not work if you run them from this directory.

1. Build the images: `docker-compose build`
2. Run the containers: `docker-compose up`

## Get inside the running container

Open an interactive shell in the `WORKDIR` (see `Dockerfile`) inside of which you can interact with

`docker-compose exec truffle sh`

# Smart Contract: compile, deploy, interact and test

## Compilation

**Definition**: compiles Solidity code to bytecode, which is what the Ethereum Virtual Machine (EVM) runs.

**Command**: inside the container in `WORKDIR`

`truffle compile`

## Migration

**Definition**: deploy the compiled bytecode to the network.

**Command**: inside the container in `WORKDIR`

`truffle migrate [--network <network-name>]`

### Where are the networks specified?

The networks are listed in `truffle-config.js`. By default, Truffle will deploy to the development network for local development.

## Interacting with the live Smart Contract

**Definition**: interact with (i.e. get data from and send transactions to) the Smart Contract _after_ it has been deployed.

**Command**: inside the container in `WORKDIR`

`truffle console [--network <network-name>]`

For me detail, including available commands, visit the Truffle docs page about [interacting with the Smart Contract](https://www.trufflesuite.com/docs/truffle/getting-started/interacting-with-your-contracts).

## Test the live Smart Contract

**Definition**: run tests for the Smart Contract specified in `<project-root>/smartcontract/test`.

**Note**: this command compiles and migrates (deploys) the Smart Contract before running the tests, even if you have already deployed it.

**Command**: inside the container in `WORKDIR`

`truffle test [--network <network-name>]`

For me detail, including available commands, visit the Truffle docs page about [testing the Smart Contract](https://www.trufflesuite.com/docs/truffle/testing/testing-your-contracts).
