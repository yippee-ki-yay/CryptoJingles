pragma solidity ^0.4.18;

import './zeppelin/ownership/Ownable.sol';
import './ERC721.sol';

contract Jingle is Ownable, ERC721 {
    
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
    
    function transfer(address _to, uint256 _jingleId) public {
        require(tokensForOwner[_jingleId] != 0x0);
        require(tokensForOwner[_jingleId] == msg.sender);
        
        removeJingle(_to, _jingleId);
        // addJingle(_to, _jingleId); //TODO: FIX THIS
        
        Approval(msg.sender, 0, _jingleId);
        Transfer(msg.sender, _to, _jingleId);
    }
    
    function mint(address _owner, uint _jingleType) public onlyCryptoJingles {
        
        
        
        addJingle(_owner, _jingleType, numOfJingles + 1);
        
        numOfJingles++;
        
        Mint(_owner, numOfJingles);
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
    
    // find who owns that jingle and at what position is it in the owners arr 
    // Swap that token with the last one in arr and delete the end of arr
    function removeJingle(address _owner, uint _jingleId) internal {
        uint length = tokensOwned[_owner].length;
        uint index = tokenPosInArr[_jingleId];
        uint swapToken = tokensOwned[_owner][length - 1];

        tokensOwned[_owner][index] = swapToken;
        tokenPosInArr[swapToken] = index;

        delete tokensOwned[_owner][length - 1];
        tokensOwned[_owner].length--;
    }
}