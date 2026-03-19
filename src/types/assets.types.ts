export enum AssetTypes {
    STOCK = "stock",
    CRYPTO = "crypto"
}

export interface IAssets {
    name: string;
    symbol: string;
    type: AssetTypes;
    price: number;
    change: number;
    createdAt?: Date;
}
