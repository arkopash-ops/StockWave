import { AssetTypes } from "../types/assets.types.js";
import type { AssetDocument } from "../model/assets.model.js";


export const getRandomPriceChange = (asset: AssetDocument): number => {
    if (asset.type === AssetTypes.CRYPTO) {
        return +(Math.random() * 10 - 5).toFixed(2);
    } else {
        return +(Math.random() * 4 - 2).toFixed(2);
    }
};


export const calculateNewPrice = (currentPrice: number, changePercent: number): number => {
    const newPrice = currentPrice * (1 + changePercent / 100);
    return Math.max(0, +newPrice.toFixed(2)); // prevent negative prices
};


export const formatAsset = (asset: AssetDocument) => ({
    id: asset._id,
    name: asset.name,
    symbol: asset.symbol,
    type: asset.type,
    price: asset.price,
    change: asset.change,
    createdAt: asset.createdAt,
});
