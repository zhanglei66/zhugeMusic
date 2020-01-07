import React from 'react'
import { Menu, Icon, Input } from 'antd'
import styles from './index.module.less'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import TopMenu from '../topMenu/index'
import PrivateFM from '../privateFM/index'
import SearchResult from '../searchResult/index'
import zhugeyunmusic from '../../static/zhugeyunmusic.png'

class Sider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: ''
        };
    }

    changeMode = value => {
        this.setState({
            mode: value ? 'vertical' : 'inline',
        });
    };

    changeTheme = value => {
        this.setState({
            theme: value ? 'dark' : 'light',
        });
    };

    render() {
        return (
            <Router>
                <div className={styles.all}>
                    <div className={styles.top}>
                        <div className={styles.left}>
                            <img src={zhugeyunmusic} width="20px" height="20px" alt="" />
                        </div>
                        <div className={styles.center}>诸葛云音乐</div>
                        <div className={styles.input}>
                            <Input id="input" size="small" suffix={
                                <Link to="/searchResult">
                                    <Icon onClick={() => this.clickSearch()} className={styles.inputIcon} type="search" />
                                </Link>
                            } placeholder="搜索音乐，视频，歌词，电台" />
                        </div>
                    </div>
                    <div className={styles.content}>
                        <div className={styles.leftMenu}>
                            <div className={styles.tuijian_text}>推荐</div>
                            <Menu
                                style={{ width: 256 }}
                                defaultSelectedKeys={['1']}
                                defaultOpenKeys={['sub1']}
                                mode={this.state.mode}
                                theme={this.state.theme}
                                className={styles.menu}
                            >
                                <Menu.Item key="1">
                                    <Link to="/">
                                        <Icon type="mail" />
                                        发现音乐
                                </Link>
                                </Menu.Item>
                                <Menu.Item key="2">
                                    <Link to="/privateFM">
                                        <Icon type="calendar" />
                                        私人FM
                                </Link>
                                </Menu.Item>
                            </Menu>
                        </div>
                        <div className={styles.right}>
                            <Switch>
                                <Route exact path="/">
                                    <TopMenu />
                                </Route>
                                <Route path="/privateFM">
                                    <PrivateFM />
                                </Route>
                                <Route path='/searchResult'>
                                    <SearchResult keywords={this.state.search} />
                                </Route>
                            </Switch>
                        </div>
                    </div>
                </div>
            </Router>
        );
    }

    clickSearch() {
        console.log(document.getElementById('input').value)
        let val = document.getElementById('input').value
        this.setState({
            search: val
        })
    }
}

export default Sider;