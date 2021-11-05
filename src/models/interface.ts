export enum Categories {
	ART = 1,
	MUSIC = 2,
	DOMAIN_NAMES = 3,
	VIRTUAL_WORLDS = 4,
	TRADING_CARDS = 5,
	COLLECTIBLES = 6,
	SPORTS = 7,
	UTILITY = 8,
	Categories_NUM = 9,
	ALL = '',
}

export declare enum AssetType {
	INVALID = 0,
	ERC721 = 1,
	ERC1155 = 2,
	ERC20 = 3,
	ERC721Proxy = 257,
	ERC1155Proxy = 258
}


export interface Asset {
	id: number;
	token: string;
	tokenId: string;
	count: number;
	uri: string;
	media: string;
	mediaOrigin: string;
	image: string;
	imageOrigin: string;
	type: AssetType;
	name: string;
	author: string;
	info: string;
	retry: number;
	retryTime: number;
	syncTime: number;
	categorie: Categories;
	properties: null | {
		trait_type: string,
		value: string
	}[],
	externalLink: string;
	imageWidth: number;
	imageHeight: number;
	animationUrl: string;
	animationWidth: number;
	animationHeight: number;
	backgroundColor: string;
	symbol: string;
	tokenMetadata: string;
	numVisitors: number;
	isCurated: boolean;
	isNsfw: boolean;
	frozenAt: string;
	decimals: number;
	usdSpotPrice: number;
	opensea_id: string;
	displayName: string;
	collection: string;
	favoritesCount: number;
	imageUrl: String;
	displayImageUrl: String;
	hasUnlockableContent: boolean;
	imagePreviewUrl: string;
	imageThumbnailUrl: string;
	isDelisted: boolean;
	isFavorite: boolean;
	isCurrentlyFungible: boolean;
	isListable: boolean;
	isFrozen: boolean;
	isEditable: boolean;
	isEditableByOwner: boolean;
	isFreezable: boolean;
	createdDate: number;
	modifiedDate: number;
	relayId: string;
	bestAsk: string;
	bestBid: string;
	lastSale: string;
}

export interface Collection {
	id: number;
	opensea_id: string;
	url: string;
	imageUrl: string;
	isVerified: boolean;
	name: string;
	slug: string;
	categorie: Categories;
	hidden: boolean;
	traits: {
		stringTraits: {
			key: string;
			counts: {
				count: number;
				value: number;
			}[];
		}[];
		numericTraits: {
			key: string;
			value: {
				max: number;
				min: string;
			}[];
		}[];
	} | null;
	description: string;
}

export declare enum ChainType {
	UNKNOWN = "UNKNOWN",
	ETHEREUM = "ETHEREUM",
	MATIC = "MATIC",
	KLAYTN = "KLAYTN",
	XDAI = "XDAI",
	BSC = "BSC",
	FLOW = "FLOW",
	LOCAL = "LOCAL",
	RINKEBY = "RINKEBY",
	MUMBAI = "MUMBAI",
	BAOBAB = "BAOBAB",
	BSC_TESTNET = "BSC_TESTNET",
	GOERLI = "GOERLI"
}


export interface AssetOrder {
	id: number;
	txHash: string;
	blockNumber: number;
	token: string;
	tokenId: string;
	fromAddres: string;
	toAddress: string;
	count: string;
	value: string;
	chain: string;
	description: string;
	date: number;
}