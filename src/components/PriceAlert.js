import React, { useState } from "react";
import { TextField, Button, Select, MenuItem, Typography, Paper, Box } from "@mui/material";

const PriceAlert = () => {
  const [product, setProduct] = useState("");
  const [currentPrice, setCurrentPrice] = useState("");
  const [targetPrice, setTargetPrice] = useState("");
  const [alertType, setAlertType] = useState("email");

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Price alert created for ${product} at $${targetPrice}`);
  };

  return (
    <Box className="form-and-image-container">
      {/* Price Alert Form */}
      <Paper elevation={3} className="form-container">
        <Typography variant="h5" gutterBottom>Create Price Alert</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Product Name"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Current Price"
            type="number"
            value={currentPrice}
            onChange={(e) => setCurrentPrice(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Target Price"
            type="number"
            value={targetPrice}
            onChange={(e) => setTargetPrice(e.target.value)}
            margin="normal"
            required
          />
          <Select
            fullWidth
            value={alertType}
            onChange={(e) => setAlertType(e.target.value)}
            displayEmpty
            required
            sx={{ marginTop: 2 }}
          >
            <MenuItem value="email">Email</MenuItem>
            <MenuItem value="phone">Phone Number</MenuItem>
            <MenuItem value="both">Both</MenuItem>
          </Select>
          <Button type="submit" variant="contained" fullWidth sx={{ marginTop: 2 }}>
            Create Alert
          </Button>
        </form>
      </Paper>

      {/* Image Container */}
      <Box className="image-container">
        <img 
          src="https://www.apple.com/v/iphone/home/cb/images/overview/welcome/us/welcome_startframe__bqlrw3voffaq_xlarge.jpg" 
          alt="Product Preview"
        />
      </Box>
    </Box>
  );
};

export default PriceAlert;
