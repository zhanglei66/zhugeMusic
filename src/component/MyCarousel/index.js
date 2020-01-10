import React from 'react'
import './index.less'
import request from '../../util/index'
import { Carousel } from 'antd';

class MyCarousel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            banners: []
        };
    }
    componentDidMount() {
        request.get('banner').then( res => {
            if(res.code === 200) {
                this.setState({
                    banners: res.banners
                })
            }
        })
    }
    render() {
        let banners = this.state.banners
        let bannersDom = []
        banners.forEach((item, index) => {
            bannersDom.push(
                <div key={index}>
                    <img src={item.imageUrl} width="1100px" height="400px" alt=""/>
                </div>
            )
        })
        return (
            <div className="carousel">
                <Carousel afterChange={this.onChange()} autoplay>
                    {bannersDom}
                </Carousel>
            </div>
        )
    }
    onChange(a, b, c) {
        console.log(a, b, c);
    }
}
export default MyCarousel;