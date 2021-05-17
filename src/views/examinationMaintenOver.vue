<template>
  <div>
      <Header :data="msg"></Header>
      <div class="container">
            <div class="title">
                <img  src="../assets/images/icon_take_photo.png"  />
                <span>请确保照片清晰、全面！</span>
            </div>
             <div class="the-sample">
                <img v-show="this.$route.params.reportCustom" :src="'http://coverimage.oss-cn-hangzhou.aliyuncs.com/image/'+ this.$route.params.reportCustom" style="margin-bottom:10px" />
                <img v-show="this.$route.params.reportCustom2" :src="'http://coverimage.oss-cn-hangzhou.aliyuncs.com/image/'+ this.$route.params.reportCustom2" style="margin-bottom:10px" />
                 <img v-show="this.$route.params.reportCustom3" :src="'http://coverimage.oss-cn-hangzhou.aliyuncs.com/image/'+ this.$route.params.reportCustom3"  />
                <img v-show="this.$route.params.reportCustom4" :src="'http://coverimage.oss-cn-hangzhou.aliyuncs.com/image/'+ this.$route.params.reportCustom4"  />
            </div>
             <!-- <div class="the-sample" v-show="this.$route.params.reportCustom3 || this.$route.params.reportCustom4">
               
            </div> -->

            <div class="the-upload">
                <div class="upload" @click="upLoadImg('image01')">
                        <span>图一</span>
                        <div class="upload-img">
                            <img class="camera" src="../assets/images/icon_take_photo.png"   v-show="!localIds2" />
                            <img   :class=" localIds2?'settingImg':'settingImg2' " :src="localIds2"   />
                        </div>
                </div>
                <div class="upload" @click="upLoadImg2('image02')">
                        <span>图二</span>
                         <div class="upload-img">
                            <img class="camera" src="../assets/images/icon_take_photo.png"   v-show="!localIds3" />
                            <img   :class=" localIds3?'settingImg':'settingImg2' " :src="localIds3"  />
                        </div>
                </div>
            </div>

            <div class="the-upload setting" >
                <div class="upload" @click="upLoadImg3('image03')">
                        <span>图三</span>
                        <div class="upload-img">
                            <img class="camera"  src="../assets/images/icon_take_photo.png"   v-show="!localIds4" />
                            <img   :class=" localIds4?'settingImg':'settingImg2' " :src="localIds4"  />
                        </div>
                </div>
                <div class="upload" @click="upLoadImg4('image04')">
                    <span>图四</span>
                    <div class="upload-img">
                        <img class="camera" src="../assets/images/icon_take_photo.png"   v-show="!localIds5" />
                        <img   :class=" localIds5?'settingImg':'settingImg2' " :src="localIds5"  />
                    </div>
                </div>
            </div>

             <div ref="loadingToast" style="display: none;">
                <div class="weui-mask_transparent"></div>
                <div class="weui-toast">
                    <span class="weui-primary-loading weui-primary-loading_transparent weui-icon_toast">
                    <span class="weui-primary-loading__dot"></span>
                    </span>
                    <p class="weui-toast__content">保存中</p>
                </div>
            </div>

            <div class="js_dialog" ref="iosDialog" style="display: none;">
                <div class="weui-mask"></div>
                <div class="weui-dialog">
                    <div class="weui-dialog__hd"><strong class="weui-dialog__title">提示信息</strong></div>
                    <div class="weui-dialog__bd">维修结束成功</div>
                    <div class="weui-dialog__ft">
                        <!-- <a href="javascript:" class="weui-dialog__btn weui-dialog__btn_default default" @click="cancel">取消</a> -->
                        <a href="javascript:" class="weui-dialog__btn weui-dialog__btn_primary primary" @click="confirm">确定</a>
                    </div>
                </div>
            </div>

             <div class="js_dialog" ref="iosDialog2" style="display: none;">
                <div class="weui-mask"></div>
                <div class="weui-dialog">
                    <div class="weui-dialog__hd"><strong class="weui-dialog__title">提示信息</strong></div>
                    <div class="weui-dialog__bd">确定提交吗？</div>
                    <div class="weui-dialog__ft">
                        <a href="javascript:" class="weui-dialog__btn weui-dialog__btn_default default" @click="cancel2">取消</a>
                        <a href="javascript:" class="weui-dialog__btn weui-dialog__btn_primary primary" @click="confirm2">确定</a>
                    </div>
                </div>
            </div>

             <div ref="loadingToast2" style="display: none;">
                <div class="weui-mask_transparent"></div>
                <div class="weui-toast">
                    <span class="weui-primary-loading weui-primary-loading_transparent weui-icon_toast">
                    <span class="weui-primary-loading__dot"></span>
                    </span>
                    <p class="weui-toast__content">提交中</p>
                </div>
            </div>

             <div class="js_dialog" ref="Dialog" style="display: none;">
                <div class="weui-mask"></div>
                <div class="weui-dialog">
                    <div class="weui-dialog__hd"><strong class="weui-dialog__title">提示信息</strong></div>
                    <div class="weui-dialog__bd">{{message}}</div>
                    <div class="weui-dialog__ft">
                        <!-- <a href="javascript:" class="weui-dialog__btn weui-dialog__btn_default default" @click="cancel">取消</a> -->
                        <a href="javascript:" class="weui-dialog__btn weui-dialog__btn_primary primary" @click="confirmDialog">确定</a>
                    </div>
                </div>
            </div>

             <button type="button" class="submit" @click="RepairsSave">提交</button>

      </div>
  </div>
