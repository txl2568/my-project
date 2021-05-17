<template>
  <div>
      <Header :data="msg"></Header>
      <div class="card">
          <p>搜索内容</p>
          <div class="inner">
              <input type="text" class="input-mcn"  placeholder="请输入MCN码" v-model="mcn" >
              <button class="search-btn" @click="Search">查询</button>
          </div>
      </div>
      <div ref="model" v-show="Object.keys(dataCoverList).length > 0 || Object.keys(dataCoverWellList).length > 0">
          <div class="card">
              <p>井盖信息</p>
              <div class="inner">
                <div class="weui-cell weui-cell_active weui-cell_access weui-cell_select weui-cell_select-after">
                  <div class="weui-cell__hd"><label class="weui-label">井盖类型</label></div>
                  <div class="weui-cell__bd" id="coverType" style="color: #666" v-if="dataCoverList.coverTypeName && !coverTypeName2" @click="showPopup('id01')">{{dataCoverList.coverTypeName}}<i class="iconfont icon-right"></i></div>
                  <div class="weui-cell__bd" id="coverType" style="color: #666" v-if="coverTypeName2" @click="showPopup('id01')">{{coverTypeName2}}<i class="iconfont icon-right"></i></div>
                  <div class="weui-cell__bd" id="coverType" v-if="!dataCoverList.coverTypeName && !coverTypeName2" @click="showPopup('id01')">请选择井盖类型<i class="iconfont icon-right"></i></div>
                </div>
                <div class="weui-cell weui-cell_active weui-cell_access weui-cell_select weui-cell_select-after">
                  <div class="weui-cell__hd"><label class="weui-label">井类型</label></div>
                  <div class="weui-cell__bd" id="coverType" style="color: #666" v-if="dataCoverList.coverWelltypeName && !coverWelltypeName2" @click="showPopup('id02')">{{dataCoverList.coverWelltypeName}}<i class="iconfont icon-right"></i></div>
                  <div class="weui-cell__bd" id="coverType" style="color: #666" v-if="coverWelltypeName2" @click="showPopup('id02')">{{coverWelltypeName2}}<i class="iconfont icon-right"></i></div>
                  <div class="weui-cell__bd" id="coverType" v-if="!dataCoverList.coverWelltypeName && !coverWelltypeName2" @click="showPopup('id02')">请选择井类型<i class="iconfont icon-right"></i></div>
                </div> 
              </div>
          </div>

          <div class="card">
            <p>井内信息</p>
            <div class="inner">
              <div class="weui-cell weui-cell_active weui-cell_access weui-cell_select weui-cell_select-after">
                <div class="weui-cell__hd"><label class="weui-label">设计单位</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" placeholder="请输入设计单位" v-model="coverwellSzdw"  />
                    <!-- <i class="iconfont icon-right"></i> -->
                </div>
              </div>
              <div class="weui-cell weui-cell_active weui-cell_access weui-cell_select weui-cell_select-after">
                <div class="weui-cell__hd"><label class="weui-label">施工单位</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" placeholder="请输入施工单位" v-model="coverwellSgdw" />
                    <!-- <i class="iconfont icon-right"></i> -->
                </div>
              </div>
              <div class="weui-cell weui-cell_active weui-cell_access weui-cell_select weui-cell_select-after">
                <div class="weui-cell__hd"><label class="weui-label">管道类别</label></div>
                <div class="weui-cell__bd" id="coverType" style="color: #666" v-if="dataCoverWellList.coverwellJngdlbName && !coverwellJngdlbName2" @click="showPopup('id03')">{{dataCoverWellList.coverwellJngdlbName}}<i class="iconfont icon-right"></i></div>
                <div class="weui-cell__bd" id="coverType" style="color: #666" v-if="coverwellJngdlbName2" @click="showPopup('id03')">{{coverwellJngdlbName2}}<i class="iconfont icon-right"></i></div>
                <div class="weui-cell__bd" id="coverType" v-if="!dataCoverWellList.coverwellJngdlbName && !coverwellJngdlbName2" @click="showPopup('id03')">请选择管道类别<i class="iconfont icon-right"></i></div>
              </div>
              <div class="weui-cell weui-cell_active weui-cell_access weui-cell_select weui-cell_select-after">
                <div class="weui-cell__hd"><label class="weui-label">管道材质</label></div>
                <div class="weui-cell__bd" id="coverType" style="color: #666" v-if="dataCoverWellList.coverwellGdczName && !coverwellGdczName2" @click="showPopup('id04')">{{dataCoverWellList.coverwellGdczName}}<i class="iconfont icon-right"></i></div>
                <div class="weui-cell__bd" id="coverType" style="color: #666" v-if="coverwellGdczName2" @click="showPopup('id04')">{{coverwellGdczName2}}<i class="iconfont icon-right"></i></div>
                <div class="weui-cell__bd" id="coverType" v-if="!dataCoverWellList.coverwellGdczName && !coverwellGdczName2" @click="showPopup('id04')">请选择管道材质<i class="iconfont icon-right"></i></div>
              </div>
              <div class="weui-cell weui-cell_active weui-cell_access weui-cell_select weui-cell_select-after">
                <div class="weui-cell__hd"><label class="weui-label">管道口径</label></div>
                <div class="weui-cell__bd" id="coverType" style="color: #666"  v-if="dataCoverWellList.coverwellGdkjName && !coverwellGdkjName2" @click="showPopup('id05')">{{dataCoverWellList.coverwellGdkjName}}<i class="iconfont icon-right"></i></div>
                <div class="weui-cell__bd" id="coverType" style="color: #666"  v-if="coverwellGdkjName2" @click="showPopup('id05')">{{coverwellGdkjName2}}<i class="iconfont icon-right"></i></div>
                <div class="weui-cell__bd" id="coverType" v-if="!dataCoverWellList.coverwellGdkjName && !coverwellGdkjName2" @click="showPopup('id05')">请选择管道口径<i class="iconfont icon-right"></i></div>
              </div>
              <div class="weui-cell weui-cell_active weui-cell_access weui-cell_select weui-cell_select-after">
                <div class="weui-cell__hd"><label class="weui-label">管道深度</label></div>
                <div class="weui-cell__bd" id="coverType" style="color: #666" v-if="dataCoverWellList.coverwellGdldsdName && !coverwellGdldsdName2" @click="showPopup('id06')">{{dataCoverWellList.coverwellGdldsdName}}<i class="iconfont icon-right"></i></div>
                <div class="weui-cell__bd" id="coverType" style="color: #666" v-if="coverwellGdldsdName2" @click="showPopup('id06')">{{coverwellGdldsdName2}}<i class="iconfont icon-right"></i></div>
                <div class="weui-cell__bd" id="coverType" v-if="!dataCoverWellList.coverwellGdldsdName && !coverwellGdldsdName2" @click="showPopup('id06')">请选择管道深度<i class="iconfont icon-right"></i></div>
              </div>
              <div class="weui-cell weui-cell_active weui-cell_access weui-cell_select weui-cell_select-after">
                <div class="weui-cell__hd"><label class="weui-label">管道流向</label></div>
                <div class="weui-cell__bd" id="coverType" style="color: #666" v-if="dataCoverWellList.coverwellLxName && !coverwellLxName2" @click="showPopup('id07')">{{dataCoverWellList.coverwellLxName}}<i class="iconfont icon-right"></i></div>
                <div class="weui-cell__bd" id="coverType" style="color: #666" v-if="coverwellLxName2" @click="showPopup('id07')">{{coverwellLxName2}}<i class="iconfont icon-right"></i></div>
                <div class="weui-cell__bd" id="coverType" v-if="!dataCoverWellList.coverwellLxName && !coverwellLxName2" @click="showPopup('id07')">请选择污水流向<i class="iconfont icon-right"></i></div>
              </div>
              <div class="weui-cell weui-cell_active weui-cell_access weui-cell_select weui-cell_select-after">
                <div class="weui-cell__hd"><label class="weui-label">井底深度</label></div>
                <div class="weui-cell__bd" id="coverType" style="color: #666" v-if="dataCoverWellList.coverwellJsName && !coverwellJsName2" @click="showPopup('id08')">{{dataCoverWellList.coverwellJsName}}<i class="iconfont icon-right"></i></div>
                <div class="weui-cell__bd" id="coverType" style="color: #666" v-if="coverwellJsName2" @click="showPopup('id08')">{{coverwellJsName2}}<i class="iconfont icon-right"></i></div>
                <div class="weui-cell__bd" id="coverType" v-if="!dataCoverWellList.coverwellJsName && !coverwellJsName2" @click="showPopup('id08')">请选择井底深度<i class="iconfont icon-right"></i></div>
              </div>   

            </div>
          </div>

          <div class="card" >
              <p>井盖图片信息</p>
              <div class="model-img">
                <div class="border-img" >
                      <img  :src="'http://coverimage.oss-cn-hangzhou.aliyuncs.com/image/'+coverImgpath"   @click="goimgDetail('img11')" v-show="!localIds"/>
                      <img  :src="localIds"   @click="goimgDetail('img11')" v-show="localIds" id="img" />
                </div>   
                <div class="border-img" >
                      <img  :src="'http://coverimage.oss-cn-hangzhou.aliyuncs.com/image/'+coverImgpath2"  @click="goimgDetail('img12')" v-show="!localIds2" />
                      <img  :src="localIds2"   @click="goimgDetail('img12')" v-show="localIds2" />
                </div> 
              </div>
          </div>

          <div class="card" >
              <p>井内图片信息</p>
              <div class="model-img">
                <div class="border-img">
                      <img  :src="'http://coverimage.oss-cn-hangzhou.aliyuncs.com/image/'+coverwellImgpath"   @click="goimgDetail('img01')" v-show="!localIds01"/>
                      <img  :src="localIds01"   @click="goimgDetail('img01')" v-show="localIds01" />
                  </div>    
                  <div class="border-img">
                      <img  :src="'http://coverimage.oss-cn-hangzhou.aliyuncs.com/image/'+coverwellImgpath2"  @click="goimgDetail('img02')"  v-show="!localIds02"/>
                      <img  :src="localIds02"   @click="goimgDetail('img02')" v-show="localIds02" />
                  </div>  
              </div>
          </div>

          <div class="card">
              <div class="map-title">
                <p>地图</p>
                <p style="color:#1890ff" @click="goRefresh">更新位置</p>
              </div>
              <div id="map" :style="{width:'100%',height:'300px'}" ></div>
          </div>

          <div class="button" @click="save">保存</div>
      </div>

      <van-popup position="bottom" v-model="show">
          <van-picker show-toolbar :title="title"  :columns="columns" @confirm="onConfirm" @cancel="onCancel"  @change="onChange" />
      </van-popup>

      <div ref="Toast" style="display: none;">
            <div class="weui-mask_transparent"></div>
            <div class="weui-toast">
                <span class="weui-primary-loading weui-primary-loading_transparent weui-icon_toast">
                <span class="weui-primary-loading__dot"></span>
                </span>
                <p class="weui-toast__content">查询中</p>
            </div>
      </div>

      <div class="weui-skin_android" ref="androidActionsheet" style="display: none;">
        <div class="weui-mask"></div>
        <div class="weui-actionsheet">
            <div class="weui-actionsheet__menu">
                <div class="weui-actionsheet__cell chakan" @click="gochakan">查看图片</div>
                <div class="weui-actionsheet__cell xiugai" @click="goxiugai">修改图片</div>
                <div class="weui-actionsheet__cell quxiao" style="color: #1890ff" @click="goquxiao">取消</div>
            </div>
        </div>
      </div>

       <div class="js_dialog" ref="iosDialog" style="display: none;">
          <div class="weui-mask"></div>
          <div class="weui-dialog">
              <div class="weui-dialog__hd"><strong class="weui-dialog__title">提示信息</strong></div>
              <div class="weui-dialog__bd">您确定要更新位置吗？</div>
              <div class="weui-dialog__ft">
                  <a href="javascript:" class="weui-dialog__btn weui-dialog__btn_default default" @click="cancel">取消</a>
                  <a href="javascript:" class="weui-dialog__btn weui-dialog__btn_primary primary" @click="confirm">确定</a>
              </div>
          </div>
       </div>

        <div ref="loadingToast" style="display: none;">
            <div class="weui-mask_transparent"></div>
            <div class="weui-toast">
                <span class="weui-primary-loading weui-primary-loading_transparent weui-icon_toast">
                <span class="weui-primary-loading__dot"></span>
                </span>
                <p class="weui-toast__content">更新中</p>
            </div>
        </div>

        <div id="textToast" ref="textToast" style="display:none">
            <div class="weui-mask_transparent"></div>
            <div class="weui-toast weui-toast_text">
                <p class="weui-toast__content">更新成功</p>
            </div>
        </div>

       <div class="js_dialog" ref="iosDialog2" style="display: none;">
          <div class="weui-mask"></div>
          <div class="weui-dialog">
              <div class="weui-dialog__hd"><strong class="weui-dialog__title">提示信息</strong></div>
              <div class="weui-dialog__bd">{{message}}</div>
              <div class="weui-dialog__ft">
                  <!-- <a href="javascript:" class="weui-dialog__btn weui-dialog__btn_default default" @click="cancel2">取消</a> -->
                  <a href="javascript:" class="weui-dialog__btn weui-dialog__btn_primary primary" @click="confirm2">确定</a>
              </div>
          </div>
       </div>

       <div class="js_dialog" ref="iosDialog3" style="display: none;">
          <div class="weui-mask"></div>
          <div class="weui-dialog">
              <div class="weui-dialog__hd"><strong class="weui-dialog__title">确定要选取该位置吗？</strong></div>
              <div class="weui-dialog__bd">{{address}}</div>
              <div class="weui-dialog__ft">
                  <a href="javascript:" class="weui-dialog__btn weui-dialog__btn_default default" @click="cancel3">取消</a>
                  <a href="javascript:" class="weui-dialog__btn weui-dialog__btn_primary primary" @click="confirm3">确定</a>
              </div>
          </div>
       </div>

       <!-- <div id="textToast" ref="textToast2" style="display:none">
            <div class="weui-mask_transparent"></div>
            <div class="weui-toast weui-toast_text">
                <p class="weui-toast__content">保存中</p>
            </div>
        </div> -->
        <div ref="textToast2" style="display: none;">
            <div class="weui-mask_transparent"></div>
            <div class="weui-toast">
                <span class="weui-primary-loading weui-primary-loading_transparent weui-icon_toast">
                <span class="weui-primary-loading__dot"></span>
                </span>
                <p class="weui-toast__content">保存中</p>
            </div>
        </div>

        <div class="js_dialog" ref="Dialog" style="display: none;">
          <div class="weui-mask"></div>
          <div class="weui-dialog">
              <div class="weui-dialog__hd"><strong class="weui-dialog__title">提示信息</strong></div>
              <div class="weui-dialog__bd">保存成功</div>
              <div class="weui-dialog__ft">
                  <!-- <a href="javascript:" class="weui-dialog__btn weui-dialog__btn_default default" @click="cancel2">取消</a> -->
                  <a href="javascript:" class="weui-dialog__btn weui-dialog__btn_primary primary" @click="confirm4">确定</a>
              </div>
          </div>
       </div>


      

  </div>
