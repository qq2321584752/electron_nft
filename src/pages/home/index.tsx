import React, { useEffect, useState } from "react";
import { searchAssets, AssetSearch } from "../../models/asset";
import { Input, Tag, Menu, Dropdown, Radio, Space, RadioChangeEvent } from "antd";
import Button from "../../components/button";
import IconFont from "../../components/icon_font";
import { AppstoreOutlined, SearchOutlined, LoadingOutlined } from '@ant-design/icons';
// in code ES6
import InfiniteScroll from 'react-infinite-scroll-component';
import { Categories } from "../../models/interface";
import { IGetAssetsListProps } from "./interface";
import { useHistory } from "react-router-dom";
import "./index.scss";


const { Item } = Menu;

// const sortState = {
// 	'createdDate': '最新上市'
// }


const Home = () => {
	const history = useHistory();

	// nft列表
	const [assetsList, setassetsList] = useState<AssetSearch[]>([]);
	// 分页
	const [limit, setlimit] = useState<number[]>([0, 10]);
	// 是否加载完毕所有数据
	const [hasmore, sethasmore] = useState<boolean>(true);
	// 类别筛选单选
	const [categorie, setcategorie] = useState<Categories>(Categories.ALL);
	// 排序筛选
	const [order, setorder] = useState<string>('');

	const [loadMore, setloadMore] = useState<boolean>(false);

	useEffect(() => {
		getAssetsList({ limit, categorie, order });
		// eslint-disable-next-line
	}, [order, limit, categorie]);

	// 排序菜单
	const menu = <Menu title="排序">
		<Item key="createdDate" onClick={() => setorder('createdDate')}>最新上市</Item>
		{/* <Item key="createdDate">最新上市</Item> */}
		{/* createdDate */}
		{/* modifiedDate */}
	</Menu>

	// 获取nft列表
	const getAssetsList = async (props: IGetAssetsListProps) => {
		let { data } = await searchAssets(props);
		!data.length && sethasmore(false);
		loadMore ? setassetsList([...assetsList, ...data]) : setassetsList(data);
	}

	// 加载更多数据
	const loadMoreData = () => {
		let newlimit = [...limit];
		newlimit = [limit[1], limit[1] + 10];
		setloadMore(true);
		setlimit(newlimit);
	}

	// 单选框事件
	const radioChange = (e: RadioChangeEvent) => {
		const val = Number(e.target.value);
		setloadMore(false);
		setcategorie(val);
		setlimit([0, 10]);
	}

	// function nftImage(url: string) {
	// 	let nftUrl = url;
	// 	var img = new Image();
	// 	img.src = url + '?imageView2/0/w/300/h/300';
	// 	img.onerror = function () {
	// 		nftUrl = url;
	// 		console.log(url, "error url");
	// 	};

	// 	return nftUrl;
	// }
	return <div className="home_page">
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


			<div className="state_box" style={{ display: "none" }}>
				<div className="state_menu">
					<div className="state_item"><Button type="text" >状态</Button></div>
					<div className="state_item"><Button type="text" >价格</Button></div>
					<div className="state_item"><Button type="text" >多链</Button></div>
					<div className="state_item"><Button type="text" >币种</Button></div>
					<div className="state_item"><Button type="text" >集合</Button></div>
				</div>
				<div className="line" />
			</div>

			<div className="category_box" >
				<Radio.Group value={categorie} onChange={radioChange}>
					<Space style={{ flexWrap: "wrap" }}>
						<Radio.Button value="">全部</Radio.Button>
						<Radio.Button value={1}><IconFont type="icon-art02-alt" /> 艺术</Radio.Button>
						<Radio.Button value={4}><IconFont type="icon-shijie" /> 虚拟世界</Radio.Button>
						<Radio.Button value={6}><IconFont type="icon-zaizhancangpin" /> 收藏品</Radio.Button>
						<Radio.Button value={2}><IconFont type="icon-yinle" /> 音乐</Radio.Button>
						<Radio.Button value={8}><IconFont type="icon-shiyonggongju1" /> 实用</Radio.Button>
						<Radio.Button value={7}><IconFont type="icon-yundong" /> 运动</Radio.Button>
						<Radio.Button value={5}><IconFont type="icon-qiapian" /> 卡片</Radio.Button>
						<Radio.Button value={3}><IconFont type="icon-yuming" /> 域名</Radio.Button>
					</Space>
				</Radio.Group>
			</div>

			<div className="screen_box" style={{ display: "none" }}>
				<div className="screen_box_left">
					<div className="screen_item screen_label">筛选: </div>
					<div className="screen_item"><Tag closable  >立即购买</Tag></div>
					<div className="screen_item"><Tag closable  >拍卖中</Tag></div>
					<div className="screen_item"><Button type="text">重新筛选</Button></div>
				</div>

				<div className="screen_box_right">
					<Dropdown overlay={menu}>
						<Button className="sort_btn" notLoading={true}>
							<div>排序 <IconFont className="sort_icon" type="icon-defaultsort" /></div>
						</Button>
					</Dropdown>
				</div>
			</div>

			<div className="buttom_part" >
				<div id="scrollableDiv" className="scrollableDiv">
					<InfiniteScroll
						dataLength={assetsList.length}
						next={loadMoreData}
						hasMore={hasmore}
						loader={<div style={{ textAlign: 'center', margin: '15px 0' }}><LoadingOutlined style={{ fontSize: 26 }} /></div>}
						scrollableTarget="scrollableDiv"
					>
						<div className="assets_list" >

							{assetsList.map((item, index) => {

								const { lastSale, bestBid, bestAsk, token, tokenId } = item;
								const price = bestAsk || bestBid || lastSale;
								const strSpl = price.split(' ');
								const priceStr = Number(strSpl[0]);

								return <div className="nft_item" key={index} onClick={() => {
									history.push(`/nft_detail/${token}/${tokenId}`, { token, tokenId });
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
						</div>

					</InfiniteScroll>
				</div>
			</div>

		</div>
	</div>
}

export default Home;