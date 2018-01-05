pragma solidity ^0.4.18;

import './zeppelin/ownership/Ownable.sol';
import './ERC721.sol';

contract Song is Ownable, ERC721 {
    
    mapping (uint => address) internal tokensForOwner;
    mapping (uint => address) internal tokensForApproved;
    mapping (address => uint[]) internal tokensOwned;
    mapping (uint => uint) internal tokenPosInArr;
    
    mapping(uint => uint[]) internal jinglesInSong;
    
    uint public numOfSongs;
    
    address public cryptoJingles;
    
    string public name;
    string public symbol;
    
    event Mint(address indexed _to, uint256 indexed _tokenId);
    
    modifier onlyCryptoJingles() {
        require(msg.sender == cryptoJingles);
        _;
    }
    
    function Song() public {
        name = "Crypto Songs";
        symbol = "CST";
    }
    
    function transfer(address _to, uint256 _songId) public {
        require(tokensForOwner[_songId] != 0x0);
        require(tokensForOwner[_songId] == msg.sender);
        
        removeSong(_to, _songId);
        addSong(_to, _songId);
        
        Approval(msg.sender, 0, _songId);
        Transfer(msg.sender, _to, _songId);
    }
    
    
    function approve(address _to, uint256 _songId) public {
        require(tokensForOwner[_songId] != 0x0);
        require(ownerOf(_songId) == msg.sender);
        require(_to != msg.sender);
        
        if (_getApproved(_songId) != 0x0 || _to != 0x0) {
            tokensForApproved[_songId] = _to;
            Approval(msg.sender, _to, _songId);
        }
    }
    
    function transferFrom(address _from, address _to, uint256 _songId) public {
        require(tokensForOwner[_songId] != 0x0);
        require(_getApproved(_songId) == msg.sender);
        require(ownerOf(_songId) == _from);
        require(_to != 0x0);
        
        tokensForApproved[_songId] = 0x0;
        
        removeSong(_from, _songId);
        addSong(_to, _songId);
        
        Approval(_from, 0, _songId);
        Transfer(_from, _to, _songId);
        
    }
    
    function implementsERC721() public pure returns (bool) {
        return true;
    }
    
    function totalSupply() public view returns (uint256) {
        return numOfSongs;
    }
    
    function balanceOf(address _owner) public view returns (uint256 balance) {
        return tokensOwned[_owner].length;
    }
    
    function tokenOfOwnerByIndex(address _owner, uint256 _index) external view returns (uint256) {
        return tokensOwned[_owner][_index];
    }
    
    function composeSong(address _owner, uint[5] jingles) public onlyCryptoJingles {
        
        uint _songId = numOfSongs;
        
        tokensForOwner[_songId] = _owner;
        
        tokensOwned[_owner].push(_songId);
        
        jinglesInSong[_songId] = jingles;
        
        tokenPosInArr[_songId] = tokensOwned[_owner].length - 1;
        
        numOfSongs++;
    }
    
     // Internal functions of the contract
    
    function addSong(address _owner, uint _songId) internal {
        tokensForOwner[_songId] = _owner;
        
        tokensOwned[_owner].push(_songId);
        
        tokenPosInArr[_songId] = tokensOwned[_owner].length - 1;
    }
    
    // find who owns that jingle and at what position is it in the owners arr 
    // Swap that token with the last one in arr and delete the end of arr
    function removeSong(address _owner, uint _songId) internal {
        uint length = tokensOwned[_owner].length;
        uint index = tokenPosInArr[_songId];
        uint swapToken = tokensOwned[_owner][length - 1];

        tokensOwned[_owner][index] = swapToken;
        tokenPosInArr[swapToken] = index;

        delete tokensOwned[_owner][length - 1];
        tokensOwned[_owner].length--;
    }
    
    function _getApproved(uint _songId) internal view returns (address) {
        return tokensForApproved[_songId];
    }
    
    // Owner functions 
    function setCryptoJinglesContract(address _cryptoJingles) public {
        cryptoJingles = _cryptoJingles;
    }
}