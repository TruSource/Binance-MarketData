const Oracle = artifacts.require("Oracle");
const Example = artifacts.require("Example");
const cbor = require("cbor");
const truffleAssert = require("truffle-assertions");

const { decodeRawLog } = require("./utils/helpers.js");

// EACH TEST NEED TO BE GENERATED FOR EACH SOURCE
contract("Example (End to End tests)", async accounts => {
  // accounts[0] is the address that deployed the contracts (especially the oracle contract)
  let ownerAddress, otherAccountAddress;
  let serverResponse;
  let oracleInstance, exampleInstance;
  let OPERATIONS;
  let statusCode;
  let queryId;

  // before hook is run before all tests
  before(async () => {
    ownerAddress = accounts[0];
    otherAccountAddress = accounts[1];
    serverResponse = "placeholder response";

    oracleInstance = await Oracle.deployed();
    exampleInstance = await Example.deployed();

    OPERATIONS = {
      getAvgPrice: 0,
      getDepth: 1,
      getTicker24hr: 2,
      getBookTicker: 3,
      getTickerPrice: 4,
      getTrades: 5
    };

    statusCode = 200;
  });

  describe("getAvgPrice operation", () => {
    it("Query getAvgPrice should succeed", async () => {
      await truffleAssert.passes(
        exampleInstance.getAvgPrice({
          from: ownerAddress
        })
      );
    });

    it("Callback for getAvgPrice should fail if not called by address that deployed the oracle contract", async () => {
      const result = await exampleInstance.getAvgPrice();
      const decodedRawLogs = decodeRawLog(oracleInstance, "Log", result);
      queryId = decodedRawLogs.queryId;

      await truffleAssert.reverts(
        exampleInstance.trusource_callback.call(
          queryId,
          OPERATIONS.getAvgPrice,
          statusCode,
          serverResponse,
          {
            from: otherAccountAddress
          }
        ),
        "Only address that deployed the oracle can call this contract back"
      );
    });

    it("Callback for getAvgPrice should succeed if called by address that deployed the oracle contract", async () => {
      let result = await exampleInstance.getAvgPrice();

      const decodedRawLogs = decodeRawLog(oracleInstance, "Log", result);
      queryId = decodedRawLogs.queryId;

      await truffleAssert.passes(
        exampleInstance.trusource_callback(
          queryId,
          OPERATIONS.getAvgPrice,
          statusCode,
          serverResponse,
          {
            from: ownerAddress
          }
        )
      );
    });

    it("Callback for getAvgPrice should fail if query is already fulfilled", async () => {
      await truffleAssert.reverts(
        exampleInstance.trusource_callback.call(
          queryId,
          OPERATIONS.getAvgPrice,
          statusCode,
          serverResponse,
          {
            from: ownerAddress
          }
        ),
        "Id is not one of a remaining query (query never existed or already fulfilled)"
      );
    });

    // EVENTS
    it("(Event) Log event should be emitted when the getAvgPrice function is called", async () => {
      const exampleTxObj = await exampleInstance.getAvgPrice();
      // Example.sol makes a contract call to Oracle.sol where the event is emitted, oracle tx result needed
      const oracleTxObj = await truffleAssert.createTransactionResult(oracleInstance, exampleTxObj.tx);

      // check if Log event is emitted by Oracle.sol
      truffleAssert.eventEmitted(oracleTxObj, "Log");
    });

    it("(Event) Result event should be emitted when getAvgPrice callback function is called", async () => {
      let result = await exampleInstance.getAvgPrice();

      const decodedRawLogs = decodeRawLog(oracleInstance, "Log", result);
      queryId = decodedRawLogs.queryId;

      const tx = await exampleInstance.trusource_callback(
        queryId,
        OPERATIONS.getAvgPrice,
        statusCode,
        serverResponse,
        {
          from: ownerAddress
        }
      );

      truffleAssert.eventEmitted(tx, "LogResult");
    });

    it("(Event) Event queryParams should be generated correctly for getAvgPrice function", async () => {
      let result = await exampleInstance.getAvgPrice();

      const decodedRawLogs = decodeRawLog(oracleInstance, "Log", result);
      const encodedBuf = Buffer.from(
        decodedRawLogs.queryParams.slice(2),
        "hex"
      );

      const queryParams = await cbor.decodeAll(encodedBuf);
      assert.deepEqual(
        queryParams,
        ["symbol", "BATBTC"],
        "Event not emitted or incorrect queryParams"
      );
    });

  });

  describe("getDepth operation", () => {
    it("Query getDepth should succeed", async () => {
      await truffleAssert.passes(
        exampleInstance.getDepth({
          from: ownerAddress
        })
      );
    });

    it("Callback for getDepth should fail if not called by address that deployed the oracle contract", async () => {
      const result = await exampleInstance.getDepth();
      const decodedRawLogs = decodeRawLog(oracleInstance, "Log", result);
      queryId = decodedRawLogs.queryId;

      await truffleAssert.reverts(
        exampleInstance.trusource_callback.call(
          queryId,
          OPERATIONS.getDepth,
          statusCode,
          serverResponse,
          {
            from: otherAccountAddress
          }
        ),
        "Only address that deployed the oracle can call this contract back"
      );
    });

    it("Callback for getDepth should succeed if called by address that deployed the oracle contract", async () => {
      let result = await exampleInstance.getDepth();

      const decodedRawLogs = decodeRawLog(oracleInstance, "Log", result);
      queryId = decodedRawLogs.queryId;

      await truffleAssert.passes(
        exampleInstance.trusource_callback(
          queryId,
          OPERATIONS.getDepth,
          statusCode,
          serverResponse,
          {
            from: ownerAddress
          }
        )
      );
    });

    it("Callback for getDepth should fail if query is already fulfilled", async () => {
      await truffleAssert.reverts(
        exampleInstance.trusource_callback.call(
          queryId,
          OPERATIONS.getDepth,
          statusCode,
          serverResponse,
          {
            from: ownerAddress
          }
        ),
        "Id is not one of a remaining query (query never existed or already fulfilled)"
      );
    });

    // EVENTS
    it("(Event) Log event should be emitted when the getDepth function is called", async () => {
      const exampleTxObj = await exampleInstance.getDepth();
      // Example.sol makes a contract call to Oracle.sol where the event is emitted, oracle tx result needed
      const oracleTxObj = await truffleAssert.createTransactionResult(oracleInstance, exampleTxObj.tx);

      // check if Log event is emitted by Oracle.sol
      truffleAssert.eventEmitted(oracleTxObj, "Log");
    });

    it("(Event) Result event should be emitted when getDepth callback function is called", async () => {
      let result = await exampleInstance.getDepth();

      const decodedRawLogs = decodeRawLog(oracleInstance, "Log", result);
      queryId = decodedRawLogs.queryId;

      const tx = await exampleInstance.trusource_callback(
        queryId,
        OPERATIONS.getDepth,
        statusCode,
        serverResponse,
        {
          from: ownerAddress
        }
      );

      truffleAssert.eventEmitted(tx, "LogResult");
    });

    it("(Event) Event queryParams should be generated correctly for getDepth function", async () => {
      let result = await exampleInstance.getDepth();

      const decodedRawLogs = decodeRawLog(oracleInstance, "Log", result);
      const encodedBuf = Buffer.from(
        decodedRawLogs.queryParams.slice(2),
        "hex"
      );

      const queryParams = await cbor.decodeAll(encodedBuf);
      assert.deepEqual(
        queryParams,
        ["limit", 5, "symbol", "BATBTC"],
        "Event not emitted or incorrect queryParams"
      );
    });

  });

  describe("getTicker24hr operation", () => {
    it("Query getTicker24hr should succeed", async () => {
      await truffleAssert.passes(
        exampleInstance.getTicker24hr({
          from: ownerAddress
        })
      );
    });

    it("Callback for getTicker24hr should fail if not called by address that deployed the oracle contract", async () => {
      const result = await exampleInstance.getTicker24hr();
      const decodedRawLogs = decodeRawLog(oracleInstance, "Log", result);
      queryId = decodedRawLogs.queryId;

      await truffleAssert.reverts(
        exampleInstance.trusource_callback.call(
          queryId,
          OPERATIONS.getTicker24hr,
          statusCode,
          serverResponse,
          {
            from: otherAccountAddress
          }
        ),
        "Only address that deployed the oracle can call this contract back"
      );
    });

    it("Callback for getTicker24hr should succeed if called by address that deployed the oracle contract", async () => {
      let result = await exampleInstance.getTicker24hr();

      const decodedRawLogs = decodeRawLog(oracleInstance, "Log", result);
      queryId = decodedRawLogs.queryId;

      await truffleAssert.passes(
        exampleInstance.trusource_callback(
          queryId,
          OPERATIONS.getTicker24hr,
          statusCode,
          serverResponse,
          {
            from: ownerAddress
          }
        )
      );
    });

    it("Callback for getTicker24hr should fail if query is already fulfilled", async () => {
      await truffleAssert.reverts(
        exampleInstance.trusource_callback.call(
          queryId,
          OPERATIONS.getTicker24hr,
          statusCode,
          serverResponse,
          {
            from: ownerAddress
          }
        ),
        "Id is not one of a remaining query (query never existed or already fulfilled)"
      );
    });

    // EVENTS
    it("(Event) Log event should be emitted when the getTicker24hr function is called", async () => {
      const exampleTxObj = await exampleInstance.getTicker24hr();
      // Example.sol makes a contract call to Oracle.sol where the event is emitted, oracle tx result needed
      const oracleTxObj = await truffleAssert.createTransactionResult(oracleInstance, exampleTxObj.tx);

      // check if Log event is emitted by Oracle.sol
      truffleAssert.eventEmitted(oracleTxObj, "Log");
    });

    it("(Event) Result event should be emitted when getTicker24hr callback function is called", async () => {
      let result = await exampleInstance.getTicker24hr();

      const decodedRawLogs = decodeRawLog(oracleInstance, "Log", result);
      queryId = decodedRawLogs.queryId;

      const tx = await exampleInstance.trusource_callback(
        queryId,
        OPERATIONS.getTicker24hr,
        statusCode,
        serverResponse,
        {
          from: ownerAddress
        }
      );

      truffleAssert.eventEmitted(tx, "LogResult");
    });

    it("(Event) Event queryParams should be generated correctly for getTicker24hr function", async () => {
      let result = await exampleInstance.getTicker24hr();

      const decodedRawLogs = decodeRawLog(oracleInstance, "Log", result);
      const encodedBuf = Buffer.from(
        decodedRawLogs.queryParams.slice(2),
        "hex"
      );

      const queryParams = await cbor.decodeAll(encodedBuf);
      assert.deepEqual(
        queryParams,
        ["symbol", "BATBTC"],
        "Event not emitted or incorrect queryParams"
      );
    });

  });

  describe("getBookTicker operation", () => {
    it("Query getBookTicker should succeed", async () => {
      await truffleAssert.passes(
        exampleInstance.getBookTicker({
          from: ownerAddress
        })
      );
    });

    it("Callback for getBookTicker should fail if not called by address that deployed the oracle contract", async () => {
      const result = await exampleInstance.getBookTicker();
      const decodedRawLogs = decodeRawLog(oracleInstance, "Log", result);
      queryId = decodedRawLogs.queryId;

      await truffleAssert.reverts(
        exampleInstance.trusource_callback.call(
          queryId,
          OPERATIONS.getBookTicker,
          statusCode,
          serverResponse,
          {
            from: otherAccountAddress
          }
        ),
        "Only address that deployed the oracle can call this contract back"
      );
    });

    it("Callback for getBookTicker should succeed if called by address that deployed the oracle contract", async () => {
      let result = await exampleInstance.getBookTicker();

      const decodedRawLogs = decodeRawLog(oracleInstance, "Log", result);
      queryId = decodedRawLogs.queryId;

      await truffleAssert.passes(
        exampleInstance.trusource_callback(
          queryId,
          OPERATIONS.getBookTicker,
          statusCode,
          serverResponse,
          {
            from: ownerAddress
          }
        )
      );
    });

    it("Callback for getBookTicker should fail if query is already fulfilled", async () => {
      await truffleAssert.reverts(
        exampleInstance.trusource_callback.call(
          queryId,
          OPERATIONS.getBookTicker,
          statusCode,
          serverResponse,
          {
            from: ownerAddress
          }
        ),
        "Id is not one of a remaining query (query never existed or already fulfilled)"
      );
    });

    // EVENTS
    it("(Event) Log event should be emitted when the getBookTicker function is called", async () => {
      const exampleTxObj = await exampleInstance.getBookTicker();
      // Example.sol makes a contract call to Oracle.sol where the event is emitted, oracle tx result needed
      const oracleTxObj = await truffleAssert.createTransactionResult(oracleInstance, exampleTxObj.tx);

      // check if Log event is emitted by Oracle.sol
      truffleAssert.eventEmitted(oracleTxObj, "Log");
    });

    it("(Event) Result event should be emitted when getBookTicker callback function is called", async () => {
      let result = await exampleInstance.getBookTicker();

      const decodedRawLogs = decodeRawLog(oracleInstance, "Log", result);
      queryId = decodedRawLogs.queryId;

      const tx = await exampleInstance.trusource_callback(
        queryId,
        OPERATIONS.getBookTicker,
        statusCode,
        serverResponse,
        {
          from: ownerAddress
        }
      );

      truffleAssert.eventEmitted(tx, "LogResult");
    });

    it("(Event) Event queryParams should be generated correctly for getBookTicker function", async () => {
      let result = await exampleInstance.getBookTicker();

      const decodedRawLogs = decodeRawLog(oracleInstance, "Log", result);
      const encodedBuf = Buffer.from(
        decodedRawLogs.queryParams.slice(2),
        "hex"
      );

      const queryParams = await cbor.decodeAll(encodedBuf);
      assert.deepEqual(
        queryParams,
        ["symbol", "BATBTC"],
        "Event not emitted or incorrect queryParams"
      );
    });

  });

  describe("getTickerPrice operation", () => {
    it("Query getTickerPrice should succeed", async () => {
      await truffleAssert.passes(
        exampleInstance.getTickerPrice({
          from: ownerAddress
        })
      );
    });

    it("Callback for getTickerPrice should fail if not called by address that deployed the oracle contract", async () => {
      const result = await exampleInstance.getTickerPrice();
      const decodedRawLogs = decodeRawLog(oracleInstance, "Log", result);
      queryId = decodedRawLogs.queryId;

      await truffleAssert.reverts(
        exampleInstance.trusource_callback.call(
          queryId,
          OPERATIONS.getTickerPrice,
          statusCode,
          serverResponse,
          {
            from: otherAccountAddress
          }
        ),
        "Only address that deployed the oracle can call this contract back"
      );
    });

    it("Callback for getTickerPrice should succeed if called by address that deployed the oracle contract", async () => {
      let result = await exampleInstance.getTickerPrice();

      const decodedRawLogs = decodeRawLog(oracleInstance, "Log", result);
      queryId = decodedRawLogs.queryId;

      await truffleAssert.passes(
        exampleInstance.trusource_callback(
          queryId,
          OPERATIONS.getTickerPrice,
          statusCode,
          serverResponse,
          {
            from: ownerAddress
          }
        )
      );
    });

    it("Callback for getTickerPrice should fail if query is already fulfilled", async () => {
      await truffleAssert.reverts(
        exampleInstance.trusource_callback.call(
          queryId,
          OPERATIONS.getTickerPrice,
          statusCode,
          serverResponse,
          {
            from: ownerAddress
          }
        ),
        "Id is not one of a remaining query (query never existed or already fulfilled)"
      );
    });

    // EVENTS
    it("(Event) Log event should be emitted when the getTickerPrice function is called", async () => {
      const exampleTxObj = await exampleInstance.getTickerPrice();
      // Example.sol makes a contract call to Oracle.sol where the event is emitted, oracle tx result needed
      const oracleTxObj = await truffleAssert.createTransactionResult(oracleInstance, exampleTxObj.tx);

      // check if Log event is emitted by Oracle.sol
      truffleAssert.eventEmitted(oracleTxObj, "Log");
    });

    it("(Event) Result event should be emitted when getTickerPrice callback function is called", async () => {
      let result = await exampleInstance.getTickerPrice();

      const decodedRawLogs = decodeRawLog(oracleInstance, "Log", result);
      queryId = decodedRawLogs.queryId;

      const tx = await exampleInstance.trusource_callback(
        queryId,
        OPERATIONS.getTickerPrice,
        statusCode,
        serverResponse,
        {
          from: ownerAddress
        }
      );

      truffleAssert.eventEmitted(tx, "LogResult");
    });

    it("(Event) Event queryParams should be generated correctly for getTickerPrice function", async () => {
      let result = await exampleInstance.getTickerPrice();

      const decodedRawLogs = decodeRawLog(oracleInstance, "Log", result);
      const encodedBuf = Buffer.from(
        decodedRawLogs.queryParams.slice(2),
        "hex"
      );

      const queryParams = await cbor.decodeAll(encodedBuf);
      assert.deepEqual(
        queryParams,
        ["symbol", "BATBTC"],
        "Event not emitted or incorrect queryParams"
      );
    });

  });

  describe("getTrades operation", () => {
    it("Query getTrades should succeed", async () => {
      await truffleAssert.passes(
        exampleInstance.getTrades({
          from: ownerAddress
        })
      );
    });

    it("Callback for getTrades should fail if not called by address that deployed the oracle contract", async () => {
      const result = await exampleInstance.getTrades();
      const decodedRawLogs = decodeRawLog(oracleInstance, "Log", result);
      queryId = decodedRawLogs.queryId;

      await truffleAssert.reverts(
        exampleInstance.trusource_callback.call(
          queryId,
          OPERATIONS.getTrades,
          statusCode,
          serverResponse,
          {
            from: otherAccountAddress
          }
        ),
        "Only address that deployed the oracle can call this contract back"
      );
    });

    it("Callback for getTrades should succeed if called by address that deployed the oracle contract", async () => {
      let result = await exampleInstance.getTrades();

      const decodedRawLogs = decodeRawLog(oracleInstance, "Log", result);
      queryId = decodedRawLogs.queryId;

      await truffleAssert.passes(
        exampleInstance.trusource_callback(
          queryId,
          OPERATIONS.getTrades,
          statusCode,
          serverResponse,
          {
            from: ownerAddress
          }
        )
      );
    });

    it("Callback for getTrades should fail if query is already fulfilled", async () => {
      await truffleAssert.reverts(
        exampleInstance.trusource_callback.call(
          queryId,
          OPERATIONS.getTrades,
          statusCode,
          serverResponse,
          {
            from: ownerAddress
          }
        ),
        "Id is not one of a remaining query (query never existed or already fulfilled)"
      );
    });

    // EVENTS
    it("(Event) Log event should be emitted when the getTrades function is called", async () => {
      const exampleTxObj = await exampleInstance.getTrades();
      // Example.sol makes a contract call to Oracle.sol where the event is emitted, oracle tx result needed
      const oracleTxObj = await truffleAssert.createTransactionResult(oracleInstance, exampleTxObj.tx);

      // check if Log event is emitted by Oracle.sol
      truffleAssert.eventEmitted(oracleTxObj, "Log");
    });

    it("(Event) Result event should be emitted when getTrades callback function is called", async () => {
      let result = await exampleInstance.getTrades();

      const decodedRawLogs = decodeRawLog(oracleInstance, "Log", result);
      queryId = decodedRawLogs.queryId;

      const tx = await exampleInstance.trusource_callback(
        queryId,
        OPERATIONS.getTrades,
        statusCode,
        serverResponse,
        {
          from: ownerAddress
        }
      );

      truffleAssert.eventEmitted(tx, "LogResult");
    });

    it("(Event) Event queryParams should be generated correctly for getTrades function", async () => {
      let result = await exampleInstance.getTrades();

      const decodedRawLogs = decodeRawLog(oracleInstance, "Log", result);
      const encodedBuf = Buffer.from(
        decodedRawLogs.queryParams.slice(2),
        "hex"
      );

      const queryParams = await cbor.decodeAll(encodedBuf);
      assert.deepEqual(
        queryParams,
        ["limit", 1, "symbol", "BATBTC"],
        "Event not emitted or incorrect queryParams"
      );
    });

  });
});
