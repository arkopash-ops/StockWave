import type { Request, Response, NextFunction } from "express";
import * as AssetService from "../services/assets.service.js"

export const _registerAssets = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const asset = await AssetService.registerAssets(req.body);
        res.status(201).json({
            success: true,
            asset
        });
    } catch (error) {
        next(error);
    }
}


export const _allAssets = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const assets = await AssetService.allAssets();
        res.status(200).json({
            success: true,
            assets
        });
    } catch (error) {
        next(error);
    }
}