</template>

<script>
import Header from '../components/Header2';
import { selectDataCoverMcnOrSn, selectDictionariesCode, saveCoverWellMcn  } from '../api/user/function';
import {jsValid, transform, getAddres} from '../api/user/wechat';
import wx from 'weixin-js-sdk';
import weui from 'weui.js';
import 'weui';

export default {
  data(){
    return{
      msg:'数据采集',
      mcn:'',
      dataCoverList:{},
      dataCoverWellList:{},
      coverImgpath:'',
      coverImgpath2:'',
      coverwellImgpath:'',
      coverwellImgpath2:'',
      url: window.location.href,
      message:'',
      nowImg:'',
      show: false,
      title:'',
      coverType:[],
      columns: [],
      text:'',
      value:'',
      id:'',
      data:[],
      address:'',
      lon:'',
      lat:'',
      cover_type_list:[],
      cover_well_deep_list:[],
      showMap:true,
      localIds01:'',
      localIds02:'',
      serverId01:'',
      serverId02:'',
      localIds:'',
      serverId:'',
      localIds2:'',
      serverId2:'',
      coverwellJngdlbName2:'',
      coverwellJngdlb2:'',
      coverwellGdczName2:'',
      coverwellGdcz2:'',
      coverwellGdkjName2:'',
      coverwellGdkj2:'',
      coverwellGdldsdName2:'',
      coverwellGdldsd2:'',
      coverwellLxName2:'',
      coverwellLx2:'',
      coverwellJsName2:'',
      coverwellJs2:'',
      coverwellSzdw:'',
      coverwellSgdw:'',
      coverTypeName2:'',
      coverType2:'',
      coverWelltypeName2:'',
      coverWelltype2:'',
      localIds22:''


    }
  },
  components:{
      Header,
  },
  watch:{
    serverId01:{
      handler(newVal,oldVal){
        if (newVal) {
          this.serverId01 = newVal
        }else{
          this.serverId01 = ''
        }
      }
    },
    serverId:{
       handler(newVal,oldVal){
        if (newVal) {
          this.serverId = newVal
        }else{
          this.serverId = ''
        }
      }
    },
    serverId2:{
       handler(newVal,oldVal){
        if (newVal) {
          this.serverId2 = newVal
        }else{
          this.serverId2 = ''
        }
      }
    },
     serverId:{
       handler(newVal,oldVal){
        if (newVal) {
          this.serverId = newVal
        }else{
          this.serverId = ''
        }
      }
    }
  },
  created(){
    this.init()
  },
  methods:{
    init(){
             let self = this;
            if (navigator.userAgent.indexOf('iPhone') !== -1) {
                self.url = sessionStorage.getItem('Url');
 
            }  else {
                const { href } = window.location;
                self.url = href;
            }

            // console.log('url',self.url,this.url);
            jsValid(self.url).then(res =>{
                console.log('res==',res)
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: res.data.data.appId, // 必填，公众号的唯一标识
                    timestamp: res.data.data.timestame, // 必填，生成签名的时间戳
                    nonceStr: res.data.data.nonceStr, // 必填，生成签名的随机串
                    signature: res.data.data.signature,// 必填，签名
                    jsApiList: ['checkJsApi','chooseImage','uploadImage','getLocalImgData','previewImage','openLocation','getLocation','scanQRCode'] // 必填，需要使用的JS接口列表
                });
            }).catch(error => {
            });

           


            wx.checkJsApi({
                jsApiList: ['chooseImage','uploadImage','getLocalImgData','previewImage','openLocation','getLocation','scanQRCode'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
                success: function (res) {
                    if (res.checkResult.getLocation == false) {
                        alert('你的微信版本太低，不支持微信JS接口，请升级到最新的微信版本！');
                        return false;
                    }
                }
            });
            // console.log('this',this);
            // this.resetPointFn()

            wx.ready(function() {
            //config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
            // _map();
            // resetPointFn(function () {
            //    console.log('ready+++++++++++++++++',self);
                //  self.resetPointFn()
                //  self.imgDetail()


              

            });
           
            wx.error(function (res) {
                // console.log("===="+res);
                // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
                alert("验证出错");
                return false;
            });

          
    },
    resetPointFn(){
        // alert(122)
          let self = this;
        wx.getLocation({
            type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
            success: function (res) {
                console.log('---------getLocation--------',res);
                self.locations =  res.longitude + ','+  res.latitude 
                // this.center = [res.latitude ,res.longitude];
                self.$refs.loadingToast.style.display = 'block';

                transform('gps',self.locations,'JSON').then(res =>{


                    self.$refs.loadingToast.style.display = 'none';
                    self.$refs.textToast.style.display = 'block';
                    window.setTimeout(function () {
                        self.$refs.textToast.style.display = 'none'
                    }, 1000);

                    self.lon = res.data.data.log;
                    self.lat = res.data.data.lat;
                    // self.showMap = true
                    // alert(res.data.data.lat)
                    
                    self.initMap(self.lon,self.lat) 

                    
                    
                    
                }).catch(error => {
                });

                
            },
              fail: res => {
                //接口调用失败，提示用户打开定位功能
                self.wetoast.toast({ title: '获取定位失败，请打开定位，重新进入！' });
            }
        });
   
    },
    selectDataCoverMcnOrSn(mcn){
       this.coverTypeName2 = ''
       this.coverWelltypeName2 = ''
       this.coverwellJngdlbName2 = ''
       this.coverwellGdczName2 = ''
       this.coverwellGdkjName2 = ''
       this.coverwellGdldsdName2 = ''
       this.coverwellLxName2 = ''
       this.coverwellJsName2 = ''
       this.coverType2 = ''
       this.coverWelltype2 = ''
       this.coverwellJngdlb2  = ''
       this.coverwellGdcz2  = ''
       this.coverwellGdkj2  = ''
       this.coverwellGdldsd2  = ''
       this.coverwellLx2  = ''
       this.coverwellJs2  = ''
       this.localIds = ''
       this.localIds2 = ''
       this.localIds01 = ''
       this.localIds02 = ''
       this.serverId = ''
       this.serverId2 = ''
       this.serverId01 = ''
       this.serverId02 = ''
       this.lat = ''
       this.lon = ''
        selectDataCoverMcnOrSn(mcn).then(res =>{
          this.$refs.Toast.style.display = 'none';
                if (res.data.code == 200) {
                  this.$refs.model.style.display = 'block';
                  this.dataCoverList = res.data.data.dataCoverList;
                  this.dataCoverWellList = res.data.data.dataCoverWellList;
                  this.coverwellSzdw = this.dataCoverWellList.coverwellSzdw;
                  this.coverwellSgdw = this.dataCoverWellList.coverwellSgdw;

                  this.coverImgpath = res.data.data.dataCoverList.coverImgpath?res.data.data.dataCoverList.coverImgpath:'';
                  this.coverImgpath2 = res.data.data.dataCoverList.coverImgpath2?res.data.data.dataCoverList.coverImgpath2:'';
                  this.coverwellImgpath = this.dataCoverWellList.coverwellImgpath?this.dataCoverWellList.coverwellImgpath:'';
                  this.coverwellImgpath2 = this.dataCoverWellList.coverwellImgpath2?this.dataCoverWellList.coverwellImgpath2:'';

       
                  this.initMap(this.dataCoverList.longitude?this.dataCoverList.longitude:'0', this.dataCoverList.latitude?this.dataCoverList.latitude:'0');

                 
                }else{
                  this.message = res.data.message;
                  this.$refs.iosDialog2.style.display = 'block';
                  this.dataCoverList = {};
                  this.dataCoverWellList = {};
                }
               
        })

         var list = 'cover_type,cover_welltype, cover_well_direction,  cover_well_material, cover_well_pipecategory, cover_well_pipecaliber, cover_well_deep'
        
        selectDictionariesCode('text', 'value',list).then(res =>{
          this.data = res.data.data

        }).catch(error =>{
        })
    },
    Search(){
      this.$refs.Toast.style.display = 'block';
      if (this.mcn) {
        this.selectDataCoverMcnOrSn(this.mcn)
      }else{
          this.$refs.Toast.style.display = 'none';
          this.message = '请输入MCN码';
          this.$refs.iosDialog2.style.display = 'block';
      }
        
    },
    goSelect(){

    },
    onChange(picker, value, index) {
      console.log(`当前值：${value}, 当前索引：${index}`);
    },
    onConfirm(value, index) {
      this.show = false;
        if (this.id == 'id01') {
          this.coverTypeName2 = value.text;
          this.coverType2 = value.value;
        }
        if (this.id == 'id02') {
          this.coverWelltypeName2 = value.text;
          this.coverWelltype2 = value.value;
        }
        if (this.id == 'id03') {
          this.coverwellJngdlbName2 = value.text;
          this.coverwellJngdlb2 = value.value;
        }
        if (this.id == 'id04') {
          this.coverwellGdczName2 = value.text;
           this.coverwellGdcz2 = value.value;
        }
         if (this.id == 'id05') {
          this.coverwellGdkjName2 = value.text;
          this.coverwellGdkj2 = value.value;
        }
        if (this.id == 'id06') {
          this.coverwellGdldsdName2 = value.text;
          this.coverwellGdldsd2 = value.value;
        }
        if (this.id == 'id07') {
          this.coverwellLxName2 = value.text;
          this.coverwellLx2 = value.value;
        }
        if (this.id == 'id08') {
          this.coverwellJsName2 = value.text;
          this.coverwellJs2 = value.value;
        }
       
      
      
    },
    onCancel(){
      this.show = false;
    },
    showPopup(id){
      this.id = id;

        this.show = true;
        if (id == 'id01') {
          this.columns = this.data.cover_type_list;
          console.log(this.columns);
        }
        if (id == 'id02') {
          this.columns = this.data.cover_welltype_list;
        }
        if (id == 'id03') {
          this.columns = this.data.cover_well_pipecategory_list;
        }
        if (id == 'id04') {
          this.columns = this.data.cover_well_material_list;
        }
        if (id == 'id05') {
          this.columns = this.data.cover_well_pipecaliber_list;
        }
      
        if (id == 'id07') {
          this.columns = this.data.cover_well_direction_list;
        }
        if (id == 'id06' || id == 'id08') {
          this.columns = this.data.cover_well_deep_list;
        }

      // })
    },
    gochakan(){
      this.$refs.androidActionsheet.style.display = 'none';
       if (this.nowImg == 'img11') {
        // alert(this.localIds)
        //  if (this.localIds.length>0 && this.localIds2.length>0) {
        //   //  this.coverImgpath = this.localIds
        // console.log(document.getElementById("img").src);
        // var a = this.localIds;
        // alert(a+"+++++++++")
        //     wx.previewImage({
        //       current: a, // 当前显示图片的http链接
        //       urls: [a] // 需要预览的图片http链接列表
        //     });
        //  }else{
        //    wx.previewImage({
        //         current: 'http://coverimage.oss-cn-hangzhou.aliyuncs.com/image/'+this.coverImgpath, // 当前显示图片的http链接
        //         urls: ['http://coverimage.oss-cn-hangzhou.aliyuncs.com/image/'+this.coverImgpath,
        //         'http://coverimage.oss-cn-hangzhou.aliyuncs.com/image/'+this.coverImgpath2] // 需要预览的图片http链接列表
        //     });
        //  }
          wx.previewImage({
              current: 'http://coverimage.oss-cn-hangzhou.aliyuncs.com/image/'+this.coverImgpath, // 当前显示图片的http链接
              urls: ['http://coverimage.oss-cn-hangzhou.aliyuncs.com/image/'+this.coverImgpath,
              'http://coverimage.oss-cn-hangzhou.aliyuncs.com/image/'+this.coverImgpath2] // 需要预览的图片http链接列表
          });
        
      }
       if (this.nowImg == 'img12') {
        wx.previewImage({
            current: 'http://coverimage.oss-cn-hangzhou.aliyuncs.com/image/'+this.coverImgpath2, // 当前显示图片的http链接
            urls: ['http://coverimage.oss-cn-hangzhou.aliyuncs.com/image/'+this.coverImgpath,
            'http://coverimage.oss-cn-hangzhou.aliyuncs.com/image/'+this.coverImgpath2] // 需要预览的图片http链接列表
        });
      }
      if (this.nowImg == 'img01') {
        wx.previewImage({
            current: 'http://coverimage.oss-cn-hangzhou.aliyuncs.com/image/'+this.coverwellImgpath, // 当前显示图片的http链接
            urls: ['http://coverimage.oss-cn-hangzhou.aliyuncs.com/image/'+this.coverwellImgpath,
            'http://coverimage.oss-cn-hangzhou.aliyuncs.com/image/'+this.coverwellImgpath2] // 需要预览的图片http链接列表
        });
      }
      if (this.nowImg == 'img02') {
         wx.previewImage({
            current: 'http://coverimage.oss-cn-hangzhou.aliyuncs.com/image/'+this.coverwellImgpath2, // 当前显示图片的http链接
            urls: ['http://coverimage.oss-cn-hangzhou.aliyuncs.com/image/'+this.coverwellImgpath, 
            'http://coverimage.oss-cn-hangzhou.aliyuncs.com/image/'+this.coverwellImgpath2] // 需要预览的图片http链接列表
        });
      }
       
        
    },
    goxiugai(){
        let self = this;
        // if (this.nowImg == 'img11') {
          wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                console.log('res+++++++++++++:',res);
                self.$refs.androidActionsheet.style.display = 'none';
                // $("#photolist").html(""); //每次选择图片完成后都清空之前已经添加的html节点  
                   if (self.nowImg == 'img11') {
                      self.localIds = res.localIds;
                      self.localIds22  = res.localIds;
                   }
                    if (self.nowImg == 'img12') {
                      self.localIds2 = res.localIds;
                   }


                   if (self.nowImg == 'img01') {
                      self.localIds01 = res.localIds;
                   }
                    if (self.nowImg == 'img02') {
                      self.localIds02 = res.localIds;
                   }

                 
                
                wx.getLocalImgData({
                    localId: res.localIds[0], // 图片的localID
                    success: function (res) {
                        // this.localData = res.localData;
                        var localData = res.localData; // localData是图片的base64数据，可以用img标签显示

                        
                        if (navigator.userAgent.indexOf('iPhone') !== -1) {
                            if (self.nowImg == 'img11') {
                               self.localIds = res.localData;
                            }
                            if (self.nowImg == 'img12') {
                               self.localIds2 = res.localData;
                            }

                            if (self.nowImg == 'img01') {
                                self.localIds01 = res.localData;
                            }
                              if (self.nowImg == 'img02') {
                                self.localIds02 = res.localData;
                            }
                            
                            

                        }  else {
                          
                            if (self.nowImg == 'img11') {
                              self.localIds ='data:image/png;base64,'+res.localData;
                              // self.coverImgpath = self.localIds;
                            }
                            if (self.nowImg == 'img12') {
                              self.localIds2 ='data:image/png;base64,'+res.localData;
                              // self.coverImgpath2 = self.localIds2;
                            }
                            
                            if (self.nowImg == 'img01') {
                              self.localIds01 ='data:image/png;base64,'+res.localData;
                              // self.coverwellImgpath = self.localIds01;
                            }
                            if (self.nowImg == 'img02') {
                              self.localIds02 ='data:image/png;base64,'+res.localData;
                              // self.coverwellImgpath2 = self.localIds02;
                            }
                        }

                      
                        
                        

                    }
                });

                  // 上传图片
                wx.uploadImage({
                    localId: res.localIds[0], // 需要上传的图片的本地ID，由chooseImage接口获得
                    isShowProgressTips: 1, // 默认为1，显示进度提示
                    success: function (res) {
                        // $("#loadingToasts").hide();
                        // this.serverId = res.serverId; // 返回图片的服务器端ID
                        // custom = serverId;
                        
                       
                        // self.$refs.androidActionsheet.style.display = 'none';

                      
                         if (self.nowImg == 'img11') {
                           self.serverId = res.serverId;
                        }
                         if (self.nowImg == 'img12') {
                           self.serverId2 = res.serverId;
                        }

                        if (self.nowImg == 'img01') {
                           self.serverId01 = res.serverId;
                        }
                         if (self.nowImg == 'img02') {
                           self.serverId02 = res.serverId;
                        }

                        
                        console.log('self.serverId==========', self.serverId);
                        // console.log('res.serverId2=====::::', res);
                        // sessionStorage.setItem("serverId",res.serverId);
                        


                    },
                    fail: function (error) {
                        // $("#loadingToasts").hide();
                        alert('上传错误,请稍候重试!');
                    }
                });

                
            }
          });
        // }
     
    },
    goquxiao(){
      this.$refs.androidActionsheet.style.display = 'none'
    },
    goimgDetail(img){
      this.nowImg = img;
      this.$refs.androidActionsheet.style.display = 'block'
    },
    initMap(longitude,latitude){
        
        var map = new AMap.Map('map', {
                resizeEnable: true, //是否监控地图容器尺寸变化
                zoom:18, //初始化地图层级
                // expandZoomRange:true,
                // zooms:[3,20],
                center: [longitude,latitude] //初始化地图中心点,
        });

        var marker = new AMap.Marker({
                position: new AMap.LngLat(longitude,latitude),
                offset: new AMap.Pixel(-10, -10),
                // draggable: true,
                // cursor: 'move',
                icon: new AMap.Icon({
                    image: require("../assets/images/icon_locate_blue_pre.png"),
                    size: new AMap.Size(100, 100),  //图标大小 
                    imageSize: new AMap.Size(40,40)
                })
        });
        
        map.add(marker);


        let self = this;
        AMap.event.addListener(map,'click',function (reponse) { //添加点击事件,传入对象名，事件名，回调函数

              self.lon = reponse.lnglat.getLng();
              self.lat = reponse.lnglat.getLat();

             getAddres( reponse.lnglat.getLat(), reponse.lnglat.getLng()).then(res =>{
               self.address =res.data.data
               self.$refs.iosDialog3.style.display = 'block';
             })
        })


    },
    confirm2(){
      this.$refs.iosDialog2.style.display = 'none';
    },
    goRefresh(){
       this.$refs.iosDialog.style.display = 'block';
    },
    cancel(){
       this.$refs.iosDialog.style.display = 'none';
    },
    confirm(){
      this.resetPointFn()
      this.$refs.iosDialog.style.display = 'none';
    },
    save(){
      var param = {
        'coverMcn': this.mcn,
        "coverId": this.dataCoverList.coverId,
        "coverType": this.coverType2?this.coverType2:'',
        "coverWelltype": this.coverWelltype2?this.coverWelltype2:'',
        "coverwellImgpath": this.serverId01?this.serverId01:'',
        "coverwellImgpath2": this.serverId02?this.serverId02:'',
        "coverImgpath": this.serverId?this.serverId:'',
        "coverImgpath2": this.serverId2?this.serverId2:'',
        "coverwellSzdw": this.coverwellSzdw?this.coverwellSzdw:'',
        "coverwellSgdw": this.coverwellSgdw?this.coverwellSgdw:'',
        "coverwellJngdlb": this.coverwellJngdlb2?this.coverwellJngdlb2:'',
        "coverwellGdcz": this.coverwellGdcz2?this.coverwellGdcz2:'',
        "coverwellGdkj": this.coverwellGdkj2?this.coverwellGdkj2:'',
        "coverwellGdldsd": this.coverwellGdldsd2?this.coverwellGdldsd2:'',
        "coverwellLx": this.coverwellLx2?this.coverwellLx2:'',
        "coverwellJs": this.coverwellJs2?this.coverwellJs2:'',
        // "coverwellKxx": this.value,
        "latitude": this.lat?this.lat:'',
        "longitude": this.lon?this.lon:'',
        
        
        
      }
      // alert(this.lon)
      
      this.$refs.textToast2.style.display = 'block';
      saveCoverWellMcn(param).then(res =>{
        this.$refs.textToast2.style.display = 'none';
        if (res.data.code == 200) {
          //  this.message ='保存成功！'
          //  this.$refs.iosDialog2.style.display = 'block';
          //  
          
           this.$refs.Dialog.style.display = 'block';
        }
        if (res.data.code == 500) {
            this.message = res.data.message;
            this.$refs.iosDialog2.style.display = 'block';
        }
      })
    },
    confirm3(){
      this.$refs.iosDialog3.style.display = 'none';
      this.initMap(this.lon,this.lat);
    },
    cancel3(){
      this.$refs.iosDialog3.style.display = 'none';
    },
    confirm4(){
      // this.$refs.Dialog.style.display = 'none';
      this.$router.back();
    }


  }
}
</script>

