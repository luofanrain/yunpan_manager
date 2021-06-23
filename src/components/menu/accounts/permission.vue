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
              <div class='box_select_tab'>
                  <div class='box_select_left'>
                    <div clas='box_select_main'>
                      <div class='box_select_ones' v-for='(item,index) in list' :class='{box_select_ones_select:type=="all" && curIndex==index}' :key='index' @click='selectTab("all",index)'>{{item.name}}</div>
                    </div>
                  </div>
                  <div class='box_select_banner'>
                    <div><el-button size='mini' @click.native='doPrepAll' type="primary" icon="el-icon-arrow-left">全左移</el-button></div>
                    <div><el-button size='mini' @click.native='doPrep' type="primary" icon="el-icon-arrow-left">左移</el-button></div>
                    <div><el-button size='mini' @click.native='doNext' type="primary">右移<i class="el-icon-arrow-right el-icon--right"></i></el-button></div>
                    <div><el-button size='mini' @click.native='doNextAll' type="primary">全右移<i class="el-icon-arrow-right el-icon--right"></i></el-button></div>
                  </div>
                  <div class='box_select_right'>
                    <div clas='box_select_main'>
                      <div class='box_select_ones' v-for='(item,index) in permissions' :class='{box_select_ones_select:type=="mine" && curIndex==index}' :key='index' @click='selectTab("mine",index)'>{{item.name}}</div>
                    </div>
                  </div>
              </div>
              <div class='pageMiddle_row page_row_btn_single page_row_btn_single_email '>
                  <el-button type="primary" @click="closeInfo">取消</el-button>
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
        username:'',
        passwd:'',
        surepasswd:'',
      },
      list:[],
      permissions:[],
      loading:false,
      curIndex:'',
      type:""
    }
  },
  
  mounted(){
    if(this.item.id) this.loadData()
  },
  methods:{
    loadData(){
      axios.get(urls.permissions.list,(res)=>{
        this.initData(res.data);
      })
    },
    initData(list){
      this.data = {...this.item,permissions:this.item.permission_names.split(',')};
      console.log(this.data)
      this.permissions = list.filter(x=>this.data.permissions.includes(x.name));
      this.list = list.filter(x=>!this.data.permissions.includes(x.name));
    },
    selectTab(type,index){
      this.type = type;
      this.curIndex = index;
    },
    doPrep(){
      if(this.type == 'mine' && this.curIndex !== ''){
        let item = this.permissions.splice(this.curIndex,1);
        this.list = this.list.concat(item)
        this.type = this.curIndex = '';
      }else{
        this.type = this.curIndex = '';
      }
    },
    doNext(){
      if(this.type == 'all' && this.curIndex !== ''){
        let item = this.list.splice(this.curIndex,1);
        this.permissions = this.permissions.concat(item)
        this.type = this.curIndex = '';
      }else{
        this.type = this.curIndex = '';
      }
    },
    doPrepAll(){
      this.list = this.list.concat(this.permissions.splice(0))
    },
    doNextAll(){
      this.permissions = this.permissions.concat(this.list.splice(0))
    },
    closeInfo(){
      this.$emit('closeInfo')
    },
    formatData(){
      return true;
    },
    doCommit(){
      if(this.loading || !this.formatData()){
        return;
      }
      this.loading = true;
      this.update()
    },
    update(){
      let url = urls.accounts.updatePermission;
      let data = {
        id:this.data.id,
        permissions:this.permissions.map(x=>x.id).join(',')
      }
      axios.patch(url,data,(res)=>{
        setTimeout(()=>{ this.loading = true;},1000)
        if(res.errcode) return;
        tips.success(this,{text:'修改成功'})
        this.$emit('closeInfo',true)
      })
    },
  },

}
</script>
<style scoped>
.box_select_tab{
  display: flex;
}
.box_select_left,.box_select_right{
  width:150px;
  height:486px;
  /* background:red; */
  border:1px solid #911C61;
  padding:10px;
  overflow: scroll;
}
.box_select_banner{
  width:120px;
  height:486px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.box_select_banner button{
  margin:20px 0;
  width:90px;
}
.box_select_ones{
  text-align: left;
  padding:10px 10px;
  font-size:14px;
}
.box_select_ones_select{
  background:#70e2fc;
  color:#fff;
  border-radius:2px;
}
</style>>
