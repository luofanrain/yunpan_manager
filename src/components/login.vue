<template>
  <el-container class='container login-cont'>
    <el-form ref="form" class='content' autocomplete='off' @keyup.enter.native='doLogin'>
      <div class='login-main-title'>
        <img
          :src="require('@/assets/images/logo.png')"
          class='logo'
          />
      </div>
      <div  class='input'>
        <el-input placeholder="请输入账号" v-model="data.username" class='inputContent'  required="required" autocapitalize="off">
          <template slot="prepend" class='inputContent'>账号:</template>
        </el-input>
      </div>
      <div class='input'>
        <el-input placeholder="请输入密码" v-model="data.password" type="password" class='inputContent'   autocomplete="new-password" required="required" autocapitalize="off">
          <template slot="prepend" class='inputContent'>密码:</template>
        </el-input>
      </div>
      <div class='input'>
          <el-button type="primary" class='login' @click='doLogin'  >登录</el-button>
      </div>
    </el-form>
  </el-container>
</template>

<script>
import axios from '@/common/axios'
import tool from '@/common/tool'
import urls from '@/common/urls'
import tips from '@/common/tips'
export default {
  name: 'login',
  data () {
    return {
      data:{
        username: '',
        password: '',
      },
      loading:false
    }
  },
  created(){
    this.data = tool.getLocalCookie('loginData') || {}
  },
  methods:{
    verityData(){
      if(this.data.username === ''){
        tips.error(this,{text:'请输入用户名'})
        return true;
      }
      if(this.data.password === ''){
        tips.error(this,{text:'请输入密码'})
        return true;
      }
      return false;
    },
    doLogin(){
      if(this.loading || this.verityData()) return;
      this.loading = true;
      axios.post(urls.login,this.data,(res)=>{
        setTimeout(()=>{ this.loading = false },1000)
        if(res.errcode) return;
        this.$store.commit('setState',{userInfo:res.data})
        tool.setStorage('loginData',this.data,localStorage)
        this.$router.push({
          path:'/'
        })
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
.container{
  display: flex;
  justify-content: center;
  align-items: center;
  background:#222;
}
.login-cont{
  height:100%;
  width:100%;
}
.login-main-title{
  font-size:45px;
  line-height: 60px;
  color:#fff;
  font-weight: 700;
  min-height:80px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding:60px 0;
}
.login-main-title img{
  height:50px;
  width:auto;
}
 input:-webkit-autofill { background-color: #333 !important;}
.login-cont .content{
  height:auto;
  width:300px;
}
.login-cont .loginInput{
  width:300px;
  margin-left:100px;
}
.login-cont .input{
  height:50px;
}
.login-cont .inputContent>:nth-child(n){
  background: #333 !important;
  border: 0;
  color:#fff;
}
.login-cont .login{
  width:100%;
}
.login-cont .hidden{
  display: none;
}
.login-cont .logo{
  margin-bottom:10px;
}
</style>
