import { Result } from "antd";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Main from "./pages/main";
// import Home from "./App";

const BasicRoute = () => (
	<BrowserRouter>
		<Switch>
			<Route path="/" component={Main} />
			<Route component={() => <Result status="404" title="404" subTitle="Sorry, The page you visited does not exist." style={{ marginTop: "10%" }} />} />
		</Switch>
	</BrowserRouter>
);

export default BasicRoute;
