<template>
  <div>
      <Header :data="msg"></Header>
      <div class="model">
          <p>基本信息</p>
          <div class="card">
              <div class="content">
                  <div>
                      <span>终端编码：</span>
                      <span>{{data.deviceSn}}</span>
                  </div>
                  <div>
                      <span>归属厂商：</span>
                      <span>{{data.businessName}}</span>
                  </div>
                  <div>
                      <span>运行模式：</span>
                      <span>{{data.configWorkStateName}}</span>
                  </div>
                   <div>
                      <span>探头类型：</span>
                      <span>{{data.probeTypeName}}</span>
                   </div>
                   <div>
                      <span>信号强度：</span>
                      <span>{{data.signalStrength}}</span>
                   </div>
                    <div>
                        <span>电池电量：</span>
                        <span>{{data.cell}}</span>
                    </div>
                    <div>
                        <span>水位深度：</span>
                        <span>{{data.waterLevelValue}}</span>
                    </div>
                    <div>
                        <span>布防状态：</span>
                        <span>{{data.armingStateName}}</span>
                    </div>
                    <div>
                        <span>在线状态：</span>
                        <span>{{data.onlineStateName}}</span>
                    </div>
                    <div>
                        <span>设备状态：</span>
                        <span>{{data.deviceStateName}}</span>
                    </div>
                    <div>
                        <span>门磁状态：</span>
                        <span>{{data.gateStateName}}</span>
                    </div>
                    <div>
                        <span>水浸状态：</span>
                        <span>{{data.floodingStateName}}</span>
                    </div>
                    <div>
                        <span>GPS状态：</span>
                        <span>{{data.configGpsName}}</span>
                    </div>
                    <div>
                        <span>水位告警：</span>
                        <span>{{data.wlmStatus}}</span>
                    </div>
                    <div>
                        <span>燃爆状态：</span>
                        <span>{{data.bombDetectedName}}</span>
                    </div>
                    <div>
                        <span>内核版本：</span>
                        <span>{{data.deviceKernelVersion}}</span>
                    </div>
                    <div>
                        <span>更新时间：</span>
                        <span>{{data.firstReportTime}}</span>
                    </div>
              </div>
          </div>
      </div>
      <div class="model">
          <p>地图信息</p>
          <div id="map" :style="{width:'100%',height:'300px'}"></div>
      </div>
  </div>
</template>

<script>
import Header from '../components/Header2';
import { selectChipsetBySn } from "../api/user/function";

export default {
    data(){
        return{
            msg:'终端详情',
            sn:'',
            data:{}
        }
    },
    components: {
        Header
    },
    created(){
        this.sn = this.$route.params.sn;
        this.selectChipsetBySn();
    },
    methods:{
        selectChipsetBySn(){
            selectChipsetBySn(this.base64encode(this.sn)).then(res =>{
                if (res.data.code == 200) {
                    this.data = res.data.data.dataChipset;
                    this.initMap(this.data.longitude, this.data.latitude)
                }else{
                    this.data ={}
                }
            })
        },
        initMap(longitude,latitude){
            console.log(longitude+"===="+latitude)
             var map = new AMap.Map('map', {
                    resizeEnable: true, //是否监控地图容器尺寸变化
                    zoom:16, //初始化地图层级
                    center: [longitude,latitude] //初始化地图中心点,
                });
                var marker = new AMap.Marker({
                    position: new AMap.LngLat(longitude,latitude),
                    offset: new AMap.Pixel(-10, -10),
                    icon: new AMap.Icon({
                    image: require("../assets/images/icon_locate_blue_pre.png"),
                    // image: "https://webapi.amap.com/theme/v1.3/markers/n/mark_r.png",
                    size: new AMap.Size(100, 100),  //图标大小 
                    imageSize: new AMap.Size(40,40)
                })
                });
                map.add(marker);
        },
        base64encode(str){
            var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
            var out, i, len;
            var c1, c2, c3;
            len = str.length;
            i = 0;
            out = "";
            while (i < len) {
                c1 = str.charCodeAt(i++) & 0xff;
                if (i == len) {
                    out += base64EncodeChars.charAt(c1 >> 2);
                    out += base64EncodeChars.charAt((c1 & 0x3) << 4);
                    out += "==";
                    break;
                }
                c2 = str.charCodeAt(i++);
                if (i == len) {
                    out += base64EncodeChars.charAt(c1 >> 2);
                    out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
                    out += base64EncodeChars.charAt((c2 & 0xF) << 2);
                    out += "=";
                    break;
                }
                c3 = str.charCodeAt(i++);
                out += base64EncodeChars.charAt(c1 >> 2);
                out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
                out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
                out += base64EncodeChars.charAt(c3 & 0x3F);
            }
            return out;
        },
    }
}
</script>

<style lang="scss" scoped>
.model{
    background-color: #fff;
    margin-bottom: 15px;
    padding: 20px;
    p{
        font-size: 30px;
        padding: 10px 0;
        border-bottom: 1px #e5e5e5 solid;
        margin-bottom: 20px;
    }
    .card{
        .content{
            &>div{
                font-size: 28px;
                margin: 15px 0;
                color: #666;
            }
        }
    }
}
</style>