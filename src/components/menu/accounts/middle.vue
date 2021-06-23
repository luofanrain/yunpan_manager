<template>
  <div class='pageMiddle_detail pageMiddle_detail_accounts'>
      <div class='pageMiddle_main'>
        <div class='pageMiddle_box'>
          <div class='pageMiddle_title'>
            {{item.id ? '修改':'新增'}}
            <i class='el-icon-close close_xxx' @click='closeInfo'></i>
          </div>
          <div class='box_pageMiddle'>
            <div class='box_content'>
              <div class='pageMiddle_row' >
                  <div class='pageMiddle_field'>账号</div>
                  <div class='pageMiddle_value'>
                    <el-input v-model.trim="data.account" placeholder="请输入账号" :disabled="item.id?`disabled`:false"></el-input>
                  </div>
              </div>
              <div class='pageMiddle_row' >
                  <div class='pageMiddle_field'>姓名</div>
                  <div class='pageMiddle_value'>
                    <el-input v-model.trim="data.name" placeholder="请输入姓名" ></el-input>
                  </div>
              </div>
              <div class='pageMiddle_row' v-if='!item.id'>
                  <div class='pageMiddle_field'>密码</div>
                  <div class='pageMiddle_value'>
                    <el-input placeholder="请输入密码" v-model.trim="data.password" type="password" class='inputContent'  autocomplete="new-password" required="required" autocapitalize="off"></el-input>
                  </div>
              </div>
              <div class='pageMiddle_row' v-if='!item.id'>
                  <div class='pageMiddle_field'>确认密码</div>
                  <div class='pageMiddle_value'>
                    <el-input placeholder="请确认密码" v-model.trim="data.surepasswd" type="password" class='inputContent'  autocomplete="new-password" required="required" autocapitalize="off"></el-input>
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
        name:'',
        account:'',
        password:'',
        surepasswd:'',
      },
      config:{
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
      if(this.data.account === ''){
        tips.error(this,{text:'请输入姓名'});
        return false;
      }
      if(this.data.account === ''){
        tips.error(this,{text:'请输入账号'});
        return false;
      }
      if(!this.item.id){
        if(this.data.password === ''){
          tips.error(this,{text:'请输入密码'});
          return false;
        }
        if(this.data.surepasswd !== this.data.password){
          tips.error(this,{text:'两次密码不一致,请重新输入'});
          return false;
        }
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
      let url = urls.accounts.update;
      axios.patch(url,this.data,(res)=>{
        setTimeout(() => { this.loading = false; }, 1000);
        if(res.errcode) return;
        tips.success(this,{text:'修改成功'})
        this.$emit('closeInfo',true)
      })
    },
    create(){
      let url = urls.accounts.create;
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
.pageMiddle_detail_accounts .pageMiddle_field{
  min-width:80px;
}
</style>>
