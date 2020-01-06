import React from 'react'
import styles from './index.module.less'
import request from '../../util/index'
import { Button } from 'antd'

class DiscoverMusic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tags: [],
            playlists: []
        };
    }
    componentDidMount() {
        request.get('playlist/hot').then( res => {
            if(res.code === 200) {
                this.setState({
                    tags: res.tags
                })
            }
        })
        request.get('top/playlist?').then( res => {
            if(res.code === 200) {
                this.setState({
                    playlists: res.playlists
                })
                console.log(res.playlists)
            }
        })
    }
    render() {
        let tags = this.state.tags
        let tagsDom = []
        tags.forEach( (item, index) => {
            tagsDom.push(
                <Button type="link" onClick={()=>this.clickClassify(item.name)} key={index}>{item.name}</Button>
            )
        });
        let playlists = this.state.playlists
        let playlistsDom = []
        playlists.forEach( (item, index) => {
            playlistsDom.push(
                <div key={index} className={styles.item}>
                    <img height="200px" width="200px" src={item.coverImgUrl} alt="" />
                    <div className={styles.item_name}>{item.name}</div>
                </div>
            )
        });
        return (
            <div className={styles.songList}>
                <div className={styles.classify}>
                    <div>热门标签:</div>
                    {tagsDom}
                </div>
                <div className={styles.content}>
                    {playlistsDom}
                </div>
            </div>
        )
    }

    clickClassify(cat) {
        let url = 'top/playlist?cat='+cat
        this.setState({
            playlists: []
        })
        request.get(url).then( res => {
            if(res.code === 200) {
                this.setState({
                    playlists: res.playlists
                })
            }
        })
    }
}
export default DiscoverMusic;