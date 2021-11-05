import { axiosGet, axiosPost } from "../utils/axios"
import { Categories, AssetType, Asset, Collection, ChainType, AssetOrder } from "./interface"

export interface SearchAssetsOptsions {
	query?: string;
	collection?: string;
	categorie?: Categories;
	author?: string;
	type?: AssetType;
	token?: string;
	order?: string;
	limit?: number | number[] | string;
}

export interface AssetSearch extends Asset {
	collection_name: string;
	collection_description: string;
}

export interface IAssetProps {
	token: string;
	tokenId: string;
}

export interface AssetOwner {
	token: string;
	tokenId: string;
	owner: string;
	ownerBase?: string;
	count: number;
}

interface ICollectionProps {
	collection: string
}

interface IAssetContractProps {
	address: string
}


export interface AssetContract {
	address: string;
	name: string;
	symbol: string;
	openseaVersion: string;
	tokenStandard: string;
	isSharedStorefront: boolean;
	opensea_id: string;
	blockExplorerLink: string;
	chain: ChainType;
	createdDate: number;
	modifiedDate: number;
	relayId: string;
	state: number;
	type: AssetType;
	platform: string;
	sync_height: number;
}

// https://mvp.stars-mine.com/service-api/utils/searchAssets?order=createdDate%20desc&query=kk&limit=10
// 搜索nft列表
export const searchAssets = (props: SearchAssetsOptsions) => {
	return axiosPost<AssetSearch[]>({ url: '/searchAssets', data: props });
}


// 查看nft详情
export const asset = (props: IAssetProps) => {
	return axiosGet<Asset>({ url: '/asset', data: props });
}


// 查看持有人
export const assetOwners = (props: IAssetProps) => {
	return axiosGet<AssetOwner[]>({ url: '/assetOwners', data: props });
}

// 获取 Nft合集信息
export const collection = (props: ICollectionProps) => {
	return axiosPost<Collection>({ url: '/collection', data: props });
}

// 获取合约信息
export const assetContract = (props: IAssetContractProps) => {
	return axiosPost<AssetContract>({ url: '/assetContract', data: props });
}

// 获取交易历史
export const assetOrders = (props: IAssetProps) => {
	return axiosPost<AssetOrder[]>({ url: '/assetOrders', data: props });
}




// searchAssets