"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import CodeSnippet from "../components/CodeSnippet";
import ParticlesBackground from "../components/Particle";
import CustomSnippet from "../components/CustomSnippet";

;


export default function Docs() {


  const [selectedSection, setSelectedSection] = useState("overview");

  // Sidebar Navigation Items
  const sections = [
    { id: "overview", label: "Overview" },
    { id: "initialSupply", label: "Initial Supply" },
    { id: "lastCoinRule", label: "Last Coin Rule" },
    { id: "functions", label: "Functions" },
  ];

  const handleSectionClick = (sectionId) => {
    setSelectedSection(sectionId);
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to the top of the page
  };

  const codeSnippets = {
    overview: `""" let's assume you have initially 10 xennium coins, call it iv (initial value). 
for each xennium coin you spend (sv - spend value), the true value of the one last xennium coin depreciates in a way, 
when the total xennium coin spent becomes 9 (in this particular case), 
the true value (tv) of the xennium coin becomes 0% (initially it was 100%), 
which means you can not spend the last xennium coin since it lost it's true value.
Means 1 became 0 """

# Xennium Algorithm

import matplotlib.pyplot as plt

class xennium:
    def __init__(self, iv):
        self.iv = iv  # initial value
        self.tv = 100  # initial true value
        self.depreciation_history = []  # list to store depreciation over time

    def x_algorithm(self):
        while self.iv > 1:  # Continue until only one coin is left
            sv = int(input("Enter the xennium to be spent: "))
            
            # Validate the input
            if sv > self.iv:
                print("Not enough xennium coins to spend.")
                break
            
            # Calculate remaining xennium coins and spent percentage
            self.iv -= sv  # subtract the spent amount
            spent_percentage = (sv / self.iv) * 100 if self.iv != 0 else 100 #spent percentage
            
            # Calculate depreciation and adjust true value
            depreciation = min(spent_percentage, self.tv) #check for bounds
            self.tv -= depreciation
            
            # Append true value to the history for plotting
            self.depreciation_history.append(self.tv)
        
        print("End of simulation. Remaining xennium coins:", self.iv)
        self.plot_depreciation()
    
    def plot_depreciation(self):
        # Plotting the depreciation history
        plt.plot(range(len(self.depreciation_history)), self.depreciation_history, marker='o')
        plt.xlabel('Time')
        plt.ylabel('True Value (%)')
        plt.title('Depreciation of xennium Coins Over Time')
        plt.grid(True)
        plt.show()

# function calling
if __name__ == "__main__":
    initial_xennium = 10
    xennium_simulator = xennium(initial_xennium)
    xennium_simulator.x_algorithm()
"""`,
    initialSupply: `contract XenniumToken is ERC20, Ownable, ERC20Permit {
    uint256 private constant TOTAL_SUPPLY = 19_000_000_000 * 10**18; // 19 billion tokens MAX SUPPLY
    uint256 private constant COMMUNITY_RESERVE = 3_000_000_000 * 10**18; // 3 billion tokens reserved for the community
    uint256 private constant DEVELOPMENT_RESERVE = 1_000_000_000 * 10**18; // 1 billion tokens reserved for development

    constructor() 
        ERC20("Xennium", "XENX") 
        ERC20Permit("Xennium") 
        Ownable(msg.sender) 
    {
        // Mint the total supply to the contract
        _mint(address(this), TOTAL_SUPPLY);

        // Transfer the development reserve to the owner's wallet
        _transfer(address(this), msg.sender, DEVELOPMENT_RESERVE);
    }`,
    lastCoinRule: `// Last Coin Transfer Restriction (LCTR) Principle
    function _safeTransferCheck(address from, uint256 amount) internal view {
        require(balanceOf(from) - amount >= 1, "XENX: Cannot spend the last coin");
    }

    // Override transfer with LCTR check
    function transfer(address to, uint256 amount) public override returns (bool) {
        _safeTransferCheck(msg.sender, amount);
        return super.transfer(to, amount);
    }

    // Override transferFrom with LCTR check
    function transferFrom(address from, address to, uint256 amount) public override returns (bool) {
        _safeTransferCheck(from, amount);
        return super.transferFrom(from, to, amount);
    }
`,
    functions: `// Functions Code Snippet
function transfer(address to, uint256 amount) { /* ... */ }
function transferFrom(address from, address to, uint256 amount) { /* ... */ }`,
  };

  return (
    <div className="relative min-h-screen bg-[#1c1c1e] text-gray-200">
      {/* Particle */}
      <ParticlesBackground />
<div className="pb-10">
      {/* Navbar */}
      <Navbar /></div>

      <div className="relative flex min-h-screen pt-16">
        {/* Sidebar Container */}
        <div className="w-64 bg-[#2c2c2e] text-gray-300 p-4 fixed top-0 left-0 bottom-0 z-10">
          <h2 className="text-lg font-bold mb-4 pb-28">Docs</h2>
          <nav>
            <ul className="space-y-3">
              {sections.map((section) => (
                <li
                  key={section.id}
                  className={`cursor-pointer p-2 rounded-md ${
                    selectedSection === section.id ? "bg-[#3c3c3e] text-white" : ""
                  }`}
                  onClick={() => handleSectionClick(section.id)} // Handle section click
                >
                  {section.label}
                </li>
              ))}
            </ul>
          </nav>
        </div>


        {/* Main Content Container */}
        <div className="flex-1 ml-64 p-8 sm:p-16">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6">
            {sections.find((section) => section.id === selectedSection)?.label}
          </h1>
          <div className="text-gray-300 space-y-4">
            {selectedSection === "overview" && (
              <>
                <p>
                  The XenniumToken contract is an ERC20 token that goes beyond the
                  standard, adding functionalities such as preventing spending
                  the last token and allowing minting exclusively by the owner.
                  XENX&apos;s unique feature, &apos;Last coin cannot be spent&apos;, makes it
                  a standout choice for applications in gamification,
                  governance, voting, and identity management, including shareholder
                  roles.
                  <br /><br />
                </p>
                <div className="mt-8 pb-6">
                  <CustomSnippet code={codeSnippets.overview}
                  title={"Python"} />
                </div>
                <div className="pb-24">
<strong>Algorithm Overview:</strong><br /><br />
<ul>
  <li>
    The simulation begins with an <code>initial value (iv)</code> of Xennium coins. 
    The <strong>True Value (tv)</strong> starts at 100% and depreciates as coins are spent.
  </li>
  <li>
    Spending coins reduces the total balance, but also affects the <code>tv</code> 
    based on the percentage spent.
  </li>
  <li>
    When only one coin remains, the true value becomes 0%, preventing the last 
    coin from being spent.
  </li>
</ul>

<br /><br />

<strong>Code Breakdown:</strong><br /><br />
<ul>
  <li>
    <code>class xennium:</code> 
    <ul>
      <li>
        Represents the Xennium coin system, managing initial value, true value, 
        and depreciation history.
      </li>
    </ul>
  </li>
  <br />
  <li>
    <code>__init__(self, iv):</code> 
    <ul>
      <li>
        Initializes the simulation with the specified <code>initial value (iv)</code>, 
        sets the <code>True Value (tv)</code> to 100%, and creates a history list 
        to track depreciation over time.
      </li>
    </ul>
  </li>
  <br />
  <li>
    <code>x_algorithm(self):</code> 
    <ul>
      <li>
        The main algorithm that handles user input for spending Xennium coins.
      </li>
      <li>
        Validates the spending value (<code>sv</code>) to ensure the user has 
        enough coins.
      </li>
      <li>
        Calculates the depreciation of <code>tv</code> based on the percentage 
        of coins spent and updates the remaining balance.
      </li>
      <li>
        Stops execution when only one coin remains and triggers a visualization 
        of the depreciation history.
      </li>
    </ul>
  </li>
  <br />
  <li>
    <code>plot_depreciation(self):</code> 
    <ul>
      <li>
        Visualizes the depreciation of <code>tv</code> over time using 
        <code>matplotlib</code>.
      </li>
      <li>
        Helps users understand how the true value diminishes with each spend.
      </li>
    </ul>
  </li>
</ul>

<br /><br />

<strong>Special Properties of the Algorithm:</strong><br /><br />
<ul>
  <li>
    The <code>True Value</code> is sensitive to every spend, regardless of how 
    small the amount, demonstrating the inherent volatility of Xennium coins.
  </li>
  <li>
    Even with a large initial balance, the algorithm ensures that the last 
    coin cannot be spent, maintaining its unique property of becoming &quot;valueless.&quot;
  </li>
  <li>
    Tracks and visualizes depreciation, offering an intuitive way to observe 
    the effects of spending behavior on the coin&apos;s value.
  </li>
</ul>

<br /><br />

<strong>Example Scenario:</strong><br /><br />
<ul>
  <li>
    <strong>Initial Coins:</strong> A user starts with 10 Xennium coins.
  </li>
  <li>
    <strong>Spending:</strong> The user spends 3 coins. The algorithm calculates 
    the percentage spent and reduces the <code>True Value</code> accordingly.
  </li>
  <li>
    <strong>Final Coin:</strong> As the user continues spending, the remaining 
    coins decrease, and the <code>True Value</code> approaches 0% when only 
    one coin remains.
  </li>
</ul>

<br /><br />

<strong>Visualization:</strong> <br /><br />The algorithm provides a graphical representation 
of the depreciation history, making it easy to track how spending affects the 
<code>True Value</code> over time.

<br /><br />

<strong>Conclusion:</strong> <br /><br />This algorithm highlights the peculiar way 
Xennium coins behave, where every spend impacts their true value, regardless 
of the initial balance. It enforces a rule that the last coin becomes &quot;non-spendable,&quot; 
adding a layer of complexity and uniqueness to the coin&apos;s usage. 

                </div>
              </>
            )}
            {selectedSection === "initialSupply" && (
              <>
                <p>
                  <strong>Initial Supply:</strong> The contract begins with
                  19,000,000,000 XENX tokens. Of these, 1,000,000,000 tokens are reserved
                  for the owner to use for administrative or ecosystem-building
                  purposes.The <code>constructor</code> initializes the <strong>Xennium (XENX)</strong> token with specific configurations and initial minting logic. It ensures proper setup of the token&apos;s metadata, ownership, and initial token distribution.

                  <br /><br />
                </p>
                <div className="mt-8 pb-6">
                  <CodeSnippet code={codeSnippets.initialSupply} />
                </div>
                <div className="pb-24">
                

<strong>Function Breakdown:</strong><br /><br />
<ul>
  <li>
    <code>ERC20(&quot;Xennium&quot;, &quot;XENX&quot;)</code>: This initializes the token with a name 
    <strong>&quot;Xennium&quot;</strong> and symbol <strong>&quot;XENX&quot;</strong>. The <code>ERC20</code> 
    constructor from OpenZeppelin handles basic ERC-20 functionality.
    <br /><br />
  </li>
  <li>
    <code>ERC20Permit(&quot;Xennium&quot;)</code>: Enables <strong>permit</strong> functionality, 
    allowing token approvals via signatures instead of on-chain transactions. 
    This saves gas fees and enhances user experience.<br /><br />
  </li>
  <li>
    <code>Ownable(msg.sender)</code>: Sets the <strong>owner</strong> of the contract 
    as the address deploying it (<code>msg.sender</code>). This uses OpenZeppelin&apos;s 
    <code>Ownable</code> contract, which provides owner-based access control.<br /><br />
  </li>
 
</ul>

<br /><br />

<strong>Use Cases:</strong><br /><br />
<ul>
  <li>
    <strong>Owner&apos;s Reserve:</strong> The owner&apos;s reserved tokens can be used 
    for development, marketing, or other operational purposes.
  </li>
  <li>
    <strong>Contract&apos;s Supply:</strong> Tokens allocated to the contract&apos;s 
    balance can be distributed through faucets, airdrops, or other mechanisms 
    as defined in the contract logic.
  </li>
</ul>

<br /><br />

<strong>Security Mechanisms:</strong><br /><br />
<ul>
  <li>
    The <code>Ownable</code> constructor ensures that only the owner has 
    privileged access to critical functions.
  </li>
  <li>
    By minting the remaining tokens to the contract&apos;s balance, the 
    allocation prevents unauthorized access or misuse of the initial supply.
  </li>
</ul>

<br /><br />

<strong>Example Scenario:</strong><br /><br /> When deploying the Xennium token, the constructor 
automatically sets up the token&apos;s metadata and allocates the initial supply 
based on predefined rules. This ensures a fair and controlled distribution from 
the outset.This implementation demonstrates a <strong>well-structured</strong> approach to token 
deployment, ensuring clear ownership and token allocation while aligning with 
standard ERC-20 practices.

<br /><br />



                </div>
              </>
            )}
            {selectedSection === "lastCoinRule" && (
              <>
                <p>
                  <strong>Last Coin Rule:</strong> A distinctive feature of
                  Xennium is the &apos;Last coin cannot be spent&apos; rule.
                  <br /><br />
                </p>
                <div className="mt-8 pb-6">
                  <CodeSnippet code={codeSnippets.lastCoinRule} />
                </div>
                <div className="pb-20">
                <p>
      1. <strong><code>_safeTransferCheck</code> function:</strong><br />
      This function checks whether the sender is trying to spend the last remaining coin.
      It verifies if the sender&apos;s balance minus the amount they want to transfer is greater than or equal to 1.<br />
      If not, it triggers an error with the message: <code>&quot;XENX: Cannot spend the last coin&quot;</code>.
      
      <br /><br />
      2. <strong><code>transfer</code> function (overridden):</strong><br />
      This is the standard <code>transfer</code> function, but it is overridden to include the check for the last coin rule.<br />
      Before performing the transfer, the <code>_safeTransferCheck</code> function is called to ensure the transaction doesn&apos;t violate the last coin rule.<br />
      If the check passes, it calls the original <code>super.transfer(to, amount)</code> function to complete the transfer.
      
      <br /><br />
      3. <strong><code>transferFrom</code> function (overridden):</strong><br />
      This function works similarly to the <code>transfer</code> function, but it allows transfers from an account other than the sender.<br />
      Like the <code>transfer</code> function, it first calls the <code>_safeTransferCheck</code> function to validate the last coin rule and proceeds with the <code>super.transferFrom(from, to, amount)</code> function if the check passes.
    </p><br /><br />
    </div>
              </>
            )}
            {selectedSection === "functions" && (
              <>
                <ul className="list-disc list-inside">
                  <li>
                    <code>transfer</code>: Transfers tokens while respecting the
                    &apos;Last coin cannot be spent&apos; rule.
                  </li>
                  <li>
                  <code>transferFrom</code>: Allows transfers on behalf of
                  another user, adhering to the same rule.
                <br /><br />
                </li>
                </ul>
                <div className="mt-8 pb-6">
                  <CodeSnippet code={codeSnippets.functions} />
                </div>
                <div className="pb-24">

<strong>Function Breakdown:</strong><br /><br />
<ul>
  <li>
    <code>transfer(address to, uint256 amount)</code>: 
    <ul>
      <li>
        This function allows the caller to transfer a specified <code>amount</code> 
        of tokens to another address (<code>to</code>).
      </li>
      <li>
        It requires that the caller has enough tokens in their balance to 
        complete the transaction.
      </li>
      <li>
        Returns <code>true</code> if the transfer is successful and emits 
        a <code>Transfer</code> event to log the action on-chain.
      </li>
    </ul>
  </li>
  <br />
  <li>
    <code>transferFrom(address from, address to, uint256 amount)</code>: 
    <ul>
      <li>
        Enables an address (<code>from</code>) to transfer tokens on behalf 
        of another address (<code>to</code>).
      </li>
      <li>
        Commonly used in scenarios where delegated token transfers are required, 
        such as decentralized exchanges or staking.
      </li>
      <li>
        Requires prior approval via the <code>approve</code> function and emits 
        a <code>Transfer</code> event upon success.
      </li>
    </ul>
  </li>
</ul>

<br /><br />

<strong>Additional ERC-20 Functions:</strong><br /><br />
<ul>
  <li>
    <code>approve(address spender, uint256 amount)</code>: 
    <ul>
      <li>
        Allows the caller to grant permission to another address (<code>spender</code>) 
        to spend up to a specified <code>amount</code> of their tokens.
      </li>
      <li>
        Useful for enabling delegated transactions, such as token swaps or purchases.
      </li>
      <li>
        Emits an <code>Approval</code> event to track the approval on-chain.
      </li>
    </ul>
  </li>
  <br />
  <li>
    <code>allowance(address owner, address spender)</code>: 
    <ul>
      <li>
        Returns the remaining number of tokens that the <code>spender</code> is 
        allowed to spend on behalf of the <code>owner</code>.
      </li>
      <li>
        Reflects the approvals set using the <code>approve</code> function.
      </li>
    </ul>
  </li>
</ul>

<br /><br />

<strong>ERC-20 Permit Extensions:</strong><br /><br />
<ul>
  <li>
    <code>permit(address owner, address spender, uint256 value, uint256 deadline, uint8 v, bytes32 r, bytes32 s)</code>: 
    <ul>
      <li>
        Allows approvals to be set via off-chain signatures instead of on-chain 
        transactions, saving gas fees for the user.
      </li>
      <li>
        Uses the <strong>EIP-2612 Permit</strong> standard for efficient token approvals.
      </li>
    </ul>
  </li>
</ul>

<br /><br />

<strong>Security Mechanisms:</strong><br /><br />
<ul>
  <li>
    <code>approve</code> and <code>allowance</code> should be carefully monitored 
    to avoid vulnerabilities, such as the well-known &quot;approve front-running&quot; issue.
  </li>
  <li>
    The <code>permit</code> function introduces an additional layer of security 
    by requiring valid cryptographic signatures.
  </li>
</ul>

<br /><br />

<strong>Example Scenarios:</strong><br /><br />
<ul>
  <li>
    <strong>Token Transfers:</strong> Users send tokens to each other using the 
    <code>transfer</code> function.
  </li>
  <li>
    <strong>Delegated Transfers:</strong> A decentralized exchange uses 
    <code>transferFrom</code> to execute token swaps on behalf of users.
  </li>
  <li>
    <strong>Gas-Efficient Approvals:</strong> A dApp integrates the <code>permit</code> 
    function to allow users to approve transactions without incurring on-chain 
    gas costs.
  </li>
</ul>

<br /><br />


                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
