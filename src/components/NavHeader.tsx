"use client";
import React, { useState } from "react";
import {
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Avatar,
  Button,
  Menu,
  MenuItem,
  Badge,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import FlagIcon from "@mui/icons-material/Flag";

const NavHeader: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [langAnchorEl, setLangAnchorEl] = useState<null | HTMLElement>(null);

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLangClick = (event: React.MouseEvent<HTMLElement>) => {
    setLangAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setLangAnchorEl(null);
  };

  return (
    <Box className="h-16 bg-white border-b border-gray-200 px-4 md:px-6 flex items-center justify-between">
      {/* Left side - Dashboard title (hidden on mobile) */}
      <Typography
        variant="h4"
        className="hidden md:block text-gray-900 font-bold ml-5"
      >
        Dashboard
      </Typography>

      {/* Right side - Search, Language, Notifications, Profile */}
      <div className="flex items-center gap-2 md:gap-4 w-full md:w-auto justify-between md:justify-end">
        {/* Search bar - responsive width */}
        <TextField
          placeholder="Search here..."
          variant="outlined"
          size="small"
          sx={{
            width: { xs: "100%", sm: 250, md: 300 },
            maxWidth: { xs: 250 },
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px",
              backgroundColor: "#F8F9FA",
              border: "none",
              "& fieldset": {
                border: "none",
              },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "#9CA3AF" }} />
              </InputAdornment>
            ),
          }}
        />

        {/* Language selector (hidden on mobile) */}
        <Button
          onClick={handleLangClick}
          className="hidden md:flex items-center gap-2 text-gray-700 hover:bg-gray-100 rounded-lg px-3 py-2"
          sx={{
            textTransform: "none",
            color: "#374151",
            "&:hover": { backgroundColor: "#F3F4F6" },
          }}
        >
          <span className="text-xl">🇺🇸</span>
          <span className="font-medium">Eng (US)</span>
          <KeyboardArrowDownIcon fontSize="small" />
        </Button>

        <Menu
          anchorEl={langAnchorEl}
          open={Boolean(langAnchorEl)}
          onClose={handleClose}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem onClick={handleClose}>🇺🇸 Eng (US)</MenuItem>
          <MenuItem onClick={handleClose}>🇪🇸 Spanish</MenuItem>
          <MenuItem onClick={handleClose}>🇫🇷 French</MenuItem>
        </Menu>

        {/* Notifications (hidden on mobile) */}
        <IconButton
          className="hidden md:flex"
          sx={{
            backgroundColor: "#F8F9FA",
            "&:hover": { backgroundColor: "#E5E7EB" },
          }}
        >
          <Badge badgeContent={1} color="error" variant="dot">
            <NotificationsOutlinedIcon sx={{ color: "#6B7280" }} />
          </Badge>
        </IconButton>

        {/* Profile - simplified on mobile */}
        <Button
          onClick={handleProfileClick}
          className="flex items-center gap-2 md:gap-3 hover:bg-gray-100 rounded-lg p-1 md:p-2"
          sx={{
            textTransform: "none",
            "&:hover": { backgroundColor: "#F3F4F6" },
            minWidth: "auto",
          }}
        >
          <Avatar
            src="/api/placeholder/40/40"
            sx={{ width: { xs: 32, md: 40 }, height: { xs: 32, md: 40 } }}
          />
          <div className="hidden md:block text-left">
            <div className="font-semibold text-gray-900">Musfiq</div>
            <div className="text-sm text-gray-500">Admin</div>
          </div>
          <KeyboardArrowDownIcon
            sx={{
              color: "#6B7280",
              display: { xs: "none", sm: "block" },
            }}
          />
        </Button>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>Settings</MenuItem>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>
      </div>
    </Box>
  );
};

export default NavHeader;
