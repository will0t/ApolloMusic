const Demo = artifacts.require("./Demo.sol");

contract("Demo", accounts => {
  it("should have an owner", async () => {
    const demo = await Demo.deployed();

    const owner = await demo.getOwner.call();

    assert(owner !== "");
  });
});