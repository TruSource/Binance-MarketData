pragma solidity ^0.5.0;

import "./OracleAPI.sol";

/**
 * @title Example contract using MarketData oracle
 * @author TruSource
 * @notice Example contract using MarketData oracle
 * @dev Demonstrates usage of OracleAPI and building queryParams
 */
contract Example is OracleAPI {
    event LogResult(bytes32 queryId, Oracle.Oracle.Operations operationId, uint256 statusCode, string result);

    constructor(address resolverAddress) public OracleAPI(resolverAddress) {}

    /**
     * @notice Make getAvgPrice query
     * @dev Make getAvgPrice query, queryId is returned to be used to handle query result
     */
    function getAvgPrice() external {
        trusource_getAvgPrice("BATBTC");
    }

    /**
     * @notice Make getDepth query
     * @dev Make getDepth query, queryId is returned to be used to handle query result
     */
    function getDepth() external {
        Buffer.buffer memory optionalQueryParams = createBuffer();
    
        // Optional
        addUInt(optionalQueryParams, "limit", 5);
    
        trusource_getDepth("BATBTC", optionalQueryParams);
    }

    /**
     * @notice Make getTicker24hr query
     * @dev Make getTicker24hr query, queryId is returned to be used to handle query result
     */
    function getTicker24hr() external {
        Buffer.buffer memory optionalQueryParams = createBuffer();
    
        // Optional
        addString(optionalQueryParams, "symbol", "BATBTC");
    
        trusource_getTicker24hr(optionalQueryParams);
    }

    /**
     * @notice Make getBookTicker query
     * @dev Make getBookTicker query, queryId is returned to be used to handle query result
     */
    function getBookTicker() external {
        Buffer.buffer memory optionalQueryParams = createBuffer();
    
        // Optional
        addString(optionalQueryParams, "symbol", "BATBTC");
    
        trusource_getBookTicker(optionalQueryParams);
    }

    /**
     * @notice Make getTickerPrice query
     * @dev Make getTickerPrice query, queryId is returned to be used to handle query result
     */
    function getTickerPrice() external {
        Buffer.buffer memory optionalQueryParams = createBuffer();
    
        // Optional
        addString(optionalQueryParams, "symbol", "BATBTC");
    
        trusource_getTickerPrice(optionalQueryParams);
    }

    /**
     * @notice Make getTrades query
     * @dev Make getTrades query, queryId is returned to be used to handle query result
     */
    function getTrades() external {
        Buffer.buffer memory optionalQueryParams = createBuffer();
    
        // Optional
        addUInt(optionalQueryParams, "limit", 1);
    
        trusource_getTrades("BATBTC", optionalQueryParams);
    }

    /**
     * @dev Handle query result using queryId, operationId and statusCode
     * @param queryId unique id for query
     * @param operationId id for operation
     * @param statusCode HTTP response status code
     * @param result query result
     */
    function trusource_callback(
        bytes32 queryId,
        Oracle.Oracle.Operations operationId,
        uint256 statusCode,
        string calldata result
    ) external checkAddress checkQueryId(queryId) {
        if (operationId == Oracle.Oracle.Operations.getAvgPrice) {
            emit LogResult(queryId, operationId, statusCode, result);
            return;
        }

        if (operationId == Oracle.Oracle.Operations.getDepth) {
            emit LogResult(queryId, operationId, statusCode, result);
            return;
        }

        if (operationId == Oracle.Oracle.Operations.getTicker24hr) {
            emit LogResult(queryId, operationId, statusCode, result);
            return;
        }

        if (operationId == Oracle.Oracle.Operations.getBookTicker) {
            emit LogResult(queryId, operationId, statusCode, result);
            return;
        }

        if (operationId == Oracle.Oracle.Operations.getTickerPrice) {
            emit LogResult(queryId, operationId, statusCode, result);
            return;
        }

        if (operationId == Oracle.Oracle.Operations.getTrades) {
            emit LogResult(queryId, operationId, statusCode, result);
            return;
        }
    }
}
