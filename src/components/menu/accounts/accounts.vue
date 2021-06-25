<template>
  <div class='page_menu_list'>
    <div class='func_tab'>
      <el-input v-model="search.name" placeholder="请输入用户名"></el-input>
      <el-button type="primary"  @click='loadData'>查询</el-button>
      <el-button type="primary"  @click='create'>新增</el-button>
    </div>
    <div class='tableData' ref='list' :style='`height:${height-100}px`'>
      <el-table
        :data="list"
        v-loading="loading"
        fixed=false
        :height='height-100'
        @cell-click='select'
        style="width: 100%;height:100%;overflow:auto;"  class='showData'>    
        <el-table-column
          type="index"
          :index="(search.page-1)*search.pagesize+1"
          width="100"
           label="序号">
        </el-table-column>
        <el-table-column v-for='(val,key) in fields' :key='key' :prop="key"  :label="val"  :width='config.filedsWidth[key] || ""' >
          <template slot-scope='scope'>
              <img :src="`${scope.row[key]}`"   v-if='config.imgfields.indexOf(key) > -1'  width='100' />
              <span  v-if='config.imgfields.indexOf(key) == -1' >{{formatData(key,scope.row)}}</span>
          </template>
        </el-table-column> 
        <el-table-column
          label="操作"
          align="center"
          width="300"
          >
          <template slot-scope="scope">
              <el-button-group>
                <el-button type="primary" size='small'  @click='modifyPermission(list[scope.$index])'>{{config.label.modify}}权限</el-button>
                <el-button type="primary" size='small'  @click='updatePassword(list[scope.$index])'>{{config.label.modify}}密码</el-button>
                <el-button type="primary" size='small'  @click='update(list[scope.$index])'>{{config.label.modify}}</el-button>
                <el-button type="primary" size='small' @click='del(list[scope.$index].id)'>{{config.label.delete}}</el-button>
              </el-button-group>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page">
      <el-pagination
        layout="prev, pager, next"
        @current-change='goPage'
        :page-size='search.pagesize'
        :current-page='search.page'
        :total="total_page">
        
      </el-pagination>
    </div>
    <components :is='tab' v-if='tab' class='components_tab' :watchDetail='watchDetail' :item='item' @closeInfo='closeInfo'></components>

  </div>
</template>

<script>
  import axios from '@/common/axios'
  import config from '@/common/config'
  import urls from '@/common/urls'
  import tool from '@/common/tool'
  import tips from '@/common/tips'
  import detail from '@/components/menu/accounts/detail'
  import middle from '@/components/menu/accounts/middle'
  import permission from '@/components/menu/accounts/permission'
  import password from '@/components/menu/accounts/password'
  import BSscroll from 'better-scroll'
  import $ from 'jquery'
  export default {
    name:'accounts',
    data() {
      return {
        config:{
          imgfields:[],
          filedsWidth:{
            permission_names:300,
          },
          label:config.table.label,
        },
        search:{
          name:'',
          page:config.table.page,
          pagesize:config.table.pagesize,
        },
        showtime:'',
        total_page:1,
        list: [],
        scroll:undefined,
        loading:false,
        fields:{},
        item:{},
        tab:'',
        watchDetail:false,
        height:0
      }
    },
    created(){
      this.fields = config.table.accounts;
      this.loadData();
      // 根据当前界面宽高显示不同的字段
    },
    mounted(){
     this.height = $('.page_menu_list').height()
    },
    components:{
      detail,
      permission,
      password,
      middle
    },
    methods:{
      loadData(){
        let url = tool.getURL(urls.accounts.list,this.search)
         axios.get(url,(res)=>{
            this.list = res.data;
            this.total_page = res.count || 1;
            this.$nextTick(()=>{
              // this.initScroll();
            })
         })
      },
      initScroll(){
        this.$nextTick(()=>{
          if(!this.scroll){
            this.scroll = new BSscroll(this.$refs.list,{
              click:true
            });
          }else{
            this.scroll.refresh()
          }
        })
      },

      formatData(key,data){
        let text = '';
        switch(key){
          case 'permission_names':
            text = data[key].split(',').map(x=>`【${x}】`).join(',') || '暂无';
            break;
        }
        return text ? text : tool.fotmatData(key,data[key])
      },
      goPage(page){
        this.search.page = page;
        sessionStorage.setItem('page',page)
        this.loadData();
      },
      select(data,tableData,cell){
      },
      exportFile(){
        axios.download(urls.accounts.export,this.getName(),'xlsx')
      },
      getName(){
        let date = new Date();
        return  `用户列表`
      },
      closeInfo(status){
        this.item = {};
        this.tab = '';
        this.watchDetail = false;
        if(status) {
          this.loadData();
        }
      },
      showInfo(data){
        this.item = data;
        this.tab = 'detail';
      },
      update(data){
        this.item = data;
        this.tab = 'middle'
      },
      modifyPermission(data){
        this.item = data;
        this.tab = 'permission'
      },
      updatePassword(data){
        this.item = data;
        this.tab = 'password'
      },
      detail(data){
        this.item = data;
        this.watchDetail = true;
        this.tab = 'middle'
      },
      create(){
        this.item = {}
        this.tab = 'middle'
      },
      del(id){
          this.$confirm('此操作将永久删除此信息, 是否继续?', '警告', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'error'
          }).then(() => {
            this.requestDel(id);
          }).catch((res) => {
          });
      },
      requestDel(id){
        let url = `${urls.accounts.delete}?id=${id}`
        axios.delete(url,(res)=>{
          this.loadData();
          tips.success(this,{text:`删除成功`})
        })
      },
      
    }
  }
</script>
<style>
.page_menu_list .el-range-separator{
  width:40px;
  text-align: center;
}
</style>
