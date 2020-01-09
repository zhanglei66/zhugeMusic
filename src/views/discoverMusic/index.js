import React from 'react'
import styles from './index.module.less'
import request from '../../util/index'
import { Link } from "react-router-dom"

class DiscoverMusic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recommendSL: [],
            dujiaFS: [],
        };
    }
    componentDidMount() {
        request.get('banner')
        request.get('personalized?limit=10').then(res => {
            if (res.code === 200) {
                console.log(res.result)
                this.setState({
                    recommendSL: res.result
                })
            }
        })
        request.get('personalized/privatecontent').then(res => {
            if (res.code === 200) {
                console.log(res.result)
                this.setState({
                    dujiaFS: res.result
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
                    <Link to={'/playList?id='+item.id}>
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

        return (
            <div className={styles.discoverMusic}>
                <div className={styles.text1}>推荐歌单</div>
                <div className={styles.recommendSLPic}>
                    {arrdom}
                </div>
                <div className={styles.text2}>独家放送</div>
                <div className={styles.dujiaFS}>
                    {dujiaFSDom}
                </div>
            </div>
        )
    }
}
export default DiscoverMusic;