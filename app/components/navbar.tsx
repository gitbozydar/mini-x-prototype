import { Avatar, Button } from "@mui/material";
import Link from "next/link";
import AddIcon from "@mui/icons-material/Add";
import { useAuth } from "@/lib/context/AuthContext";

const Navbar = () => {
  const { isLoggedIn, user, logout } = useAuth();

  return (
    <nav className="p-5 flex justify-between bg-black border-b border-b-gray-900">
      <div className="flex gap-5 items-center">
        <Link href="/" className="font-medium ">
          Strona główna
        </Link>
        <Link href="/feed" className="font-medium">
          Posty
        </Link>
        <Link href="/add-post" className="font-medium">
          <Button size="small" variant="outlined" color="success">
            <AddIcon />
          </Button>
        </Link>
      </div>

      <div className="flex gap-6">
        {isLoggedIn && (
          <div className="flex items-center gap-3">
            <Avatar />
            <p> {user?.username}</p>
          </div>
        )}
        {isLoggedIn && <Button onClick={() => logout()}>Log out</Button>}
      </div>
    </nav>
  );
};
export default Navbar;
