/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Container, Box, Typography, Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";

const Campaign = () => {
    console.log('hello')
    const [campaign, setCampaign] = useState([]);
    const [email, setEmail] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Make a GET request to your API endpoint with the campaign_id
        fetch(`http://localhost:3001/campaign`)
            .then((response) => response.json())
            .then((data) => {
                setCampaign(data);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                console.error("Error fetching data:", error);
            });
    }, []);

    

    if (loading) {
        return <p>Loading...</p>; // Render a loading message or spinner
    }

    return (
        campaign.map((item) => (
            <Container
                maxWidth="xl"
                sx={{
                    display: "flex",
                    p: "30px",
                    minWidth: "100%",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "50%",
                        p: "30px",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "flex-start",
                            gap: "10px",
                        }}
                    >
                        <Typography variant="h3" sx={{ mb: "20px" }}>
                            Welcome Harold!
                        </Typography>
                        <Typography variant="h6" component="p">
                            <b>Email:</b> 
                        </Typography>

                        <table style={{ width: "65%", borderCollapse: "collapse" }}>
                            <thead>
                                <tr>
                                    <th style={{ border: "1px solid #dddddd", padding: "10px" }}>
                                        Title
                                    </th>
                                    <th style={{ border: "1px solid #dddddd", padding: "10px" }}>
                                        Donation
                                    </th>
                                    <th style={{ border: "1px solid #dddddd", padding: "10px" }}>
                                        Date
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {campaign.map((donor) => (
                                    <tr key={donor.Date}>
                                        <td
                                            style={{
                                                border: "1px solid #dddddd",
                                                textAlign: "center",
                                                padding: "10px",
                                            }}
                                        >
                                            {donor.Title}
                                        </td>
                                        <td
                                            style={{
                                                border: "1px solid #dddddd",
                                                textAlign: "center",
                                                padding: "10px",
                                            }}
                                        >
                                            ${donor.Donors.donation}
                                        </td>
                                        <td
                                            style={{
                                                border: "1px solid #dddddd",
                                                textAlign: "center",
                                                padding: "10px",
                                            }}
                                        >
                                            {new Date(donor.Donors.Date).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>.
                        </table>
                    </Box>
                </Box>
            </Container>
        ))
    );
};

export default Campaign;



