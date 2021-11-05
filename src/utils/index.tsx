import { Asset } from "../models/interface";

export const getNftPrice = (item: Asset) => {
	const { lastSale, bestBid, bestAsk } = item;
	const price = bestAsk || bestBid || lastSale;
	const strSpl = price.split(' ');
	const priceStr = Number(strSpl[0]);
	if (!priceStr) return false;
	return <span>{priceStr} {strSpl[1]}</span>;
}