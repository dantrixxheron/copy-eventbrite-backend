import mongoose from "mongoose";
import {env } from '../config/env.js';

export async function connectMongo() {
    const uri=env.mongoUri;
    if(!uri) throw new Error("Mongo URI not provided");
    mongoose.set('strictQuery', true);
    await mongoose.connect(uri, {autoIndex:true});
    console.log("[DB] Connected to MongoDB");
}