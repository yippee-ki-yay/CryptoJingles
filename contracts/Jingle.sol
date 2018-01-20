pragma solidity ^0.4.18;

import './zeppelin/ownership/Ownable.sol';
import './ERC721.sol';

contract Jingle is Ownable {
    
    mapping (uint => address) internal tokensForOwner;
    mapping (address => uint[]) internal tokensOwned;
    mapping (uint => uint) internal tokenPosInArr;
    
    mapping (uint => uint) internal tokenType;
    
    uint public numOfJingles;
    
    address public cryptoJingles;
    
    event Mint(address indexed _to, uint256 indexed _tokenId);
    
    modifier onlyCryptoJingles() {
        require(msg.sender == cryptoJingles);
        _;
    }
    
    function Jingle() public {
    }
    
    function mint(address _owner, uint _jingleType) public onlyCryptoJingles {
        
        addJingle(_owner, _jingleType, numOfJingles);
        
        Mint(_owner, numOfJingles);
        
        numOfJingles++;
    }
    
    function setJingleType(uint _jingleId, uint jingleType) public onlyCryptoJingles {
        tokenType[_jingleId] = jingleType;
    }
    
    // Internal functions of the contract
    
    function addJingle(address _owner, uint _jingleType, uint _jingleId) internal {
        tokensForOwner[_jingleId] = _owner;
        
        tokensOwned[_owner].push(_jingleId);
        
        tokenType[_jingleId] = _jingleType;
        
        tokenPosInArr[_jingleId] = tokensOwned[_owner].length - 1;
    }
    
    //TODO: check this again
    // find who owns that jingle and at what position is it in the owners arr 
    // Swap that token with the last one in arr and delete the end of arr
    function removeJingle(address _owner, uint _jingleId) public onlyCryptoJingles {
        uint length = tokensOwned[_owner].length;
        uint index = tokenPosInArr[_jingleId];
        uint swapToken = tokensOwned[_owner][length - 1];

        tokensOwned[_owner][index] = swapToken;
        tokenPosInArr[swapToken] = index;

        delete tokensOwned[_owner][length - 1];
        tokensOwned[_owner].length--;
        
        tokensForOwner[_jingleId] = 0x0;
        
    }
    
    function getJinglesForOwner(address _owner) public constant returns (uint[]) {
        return tokensOwned[_owner];
    }
    
    function getTokenType(uint _jingleId) public constant returns (uint) {
        return tokenType[_jingleId];
    }
    
    function isTokenOwner(uint _tokenId, address _user) public constant returns(bool) {
        return tokensForOwner[_tokenId] == _user;
    }
    
    function getAllJinglesForOwner(address _owner) public constant returns(uint[]) {
        uint[] memory jingles = tokensOwned[_owner];
        
        uint[] memory usersJingles = new uint[](jingles.length*2);
        
        for(uint i = 0; i < jingles.length; i += 2) {
            usersJingles[i] = jingles[i];
            usersJingles[i + 1] = tokenType[jingles[i]];
        }
        
        return usersJingles;
    }
    
     // Owner functions 
    function setCryptoJinglesContract(address _cryptoJingles) public onlyOwner {
        cryptoJingles = _cryptoJingles;
    }
}