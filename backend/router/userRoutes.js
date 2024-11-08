//this folder handles every routes for the iser controllers
import express from "express";
import {register} from '../controllers/userController.js';


const app = express.Router();

router.post("/register",register);


