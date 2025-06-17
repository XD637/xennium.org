# Xennium (XENX)

**Xennium** is an innovative ERC‑20 token on Polygon PoS featuring the **Last Coin Transfer Restriction (LCTR)**: the last token in *any* wallet becomes permanently unspendable, fostering enforced scarcity and long-term engagement.

🌐 **Official Website**: [https://xennium.org](https://xennium.org)

🔗 **Contract on Polygonscan**: [0x0f29965ca5f1111b073efa37a739dd2fafab11e0](https://polygonscan.com/token/0x0f29965ca5f1111b073efa37a739dd2fafab11e0)


## Overview

- **Network**: Polygon Proof-of-Stake (PoS)  
- **Symbol**: XENX
- **Contract Address**: [`0x0f29965ca5f1111b073efa37a739dd2fafab11e0`](https://polygonscan.com/token/0x0f29965ca5f1111b073efa37a739dd2fafab11e0)  
- **Mechanism**: *Last Coin Transfer Restriction (LCTR)* – once a wallet has one token left, it cannot be transferred out  
- **Goal**: Drive value and engagement through built-in scarcity and unique tokenomics

## Why It Matters

- **Scarcity Built-In**: Every wallet keeps one token forever, ensuring total circulating tokens asymptotically approach the cap  
- **Incentivizes Accumulation**: Users hold and stake more tokens to make meaningful transactions  
- **Brand & Community Value**: Each wallet’s “unspendable” final token serves as a legacy badge

## Tokenomics

- **Total Supply**: [19BILLION]  
- **Decimals**: 18    
- **Deflationary Pressure**: As more wallets are used, more tokens get “locked” by LCTR

## How It Works

1. Standard ERC‑20 functions (transfer, approve, transferFrom)  
2. **Before transfer**: Ensure recipient's wallet will contain ≥1 token after transaction  
3. **Block** transfers that would leave a wallet empty  
4. Transfers that violate LCTR are rejected via `require(...)`

## Usage

- **Interact via**: Remix, Etherscan, or your dApp  
- **Deployed on**: Polygon mainnet and amoy testnet
