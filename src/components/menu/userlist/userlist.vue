<template>
  <div class='page_menu_list'>
    <div class='func_tab'>
      <el-input v-model="search.name" placeholder="请输入关键字"></el-input>
      <el-button type="primary" @click='loadData'>查询</el-button>
      <el-button type="primary" @click='create'>新增</el-button>
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
          align="right"
          width="200"
          >
          <template slot-scope="scope">
              <el-button-group>
                <el-button type="primary" size='mini'  @click='updateStatus(list[scope.$index])'>{{config.doDisabled[getIndex(list[scope.$index].disabled)]}}</el-button>
                <el-button type="primary" size='mini'  @click='update(list[scope.$index])'>{{config.label.modify}}</el-button>
                <el-button type="primary" size='mini'  @click='del(list[scope.$index].id)'>{{config.label.delete}}</el-button>
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
  import detail from '@/components/menu/userlist/detail'
  import middle from '@/components/menu/userlist/middle'
  import BSscroll from 'better-scroll'
  import $ from 'jquery'
  export default {
    name:'userlist',
    data() {
      return {
        config:{
          imgfields:[],
          filedsWidth:{
          },
          label:config.table.label,
          gender:config.types.gender,
          disabled:config.types.select,
          doDisabled:["启用","禁用"]
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
      this.fields = config.table.userlist;
      this.loadData();
      // 根据当前界面宽高显示不同的字段
    },
    mounted(){
     this.height = $('.page_menu_list').height()
    },
    components:{
      detail,
      middle
    },
    methods:{
      loadData(){
        let url = tool.getURL(urls.userlist.list,this.search)
         axios.get(url,(res)=>{
            this.list = res.data;
            this.total_page = res.count || 1;
            this.$nextTick(()=>{
              // this.initScroll();
            })
         })
      },
      getIndex(index){
        return index == 0 ? 1 : 0;
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
          case 'gender':
            text = this.config.gender[data[key]]
            break;
          case 'disabled':
            text = this.config.disabled[data[key]]
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
        axios.download(urls.userlist.export,this.getName(),'xlsx')
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
      updateStatus(item){
        let data = {
          id:item.id,
          status: this.getIndex(item.disabled)
        }
        axios.patch(urls.userlist.disabled,data,(res)=>{
          if(res.errcode) return;
          let text = this.config.doDisabled[data.status]
          this.loadData();
          tips.success(this,{text:`${text}成功`})
        })
      },
      update(data){
        this.item = data;
        this.tab = 'middle'
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
        let url = `${urls.userlist.delete}?id=${id}`;
        axios.delete(url,(res)=>{
          if(res.errcode) return;
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