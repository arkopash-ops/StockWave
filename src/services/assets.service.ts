import type { IAssets } from "../types/assets.types.js";
import AssetModel from "../model/assets.model.js";
import { io } from "../server.js";
import { calculateNewPrice, formatAsset, getRandomPriceChange } from "../utils/assets.utils.js";


export const registerAssets = async (data: IAssets) => {
    const asset = new AssetModel(data);
    await asset.save();

    io.emit("asset", formatAsset(asset));
    return asset;
}


export const allAssets = async () => {
    const assets = await AssetModel.find();
    return assets.map(formatAsset);
}


export const updateAssetsPrice = async () => {
    const assets = await AssetModel.find();

    for (const asset of assets) {
        const changePercent = getRandomPriceChange(asset);
        asset.price = calculateNewPrice(asset.price, changePercent);
        asset.change = changePercent;

        await asset.save();
        io.emit("asset", formatAsset(asset));
    }
}


export const startPriceUpdater = (intervalMs = 5000) => {
    setInterval(updateAssetsPrice, intervalMs);
};
