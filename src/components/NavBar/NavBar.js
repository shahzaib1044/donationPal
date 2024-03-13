import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Container, Button } from "@mui/material";
import MobileNav from "./MobileNav";
import DesktopNav from "./DesktopNav";

const Header = ({ isLoggedIn, setIsLoggedIn }) => {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const navigate = useNavigate();

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleLogout = () => {
        // Perform logout actions (e.g., clear user session, update state)
        setIsLoggedIn(false);
        // Navigate to the campaignList page
        navigate("/campaignList");
    };

    return (
        <AppBar
            position="static"
            sx={{
                background: "transparent",
                width: "50%",
                boxShadow: "none",
            }}
        >
            <Container
                maxWidth="lg"
                sx={{
                    p: "15px",
                    pl: "5px",
                }}
            >
                <Toolbar>
                    {/** Mobile View of Header **/}
                    <MobileNav
                        anchorElNav={anchorElNav}
                        handleOpenNavMenu={handleOpenNavMenu}
                        handleCloseNavMenu={handleCloseNavMenu}
                    />

                    {/** Desktop View of Header **/}
                    <DesktopNav handleCloseNavMenu={handleCloseNavMenu} isLoggedIn={isLoggedIn} />

                    {/** Conditional rendering based on login state **/}
                    {isLoggedIn ? (
                        <Button color="inherit" onClick={handleLogout}>
                            Logout
                        </Button>
                    ) : (
                        <Button color="inherit" onClick={() => navigate("/login")}>
                            Login
                        </Button>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;



