/**
 * This module must be the FIRST import in server.ts.
 * It loads the .env file before any other module (including prisma)
 * is initialised. In ESM, all imports are hoisted so we cannot call
 * dotenv.config() inline — instead we load it inside this side-effect module.
 */
import dotenv from 'dotenv';
dotenv.config();
