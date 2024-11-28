

A distinctive feature of Xennium is the 'Last coin cannot be spent' rule.

### Function Breakdown:

1. **`_safeTransferCheck` function**:  
   This function checks whether the sender is trying to spend the last remaining coin. It verifies if the sender's balance minus the amount they want to transfer is greater than or equal to 1.  
   If not, it triggers an error with the message: `"XENX: Cannot spend the last coin"`.

2. **`transfer` function (overridden)**:  
   This is the standard `transfer` function, but it is overridden to include the check for the last coin rule.  
   Before performing the transfer, the `_safeTransferCheck` function is called to ensure the transaction doesn't violate the last coin rule.  
   If the check passes, it calls the original `super.transfer(to, amount)` function to complete the transfer.

3. **`transferFrom` function (overridden)**:  
   This function works similarly to the `transfer` function, but it allows transfers from an account other than the sender.  
   Like the `transfer` function, it first calls the `_safeTransferCheck` function to validate the last coin rule and proceeds with the `super.transferFrom(from, to, amount)` function if the check passes.
