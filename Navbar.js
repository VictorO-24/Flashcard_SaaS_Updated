import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { AppBar, Toolbar, Button } from "@mui/material";
import Link from 'next/link';

const Navbar = () => (
  <AppBar position="static">
    <Toolbar>
      <SignedOut>
        <Link href="/login" passHref>
          <Button color="inherit">Login</Button>
        </Link>
        <Link href="/signup" passHref>
          <Button color="inherit">Sign Up</Button>
        </Link>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </Toolbar>
  </AppBar>
);

export default Navbar;
