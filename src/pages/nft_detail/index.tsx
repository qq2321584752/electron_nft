import { Card, Input, Table, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { AppstoreOutlined, SearchOutlined, CaretDownOutlined } from '@ant-design/icons';
import IconFont from "../../components/icon_font";
import { asset, AssetContract, assetContract, assetOrders, AssetOwner, assetOwners, AssetSearch, collection, IAssetProps, searchAssets } from "../../models/asset";
import { useHistory, useParams } from "react-router-dom";
import { Asset, AssetOrder, Collection } from "../../models/interface";
// import { clipboard } from "electron";
import moment from "moment";
import { getNftPrice } from "../../utils";

// const { clipboard } = require("electron");
import "./index.scss";


const unitLabel: { [key: string]: string } = {
	ETHEREUM: "ETH",
	UNKNOWN: "UNKNOWN",
	MATIC: "MATIC",
	KLAYTN: "KLAYTN",
	XDAI: "XDAI",
	BSC: "BSC",
	FLOW: "FLOW",
	LOCAL: "LOCAL",
	RINKEBY: "RINKEBY",
	MUMBAI: "MUMBAI",
	BAOBAB: "BAOBAB",
	BSC_TESTNET: "BSC_TESTNET",
	GOERLI: "GOERLI",
}

// const clipboard = window.require('electron').clipboard;
const NftDetail = () => {

	const history = useHistory();
	const params = useParams();

	const [assetInfo, setassetInfo] = useState<Asset>();

	const [assetOwnersInfo, setassetOwnersInfo] = useState<AssetOwner[]>([]);

	const [collectionInfo, setcollectionInfo] = useState<Collection>();

	const [assetContractInfo, setassetContractInfo] = useState<AssetContract>();

	const [assetOrdersInfo, setassetOrdersInfo] = useState<AssetOrder[]>([]);

	const [assetList, setassetList] = useState<AssetSearch[]>([]);


	useEffect(() => {
		getAssetInfo();
		// eslint-disable-next-line
	}, []);

	const getAssetInfo = async () => {

		const { token, tokenId } = history.location.state as IAssetProps || params as IAssetProps;
		const props = { token, tokenId };
		const { data } = await asset(props);
		const { data: ownersData } = await assetOwners(props);
		const { data: collectionData } = await collection({ collection: data.collection })
		const { data: assetContractData } = await assetContract({ address: token });
		const { data: assetOrdersData } = await assetOrders(props);
		const { data: assetData } = await searchAssets({ collection: data.collection, limit: [0, 4] });

		setassetList(assetData);
		setassetInfo(data);
		setassetOwnersInfo(ownersData);
		setcollectionInfo(collectionData);
		setassetContractInfo(assetContractData);
		setassetOrdersInfo(assetOrdersData);
	}


	const columns = [
		{
			title: "事件",
			dataIndex: "fromAddres",
			render: (fromAddres: string) => fromAddres ? "购买" : "上架",
		},

		{
			title: "价格",
			dataIndex: "value",
			render: (value: string) => <div>{`${Number(value)} ${unitLabel[String(assetContractInfo?.chain)]}`}</div>
		},

		{
			title: "发送方",
			dataIndex: "fromAddres",
			render: (fromAddres: string) => <Tooltip title={fromAddres} className="warp_box">{fromAddres}</Tooltip>,
			ellipsis: true,
		},
		{
			title: "接收方",
			dataIndex: "toAddress",
			render: (toAddress: string) => <Tooltip title={toAddress} className="warp_box">{toAddress}</Tooltip>,
			ellipsis: true,
		},

		{
			title: "日期",
			dataIndex: "date",
			render: (date: string) => <div className="warp_box">{moment(date).fromNow()}</div>
		}
	]

	return <div className="nft_detail_page">

		<IconFont type="icon-fanhui" className="back_btn" onClick={() => {
			// history.goBack();
			window.history.back();
		}} />

		<div className="mid_box">

			<div className="search_nav_bar">
				<div className="search_nav" >
					<AppstoreOutlined />
					<div className="search_input_box">
						<Input placeholder="search for anything" prefix={<SearchOutlined />} />
					</div>
				</div>
				<div className="line" />
			</div>

			<div className="space_box" />
			<div className="line" />



			<div className='nft_detail_box'>
				<div className="left_box">
					<div className="nft_image">
						<img alt="加载出错" src={assetInfo?.image || assetInfo?.media} />
					</div>
					<div className="nft_detail_card">
						<Card className="characteristic_card" title={<div><IconFont type="icon-texing2-01" style={{ color: "#ADB8D0" }} /> 特性</div>} extra={<CaretDownOutlined />} bodyStyle={{ display: Boolean(assetInfo?.properties) ? "block" : "none", padding: "2px 0 2px" }}>
							{assetInfo?.properties?.map(item => {
								return <div className="card_item">
									<div className="label">{item.trait_type}</div>
									<div className="value">{item.value}</div>
								</div>
							})}
						</Card>


						<Card title={<div><IconFont type="icon-lianjie1" style={{ color: "#ADB8D0" }} /> 链信息</div>} extra={<CaretDownOutlined />} bodyStyle={{ padding: "2px 0 2px" }}>
							<div className="card_item">
								<div className="label">合约地址</div>
								<Tooltip title={assetContractInfo?.address} ><div className="value">{assetContractInfo?.address} </div></Tooltip>
							</div>

							<div className="card_item">
								<div className="label">代币ID</div>
								<Tooltip title={assetInfo?.tokenId} ><div className="value"> {assetInfo?.tokenId} </div></Tooltip>
							</div>

							<div className="card_item">
								<div className="label">区块链</div>
								<div className="value">{assetContractInfo?.chain}</div>
							</div>

							<div className="card_item" style={{ border: 0 }}>
								<div className="label">元数据</div>
								<Tooltip title={assetInfo?.uri}><div className="value">{assetInfo?.uri} </div></Tooltip>
							</div>
						</Card>

					</div>
				</div>
				<div className="right_box">
					<div className="nft_desc">
						<div className="collection_name">合集名称 {assetInfo?.collection}</div>

						<div className="nft_name_box">
							<div className="nft_name">{assetInfo?.name}</div>
							{Boolean(assetInfo && getNftPrice(assetInfo)) && <div className="nft_price_label">一口价</div>}
						</div>

						<div className="author_price_box">
							{Boolean(assetInfo?.author) && <div className="author">
								创建者:
								<Tooltip title={assetInfo?.author}>
									<span style={{ cursor: "copy" }} onClick={() => document.execCommand(String(assetInfo?.author))}>{assetInfo?.author.slice(0, 6).toLocaleUpperCase()}</span>
								</Tooltip>
							</div>}

							{(assetInfo) && <div className="price">{getNftPrice(assetInfo)}</div>}
						</div>

						<div className="holder_price_box">
							{Boolean(assetOwnersInfo.length) && <div className="holder">持有者: {assetOwnersInfo}</div>}
							{/* <div className="price">$ 1229.0</div> */}
						</div>
					</div>


					<Card className="works_desc_card" title={<div><IconFont type="icon-chanpinjieshao" style={{ color: "#ADB8D0" }} /> 作品介绍</div>} extra={<CaretDownOutlined />} bodyStyle={{ display: assetInfo?.info ? "block" : "none", padding: "14px 27px" }}>
						<div className="works_desc_text">
							{assetInfo?.info}
						</div>

						{/* <div className="author_box">
							——艺术家 老六文学
						</div> */}
					</Card>


					<Card className="collection_card" title={<div><IconFont type="icon-danganheji" style={{ color: "#ADB8D0" }} /> 合集</div>} extra={<CaretDownOutlined />} bodyStyle={{ display: collectionInfo?.name ? "block" : "none", padding: "22px 27px" }}>

						<div className="collection_name">合集名称 {collectionInfo?.name}</div>

						<div className="collection_text">
							{collectionInfo?.description}
						</div>


					</Card>

				</div>
			</div>

			<div className="transaction_history_box">
				<Card title="交易历史" bodyStyle={{ padding: 0 }}>
					<Table dataSource={assetOrdersInfo} columns={columns} pagination={false} style={{ width: "100%" }} />
				</Card>
			</div>

			<div className="from_collection_box">
				<Card title="从这个集合" className="from_collection_box_card">
					{assetList.map((item, index) => {

						const { lastSale, bestBid, bestAsk, token, tokenId } = item;
						const price = bestAsk || bestBid || lastSale;
						const strSpl = price.split(' ');
						const priceStr = Number(strSpl[0]);

						return <div className="nft_item" key={index} onClick={() => {
							history.push('/nft_detail', { token, tokenId });

						}} >
							<div className="nft_img" >
								<img src={(item.image + '?imageView2/0/w/300/h/300')} alt="加载出错" />
							</div>

							<div className="nft_describe_box">
								<div className="nft_top_box">
									<div className="title">{item.name}</div>
									{Boolean(price) && <div className="type">一口价 </div>}
								</div>

								<div className="nft_bottom_box">
									<div className="collection">{Boolean(item.collection_name) && '合集名称'} {item.collection_name}</div>
									<div className="price">
										{/* <IconFont type="icon-ETH" /> */}
										{Boolean(priceStr) && priceStr} {strSpl[1]}</div>
								</div>
							</div>
						</div>
					})}


				</Card>
			</div>
		</div>

	</div>;
};

export default NftDetail;