import React from 'react'
import { Spin } from 'antd'
import styles from './index.module.less'
import request from '../../util/index'
import Render from '../../component/Render/index'

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
            data: [],
            songUrl: '',
            loading: true
        };
    }
    async componentDidMount() {
        if(this.props.keywords === '') {
            return
        }
        let _url = 'search?keywords='+this.props.keywords
        await request.get(_url).then(res => {
            if( res.code === 200) {
                this.setState({
                    data: res.result.songs,
                    loading: false,
                    keywords: this.props.keywords
                })
            }
        })
    }
    async componentWillReceiveProps(nextProps) {
        if( this.state.keywords !== nextProps.keywords ) {
            if(nextProps.keywords === '') {
                return
            }
            this.setState({
                keywords: nextProps.keywords,
                loading: true
            })
            let _url = 'search?keywords='+nextProps.keywords
            await request.get(_url).then(res => {
                if( res.code === 200) {
                    this.setState({
                        data: res.result.songs,
                        loading: false
                    })
                }
            })
        }
    }
    render() {
        // let columns = this.state.columns
        // let data = this.state.data
        let songlist = this.state.data
        let songlistDom = []
        songlist.forEach((item, index) => {
            let classN
            if(index%2 === 0) {
                classN = styles.oushu
            } else {
                classN = styles.jishu
            }
            let id = item.id
            songlistDom.push(
                <div onClick={this.passFather.bind(this, id)} className={classN} key={index}>
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
                <Render if={this.state.loading === false}>
                    <div className={styles.title}>
                        <div className={styles.title1}>音乐标题</div>
                        <div className={styles.title1}>歌手</div>
                        <div className={styles.title1}>专辑</div>
                    </div>
                    {songlistDom}
                </Render>
                <Render if={this.state.loading === true}>
                    <div className={styles.zhezhao}>
                        <Spin size="large" tip="Loading"/>
                    </div>
                </Render>
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