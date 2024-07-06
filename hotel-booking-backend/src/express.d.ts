// src/express.d.ts

import { Request } from 'express';

declare module 'express' {
        interface Request {
                userId?: string; // Define your custom property here
        }
}
