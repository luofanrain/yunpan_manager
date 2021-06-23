<template>
  <div class='pageMiddle_detail'>
      <div class='pageMiddle_main'>
        <div class='pageMiddle_box'>
          <div class='pageMiddle_title'>
            {{item.id ? '修改':'新增'}}
            <i class='el-icon-close close_xxx' @click='closeInfo'></i>
          </div>
          <div class='box_pageMiddle'>
            <div class='box_content'>
              <div class='pageMiddle_row' >
                  <div class='pageMiddle_field'>权限名</div>
                  <div class='pageMiddle_value'>
                    <el-input v-model="data.name" placeholder="请输入权限名" ></el-input>
                  </div>
              </div>
              <div class='pageMiddle_row' >
                  <div class='pageMiddle_field'>权限代码</div>
                  <div class='pageMiddle_value'>
                    <el-input v-model="data.code" placeholder="请输入权限代码" ></el-input>
                  </div>
              </div>
              
              <div class='pageMiddle_row'>
                  <div class='pageMiddle_field'>权限类型</div>
                  <div class='pageMiddle_value'>
                    <el-select v-model="data.type" placeholder="请选择">
                      <el-option
                        v-for="(item,index) in config.types"
                        :key="index"
                        :label="item"
                        :value="index">
                      </el-option>
                    </el-select>
                  </div>
              </div>
              <div class='pageMiddle_row page_row_btn_single page_row_btn_single_email '>
                  <el-button type="primary" @click="doCommit">{{item.id ? '修改':'新增'}}</el-button>
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
import $ from 'jquery'
import tips from '@/common/tips'
import urls from '@/common/urls'
export default {
  name:'pageMiddle',
  props:{
    item:{
      type:Object,
      default:()=>{
        return {}
      }
    }
  },
  data(){
    return {
      data:{
        permissions:'',
        code:'',
        type:0,
      },
      config:{
        types:config.types.permissions
      },
      loading:false,
    }
  },
  
  mounted(){
    if(this.item.id) this.initData()
  },
  methods:{
    initData(){
      this.data = {...this.item}
    },
    closeInfo(){
      this.$emit('closeInfo')
    },
    formatData(){
      if(this.data.name === ''){
        tips.error(this,{text:'请输入权限名'});
        return false;
      }
      if(this.data.code === ''){
        tips.error(this,{text:'请输入权限代码'});
        return false;
      }
      return true;
    },
    doCommit(){
      if(this.loading || !this.formatData()){
        return;
      }
      this.loading = true;
      if(this.item.id){
        this.update();
      }else{
        this.create();
      }
    },
    update(){
      let url = urls.permissions.update;
      axios.patch(url,this.data,(res)=>{
        setTimeout(() => { this.loading = false; }, 1000);
        if(res.errcode) return;
        tips.success(this,{text:'修改成功'})
        this.$emit('closeInfo',true)
      })
    },
    create(){
      let url = urls.permissions.create;
      axios.post(url,this.data,(res)=>{
        setTimeout(() => { this.loading = false; }, 1000);
        if(res.errcode) return;
        tips.success(this,{text:'新增成功'})
        this.$emit('closeInfo',true)
      })
    },
  },

}
</script>
<style scoped>
</style>>
