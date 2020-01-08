import React from 'react'
import { Menu, Icon, Input, Progress } from 'antd'
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
import request from '../../util/index'

class Sider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            songUrl: '',
            controlState: '',
            time: '',
            percent: 0,
            interval: ''
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
        let controller
        let time
        if(this.state.controlState === 'play') {
            controller = <div className={styles.zanting} onClick={()=>this.controlAudio()}></div>
        } else {
            controller = <div className={styles.bofang} onClick={()=>this.controlAudio()}></div>
        }
        if(this.state.time !== '') {
            time = <div className={styles.songTime}>{this.state.time}</div>
        } else {
            time = <div className={styles.songTime}></div>
        }
        return (
            <Router>
                <div className={styles.all}>
                    <div className={styles.top}>
                        <div className={styles.left}>
                            <img src={zhugeyunmusic} width="20px" height="20px" alt="" />
                        </div>
                        <Link to="/">
                            <div className={styles.center}>诸葛云音乐</div>
                        </Link>
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
                                    <SearchResult keywords={this.state.search} pfn={this.fn.bind(this)}/>
                                </Route>
                            </Switch>
                        </div>
                    </div>

                    <div className={styles.compAudio}>
                        <div className={styles.shangyishou}></div>
                        {controller}
                        <div className={styles.xiayishou}></div>
                        <Progress className={styles.progress} percent={this.state.percent} showInfo={false} />
                        {time}
                    </div>
                    <audio id="music" className={styles.music} src={this.state.songUrl} autoPlay controls></audio>
                </div>
            </Router>
        );
    }

    clickSearch() {
        let val = document.getElementById('input').value
        this.setState({
            search: val
        })
    }

    fn(id) {
        let that = this
        let _url = 'song/url?id='+id
        request.get(_url).then(res => {
            if(res.code === 200) {
                this.setState({
                    songUrl: res.data[0].url,
                    controlState: 'play'
                })
            }
        })
        let audio = document.getElementById('music')
        audio.addEventListener("loadeddata", function() {
            let minutes = parseInt(audio.duration/60)
            let records = parseInt(audio.duration%60)
            if(minutes<10) {
                minutes = '0'+minutes
            }
            if(records<10) {
                records = '0'+records
            }
            let time = minutes+':'+records
            that.setState({
                time: time
            })
            that.state.interval = setInterval(() => {
                let percent = that.state.percent
                percent+=1/audio.duration*(100)
                that.setState({
                    percent: percent
                })
            }, 1000);
        })
    }

    controlAudio() {
        let that = this
        let audio = document.getElementById('music')
        if(audio.paused) {
            audio.play()
            this.setState({
                controlState: 'play'
            })
            that.state.interval = setInterval(() => {
                let percent = that.state.percent
                percent+=1/audio.duration*(100)
                that.setState({
                    percent: percent
                })
            }, 1000);
        } else {
            audio.pause()
            this.setState({
                controlState: 'pause'
            })
            clearInterval(this.state.interval)
        }
    }
}

export default Sider;