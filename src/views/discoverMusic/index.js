import React from 'react'
import styles from './index.module.less'
import request from '../../util/index'
import { Link } from "react-router-dom"
import MyCarousel from '../../component/MyCarousel/index'

class DiscoverMusic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recommendSL: [],
            dujiaFS: [],
            newMusic: []
        };
    }
    async componentDidMount() {
        await request.get('personalized?limit=10').then(res => {
            if (res.code === 200) {
                console.log(res.result)
                this.setState({
                    recommendSL: res.result
                })
            }
        })
        await request.get('personalized/privatecontent').then(res => {
            if (res.code === 200) {
                console.log(res.result)
                this.setState({
                    dujiaFS: res.result
                })
            }
        })
        await request.get('personalized/newsong').then(res => {
            if(res.code === 200) {
                this.setState({
                    newMusic: res.result
                })
            }
        })
    }
    render() {
        let recommendSL = this.state.recommendSL
        let arrdom = []
        recommendSL.forEach((item, index) => {
            arrdom.push(
                <div className={styles.item} key={index}>
                    <Link to={'/playList?id=' + item.id}>
                        <img height="200px" width="200px" src={item.picUrl} alt="" />
                    </Link>
                    <div className={styles.item_name}>{item.name}</div>
                </div>
            )
        })
        let dujiaFS = this.state.dujiaFS
        let dujiaFSDom = []
        dujiaFS.forEach((item, index) => {
            dujiaFSDom.push(
                <div className={styles.item} key={index}>
                    <img height="140px" width="350px" src={item.picUrl} alt="" />
                    <div className={styles.item_name}>{item.name}</div>
                </div>
            )
        })
        let newMusic = this.state.newMusic
        let newMusicDom1 = []
        let newMusicDom2 = []
        newMusic.forEach((item, index) => {
            if(index<5) {
                let classN
                if(index%2 === 0) {
                    classN = styles.oushu
                } else {
                    classN = styles.jishu
                }
                newMusicDom1.push(
                    <div onClick={this.passFather.bind(this, item.id)} className={classN} key={index}>
                        <img height="60px" width="60px" src={item.picUrl} alt=""/>
                        <div className={styles.right}>
                            <div className={styles.songName}>{item.name}</div>
                            <div className={styles.artistName}>{item.song.artists[0].name}</div>
                        </div>
                    </div>
                )
            }
            if(index>=5 && index<10) {
                let classN
                if(index%2 === 0) {
                    classN = styles.jishu
                } else {
                    classN = styles.oushu
                }
                newMusicDom2.push(
                    <div onClick={this.passFather.bind(this, item.id)} className={classN} key={index}>
                        <img height="60px" width="60px" src={item.picUrl} alt=""/>
                        <div className={styles.right}>
                            <div className={styles.songName}>{item.name}</div>
                            <div className={styles.artistName}>{item.song.artists[0].name}</div>
                        </div>
                    </div>
                )
            } else {
                return
            }
        })
        return (
            <div className={styles.discoverMusic}>
                <MyCarousel className={styles.myCarousel}></MyCarousel>
                <div className={styles.text1}>推荐歌单</div>
                <div className={styles.recommendSLPic}>
                    {arrdom}
                </div>
                <div className={styles.text2}>独家放送</div>
                <div className={styles.dujiaFS}>
                    {dujiaFSDom}
                </div>
                <div className={styles.text3}>最新音乐</div>
                <div className={styles.newMusic}>
                    <div className={styles.newMusic1}>{newMusicDom1}</div>
                    <div className={styles.newMusic2}>{newMusicDom2}</div>
                </div>
                <div className={styles.beian}>
                    <a className={styles.a} href="http://beian.miit.gov.cn">陕ICP备20000491号</a>
                    <div className={styles.div}>仅个人用于学习用途，并无商业行为</div>
                </div>
            </div>
        )
    }

    passFather(id) {
        this.props.pfn(id)
    }
}
export default DiscoverMusic;