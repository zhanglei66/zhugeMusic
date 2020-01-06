import React from 'react'
import { Menu, Icon } from 'antd'
import styles from './index.module.less'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import TopMenu from '../topMenu/index'
import PrivateFM from '../privateFM/index'

class Sider extends React.Component {
    state = {
        mode: 'inline',
        theme: 'light',
    };

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
                        </Switch>
                    </div>
                </div>
            </Router>
        );
    }
}

export default Sider;