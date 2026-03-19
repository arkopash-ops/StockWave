import type { HydratedDocument } from "mongoose"
import { Model, model, Schema } from "mongoose";
import { AssetTypes } from "../types/assets.types.js";
import type { IAssets } from "../types/assets.types.js";

export type AssetDocument = HydratedDocument<IAssets>

const assetSchema = new Schema<AssetDocument>({
    name: {
        type: String,
        required: true,
        trim: true,
    },

    symbol: {
        type: String,
        required: true,
        unique: true,
        uppercase: true,
        trim: true,
        index: true,
    },

    type: {
        type: String,
        enum: Object.values(AssetTypes),
        default: AssetTypes.STOCK,
    },

    price: {
        type: Number,
        min: 0,
        required: true,
        default: 0,
    },

    change: {
        type: Number,
        min: -100,
        max: 100,
        required: true,
        default: 0,
    },
}, {
    timestamps: {
        createdAt: true,
        updatedAt: false,
    }
});

const AssetModel: Model<AssetDocument> = model<AssetDocument>("Assets", assetSchema);

export default AssetModel;
