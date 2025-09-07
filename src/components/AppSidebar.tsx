"use client"
import React, { useState } from "react";
import { Box, Button, Avatar, IconButton, Drawer } from "@mui/material";
import PieChartIcon from "@mui/icons-material/PieChart";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import LinkIcon from "@mui/icons-material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const navItems = [
  {
    label: "Dashboard",
    icon: <PieChartIcon />,
    active: true,
  },
  {
    label: "Leaderboard",
    icon: <LeaderboardIcon />,
  },
  {
    label: "order",
    icon: <ShoppingCartIcon />,
  },
  {
    label: "Products",
    icon: <Inventory2OutlinedIcon />,
  },
  {
    label: "Sales Report",
    icon: <ShowChartIcon />,
  },
  {
    label: "Messages",
    icon: <MessageOutlinedIcon />,
  },
  {
    label: "Settings",
    icon: <SettingsOutlinedIcon />,
  },
  {
    label: "Sign Out",
    icon: <LogoutOutlinedIcon />,
  },
];

const AppSidebar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const sidebarContent = (
    <Box className="h-full w-72 bg-white flex flex-col justify-between py-6 px-4">
      {/* Close button for mobile */}
      <div>
        <div className="flex items-center justify-between mb-8 md:justify-start">
          <div className="flex items-center gap-3">
            <Avatar sx={{ bgcolor: "#635BFF", width: 48, height: 48 }}>
              <LinkIcon />
            </Avatar>
            <span className="text-2xl font-bold text-gray-900">Dabang</span>
          </div>
          <IconButton
            onClick={handleDrawerToggle}
            className="md:hidden"
            sx={{ color: "#6B7280" }}
          >
            <CloseIcon />
          </IconButton>
        </div>
        {/* Navigation */}
        <nav className="flex flex-col gap-2">
          {navItems.map((item, idx) => (
            <Button
              key={item.label}
              startIcon={item.icon}
              onClick={() => setMobileOpen(false)}
              className={`justify-start rounded-xl px-4 py-3 text-base capitalize font-medium ${
                item.active
                  ? "bg-[#635BFF] text-white shadow-lg"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
              disableElevation
              fullWidth
              sx={{
                textTransform: "none",
                justifyContent: "flex-start",
                fontWeight: 500,
                fontSize: "1rem",
                mb: idx === 0 ? 4 : 0,
                boxShadow: item.active ? 3 : 0,
                bgcolor: item.active ? "#635BFF" : "transparent",
                color: item.active ? "#fff" : "#6B7280",
                "&:hover": {
                  bgcolor: item.active ? "#635BFF" : "#F3F4F6",
                },
              }}
            >
              {item.label}
            </Button>
          ))}
        </nav>
      </div>
      {/* Pro Card */}
      <div className="mt-8 p-5">
        <div className="bg-[#635BFF] rounded-2xl p-6 flex flex-col items-center text-white">
          <Avatar sx={{ bgcolor: "#fff", color: "#635BFF", mb: 2 }}>
            <LinkIcon />
          </Avatar>
          <div className="font-semibold text-lg mb-1">Dabang Pro</div>
          <div className="text-sm mb-4 text-center opacity-80">
            Get access to all features on tetumbas
          </div>
          <Button
            variant="contained"
            sx={{
              bgcolor: "#fff",
              color: "#635BFF",
              textTransform: "none",
              fontWeight: 600,
              borderRadius: "12px",
              px: 3,
              py: 1,
              
              boxShadow: 0,
              "&:hover": { bgcolor: "#F3F4F6" },
            }}
          >
            Get Pro
          </Button>
        </div>
      </div>
    </Box>
  );

  return (
    <>
      {/* Hamburger menu button for mobile */}
      <IconButton
        onClick={handleDrawerToggle}
        className="md:hidden fixed top-4 left-4 z-50 bg-white shadow-md"
        sx={{
          bgcolor: "#fff",
          boxShadow: 2,
          "&:hover": { bgcolor: "#F3F4F6" },
        }}
      >
        <MenuIcon />
      </IconButton>

      {/* Desktop sidebar */}
      <Box className="hidden md:block h-screen border-r border-gray-200">
        {sidebarContent}
      </Box>

      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 288,
            border: "none",
          },
        }}
      >
        {sidebarContent}
      </Drawer>
    </>
  );
};

export default AppSidebar;