<style>
.van-picker__cancel, .van-picker__confirm {
  font-size: 35px;
}
.van-picker__title{
  font-size: 30px;
  line-height: 30px;
}
.van-picker-column{
  font-size: 30px;
}
</style>

<style lang="scss" scoped>
// .border{
//   width: 10px;
//   height: 25px;
//   background-color: #1890ff;
//   display: inline-block;
//   line-height: 80px;
// }
.weui-dialog{
  width: 70%;
}
.weui-dialog__title{
  font-size: 28px;
}
.weui-dialog__bd{
  font-size: 33px;
  margin-bottom: 30PX;
}
.weui-dialog__ft {
  line-height: 90px;
}
.weui-dialog__hd{
    padding-bottom: 30px;
}
.default{
  font-size: 30px;
}
.primary{
   font-size: 30px;
}

.weui-toast__content{
    font-size: 33px;
}
.weui-toast{
    top: 50%;
    width: 200px;
    height: 200px;
}


.iconfont{
  font-size: 25px;
  position: absolute;
  right: 0;
}
.weui-label{
  width: 200px;
  color: #666;
  font-size: 28px;
  line-height: 40px;
}
.weui-cell_select-after.weui-cell_access .weui-cell__bd{
   color: #999;
    font-size: 28px;
    line-height: 40px;
}
.weui-cell_select-after{
  height: 80px;
}
.weui-cell_select .weui-cell__bd:after{
  // width: 30px;
  // height: 30px;
  // font-size: 50px;
  display: none;
}
.weui-input{
  font-size: 28px;
}
.weui-skin_android .weui-actionsheet{
    width: 55%;
    border-radius: 8px;
}
.chakan,.xiugai, .quxiao{
  font-size: 30px;
}
.weui-skin_android .weui-actionsheet__cell{
  line-height: 30px;
  padding: 35px 20px;
  text-align: center;
}

