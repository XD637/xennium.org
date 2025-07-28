import CustomSnippet from "../components/CustomSnippet";

const code = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";

contract XenniumToken is ERC20, Ownable, ERC20Permit {
    uint256 private constant TOTAL_SUPPLY = 19_000_000_000 * 10**18; // 19 billion tokens MAX SUPPLY
    uint256 private constant COMMUNITY_RESERVE = 3_000_000_000 * 10**18; // 3 billion tokens reserved for the community
    uint256 private constant DEVELOPMENT_RESERVE = 1_000_000_000 * 10**18; // 1 billion tokens reserved for development

    constructor() 
        ERC20("Xennium", "XENX") 
        ERC20Permit("Xennium") 
        Ownable(msg.sender) 
    {
        _mint(address(this), TOTAL_SUPPLY);
        _transfer(address(this), msg.sender, DEVELOPMENT_RESERVE);
    }

    function _safeTransferCheck(address from, uint256 amount) internal view {
        require(balanceOf(from) - amount >= 1, "XENX: Cannot spend the last coin");
    }

    function transfer(address to, uint256 amount) public override returns (bool) {
        _safeTransferCheck(msg.sender, amount);
        return super.transfer(to, amount);
    }

    function transferFrom(address from, address to, uint256 amount) public override returns (bool) {
        _safeTransferCheck(from, amount);
        return super.transferFrom(from, to, amount);
    }

    function communityReserve() external pure returns (uint256) {
        return COMMUNITY_RESERVE;
    }
}
`;

const Transparency = () => (
    <section className="w-full max-w-5xl pt-16 mx-auto">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Transparency</h2>
        <p className="text-gray-300 text-lg mb-8 text-center">Xennium is fully open source and verified on Polygon. Explore the contract here:</p>
        <CustomSnippet code={code} title="Solidity" />
    </section>
);

export default Transparency;
