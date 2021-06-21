<template>
  <div class='pageMiddle_detail collect_middle'>
      <div class='pageMiddle_main'>
        <div class='pageMiddle_box'>
          <div class='pageMiddle_title'>
            {{item ? config.label.update:config.label.create}}
            <i class='el-icon-close close_xxx' @click='closeInfo'></i>
          </div>
          <div class='box_pageMiddle'>
            <div class='box_content'>
              <div class='pageMiddle_row' >
                  <div class='pageMiddle_field pageMiddle_field_name'>名称</div>
                  <div class='pageMiddle_value'>
                    <el-input v-model.trim="data.name" placeholder="请输入名称" ></el-input>
                  </div>
              </div>
              <div class='pageMiddle_row' >
                  <div class='pageMiddle_field pageMiddle_field_name'>图标</div>
                  <div class='pageMiddle_value'>
                    <el-button @click.native='selectFile' type="primary" size="small">上传</el-button>
                  </div>
              </div>
              <div class='pageMiddle_row pageMiddle_cropper' >
                <vueCropper
                  v-if='curBase64'
                  style='width:128px;height:128px;'
                  ref="cropper"
                  :img='curBase64'
                  :autoCrop="true"
                  :fixedBox="true"
                  :autoCropWidth="128"
                  :autoCropHeight="128"
                  :canMoveBox="false"
                  :canMove="true"
                  :full="true"
                  :canScale="true"
                  :flex="[1,1]"
                  mode="auto 100%"
                ></vueCropper>
              </div>
              <div class='pageMiddle_row' >
                  <div class='pageMiddle_field pageMiddle_field_name'>链接</div>
                  <div class='pageMiddle_value'>
                    <el-input v-model.trim="data.url" placeholder="请输入链接"  ></el-input>
                  </div>
              </div>
              <div class='pageMiddle_row' >
                  <div class='pageMiddle_field pageMiddle_field_name'>类别</div>
                  <div class='pageMiddle_value'>
                    <el-select v-model='types' filterable multiple placeholder='请选择类别' >
                      <el-option :value="item.id" :key='index' :label='item.name' v-for="(item,index) in config.categorys"></el-option>
                    </el-select>
                  </div>
              </div>
              <div class='pageMiddle_row pageMiddle_row_group'>
                  <el-button type="primary" @click="doCommit">{{item ? config.label.update:config.label.create}}</el-button>
              </div>
            </div>
          </div>
        </div>
        <div class='pageMiddle_grayBg'  ></div>
        <input type="file" @change='changeFile'  ref='selectFile' style='display:none'>
      </div>
  </div>
</template>
<script>
import axios from '@/common/axios'
import config from '@/common/config'
import tips from '@/common/tips'
import urls from '@/common/urls'
import tool from '@/common/tool'
import uploads from '@/common/uploads'
export default {
  name:'pageMiddle',
  props:{
    item:{
      type:Object,
      default:()=>{
        return null
      }
    }
  },
  data(){
    return {
      data:{
        name:'',
        icon:'',
        url:'',
        type:''
      },
      config:{
        label:config.table.label,
        categorys:[]
      },
      types:[],
      curBase64:'',
      loading:false,
    }
  },
  
  mounted(){
    this.loadCategorys()
    if(this.item) {
      this.initData()
      return;
    }
  },
  methods:{
    initData(){
      this.data = {...this.item};
      this.types = this.item.typeid.split(',').map(x=>Number(x))
      this.initImg()
    },
    closeInfo(){
      this.$emit('closeInfo')
    },
    
    loadCategorys(){
      let url = tool.getURL(urls.collectType.list,{level:2})
      axios.get(url,res=>{
        this.config.categorys = res.data;
      })
    },
    inputCode(){
      this.data.count = this.data.count.replace(/\D/g,'').substr(0,8)
    },
    selectFile(){
      this.$refs.selectFile.click();
    },
    verity(){
      if(this.data.name === ''){
        tips.error(this,{text:'请输入名称'});
        return true;
      }
      if(this.data.icon === ''){
        tips.error(this,{text:'请上传图标'});
        return true;
      }
      if(this.data.url === ''){
        tips.error(this,{text:'请输入链接'});
        return true;
      }
      if(this.types.length === 0){
        tips.error(this,{text:'请选择类型'});
        return true;
      }
      return false;
    },
    initImg(){
      if(!this.data.icon) return;
      let img = new Image();
      let that = this;
      img.crossOrigin='Anonymous'; 
      img.src = `${this.data.icon}`;
      img.onload = (item)=>{
        that.curBase64 = that.getImg(img)
      }
    },
    getImg(img){
      let canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      let ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, img.width, img.height);
      let dataURL = canvas.toDataURL("image/png");
      return dataURL;
    },
    changeFile(e){
      var file = e.target.files[0];
      if(!file) return;
      if(!/\.(jpg|jpeg|png|PNG|JPG)$/.test(e.target.value)){
        this.curBase64= '';
        tips.error({text:'图片类型必须是jpeg,jpg,png'})
        return;
      }
      var reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = (item) => {
        let data = item.target.result
        this.curBase64= data;
      }
    },
    cutImg(callback){
      this.$refs.cropper.getCropData(async res=>{
        console.log(res)
        this.data.icon = await uploads.uploadBase64(res)
        this.initImg()
        callback && callback()
      })
    },
    doCommit(){
      this.cutImg(()=>{
        if(this.loading || this.verity()){
          return;
        }
        this.loading = true;
        this.item ? this.update() : this.create()
      })
    },
    getData(){
      let item = {
        ...this.data,
        type:this.types.join(',')
      }
      return item;
    },
    update(){
      let url = urls.collect.update;
      axios.patch(url,this.getData(),(res)=>{
        setTimeout(() => { this.loading = false; }, 1000);
        if(res.errcode) return;
        tips.success(this,{text:config.showTips.update})
        this.$emit('closeInfo',true)
      })
    },
    create(){
      let url = urls.collect.create;
      axios.post(url,this.getData(),(res)=>{
        setTimeout(() => { this.loading = false; }, 1000);
        if(res.errcode) return;
        tips.success(this,{text:config.showTips.create})
        this.$emit('closeInfo',true)
      })
    },
  },

}
</script>
<style>
.collect_middle .pageMiddle_cropper{
  align-items:center;
  justify-content:center
}
</style>