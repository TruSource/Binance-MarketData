const Oracle = artifacts.require("Oracle");
const cbor = require("cbor");
const truffleAssert = require("truffle-assertions");

contract("Oracle (Query) - getAvgPrice", async accounts => {
  // Note: use .call() where not necessary to use a transaction
  let oracleInstance;
  let contractAddress;
  let encodedQueryParams;
  
  let options;

  // before hook is run before all tests
  before(async () => {
    oracleInstance = await Oracle.deployed();

    encodedQueryParams = cbor.encode(["symbol", "BATBTC"]);


    options = "";

    // Note: does not matter that its an account address - we just need an address to test with
    contractAddress = accounts[2];
  });

  it("Query should succeed and event should be emitted", async () => {
    const tx = await oracleInstance.getAvgPrice(
      
      encodedQueryParams,
      options,
      {
        from: contractAddress
      }
    );

    truffleAssert.eventEmitted(tx, "Log");
  });
});

contract("Oracle (Query) - getDepth", async accounts => {
  // Note: use .call() where not necessary to use a transaction
  let oracleInstance;
  let contractAddress;
  let encodedQueryParams;
  
  let options;

  // before hook is run before all tests
  before(async () => {
    oracleInstance = await Oracle.deployed();

    encodedQueryParams = cbor.encode(["limit", 5, "symbol", "BATBTC"]);


    options = "";

    // Note: does not matter that its an account address - we just need an address to test with
    contractAddress = accounts[2];
  });

  it("Query should succeed and event should be emitted", async () => {
    const tx = await oracleInstance.getDepth(
      
      encodedQueryParams,
      options,
      {
        from: contractAddress
      }
    );

    truffleAssert.eventEmitted(tx, "Log");
  });
});

contract("Oracle (Query) - getTicker24hr", async accounts => {
  // Note: use .call() where not necessary to use a transaction
  let oracleInstance;
  let contractAddress;
  let encodedQueryParams;
  
  let options;

  // before hook is run before all tests
  before(async () => {
    oracleInstance = await Oracle.deployed();

    encodedQueryParams = cbor.encode(["symbol", "BATBTC"]);


    options = "";

    // Note: does not matter that its an account address - we just need an address to test with
    contractAddress = accounts[2];
  });

  it("Query should succeed and event should be emitted", async () => {
    const tx = await oracleInstance.getTicker24hr(
      
      encodedQueryParams,
      options,
      {
        from: contractAddress
      }
    );

    truffleAssert.eventEmitted(tx, "Log");
  });
});

contract("Oracle (Query) - getBookTicker", async accounts => {
  // Note: use .call() where not necessary to use a transaction
  let oracleInstance;
  let contractAddress;
  let encodedQueryParams;
  
  let options;

  // before hook is run before all tests
  before(async () => {
    oracleInstance = await Oracle.deployed();

    encodedQueryParams = cbor.encode(["symbol", "BATBTC"]);


    options = "";

    // Note: does not matter that its an account address - we just need an address to test with
    contractAddress = accounts[2];
  });

  it("Query should succeed and event should be emitted", async () => {
    const tx = await oracleInstance.getBookTicker(
      
      encodedQueryParams,
      options,
      {
        from: contractAddress
      }
    );

    truffleAssert.eventEmitted(tx, "Log");
  });
});

contract("Oracle (Query) - getTickerPrice", async accounts => {
  // Note: use .call() where not necessary to use a transaction
  let oracleInstance;
  let contractAddress;
  let encodedQueryParams;
  
  let options;

  // before hook is run before all tests
  before(async () => {
    oracleInstance = await Oracle.deployed();

    encodedQueryParams = cbor.encode(["symbol", "BATBTC"]);


    options = "";

    // Note: does not matter that its an account address - we just need an address to test with
    contractAddress = accounts[2];
  });

  it("Query should succeed and event should be emitted", async () => {
    const tx = await oracleInstance.getTickerPrice(
      
      encodedQueryParams,
      options,
      {
        from: contractAddress
      }
    );

    truffleAssert.eventEmitted(tx, "Log");
  });
});

contract("Oracle (Query) - getTrades", async accounts => {
  // Note: use .call() where not necessary to use a transaction
  let oracleInstance;
  let contractAddress;
  let encodedQueryParams;
  
  let options;

  // before hook is run before all tests
  before(async () => {
    oracleInstance = await Oracle.deployed();

    encodedQueryParams = cbor.encode(["limit", 1, "symbol", "BATBTC"]);


    options = "";

    // Note: does not matter that its an account address - we just need an address to test with
    contractAddress = accounts[2];
  });

  it("Query should succeed and event should be emitted", async () => {
    const tx = await oracleInstance.getTrades(
      
      encodedQueryParams,
      options,
      {
        from: contractAddress
      }
    );

    truffleAssert.eventEmitted(tx, "Log");
  });
});
