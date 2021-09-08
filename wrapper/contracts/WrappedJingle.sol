//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

interface IJIngle {
    function transfer(address _to, uint256 _tokenId) external virtual;
}

/// @title A wrapped contract for CryptoJingles V0 and V1
contract WrappedJingle is ERC721URIStorage {

    event Wrapped(uint256 indexed, uint256, address);
    event Unwrapped(uint256 indexed, uint256, address);

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    enum Version { V0, V1 }

    uint256 constant public NUM_V0_JINGLES = 30;
    uint256 constant public NUM_V1_JINGLES = 47;
    struct OldToken {
        uint256 tokenId;
        bool isWrapped;
    }

    mapping (uint256 => mapping (address => OldToken)) public tokenMap;

    constructor() ERC721("New WrappedJingle", "WJL") {}

    /// @notice Locks an old v0/v1 jingle and gives the user a wrapped jingle
    /// @dev User must approve the contract to withdraw the asset
    /// @param _tokenId Token id of the asset to be wrapped
    /// @param _version 0 - v0 version, 1 - v1 version
    function wrap(uint256 _tokenId, Version _version) public {
        address jingleContract = getJingleAddr(_version);
        address owner = IERC721(jingleContract).ownerOf(_tokenId);

        // check if v0 can wrap
        require(wrapCheck(_tokenId, _version), "Only old V0 jingles");

        // check if user is owner
        require(owner == msg.sender, "Not token owner");

        // pull user jingle
        IERC721(jingleContract).transferFrom(msg.sender, address(this), _tokenId);

        // mint wrapped
        uint256 wrappedTokenId = mintNewToken();

        tokenMap[wrappedTokenId][jingleContract] = OldToken({
            tokenId: _tokenId,
            isWrapped: true
        });

        emit Wrapped(wrappedTokenId, _tokenId, jingleContract);
    }


    /// @notice Unlocks an old v0/v1 jingle and burnes the users wrapped jingle
    /// @dev User must approve the contract to withdraw the asset
    /// @param _wrappedTokenId Token id of the wrapped jingle
    /// @param _version 0 - v0 version, 1 - v1 version
    function unwrap(uint256 _wrappedTokenId, Version _version) public {
        // check if user is owner
        address jingleContract = getJingleAddr(_version);
        address owner = ownerOf(_wrappedTokenId);

        require(owner == msg.sender, "Not token owner");

        // burn wrapped
        _burn(_wrappedTokenId);

        OldToken memory tokenData = tokenMap[_wrappedTokenId][jingleContract];

        require(tokenData.isWrapped, "Token not wrapped");

        tokenData.isWrapped = false;
        tokenMap[_wrappedTokenId][jingleContract] = tokenData;

        // send token to caller
        IJIngle(jingleContract).transfer(msg.sender, tokenData.tokenId);

        emit Unwrapped(_wrappedTokenId, tokenData.tokenId, jingleContract);
    }

    function mintNewToken() internal returns (uint256) {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId);

        return newItemId;
    }

    function wrapCheck(uint256 _tokenId, Version _version) internal pure returns (bool) {
        if (_version == Version.V0) {
            if (_tokenId <= NUM_V0_JINGLES) return true;
        }

        if (_version == Version.V1) {
            if (_tokenId <= NUM_V1_JINGLES) return true;
        }

        return true;
    }

    function getJingleAddr(Version _version) internal pure returns (address) {
        if (_version == Version.V0) {
            return 0x5AF7Af54E8Bc34b293e356ef11fffE51d6f9Ae78;
        } else {
            return 0x5B6660ca047Cc351BFEdCA4Fc864d0A88F551485;
        }
    }

    /////////////////// PUBLIC ////////////////////////

    function totalSupply() public view returns (uint256) {
        return _tokenIds.current();
    }

    function tokenURI(uint256 _tokenId) public pure override returns (string memory) {
        return string(abi.encodePacked(baseTokenURI(), Strings.toString(_tokenId)));
    }

    function baseTokenURI() public pure returns (string memory) {
        return "https://cryptojingles.me/api/wrapped-jingles/";
    }

    function contractURI() public pure returns (string memory) {
        return "https://cryptojingles.me/metadata";
    }
}