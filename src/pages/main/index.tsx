import { Layout, Menu } from 'antd';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import Home from '../home';
import NftDetail from '../nft_detail';
import "./index.scss";

const { Content, Sider } = Layout;

const Main = () => {
	return <Layout id="components-layout-demo-responsive ">
		<Sider
			breakpoint="lg"
			collapsedWidth="0"
			onBreakpoint={broken => {
				console.log(broken);
			}}
			onCollapse={(collapsed, type) => {
				console.log(collapsed, type);
			}}
		>
			<div className="logo" >logo</div>
			<Menu className="main_menu" theme="dark" mode="inline" defaultSelectedKeys={['1']}>
				<Menu.Item key="1" icon={<UserOutlined />}>
					首页
				</Menu.Item>
				<Menu.Item key="2" icon={<VideoCameraOutlined />}>
					市场
				</Menu.Item>
				<Menu.Item key="3" icon={<UploadOutlined />}>
					排行榜
				</Menu.Item>
				<Menu.Item key="4" icon={<UserOutlined />}>
					鲸鱼</Menu.Item>
			</Menu>
		</Sider>
		<Layout className="left_layout">
			{/* <Header className="site-layout-sub-header-background" style={{ padding: 0 }} /> */}
			<Content>
				<div className="site-layout-background" style={{ paddingTop: 14, minHeight: 360, height: '100%' }}>
					<Router>
						<Switch>
							{/* <Route strict exact path="/" component={Home} /> */}
							{/* <Route strict exact path="/nft_detail" component={NftDetail} /> */}
							<Route strict exact path="/" component={Home} />
							<Route strict exact path="/nft_detail/:token/:tokenId" component={NftDetail} />

						</Switch>
					</Router>
				</div>
			</Content>
			{/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer> */}
		</Layout>
	</Layout>

}

export default Main;