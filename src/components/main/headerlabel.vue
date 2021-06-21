<template>
  <el-container class='header_menu headerlabel'>
    <div class='header_logo_block'>
      <img
        :src="require('@/assets/images/logo.png')"
        class='header_logo_img'
        />
    </div>
    <div class='header_logo_space'></div>
    <div class="HeadIcon">
      <el-image class='icon'
        :src='url'
        fit="cover"></el-image>
        
      <el-link type="warning" disabled>{{data.username || `游客${Math.floor(Math.random()*9000000 + 1000000)}`}}</el-link>
        
    </div>
  </el-container>
</template>
<script>
import tool from '@/common/tool'
export default {
  name: 'headerlabel',
  data() {
    return {
      url:require("@/assets/images/icon.png"),
      data:''
    };
  },
  created(){
    this.data = tool.getStorage('loginData') || {}

  },
  methods: {
  }
}
</script>
<style>
.headerlabel{
  height:calc(100%);
  padding:0;
  display: flex;
  justify-content: space-between;
  align-content: center;;

}
.header_logo_block{
  display: flex;
  align-items:center;
  justify-content: left;
  width:212px;
  height:100%;
  
}

.header_logo_img{
  height:60%;
  width:auto;
}
.headerlabel .el-col {
  height: calc(100%);
}

.headerlabel .el-card__body{
  padding:0 !important;;
  background:#545c64 !important;;
  color:#fff;
}

.header_menu .el-card{
  border-radius:0px !important;;
  box-shadow:none !important;;
  border:none !important;
  height:30px;
  line-height: 30px;
}

.headerlabel .el-menu{
  float:right
}

.headerlabel .el-menu-item{
  height: 40px;
  line-height: 40px;
  border:none;
}

.headerlabel .bg-purple {
  height: calc(100%);
  display: flex;
  justify-content: left;
  align-items: center;
}

.header_logo_space{
  flex:1 0 0;
}
.headerlabel .HeadIcon{
  display: flex;
  justify-content: center;
  align-items: center;
  padding:0 20px;
}

.headerlabel .icon{
  width:45px;
  height:45px;
  margin-right:5px;
  border-radius:15px;
}
</style>
