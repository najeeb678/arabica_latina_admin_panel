
import { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { getUserDetails } from "@/utils/utils";


const ProfileMenu = ({ showText = false }: { showText?: boolean }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [profilePic, setProfilePic] = useState("/images/Ellipse 3.svg");

  useEffect(() => {
    setIsClient(true);
    const user = getUserDetails();
    if (user?.profilePic) {
      setProfilePic(user.profilePic);
    }
  }, []);

  const handleMenuOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSettings = () => {
    handleMenuClose();
    router.push("/settings");
  };

  const handleLogout = () => {
    handleMenuClose();
    localStorage.clear();
    router.push("/authentication/sign-in");
  };

  if (!isClient) return null;

  return (
    <Box>
      {showText ? (
        <Box
          sx={{
            width: "120px",
            padding: "2px 1px",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            "&:hover": {
              backgroundColor: "#F5F5F5",
              "& .icon, & .text": {
                color: "#FBC02D",
              },
            },
          }}
          onClick={handleMenuOpen}
        >
          <IconButton onClick={handleMenuOpen} sx={{ padding: 0 }}>
            <Avatar
              alt="Avatar"
              src={profilePic}
              sx={{
                width: "30.23px",
                height: "30.23px",
                border: "2px solid rgba(251, 192, 45, 1)",
                "&:hover": {
                  borderColor: "rgba(33, 150, 243, 1)",
                },
              }}
            />
          </IconButton>
          <Typography
            className="text"
            sx={{
              fontWeight: "500",
              fontSize: "12px",
              lineHeight: "16.39px",
              color: "#7B7B7B",
              transition: "color 0.3s",
            }}
          >
            Profile
          </Typography>
        </Box>
      ) : (
        <IconButton onClick={handleMenuOpen} sx={{ padding: 0 }}>
          <Avatar
            alt="Avatar"
            src={profilePic}
            sx={{
              width: "40.23px",
              height: "40.23px",
              border: "2px solid rgba(251, 192, 45, 1)",
              "&:hover": {
                borderColor: "rgba(33, 150, 243, 1)",
              },
            }}
          />
        </IconButton>
      )}

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={handleLogout}>
          <Typography variant="body2">Logout</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default ProfileMenu;
