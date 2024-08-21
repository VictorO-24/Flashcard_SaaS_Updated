"use client";

import { useState } from "react";
import { initiatePayment } from "@/utils/paystack";
import { SignedIn, SignedOut, UserButton, useAuth } from "@clerk/nextjs";
import { AppBar, Toolbar, Typography, Container, Button, Box, Grid, Dialog, DialogContent, DialogActions } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false); // State to manage popup visibility
  const { isSignedIn } = useAuth(); // Get the signed-in status
  const router = useRouter();

  const handlePayment = (amount, email) => {
    setLoading(true);
    initiatePayment(
      email,
      amount * 160000,
      (transaction) => {
        alert(`Payment complete! Reference: ${transaction.reference}`);
        setLoading(false);
      },
      () => {
        alert('Transaction was not completed.');
        setLoading(false);
      }
    );
  };

  const handleGetStarted = () => {
    if (!isSignedIn) {
      setOpen(true); // Open popup if not signed in
    } else {
      router.push("/generate"); // Redirect to generate page if signed in
    }
  };

  const handleClose = () => {
    setOpen(false); // Close the popup
  };

  return (
    <Container maxWidth="100vw">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>Flashcard SaaS</Typography>
          <SignedOut>
            <Button color="inherit" href="/sign-in">Login</Button>
            <Button color="inherit" href="/sign-up">Sign Up</Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>

      <Box sx={{ textAlign: "center", my: 4 }}>
        <Typography variant="h2" gutterBottom>Welcome to Flashcard SaaS</Typography>
        <Typography variant="h5" gutterBottom>The easiest way to make flashcards from your text</Typography>
        <Button 
          variant="contained" 
          color="primary" 
          sx={{ mt: 2 }} 
          onClick={handleGetStarted} 
        >
          Get Started
        </Button>
      </Box>

      <Box sx={{ my: 6 }}>
        <Typography variant="h4" component="h2" gutterBottom>Features</Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>Easy Text Input</Typography>
            <Typography>Simply input your text and let our software do the rest. Creating flashcards has never been easier.</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>Smart Flashcards</Typography>
            <Typography>Our AI intelligently breaks down your text into concise flashcards, perfect for studying.</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>Accessible Anywhere</Typography>
            <Typography>Access your flashcards from any device, at any time. Study on the go with ease.</Typography>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ my: 6, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>Pricing</Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box sx={{ p: 3, border: "1px solid", borderColor: "grey.300", borderRadius: 2 }}>
              <Typography variant="h5" gutterBottom>Basic</Typography>
              <Typography variant="h6" gutterBottom>$5 / month</Typography>
              <Typography>Access to basic flashcard features and limited storage.</Typography>
              <Button 
                variant="contained" 
                color="primary" 
                sx={{ mt: 2 }} 
                onClick={() => handlePayment(5, 'user@example.com')}
                disabled={loading}
              >
                Choose Basic
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ p: 3, border: "1px solid", borderColor: "grey.300", borderRadius: 2 }}>
              <Typography variant="h5" gutterBottom>Pro</Typography>
              <Typography variant="h6" gutterBottom>$10 / month</Typography>
              <Typography>Unlimited flashcards and storage, with priority support.</Typography>
              <Button 
                variant="contained" 
                color="primary" 
                sx={{ mt: 2 }} 
                onClick={() => handlePayment(10, 'user@example.com')}
                disabled={loading}
              >
                Choose Pro
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Popup Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <Typography variant="body1">Please sign in to get started with generating flashcards.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button href="/sign-in" color="primary">Sign In</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
