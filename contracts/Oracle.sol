pragma solidity ^0.5.0;

/** 
 * @title Oracle.
 * @author TruSource
 * @notice MarketData oracle contract
 */ 
contract Oracle {
    address private owner;

    enum Operations { getAvgPrice, getDepth, getTicker24hr, getBookTicker, getTickerPrice, getTrades }

    // number of requests is incremented for each request to generate unique id
    mapping (address => uint256) private numRequests;

    event Log(
        address sender,
        bytes32 queryId,
        Operations operationId,
        bytes pathParams,
        bytes queryParams,
        string options
    );

    constructor() public {
        owner = msg.sender;
    }

    /**
     * @return address owner address
     */
    function getOwner() external view returns (address) {
        return owner;
    }

    /**
     * @param queryParams encoded query parameters buffer
     * @param options options string
     * @return bytes32 query id
     */
    function getAvgPrice(bytes calldata queryParams, string calldata options) external returns (bytes32) {
        return makeRequest(Operations.getAvgPrice, "", queryParams, options);
    }

    /**
     * @param queryParams encoded query parameters buffer
     * @param options options string
     * @return bytes32 query id
     */
    function getDepth(bytes calldata queryParams, string calldata options) external returns (bytes32) {
        return makeRequest(Operations.getDepth, "", queryParams, options);
    }

    /**
     * @param queryParams encoded query parameters buffer
     * @param options options string
     * @return bytes32 query id
     */
    function getTicker24hr(bytes calldata queryParams, string calldata options) external returns (bytes32) {
        return makeRequest(Operations.getTicker24hr, "", queryParams, options);
    }

    /**
     * @param queryParams encoded query parameters buffer
     * @param options options string
     * @return bytes32 query id
     */
    function getBookTicker(bytes calldata queryParams, string calldata options) external returns (bytes32) {
        return makeRequest(Operations.getBookTicker, "", queryParams, options);
    }

    /**
     * @param queryParams encoded query parameters buffer
     * @param options options string
     * @return bytes32 query id
     */
    function getTickerPrice(bytes calldata queryParams, string calldata options) external returns (bytes32) {
        return makeRequest(Operations.getTickerPrice, "", queryParams, options);
    }

    /**
     * @param queryParams encoded query parameters buffer
     * @param options options string
     * @return bytes32 query id
     */
    function getTrades(bytes calldata queryParams, string calldata options) external returns (bytes32) {
        return makeRequest(Operations.getTrades, "", queryParams, options);
    }

    /**
     * @param operationId operation id
     * @return bytes32 query id
     */
    function generateQueryId(Operations operationId) internal returns (bytes32) {
        // increment number requests
        numRequests[msg.sender]++;

        // create id from hash of contract address, requestor address, requestor address count, and operation id
        return keccak256(abi.encodePacked(this, msg.sender, numRequests[msg.sender], operationId));
    }

    /**
     * @param operationId operation id
     * @param pathParams encoded path parameters buffer
     * @param queryParams encoded query parameters buffer
     * @param options options string
     * @return bytes32 query id
     */
    function makeRequest(
        Operations operationId,
        bytes memory pathParams,
        bytes memory queryParams,
        string memory options
    ) internal returns (bytes32) {
        bytes32 queryId = generateQueryId(operationId);
        emit Log(msg.sender, queryId, operationId, pathParams, queryParams, options);
        return queryId;
    }
}
