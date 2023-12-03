import * as React from "react";

// importing material UI components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";

export default function Header1() {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.setItem('jsonwebtoken', null)
        navigate("/login");
    }
   
    return (
        <AppBar position="static">
            <Toolbar>
                {/*Inside the IconButton, we 
                    can render various icons*/}
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                >
                    {/*This is a simple Menu 
                      Icon wrapped in Icon */}
                    <MenuIcon />
                </IconButton>
                {/* The Typography component applies 
                     default font weights and sizes */}

                <Typography
                    variant="h6"
                    component="div"
                    sx={{ flexGrow: 1 }}
                >

                </Typography>
                <Button onClick={handleLogout} color="inherit">Logout</Button>
            </Toolbar>
        </AppBar>
    );
}