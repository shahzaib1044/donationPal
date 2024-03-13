const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();
const cors = require('cors');

app.use(cors({
  
}));
// Database connection
const uri = 'mongodb+srv://shahzebraheel61:shahzaib1044@cluster0.luve38r.mongodb.net/?retryWrites=true&w=majority&ssl=true';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  }); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json("Hello");
});

const SignupSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    address: String,
  });
const Signup = mongoose.model('Signup', SignupSchema);

app.post('/Signup', async (req, res) => {
  try {
    let newSignup = new Signup({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      address: req.body.address
    });

    newSignup = await newSignup.save();
    
    res.send(newSignup);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
});

app.post('/Login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const signup = await Signup.findOne({ email, password });

    if (signup) {
      // Signin successful
      const userCampaigns = await Campaign.find({ 'Donors.Donor': signup.name });

      res.status(200).json({
        message: 'Login successful',
        user: {
          name: signup.name,
          email: signup.email,
          address: signup.address,
        },
        campaigns: userCampaigns
      });
    } else {
      // Signin failed
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
});


const CampaignSchema = new mongoose.Schema({
    Title: String,
    Goal: String,
    CurrentDonationTotal: Number,
    Donors: [
      {
        Donor: String,
        Donation: Number,
        Date: Date,
      }
    ],
    id: Number,
  });

  
  const Campaign = mongoose.model('Campaign', CampaignSchema);
    const campaignData = [
      /*  {
            Title: 'Help a Veteran with unexpected medical Costs',
            Goal: '$ 49,300',
            CurrentDonationTotal: 11250,
            Donors: [
              {
                Donor: 'Harold Perry',
                Donation: 400,
                Date: new Date(),
              },
              {
                Donor: 'Shirley Smith',
                Donation: 100,
                Date: new Date(),
              },
            ],
            id: 1,
          },
          {
            Title: 'Help a Single Mother',
            Goal: '$ 54,300',
            CurrentDonationTotal: 10250,
            Donors: [
              {
                Donor: 'Harold Perry',
                Donation: 600,
                Date: new Date(),
              },
              {
                Donor: 'Shirley Smith',
                Donation: 700,
                Date: new Date(),
              },
            ],
            id: 2,
          }*/
      ];
      
      // Insert both campaigns into the database
      Campaign.insertMany(campaignData)
        .then(() => {
          console.log('Campaigns saved successfully');
        })
        .catch((error) => {
          console.error('Error saving campaigns:', error);
        });
      
        app.get('/campaign', async (req, res) => {
          try {
           
            const campaigns = await Campaign.find({ });
        
            res.json(campaigns);
          } catch (error) {
            console.error('Error fetching campaigns:', error);
            res.status(500).json({ error: 'Internal Server Error' });
          }
        });
        app.get('/camp', async (req, res) => {
          try {
            const Name = 'Harold Perry'; // You can also get this from req.query or req.params
        
            // Use the donorName to filter campaigns
            const signup = await Signup.find({ 'email': Name });
        
            res.json(signup);
          } catch (error) {
            console.error('Error fetching campaigns:', error);
            res.status(500).json({ error: 'Internal Server Error' });
          }
        });
const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
