import React from 'react'
import { Table } from 'antd'
import styles from './index.module.less'
import request from '../../util/index'

class SearchResult extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            keywords: '',
            columns: [
                {
                    title: '音乐标题',
                    dataIndex: 'name'
                },
                {
                    title: '歌手',
                    dataIndex: 'artists[0].name'
                },
                {
                    title: '专辑',
                    dataIndex: 'album.name'
                }
            ],
            data: []
        };
    }
    componentDidMount() {
        if(this.props.keywords === '') {
            return
        }
        this.setState({
            keywords: this.props.keywords
        })
        let _url = 'search?keywords='+this.props.keywords
        request.get(_url).then(res => {
            if( res.code === 200) {
                this.setState({
                    data: res.result.songs
                })
            }
        })
    }
    componentWillReceiveProps(nextProps) {
        if(this.props.keywords === '') {
            return
        }
        this.setState({
            keywords: nextProps.keywords
        })
        let _url = 'search?keywords='+nextProps.keywords
        request.get(_url).then(res => {
            if( res.code === 200) {
                this.setState({
                    data: res.result.songs
                })
            }
        })
    }
    render() {
        // let columns = this.state.columns
        // let data = this.state.data
        let songlist = this.state.data
        let songlistDom = []
        console.log(songlist)
        songlist.forEach((item, index) => {
            let classN
            if(index%2 === 0) {
                classN = styles.oushu
            } else {
                classN = styles.jishu
            }
            songlistDom.push(
                <div className={classN} key={index}>
                    <div className={styles.songMsg}>{item.name}</div>
                    <div className={styles.songMsg}>{item.artists[0].name}</div>
                    <div className={styles.songMsg}>{item.album.name}</div>
                </div>
            )
        })
        return (
            <div className={styles.searchResult}>
                {/* <div className={styles.tableClass}>
                    <Table width="30%" align="center" columns={columns} dataSource={data} />
                </div> */}
                <div className={styles.title}>
                    <div className={styles.title1}>音乐标题</div>
                    <div className={styles.title1}>歌手</div>
                    <div className={styles.title1}>专辑</div>
                </div>
                {songlistDom}
            </div>
        );
    }
}

export default SearchResult;