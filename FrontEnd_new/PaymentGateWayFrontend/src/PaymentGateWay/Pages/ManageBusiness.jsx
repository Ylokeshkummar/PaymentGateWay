import React, { useState, useEffect } from "react";
const user = JSON.parse(localStorage.getItem("user"));

const ManageBusiness = () => {
  const [formData, setFormData] = useState({
    bussinessId:user.userId,
    bussinessName: "",
    ownerName: "",
    gstNumber: "",
    gstName: "",
    tradeName: "",
    Address: "",
    bankName: "",
    bankAccountType:"",
    bnkAccountNumber: "",
    ifscCode: "",
    apiKey: "",
    ipAddress: "",
    paymentsEnabled: false
  });

  const [isUpdate, setIsUpdate] = useState(false);

  // Load existing data when Manage Business page opens
  useEffect(() => {
    const fetchData = async () => {
      try {
       const user = JSON.parse(localStorage.getItem("user"));
        const res = await fetch("http://16.16.185.214:8081/ManageBussiness/getDetails",{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify( user.userId ),
      });
        if (res.ok) {
          const data = await res.json();
          if (data) {
            setFormData(data);
            setIsUpdate(true);
          }
        }
      } catch (err) {
        console.error("Error fetching business details:", err);
      }
    };
    fetchData();
  }, []);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleNestedChange = (section, field, value) => {
    setFormData({
      ...formData,
      [section]: { ...formData[section], [field]: value }
    });
  };

  const handleSubmit = async () => {
    const url = isUpdate
      ? "http://16.16.185.214:8081/ManageBussiness/saveBussinessDetails"
      : "http://16.16.185.214:8081/ManageBussiness/saveBussinessDetails";
    console.log(formData);
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        alert(isUpdate ? "Business details updated!" : "Business details saved!");
      }
    } catch (err) {
      console.error("Error saving/updating business details:", err);
    }
  };

  return (
    <div className="manage-business">
      <h2>Manage Business</h2>

      {/* Business Details */}
      <section>
        <h3>Business Details</h3>
        <input
          type="text"
          placeholder="Business Name"
          value={formData.bussinessName}
          onChange={(e) => handleChange("bussinessName", e.target.value)}
        />
        <input
          type="text"
          placeholder="Owner Name"
          value={formData.ownerName}
          onChange={(e) => handleChange("ownerName", e.target.value)}
        />
        <input
          type="text"
          placeholder="GST Number"
          value={formData.gstNumber}
          onChange={(e) => handleChange("gstNumber", e.target.value)}
        />
      </section>

      {/* GST Taxpayer Details */}
      <section>
        <h3>GST Taxpayer Details</h3>
        <input
          type="text"
          placeholder="gst Name"
          value={formData.gstName}
          onChange={(e) => handleChange("gstName", e.target.value)}
        />
        <input
          type="text"
          placeholder="Trade Name"
          value={formData.tradeName}
          onChange={(e) => handleChange("tradeName", e.target.value)}
        />
        {/* Add other GST fields as needed */}
      </section>

      {/* Principal Place */}
      <section>
        <h3>Principal Place of Business</h3>
        <input
          type="text"
          placeholder="Adress"
          value={formData.Address}
          onChange={(e) => handleChange("Address", e.target.value)}
          
        />
        {/* Add other principal place fields */}
      </section>

      {/* Additional Place */}


      {/* Bank Details */}
      <section>
        <h3>Bank Details</h3>
        <input
          type="text"
          placeholder="Bank Name"
          value={formData.bankName}
          onChange={(e) => handleChange("bankName", e.target.value)}
        />
        <input
          type="text"
          placeholder="Account Number"
          value={formData.bnkAccountNumber}
          onChange={(e) => handleChange("bnkAccountNumber", e.target.value)}
        />
        <input
          type="text"
          placeholder="IFSC Code"
          value={formData.ifscCode}
          onChange={(e) => handleChange("ifscCode", e.target.value)}
        />
      </section>

      {/* API Configs */}
      <section>
        <h3>API Registration</h3>
        <input
          type="text"
          placeholder="API Key"
          value={formData.apiKey}
          onChange={(e) => handleChange("apiKey", e.target.value)}
        />

        <input
          type="text"
          placeholder="IP Address"
          value={formData.ipAddress}
          onChange={(e) => handleChange("ipAddress", e.target.value)}
        />
      </section>

      {/* Payments Toggle */}
      <section>
        <h3>Payments</h3>
        <button
          onClick={() =>
            handleChange("paymentsEnabled", !formData.paymentsEnabled)
          }
        >
          {formData.paymentsEnabled ? "Disable Payments" : "Enable Payments"}
        </button>
      </section>

      {/* Single Save/Update Button */}
      <div className="form-actions">
        <button onClick={handleSubmit}>
          {isUpdate ? "Update All Details" : "Save All Details"}
        </button>
      </div>
    </div>
  );
};

export default ManageBusiness;
