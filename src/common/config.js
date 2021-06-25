/*
 * @Author: your name
 * @Date: 2021-01-18 15:21:44
 * @LastEditTime: 2021-03-12 14:59:17
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \group\template\template-admin\src\common\config.js
 */
 const config = {
  host:'http://yunpan-admin.luofanrain.club',
  // host:'http://192.168.110.121:4000',
  havePermisiison:true,
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
  types:{
    permissions:['菜单','功能'],
    select:['否','是'],
    gender:["男","女"]
  },
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
      label:'用户管理',
      type:'group',
      list:[
        {
          key:'accounts',
          type:'row',
          label:'账号列表',
          level:[1],
          code:'ACCOUNTLIST'
        },
        {
          key:'permissions',
          type:'row',
          label:'权限列表',
          level:[1],
          code:'PERMISSIONLIST'
        },
      ]
    },
    {
      key:'messages',
      type:'row',
      label:'留言列表',
      level:[1],
      code:'MESSAGES'
    },
    {
      key:'userlist',
      type:'row',
      label:'用户列表',
      level:[1],
      code:'USERLIST'
    },
    {
      key:'doitlogs',
      type:'row',
      label:'操作日志',
      level:[1],
      code:'DOITLOGS'
    },
    {
      key:'loginlogs',
      type:'row',
      label:'登录日志',
      level:[1],
      code:'LOGINLOGS'
    },

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
    accounts:{
      name: '姓名',
      account:'账号',
      login_time:'登录时间',
      create_time:'创建时间',
      update_time:'更新时间',
      permission_names:'权限'
    },
    permissions:{
      name:'权限',
      code:'权限CODE',
      type:'权限类型',
      create_time:'创建时间',
      update_time:'更新时间'

    },
    messages:{
      from_name:'留言人',
      content:'留言内容',
      create_time:'创建时间'
    },
    userlist:{
      Nickname: "昵称",
      Password: "密码",
      Email: "邮箱",
      // Headimg: "头像",
      name: "姓名",
      birthday: "出生日期",
      hospital: "学校",
      gender: "性别",
      disabled:"是否禁用"
    },
    doitlogs:{
      name: "姓名",
      account: "账号",
      module: "模块",
      operating: "操作",
      content: "描述",
      create_time: "操作时间"
    },
    loginlogs:{
      name: "姓名",
      account: "账号",
      create_time: "操作时间"
    }
  }
}
export default config;