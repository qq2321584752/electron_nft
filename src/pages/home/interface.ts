import { SearchAssetsOptsions } from "../../models/asset";

export interface IGetAssetsListProps extends SearchAssetsOptsions {
	loadMore?: boolean
}