</template>

<script>
import Header from '../components/Header2';
import wx from 'weixin-js-sdk';
import {jsValid} from '../api/user/wechat';
import { repairItemEnd } from "../api/user/function";
import weui from 'weui.js';
import 'weui';

export default {
  data(){
    return{
      msg:'维修结束',
      url: window.location.href,
      localIds2: '',
      localIds3: '',
      localIds4: '',
      localIds5: '',
      message:''
      
    }
  },
  components:{
    Header
  },
  created(){
      this.upLoad()
  },
  methods:{
        upLoad(){
             let self = this;
            if (navigator.userAgent.indexOf('iPhone') !== -1) {
                self.url = sessionStorage.getItem('Url');
 
            }  else {
                const { href } = window.location;
                self.url = href;
            }
            // var item = _this;
             jsValid(self.url).then(res =>{
                console.log('res==',res)
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: res.data.data.appId, // 必填，公众号的唯一标识
                    timestamp: res.data.data.timestame, // 必填，生成签名的时间戳
                    nonceStr: res.data.data.nonceStr, // 必填，生成签名的随机串
                    signature: res.data.data.signature,// 必填，签名
                    jsApiList: ['checkJsApi','chooseImage','uploadImage','previewImage','getLocalImgData'] // 必填，需要使用的JS接口列表
                });
            }).catch(error => {
                alert('请重新授权')
            });

             wx.checkJsApi({
                jsApiList: ['chooseImage','uploadImage','previewImage','getLocalImgData'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
                success: function (res) {
                    if (res.checkResult.getLocation == false) {
                        // $("#loadingToast").hide();
                        alert('你的微信版本太低，不支持微信JS接口，请升级到最新的微信版本！');
                        return false;
                    }
                }
            });
            
            wx.ready(function() {
            //config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
            // _map();
            // resetPointFn(function () {
            //    console.log('item=',item);
                //  item.upLoadImg()
               

            });
        },
        upLoadImg(item){
            // var imglen = localId.length; //计算 本地id列表的长度
            
            let self = this;
            console.log('this1---------',self);

            wx.chooseImage({
                count: 1, // 默认9
                sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                success: function (res) {
                    console.log('res+++++++++++++:',res);
                    // $("#photolist").html(""); //每次选择图片完成后都清空之前已经添加的html节点  

                     self.localIds = res.localIds;
                     console.log('res1--------:',res.localIds);

                   
                    wx.getLocalImgData({
                        localId: res.localIds[0], // 图片的localID
                        success: function (res) {
                            // this.localData = res.localData;
                            var localData = res.localData; // localData是图片的base64数据，可以用img标签显示
 

                            console.log('this2---------',self);


                            //    self.localIds2 = res.localData

                             
                            //  self.localIds2 = require(res.localData);
                            // src='data:image/png;base64,"base64字符串"'
                                //   console.log('getItem22=========',self.localIds2);
                           
                            // if (item == 'image01') {  //成功后还需刷新才有图片显示。。。
                                  
                            //     //  self.localIds2 = res.localData //ios
                                 self.localIds2 ='data:image/png;base64,'+res.localData
                            //     //  sessionStorage.setItem("localIds2",self.localIds2);
                            // }
                            // if (item == 'image02') {
                            //     //   self.localIds3 = res.localData
                            //      self.localIds3 ='data:image/png;base64,'+res.localData
                            //     //  sessionStorage.setItem("localIds3", self.localIds3);
                            // }
                            // if (item == 'image03') {
                            //     //  sessionStorage.setItem("localIds4",localData);
                            //     //   self.localIds4 = res.localData
                            //       self.localIds4 ='data:image/png;base64,'+res.localData
                            // }
                            //  if (item == 'image04') {
                            //     //  sessionStorage.setItem("localIds5",localData);
                            //     //  self.localIds5 = res.localData
                            //     self.localIds5 ='data:image/png;base64,'+res.localData
                            // }
                           
                           

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
                            
                            self.serverId = res.serverId;
                            
                            console.log('self.serverId==========', self.serverId);
                            // console.log('res.serverId2=====::::', res);
                            sessionStorage.setItem("serverId",res.serverId);
                           
    

                        },
                        fail: function (error) {
                            // $("#loadingToasts").hide();
                            alert('上传错误,请稍候重试!');
                        }
                    });

                   
                }
            });
        },
        upLoadImg2(item){
            // var imglen = localId.length; //计算 本地id列表的长度
            
            let self = this;
            console.log('this1---------',self);

            wx.chooseImage({
                count: 1, // 默认9
                sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                success: function (res) {
                    console.log('res+++++++++++++:',res);
                    // $("#photolist").html(""); //每次选择图片完成后都清空之前已经添加的html节点  

                    
                    //  console.log('传进来的数据-----：',item);
                    //  this.localIds ='';
                     self.localIds = res.localIds;
                     console.log('res2--------:',res.localIds);

        
                   
                    wx.getLocalImgData({
                        localId: res.localIds[0], // 图片的localID
                        success: function (res) {
                            // this.localData = res.localData;
                            var localData = res.localData; // localData是图片的base64数据，可以用img标签显示
                            // console.log(localData);
                        //    localData = localData.replace('jpg','jpeg');
                        //    this.imgArr[index].src = localData

                        console.log('this2---------',self);
       
                        self.localIds3 ='data:image/png;base64,'+res.localData
   
                           
                           

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
                            
                            self.serverId2 = res.serverId;
                            
                            console.log('self.serverId2============', self.serverId2);
                            // console.log('res.serverId2=====::::', res);
                            sessionStorage.setItem("serverId",res.serverId);


                        },
                        fail: function (error) {
                            // $("#loadingToasts").hide();
                            alert('上传错误,请稍候重试!');
                        }
                    });

                   
                }
            });
        },
        upLoadImg3(item){
            // var imglen = localId.length; //计算 本地id列表的长度
            
            let self = this;
            console.log('this1---------',self);

            wx.chooseImage({
                count: 1, // 默认9
                sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                success: function (res) {
                    console.log('res+++++++++++++:',res);
                    // $("#photolist").html(""); //每次选择图片完成后都清空之前已经添加的html节点  

                    
                    //  console.log('传进来的数据-----：',item);
                    //  this.localIds ='';
                     self.localIds = res.localIds;
                     console.log('res2--------:',res.localIds);

        
                   
                    wx.getLocalImgData({
                        localId: res.localIds[0], // 图片的localID
                        success: function (res) {
                            // this.localData = res.localData;
                            var localData = res.localData; // localData是图片的base64数据，可以用img标签显示
                            // console.log(localData);
                        //    localData = localData.replace('jpg','jpeg');
                        //    this.imgArr[index].src = localData

                        console.log('this2---------',self);
                  
                        self.localIds4 ='data:image/png;base64,'+res.localData
        
                           
                           

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
                            
                            self.serverId3 = res.serverId;
                            
                            console.log('self.serverId3============', self.serverId3);
                            sessionStorage.setItem("serverId",res.serverId);


                        },
                        fail: function (error) {
                            // $("#loadingToasts").hide();
                            alert('上传错误,请稍候重试!');
                        }
                    });

                   
                }
            });
        },
        upLoadImg4(item){
            // var imglen = localId.length; //计算 本地id列表的长度
            
            let self = this;
            console.log('this1---------',self);

            wx.chooseImage({
                count: 1, // 默认9
                sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                success: function (res) {
                    console.log('res+++++++++++++:',res);
                    // $("#photolist").html(""); //每次选择图片完成后都清空之前已经添加的html节点  

                    
                    //  console.log('传进来的数据-----：',item);
                    //  this.localIds ='';
                     self.localIds = res.localIds;
                     console.log('res2--------:',res.localIds);

        
                   
                    wx.getLocalImgData({
                        localId: res.localIds[0], // 图片的localID
                        success: function (res) {
                            // this.localData = res.localData;
                            var localData = res.localData; // localData是图片的base64数据，可以用img标签显示
                            // console.log(localData);
                        //    localData = localData.replace('jpg','jpeg');
                        //    this.imgArr[index].src = localData

                            console.log('this2---------',self);

                            self.localIds5 ='data:image/png;base64,'+res.localData
                            // }
                           
                           

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
                            
                            self.serverId4 = res.serverId;
                            
                            console.log('self.serverId4============', self.serverId4);
                            // sessionStorage.setItem("serverId",res.serverId);


                        },
                        fail: function (error) {
                            // $("#loadingToasts").hide();
                            alert('上传错误,请稍候重试!');
                        }
                    });

                   
                }
            });
        },
        RepairsSave(){
            // this.localIds2 = sessionStorage.getItem("localIds2");
            // this.localIds3 = sessionStorage.getItem("localIds3");
            // this.localIds4 = sessionStorage.getItem("localIds4");
            // this.localIds5 = sessionStorage.getItem("localIds5");

            // console.log('getItem=========',sessionStorage.getItem("localIds2"));
            console.log('getItem2=========',this.localIds);
            let self = this;
            console.log('getItem2=========',this);
            

           

           self.$refs.iosDialog2.style.display = 'block';
             
           


            // }

           
        },
        confirm(){
            this.$router.replace({
                name:'examinationMainten'
            })
            
        },
        cancel(){
            this.$refs.iosDialog.style.display = 'none';
        },
        confirm2(){
             var sjjwUserRepairParam = {
                repairId: this.$route.params.repairId,
                repairCustom: this.serverId?this.serverId:'',
                repairCustom2: this.serverId2?this.serverId2:'',
                repairCustom3: this.serverId3?this.serverId3:'',
                repairCustom4: this.serverId4?this.serverId4:'',
            }
          
            // if (this.repairsValue) {
                // 2
            this.$refs.loadingToast2.style.display = 'block'

            if((this.serverId && this.serverId2 && !this.serverId3 && !this.serverId4) || (!this.serverId && !this.serverId2 && this.serverId3 && this.serverId4) || (this.serverId && !this.serverId2 && this.serverId3 && !this.serverId4) 
            || (!this.serverId && this.serverId2 && !this.serverId3 && this.serverId4) || (!this.serverId && this.serverId2 && this.serverId3 && !this.serverId4) ||  (this.serverId && !this.serverId2 && !this.serverId3 && this.serverId4)){
                repairItemEnd(sjjwUserRepairParam).then(res =>{
                    this.$refs.loadingToast2.style.display = 'none'
                    if (res.data.code == 200) {
                        // self.$refs.loadingToast.style.display = 'block'
                        // window.setTimeout(function () {
                        //     self.$refs.loadingToast.style.display = 'none';
                        //     // alert('报修成功');
                        //     self.$refs.iosDialog.style.display = 'block';
                        // }, 2000);
                        this.$refs.iosDialog.style.display = 'block';
                    }else{
                        this.message = res.data.message;
                        this.$refs.Dialog.style.display = 'block';
                    }
                        
                        

                }).catch(error =>{
                })
            }

            // 3
            if((!this.serverId && this.serverId2 && this.serverId3 && this.serverId4) || (this.serverId && !this.serverId2 && this.serverId3 && this.serverId4) || (this.serverId && this.serverId2 && !this.serverId3 && this.serverId4) || (this.serverId && this.serverId2 && this.serverId3 && !this.serverId4)){
                repairItemEnd(sjjwUserRepairParam).then(res =>{
                    this.$refs.loadingToast2.style.display = 'none'
                    if (res.data.code == 200) {
                        //  self.$refs.loadingToast.style.display = 'block'
                        // window.setTimeout(function () {
                        //     self.$refs.loadingToast.style.display = 'none';
                        //     // alert('报修成功');
                        //     self.$refs.iosDialog.style.display = 'block';
                        // }, 2000);
                        this.$refs.iosDialog.style.display = 'block';
                    }else{
                        this.message = res.data.message;
                        this.$refs.Dialog.style.display = 'block';
                    }
                   
                }).catch(error =>{
                })
            }

            // 4
            if (this.serverId && this.serverId2 && this.serverId3 && this.serverId4) {
                repairItemEnd(sjjwUserRepairParam).then(res =>{
                    this.$refs.loadingToast2.style.display = 'none'
                    if (res.data.code == 200) {
                        //   self.$refs.loadingToast.style.display = 'block'
                        // window.setTimeout(function () {
                        //     self.$refs.loadingToast.style.display = 'none';
                        //     // alert('报修成功');
                        //     self.$refs.iosDialog.style.display = 'block';
                        // }, 2000);
                        this.$refs.iosDialog.style.display = 'block';
                    }else{
                        this.message = res.data.message;
                        this.$refs.Dialog.style.display = 'block';
                    }
                   

                }).catch(error =>{
                })
            }
            if((this.serverId && !this.serverId2 && !this.serverId3 && !this.serverId4) || (!this.serverId && this.serverId2 && !this.serverId3 && !this.serverId4) || (!this.serverId && !this.serverId2 && this.serverId3 && !this.serverId4) || (!this.serverId && !this.serverId2 && !this.serverId3 && this.serverId4)){
                alert('请至少上传两张图片！')
                this.$refs.loadingToast2.style.display = 'none'
            }
            if (!this.serverId && !this.serverId2 && !this.serverId3 && !this.serverId4) {
                alert('请至少上传两张图片！')
                this.$refs.loadingToast2.style.display = 'none'
            }

           this.$refs.iosDialog2.style.display = 'none';
            
        },
        cancel2(){
            this.$refs.iosDialog2.style.display = 'none';
        },
        confirmDialog(){
            this.$refs.Dialog.style.display = 'none';
        }
  }
}
</script>

