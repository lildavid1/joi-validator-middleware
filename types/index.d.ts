import { Request, Response, NextFunction } from "express";
import { Schema } from "joi";

declare function validate( schema:Record<string, Schema>): (req: Request, res: Response, next: NextFunction) => void

export default validate