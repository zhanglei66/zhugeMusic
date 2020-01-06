import React from 'react'
import styles from './index.module.less'
import { Avatar, Carousel, Menu, Icon } from 'antd'
import DiscoverMusic from '../discoverMusic/index'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Songlist from '../songList/index'

class TopMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 'mail',
        };
    }
    render() {
        return (
            <div>
                {this.topMenu()}
            </div>
        )
    }

    topMenu() { // 顶部导航栏
        return (
            <Router>
                <div className={styles.content}>
                    <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
                        <Menu.Item key="mail">
                            <Link to="/">
                                个性推荐
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="app">
                            <Link to="/songlist">
                                歌单
                            </Link>
                        </Menu.Item>
                    </Menu>
                    <Switch>
                        <Route exact path="/">
                            <DiscoverMusic></DiscoverMusic>
                        </Route>
                        <Route path="/songlist">
                            <Songlist></Songlist>   
                        </Route>
                    </Switch>
                </div>
            </Router>
        )
    }

    handleClick = e => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    };
}
export default TopMenu;