import React from "react";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import avatar from "./img.png";
import offer from "./img.jpg";

const steps = [
  {
    id: "0",
    message: "Welcome to CarSelecta!",
    trigger: "username",
  },
  {
    id: "username",
    message: "Could you please tell me your name?",
    trigger: "getName",
  },
  {
    id: "getName",
    user: true,
    trigger: "mainMenu",
  },
  {
    id: "mainMenu",
    message: "Hi {previousValue}, how may I assist you today?",
    trigger: "options",
  },
  {
    id: "options",
    options: [
      { value: 1, label: "Car Information", trigger: "carInfo" },
      { value: 2, label: "Technical Support", trigger: "Support" },
      { value: 3, label: "Contact Us", trigger: "contact" },
      { value: 4, label: "Explore More", trigger: "moreOptions" }, // New option
    ],
  },
  {
    id: "carInfo",
    message: "Would you like to know about our latest cars or offers?",
    trigger: "carinfo options",
  },
  {
    id: "carinfo options",
    // message: "Would you like to know about our latest cars or offers?",
    options: [
      {
        value: "latest",
        label: "Company wise Latest Cars",
        trigger: "CompanywiselatestCars",
      },
      { value: "offers", label: "Special Offers", trigger: "specialOffers" },
      { value: "back", label: "Go Back", trigger: "mainMenu" },
    ],
  },
  {
    id: "CompanywiselatestCars",
    message:
      "You can check each company wise latest cars on our website by clicking on the link below.",
    trigger: "latestCarsoptions",
  },
  {
    id: "latestCarsoptions",

    component: (
      <div>
        You can view company wise cars by visiting below page:
        <a href="http://localhost:3000/carpreviewascompany">
          Click here to go to Company Wise latest cars
        </a>
      </div>
    ),
    asMessage: true,
    trigger: "carInfo",
  },
  {
    id: "specialOffers",
    component: (
      <div>
        Check out our amazing offers by visiting your favourite cars to
        make your driving dreams come true! 🚗💨
        <img
          src={offer} // Add the URL of your special offer image here
          alt="Special Offers"
          style={{ maxWidth: "100%", marginTop: "10px" }}
        />
      </div>
    ),
    asMessage: true,
    trigger: "carInfo",
  },
  {
    id: "Support",
    message: "What issue are you facing?",
    trigger: "Support options",
  },
  {
    id: "Support options",
    //message: "What issue are you facing?",
    options: [
      { value: "login", label: "Login Issues", trigger: "loginIssues" },
      { value: "search", label: "Search Issues", trigger: "searchIssues" },
      { value: "back", label: "Go Back", trigger: "mainMenu" },
    ],
  },
  {
    id: "loginIssues",
    component: (
      <span>
        For login issues, please contact our support at{" "}
        <a href="mailto:support@carselecta.com">support@carselecta.com</a>.
      </span>
    ),
    trigger: "Support",
  },
  {
    id: "searchIssues",
    message:
      "For search-related issues, please clear your cache or try again later.",
    trigger: "Support",
  },
  {
    id: "contact",
    message:
      "You can reach us at contact@carselecta.com or call us at +1234567890.",
    trigger: "mainMenu",
  },
  {
    id: "moreOptions",
    message: "Great! Here are some more options for you:",
    trigger: "moreOptions options",
  },
  {
    id: "moreOptions options",
    // message: "Great! Here are some more options for you:",
    options: [
      {
        value: "profilemanage",
        label: "Manage Profile",
        trigger: "profilemanage",
      },
      {
        value: "userReviews",
        label: "Know more about us",
        trigger: "userReviews",
      },
      { value: "back", label: "Go Back", trigger: "mainMenu" },
    ],
  },
  {
    id: "profilemanage",
    component: (
      <div>
        You can manage your profile by visiting below page:
        <a href="http://localhost:3000/userprofile">
          Click here to go to manage profile section
        </a>
      </div>
    ),
    asMessage: true,
    trigger: "moreOptions",
  },
  {
    id: "userReviews",
    component: (
      <div>
        🚗 Welcome to CarSelecta.com – Your Car Search Buddy! 🔍📢 Explore
        expert reviews, specs, and prices hassle-free. 🤩🚀 From sedans to SUVs,
        find your dream car with ease! 👑🚗 Created by enthusiasts, for
        enthusiasts. 🌟✨ Start now and drive your dreams! ✨🌟
        <a href="http://localhost:3000/aboutus">Click here to go to link</a>
      </div>
    ),
    asMessage: true,
    trigger: "moreOptions",
  },
];

const theme = {
  background: "#e1e9f0",
  headerBgColor: "#8b459e",
  headerFontSize: "20px",
  botBubbleColor: "#8b459e",
  headerFontColor: "white",
  botFontColor: "white",
  userBubbleColor: "#d9b6ff",
  userFontColor: "black",
};

const config = {
  botAvatar: avatar,
  floating: true,
};

function CarSelectaChatbot() {
  return (
    <div className="floating-chatbot">
      <ThemeProvider theme={theme}>
        <ChatBot headerTitle="CarSelecta Support" steps={steps} {...config} />
      </ThemeProvider>
    </div>
  );
}

export default CarSelectaChatbot;
