<template>
  <div class='pageMiddle_detail'>
      <div class='pageMiddle_main'>
        <div class='pageMiddle_box'>
          <div class='pageMiddle_title'>
            {{item ? config.label.update:config.label.create}}
            <i class='el-icon-close close_xxx' @click='closeInfo'></i>
          </div>
          <div class='box_pageMiddle'>
            <div class='box_content'>
              <div class='pageMiddle_row' >
                  <div class='pageMiddle_field pageMiddle_field_name'>类型名</div>
                  <div class='pageMiddle_value'>
                    <el-input v-model.trim="data.name" placeholder="请输入类型名" ></el-input>
                  </div>
              </div>
              <div class='pageMiddle_row' >
                  <div class='pageMiddle_field pageMiddle_field_name'>等级</div>
                  <div class='pageMiddle_value'>
                    <el-select v-model='data.level' placeholder='请选择等级' @change='changeLevel' :disabled='item ? "disabled":false'>
                      <el-option :value="item.value" :key='index' :label='item.label' v-for="(item,index) in config.levels"></el-option>
                    </el-select>
                  </div>
              </div>
              <div class='pageMiddle_row' v-if='data.level == 2'>
                  <div class='pageMiddle_field pageMiddle_field_name'>父类</div>
                  <div class='pageMiddle_value'>
                    <el-select v-model='data.parentid' filterable placeholder='请选择父类' >
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
      </div>
  </div>
</template>
<script>
import axios from '@/common/axios'
import config from '@/common/config'
import tips from '@/common/tips'
import urls from '@/common/urls'
import tool from '@/common/tool'
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
        level:1,
        parentid:0
      },
      config:{
        levels:[
          {
            label:'一级类',
            value:1
          },
          {
            label:'二级类',
            value:2
          },
        ],
        categorys:[],
        label:config.table.label
      },
      loading:false,
    }
  },
  
  mounted(){
    this.loadCategorys();
    if(this.item) {
      this.initData()
      return;
    }
  },
  methods:{
    initData(){
      this.data = {...this.item};
    },
    closeInfo(){
      this.$emit('closeInfo')
    },
    inputCode(){
      this.data.count = this.data.count.replace(/\D/g,'').substr(0,8)
    },
    changeLevel(){
      if(this.data.level === 1){
        this.data.parentid = 0;
      }else{
        this.data.parentid = ''
      }
    },
    loadCategorys(){
      let url = tool.getURL(urls.collectType.list,{level:1})
      axios.get(url,res=>{
        this.config.categorys = res.data;
      })
    },
    verity(){
      if(this.data.name === ''){
        tips.error(this,{text:'请输入类型名'});
        return true;
      }
      if(this.data.level === ''){
        tips.error(this,{text:'请选择等级'});
        return true;
      }
      if(this.data.level == 2 && this.data.parentid == ''){
        tips.error(this,{text:'请选择父类'});
        return true;
      }
      return false;
    },
    doCommit(){
      if(this.loading || this.verity()){
        return;
      }
      this.loading = true;
      if(this.item){
        this.update();
      }else{
        this.create();
      }
    },
    update(){
      let url = urls.collectType.update;
      axios.patch(url,this.data,(res)=>{
        setTimeout(() => { this.loading = false; }, 1000);
        if(res.errcode) return;
        tips.success(this,{text:config.showTips.update})
        this.$emit('closeInfo',true)
      })
    },
    create(){
      let url = urls.collectType.create;
      axios.post(url,this.data,(res)=>{
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
.pageMiddle_detail .pageMiddle_field_name{
  /* width:60px; */
}
</style>