.card{
    background-color: #fff;
    //  height: 430px;
     height: 100%;
     margin-bottom: 20px;
      .inner{
         padding: 20px;
     }
     p{
         font-size: 30px;
         height: 80px;
         line-height: 80px;
         border-bottom: 1px #e5e5e5 solid;
         padding-left: 10px;
     }
     .list2{
         padding: 20px;
         .p1{
             font-size: 28px;
             color: #666;
         }
         .p2{
             font-size: 28px;
             color: #999;
         }
     }
    .model-img{
        padding: 20px;
        display: flex;
        justify-content: space-around;
        .border-img{
            width: 48%;
            height: 230px;
            border: 1px #e5e5e5 solid;
            border-radius: 15px;
            
        }
        img{
            width: 100%;
            height: 230px;
            border-radius: 15px;
        }
        // img{
        //     width: 48%;
        //     height: 200px;
        // }
    }
    .map-title{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-right: 20px;

    }
    
}
.button{
      background-color: #1890ff;
      width: 100%;
      height: 80px;
      text-align: center;
      color: #fff;
      line-height: 80px;
    }
input{
     border: none;  
     outline: none; 
     font-size:32px;
     color:#666;
     -webkit-appearance: none;
}
button{
    border: none;
    background-color: transparent;
    outline: none;  
}
 .input-mcn{
     width: 60%;
    height: 60px;
    margin: auto;
    text-align: center;
    display: block;
    border:2px #e5e5e5 solid;
    border-radius: 50px;
    margin-top: 10px;
    }
    .search-btn{
        text-align: center;
        width: 60%;
        height: 0.88rem;
        line-height: 0.88rem;
        border-radius: 0.4rem;
        background-color: #1890ff;
        color: #fff;
        font-size: 0.4rem;
        display: block;
        margin: auto;
        margin-top: 30px;
    }
</style>