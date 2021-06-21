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
                  <div class='pageMiddle_field pageMiddle_field_name'>用户名</div>
                  <div class='pageMiddle_value'>
                    <el-input v-model.trim="data.username" placeholder="请输入用户名" ></el-input>
                  </div>
              </div>
              <div class='pageMiddle_row' >
                  <div class='pageMiddle_field pageMiddle_field_name'>密码</div>
                  <div class='pageMiddle_value'>
                    <el-input v-model.trim="data.password" placeholder="请输入密码"  ></el-input>
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
        username:'',
        password:'',
      },
      config:{
        label:config.table.label
      },
      loading:false,
    }
  },
  
  mounted(){
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
    verity(){
      if(this.data.username === ''){
        tips.error(this,{text:'请输入用户名'});
        return true;
      }
      if(this.data.password === ''){
        tips.error(this,{text:'请输入密码'});
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
      let url = urls.users.update;
      axios.patch(url,this.data,(res)=>{
        setTimeout(() => { this.loading = false; }, 1000);
        if(res.errcode) return;
        tips.success(this,{text:config.showTips.update})
        this.$emit('closeInfo',true)
      })
    },
    create(){
      let url = urls.users.create;
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