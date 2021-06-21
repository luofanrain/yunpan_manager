/*
 * @Author: your name
 * @Date: 2021-01-18 15:21:44
 * @LastEditTime: 2021-03-12 14:59:17
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \group\template\template-admin\src\common\config.js
 */
 const config = {
  host:'http://collect.luofanrain.club',
  // host:'http://127.0.0.1:3000',
  havePermisiison:false,
  axiosType:{
    zip:'application/zip',
    xlsx:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'
  },
  showTips:{
    update:'修改成功',
    create:'新增成功',
    delete:'删除成功',
    import:'导入成功'
  },
  types:{},
  tips:{
    errCode:{
      400:'参数错误',
      401:'数据库错误',
      403:'权限受限，请联系管理员',
      404:'请求链接不存在,请联系管理员',
      405:'请求方式不正确,应为POST/GET',
      500:'服务器错误,请联系管理员',
      default:'无效的请求,状态码($),请联系管理员',
      other:'未知错误，请联系管理排查'
    }
  },
  banner:[
    // {
    //   label:'模板菜单',
    //   type:'group',
    //   list:[
    //     {
    //       key:'templatedemo',
    //       label:'模板列表'
    //     },
    //   ]
    // },

    {
      key:'users',  
      type:'row',
      label:'用户列表',
      code:'USERS'
    },
    {
      key:'collect',  
      type:'row',
      label:'收藏列表',
      code:'COLLECT'
    },
    {
      key:'collectType',  
      type:'row',
      label:'收藏类型',
      code:'COLLECTTYPE'
    }

  ],
  table:{
    page:1,
    pagesize:20,
    label:{
      select:'查询',
      create:'新增',
      modify:'修改',
      update:'修改',
      export:'导出',
      import:'导入',
      delete:'删除',
      audit:'审核',
      detail:'详情',
      preview:'预览'
    },
    users:{
      username: '用户名',
      password:'用户密码',
      token:'用户token',
      login_time:'登录时间',
      create_time:'创建时间',
      update_time:'更新时间'
    },
    collect:{
      name: '收藏名',
      first:'总分类',
      second:'分类',
      icon:'图标',
      url:'链接',
      create_time:'创建时间',
      update_time:'更新时间'
    },
    collectType:{
      parent_type:'父类',
      name: '类型名',
      level:'等级',
      create_time:'创建时间',
      update_time:'更新时间'
    },
  }
}
export default config;