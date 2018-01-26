pragma solidity ^0.4.18;

import './zeppelin/ownership/Ownable.sol';
import './ERC721.sol';

contract Jingle is Ownable, ERC721 {
    
    mapping (uint => address) internal tokensForOwner;
    mapping (uint => address) internal tokensForApproved;
    mapping (address => uint[]) internal tokensOwned;
    mapping (uint => uint) internal tokenPosInArr;
    
    mapping(uint => uint[]) internal samplesInJingle;
    
    mapping(bytes32 => bool) public uniqueJingles;
    
    uint public numOfJingles;
    
    address public cryptoJingles;
    
    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
    event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId);
    event Composed(uint indexed songId, address indexed owner, uint[5] samples);
    
    modifier onlyCryptoJingles() {
        require(msg.sender == cryptoJingles);
        _;
    }
    
    function Jingle() public {
    }
    
    //TODO: clear
    function transfer(address _to, uint256 _jingleId) public {
        require(tokensForOwner[_jingleId] != 0x0);
        require(tokensForOwner[_jingleId] == msg.sender);
        
        removeSong(msg.sender, _jingleId);
        addSong(_to, _jingleId);
        
        Approval(msg.sender, 0, _jingleId);
        Transfer(msg.sender, _to, _jingleId);
    }
    
    
    function approve(address _to, uint256 _jingleId) public {
        require(tokensForOwner[_jingleId] != 0x0);
        require(ownerOf(_jingleId) == msg.sender);
        require(_to != msg.sender);
        
        if (_getApproved(_jingleId) != 0x0 || _to != 0x0) {
            tokensForApproved[_jingleId] = _to;
            Approval(msg.sender, _to, _jingleId);
        }
    }
    
    function transferFrom(address _from, address _to, uint256 _jingleId) public {
        require(tokensForOwner[_jingleId] != 0x0);
        require(_getApproved(_jingleId) == msg.sender);
        require(ownerOf(_jingleId) == _from);
        require(_to != 0x0);
        
        tokensForApproved[_jingleId] = 0x0;
        
        removeSong(_from, _jingleId);
        addSong(_to, _jingleId);
        
        Approval(_from, 0, _jingleId);
        Transfer(_from, _to, _jingleId);
        
    }
    
    function implementsERC721() public pure returns (bool) {
        return true;
    }
    
    function totalSupply() public view returns (uint256) {
        return numOfJingles;
    }
    
    function balanceOf(address _owner) public view returns (uint256 balance) {
        return tokensOwned[_owner].length;
    }
    
    function ownerOf(uint256 _jingleId) public view returns (address) {
        return tokensForOwner[_jingleId];
    }
    
    function tokenOfOwnerByIndex(address _owner, uint256 _index) external view returns (uint256) {
        return tokensOwned[_owner][_index];
    }
    
    function getSamplesForJingle(uint _jingleId) external view returns(uint[]) {
        return samplesInJingle[_jingleId];
    }
    
    function getAllJingles(address _owner) external view returns(uint[]) {
        return tokensOwned[_owner];
    }
     
    function composeJingle(address _owner, uint[5] jingles) public onlyCryptoJingles {
        
        uint _jingleId = numOfJingles;
        
        uniqueJingles[keccak256(jingles)] = true;
        
        tokensForOwner[_jingleId] = _owner;
        
        tokensOwned[_owner].push(_jingleId);
        
        samplesInJingle[_jingleId] = jingles;
        
        tokenPosInArr[_jingleId] = tokensOwned[_owner].length - 1;
        
        Composed(numOfJingles, _owner, jingles);
        
        numOfJingles++;
    }
    
     // Internal functions of the contract
    
    function addSong(address _owner, uint _jingleId) internal {
        tokensForOwner[_jingleId] = _owner;
        
        tokensOwned[_owner].push(_jingleId);
        
        tokenPosInArr[_jingleId] = tokensOwned[_owner].length - 1;
    }
    
    // find who owns that jingle and at what position is it in the owners arr 
    // Swap that token with the last one in arr and delete the end of arr
    function removeSong(address _owner, uint _jingleId) internal {
        uint length = tokensOwned[_owner].length;
        uint index = tokenPosInArr[_jingleId];
        uint swapToken = tokensOwned[_owner][length - 1];

        tokensOwned[_owner][index] = swapToken;
        tokenPosInArr[swapToken] = index;

        delete tokensOwned[_owner][length - 1];
        tokensOwned[_owner].length--;
    }
    
    function _getApproved(uint _jingleId) internal view returns (address) {
        return tokensForApproved[_jingleId];
    }
    
    // Owner functions 
    function setCryptoJinglesContract(address _cryptoJingles) public onlyOwner {
        cryptoJingles = _cryptoJingles;
    }
}