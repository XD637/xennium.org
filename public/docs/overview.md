

### Algorithm Overview:

- The simulation begins with an `initial value (iv)` of Xennium coins. The **True Value (tv)** starts at 100% and depreciates as coins are spent.
- Spending coins reduces the total balance, but also affects the `tv` based on the percentage spent.
- When only one coin remains, the true value becomes 0%, preventing the last coin from being spent.

### Code Breakdown:

- **`class xennium:`**  
  Represents the Xennium coin system, managing initial value, true value, and depreciation history.

- **`__init__(self, iv):`**  
  Initializes the simulation with the specified `initial value (iv)`, sets the `True Value (tv)` to 100%, and creates a history list to track depreciation over time.

- **`x_algorithm(self):`**  
  The main algorithm that handles user input for spending Xennium coins.
  - Validates the spending value (`sv`) to ensure the user has enough coins.
  - Calculates the depreciation of `tv` based on the percentage of coins spent and updates the remaining balance.
  - Stops execution when only one coin remains and triggers a visualization of the depreciation history.

- **`plot_depreciation(self):`**  
  Visualizes the depreciation of `tv` over time using `matplotlib`.
  - Helps users understand how the true value diminishes with each spend.

### Special Properties of the Algorithm:

- The **True Value** is sensitive to every spend, regardless of how small the amount, demonstrating the inherent volatility of Xennium coins.
- Even with a large initial balance, the algorithm ensures that the last coin cannot be spent, maintaining its unique property of becoming "valueless."
- Tracks and visualizes depreciation, offering an intuitive way to observe the effects of spending behavior on the coin's value.

### Example Scenario:

- **Initial Coins:** A user starts with 10 Xennium coins.
- **Spending:** The user spends 3 coins. The algorithm calculates the percentage spent and reduces the `True Value` accordingly.
- **Final Coin:** As the user continues spending, the remaining coins decrease, and the `True Value` approaches 0% when only one coin remains.

### Visualization:

The algorithm provides a graphical representation of the depreciation history, making it easy to track how spending affects the `True Value` over time.

### Conclusion:

This algorithm highlights the peculiar way Xennium coins behave, where every spend impacts their true value, regardless of the initial balance. It enforces a rule that the last coin becomes "non-spendable," adding a layer of complexity and uniqueness to the coin's usage.
