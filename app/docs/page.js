"use client";

import { useCallback, useState } from "react";
import dynamic from "next/dynamic";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CodeSnippet from "../components/CodeSnippet";

const Particles = dynamic(() => import("react-tsparticles"), { ssr: false });
import { loadFull } from "tsparticles";

export default function Docs() {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const [selectedSection, setSelectedSection] = useState("overview");


  // Sidebar Navigation Items
  const sections = [
    { id: "overview", label: "Overview" },
    { id: "initialSupply", label: "Initial Supply" },
    { id: "minting", label: "Minting" },
    { id: "lastCoinRule", label: "Last Coin Rule" },
    { id: "functions", label: "Functions" },
  ];

  const handleSectionClick = (sectionId) => {
    setSelectedSection(sectionId);
    window.scrollTo({ top: 0, behavior: "smooth" });  // Scroll to the top of the page
  };

  const codeSnippets = {
    overview: `""" let's assume you have initially 10 xennium coins, call it iv (initial value). 
for each xennium coin you spend (sv - spend value), the true value of the one last xennium coin depreciates in a way, 
when the total xennium coin spent becomes 9 (in this particular case), 
the true value (tv) of the xennium coin becomes 0% (initially it was 100%), 
which means you can not spend the last xennium coin since it lost it's true value.
Means 1 became 0 """

#Xennium Algorithm

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

# funtion calling
if __name__ == "__main__":
    initial_xennium = 10
    xennium_simulator = xennium(initial_xennium)
    xennium_simulator.x_algorithm()

"""this algorithm shows the peculiar way of depreciation based on the how much you spend,
you may not realise but even if you spend the smallest amount , it changes the true value and depreciates it's value,
Regardless of the amount of xennium coins you initially had!
"""`,
    initialSupply: ` constructor() ERC20("Xennium", "XENX") ERC20Permit("Xennium") Ownable(msg.sender) {
        _mint(msg.sender, OWNER_RESERVE); // Reserve 1 million tokens for the owner
        _mint(address(this), INITIAL_SUPPLY - OWNER_RESERVE); // Mint remaining supply to the contract
    }`,
    minting: `// Allow the owner to mint new tokens only to the contract's balance
    function mint(uint256 amount) external onlyOwner {
        _mint(address(this), amount);
        emit TokensMinted(address(this), amount);
  }`,
    lastCoinRule: ` // Prevent the last coin from being spent (Xennium special rule)
    function _safeTransferCheck(address from, uint256 amount) internal view {
        require(balanceOf(from) - amount >= 1, "XENX: Cannot spend the last coin");
    }

    // Override transfer with last coin check
    function transfer(address to, uint256 amount) public override returns (bool) {
        _safeTransferCheck(msg.sender, amount);
        return super.transfer(to, amount);
    }

    // Override transferFrom with last coin check
    function transferFrom(address from, address to, uint256 amount) public override returns (bool) {
        _safeTransferCheck(from, amount);
        return super.transferFrom(from, to, amount);
    }`,
    functions: `// Functions Code Snippet
function transfer(address to, uint256 amount) { /* ... */ }
function transferFrom(address from, address to, uint256 amount) { /* ... */ }
function mint(address to, uint256 amount) { /* ... */ }`,
  };

  return (
    <div className="relative min-h-screen bg-[#1c1c1e] text-gray-200">
      {/* Particles Background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: { color: { value: "#1c1c1e" } },
          particles: {
            number: { value: 50, density: { enable: true, value_area: 800 } },
            color: { value: "#ffffff" },
            opacity: { value: 0.5 },
            size: { value: 4, random: true },
            move: { enable: true, speed: 1 },
            line_linked: {
              enable: true,
              distance: 150,
              color: "#ffffff",
              opacity: 0.1,
              width: 1.5,
            },
          },
          retina_detect: true,
        }}
        className="absolute top-0 left-0 w-full h-full z-0"
      />

      {/* Navbar */}
      <Navbar />

      <div className="relative flex min-h-screen pt-16">
        {/* Sidebar Container */}
        <div className="w-64 bg-[#2c2c2e] text-gray-300 p-4 fixed top-0 left-0 bottom-0 z-10">
          <h2 className="text-lg font-bold mb-4">Docs</h2>
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
                </p>
                <div className="mt-8 pb-10">
                  <CodeSnippet code={codeSnippets.overview} />
                </div>
                <div className="pb-24">
<strong>Algorithm Overview:</strong>
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

<strong>Code Breakdown:</strong>
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

<strong>Special Properties of the Algorithm:</strong>
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

<strong>Example Scenario:</strong>
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

<strong>Visualization:</strong> The algorithm provides a graphical representation 
of the depreciation history, making it easy to track how spending affects the 
<code>True Value</code> over time.

<br /><br />

<strong>Conclusion:</strong> This algorithm highlights the peculiar way 
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
                  19,000,000 XENX tokens. Of these, 1,000,000 tokens are reserved
                  for the owner to use for administrative or ecosystem-building
                  purposes.
                </p>
                <div className="mt-8 pb-10">
                  <CodeSnippet code={codeSnippets.initialSupply} />
                </div>
                <div className="pb-24">
                The <code>constructor</code> initializes the <strong>Xennium (XENX)</strong> token with specific configurations and initial minting logic. It ensures proper setup of the token&apos;s metadata, ownership, and initial token distribution.

<br /><br />

<strong>Function Breakdown:</strong>
<ul>
  <li>
    <code>ERC20(&quot;Xennium&quot;, &quot;XENX&quot;)</code>: This initializes the token with a name 
    <strong>&quot;Xennium&quot;</strong> and symbol <strong>&quot;XENX&quot;</strong>. The <code>ERC20</code> 
    constructor from OpenZeppelin handles basic ERC-20 functionality.
  </li>
  <li>
    <code>ERC20Permit(&quot;Xennium&quot;)</code>: Enables <strong>permit</strong> functionality, 
    allowing token approvals via signatures instead of on-chain transactions. 
    This saves gas fees and enhances user experience.
  </li>
  <li>
    <code>Ownable(msg.sender)</code>: Sets the <strong>owner</strong> of the contract 
    as the address deploying it (<code>msg.sender</code>). This uses OpenZeppelin&apos;s 
    <code>Ownable</code> contract, which provides owner-based access control.
  </li>
  <li>
    <code>_mint(msg.sender, OWNER_RESERVE)</code>: Mints a predefined number of tokens 
    (e.g., <strong>1 million</strong>) to the owner&apos;s address. This serves as 
    the owner&apos;s reserved supply for future use.
  </li>
  <li>
    <code>_mint(address(this), INITIAL_SUPPLY - OWNER_RESERVE)</code>: Mints the 
    remaining tokens from the total supply to the <strong>contract&apos;s balance</strong>. 
    This allocation ensures tokens are held by the contract for specific purposes 
    like distribution or liquidity.
  </li>
</ul>

<br /><br />

<strong>Use Cases:</strong>
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

<strong>Security Mechanisms:</strong>
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

<strong>Example Scenario:</strong> When deploying the Xennium token, the constructor 
automatically sets up the token&apos;s metadata and allocates the initial supply 
based on predefined rules. This ensures a fair and controlled distribution from 
the outset.

<br /><br />

This implementation demonstrates a <strong>well-structured</strong> approach to token 
deployment, ensuring clear ownership and token allocation while aligning with 
standard ERC-20 practices.

                </div>
              </>
            )}
            {selectedSection === "minting" && (
              <>
                <p>
                  <strong>Minting:</strong> The controlled minting feature ensures
                  that only the owner can mint additional tokens.
                </p>
                <div className="mt-8 pb-10">
                  <CodeSnippet code={codeSnippets.minting} />
                </div>
                <div className="pb-24">The <code>mint</code> function allows the <strong>owner</strong> of the 
contract to mint (create) new tokens and add them to the 
<strong>contract&apos;s balance</strong>, not to any user&apos;s balance. 
This ensures that the newly minted tokens are part of the contract&apos;s 
holdings and can later be distributed, sold, or used as specified in the 
contract logic.

<br /><br />

<strong>Function Breakdown:</strong> 
<ul>
  <li>
    <code>external onlyOwner</code>: The <code>external</code> modifier 
    specifies that the function can only be called from outside the 
    contract. The <code>onlyOwner</code> modifier restricts access 
    to the <strong>owner</strong> of the contract, ensuring that 
    no other address can mint tokens. This is typically implemented 
    using OpenZeppelin&apos;s <code>Ownable</code> contract.
  </li>
  <li>
    <code>_mint(address(this), amount)</code>: This calls the internal 
    <code>_mint</code> function to create <code>amount</code> of new 
    tokens. These tokens are credited to the <code>contract&apos;s address 
    (address(this))</code>, effectively adding them to the contract&apos;s 
    balance.
  </li>
  <li>
    <code>emit TokensMinted(address(this), amount)</code>: This triggers 
    an <strong>event</strong> called <code>TokensMinted</code>, logging 
    the action on the blockchain. It records that the contract 
    (<code>address(this)</code>) received the minted tokens and specifies 
    the <code>amount</code> minted. Events help track state changes and 
    enable external systems to monitor contract activity.
  </li>
</ul>

<br /><br />

<strong>Use Cases:</strong> 
<ul>
  <li>
    <strong>Controlled Supply Expansion:</strong> The function allows the 
    contract to increase the token supply in a controlled manner for 
    specific purposes like rewarding users, funding a project, or 
    maintaining liquidity.
  </li>
  <li>
    <strong>Ecosystem Support:</strong> Minted tokens go to the 
    contract&apos;s balance and can later be distributed to users 
    through airdrops, faucets, or staking rewards.
  </li>
</ul>

<br /><br />

<strong>Security Mechanisms:</strong> 
<ul>
  <li>
    The <code>onlyOwner</code> modifier ensures that only the contract 
    owner has minting privileges, protecting against unauthorized or 
    malicious actions.
  </li>
  <li>
    Restricting minted tokens to <code>address(this)</code> prevents 
    tokens from being directly minted to arbitrary addresses, minimizing 
    risks of abuse.
  </li>
</ul>

<br /><br />

<strong>Example Scenario:</strong> In a decentralized application (dApp), 
the owner might use the <code>mint</code> function to create additional 
tokens to reward users for staking, participating in governance, or 
completing tasks within the ecosystem.

<br /><br />

This implementation aligns with good tokenomics by expanding the token 
supply in a <strong>controlled and transparent manner</strong>. Minted 
tokens remain in the contract&apos;s custody until they are intentionally 
distributed, adding a layer of <strong>accountability</strong>.
</div>
              </>
            )}
            {selectedSection === "lastCoinRule" && (
              <>
                <p>
                  <strong>Last Coin Rule:</strong> A distinctive feature of
                  Xennium is the &apos;Last coin cannot be spent&apos; rule.
                </p>
                <div className="mt-8 pb-10">
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
    </p>
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
                </li>
                <li>
                  <code>mint</code>: Enables the owner to mint additional
                  tokens, which are directly added to the contract&apos;s
                  balance.
                </li>
                </ul>
                <div className="mt-8 pb-10">
                  <CodeSnippet code={codeSnippets.functions} />
                </div>
                <div className="pb-24">

<strong>Function Breakdown:</strong>
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
  <br />
  <li>
    <code>mint(address to, uint256 amount)</code>: 
    <ul>
      <li>
        Creates a specified <code>amount</code> of new tokens and credits them 
        to the <code>to</code> address.
      </li>
      <li>
        Only accessible by authorized roles (e.g., the contract owner) and emits 
        a <code>TokensMinted</code> event to record the action.
      </li>
    </ul>
  </li>
</ul>

<br /><br />

<strong>Additional ERC-20 Functions:</strong>
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

<strong>ERC-20 Permit Extensions:</strong>
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

<strong>Security Mechanisms:</strong>
<ul>
  <li>
    <code>mint</code> functions are typically restricted to the owner or a trusted 
    role to prevent unauthorized token creation.
  </li>
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

<strong>Example Scenarios:</strong>
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

This implementation aligns with ERC-20 standards and extensions, ensuring a 
<strong>robust and flexible</strong> token design suitable for various use cases.

                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      
      <Footer />
    </div>
  );
}