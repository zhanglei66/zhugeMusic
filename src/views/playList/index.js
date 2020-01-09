import React from 'react'
import styles from './index.module.less'
import request from '../../util/index'

class SearchResult extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            songs: [],
            playlist: ''
        };
    }
    componentDidMount() {
        let id = decodeURI(window.location.search.split('=')[1])
        let _url = 'playlist/detail?id='+id
        request.get(_url).then(res => {
            if(res.code === 200) {
                this.setState({
                    playlist: res.playlist
                })
                let trackIds = res.playlist.trackIds
                let url_ = 'song/detail?ids='
                for(let i=0 ; i<trackIds.length ; i++) {
                    if(i<trackIds.length-1) url_= url_+trackIds[i].id+','
                    else url_+=trackIds[i].id
                }
                request.get(url_).then(response => {
                    if(response.code === 200) {
                        this.setState({
                            songs: response.songs
                        })
                    }
                })
            }
        })
    }
    componentWillReceiveProps(nextProps) {
    }
    render() {
        // let columns = this.state.columns
        // let data = this.state.data
        let songs = this.state.songs
        let songsDom = []
        songs.forEach((item, index) => {
            let classN
            if(index%2 === 0) {
                classN = styles.oushu
            } else {
                classN = styles.jishu
            }
            let id = item.id
            songsDom.push(
                <div onClick={this.passFather.bind(this, id)} className={classN} key={index}>
                    <div className={styles.songMsg}>{item.name}</div>
                    <div className={styles.songMsg}>{item.ar[0].name}</div>
                    <div className={styles.songMsg}>{item.al.name}</div>
                </div>
            )
        })
        return (
            <div className={styles.playlist}>
                <div className={styles.listDetail}>
                    <img className={styles.img} src={this.state.playlist.coverImgUrl} width="200px" height="200px" alt=""/>
                    <div className={styles.textDes}>
                        <div className={styles.name}>{this.state.playlist.name}</div>
                        <div className={styles.description}>{this.state.playlist.description}</div>
                    </div>
                </div>
                <div className={styles.title}>
                    <div className={styles.title1}>音乐标题</div>
                    <div className={styles.title1}>歌手</div>
                    <div className={styles.title1}>专辑</div>
                </div>
                {songsDom}
            </div>
        );
    }
    // startMusic(e, id) {
    //     let _url = 'song/url?id='+id
    //     request.get(_url).then(res => {
    //         if(res.code === 200) {
    //             this.setState({
    //                 songUrl: res.data[0].url
    //             })
    //         }
    //     })
    //     this.passFather.bind(this, this.state.songUrl)
    // }
    passFather(id) {
        console.log(id)
        console.log('shangmianshierzi')
        this.props.pfn(id)
    }
}

export default SearchResult;