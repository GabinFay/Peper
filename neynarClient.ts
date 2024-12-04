import { NeynarAPIClient } from "@neynar/nodejs-sdk";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Retrieve the API key from environment variables
const apiKey = process.env.NEYNAR_API_KEY;

// Ensure the API key is defined
if (!apiKey) {
  throw new Error("Please set the NEYNAR_API_KEY in your .env file");
}

// Initialize the Neynar API client
const neynarClient = new NeynarAPIClient(apiKey);

export default neynarClient;
