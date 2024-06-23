
import express from "express";

const app = express();

// Res body middleware
app.use(express.json());

// 
app.listen(4000, async () => {
    console.log(`The server was started on ${4000} port.`);
});