<style lang="scss" scoped>
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
.container{
    background-color: #fff;
    padding: 20px 25px;
    margin-top: 20px;
    border: 1px solid #e5e5e5;
    .title{
        display: flex;
        align-items: center;
        border: 1px solid rgba(203, 203, 203, 0.47);
        padding: 10px;
        span{
             font-size: 30px;
        }
        img{
            width: 50px;
            height: 40px;
        }
        
    }
    .the-sample{
         display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        margin: 20px 0 30px 0; 
        img{
                width: 45%;
            height: 220px;
        }
    }
    .the-upload{
        display: flex;
        align-items: center;
        justify-content: space-between;
        .upload{
            //  border: 2px solid rgba(203, 203, 203, 0.47);
             border: 2px solid #999;
             border-radius: 15px;
             width: 42%;
             height: 250px;
            //  padding: 15px;
             padding: 0px 10px 10px 10px;
             span{
                 font-size: 26px;
                 color: #666;
                 margin-top: 5px;
                 display: block;
             }
            
             .upload-img{
                display: flex;
                align-items: center;
                justify-content: center;
                // margin-top: 5px;
                .camera{
                    margin-top: 40px;
                    // display: inline-block;
                    // margin: 0 auto;
                    // line-height: 250px;

                }
                .settingImg{
                      width: 90%;
                      height: 200px;
                      margin-top: 0px;
                }
                .settingImg2{
                    display: none;
                }
             }
        }
    }
    .setting{
        margin-top: 50px;
    }
    button{
        border: none;
        background-color: transparent;
        outline: none;   
    }
    .submit{
        width: 85%;
        height: 60px;
        background-color: #1890ff;
        color: #fff;
        display: block;
        margin: auto;
        margin-top: 80px;
        border-radius: 15px;
        text-align: center;
        font-size: 30px;
        margin-bottom: 20px;
    }
}
</style>