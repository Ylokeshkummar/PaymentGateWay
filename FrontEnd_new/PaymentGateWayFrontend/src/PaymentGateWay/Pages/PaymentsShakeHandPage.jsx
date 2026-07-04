import React from 'react'

const PaymentsShakeHandPage = () => {
  return (
    <div className="Test_Payment_gateWay">
      <h2>Payment GateWay Request Params need to be passed from Third Party</h2>

      {/* Business Details */}
      <section class="payment-params">
        <h3>Payment Parameters</h3>
        <input
          type="text"
          placeholder="API KEY"
          onChange={(e) => handleChange("apiKey", e.target.value)}
        />
        <input
          type="text"
          placeholder="Bill Amount"
          onChange={(e) => handleChange("billAmount", e.target.value)}
        />
        <input
          type="text"
          placeholder="Bill Name"
          onChange={(e) => handleChange("bill Name", e.target.value)}
        />

      {/* GST Taxpayer Details */}
        
        <input
          type="text"
          placeholder="Payment from Primary Key"
          onChange={(e) => handleChange("PayeeId", e.target.value)}
        />
        <input
          type="text"
          placeholder="contactNo"
          onChange={(e) => handleChange("contactNo", e.target.value)}
        />
        {/* Add other GST fields as needed */}

      {/* Principal Place */}
        <input
          type="text"
          placeholder="Email Id"
          onChange={(e) => handleChange("emailId", e.target.value)}
          
        />
        {/* Add other principal place fields */}
      </section>

      {/* Additional Place */}


      {/* Bank Details */}
      
      {/* Single Save/Update Button */}
      <div className="form-actions">
        <button >Start Payment </button>
      </div>
    </div>
  )
}

export default PaymentsShakeHandPage