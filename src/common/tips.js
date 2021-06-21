let RootDom = null;
const setDom = (dom) => {
  RootDom = dom;
}
const getDom = (dom) => {
  return dom || RootDom;
}
const setTips = (dom,data,type,time=3000) => {
  let text =  data.text;
  let curDom = getDom(dom)
  curDom.$message({
    message: text,
    center: true,
    offset:'0',
    duration:time,
    type
  });
}
const warning = (dom,data,time) => {
  setTips(dom,data,'warning',time);
}
const error = (dom,data,time) => {
  setTips(dom,data,'error',time);
}
const info = (dom,data,time) => {
  setTips(dom,data,'info',time);
}
const success = (dom,data,time) => {
  setTips(dom,data,'success',time);
}
const loading = (dom,data) =>{
  return dom.$loading({
    lock: true,
    text: data.text || 'Loading',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)'
  });
}
export default {
  warning,
  error,
  info,
  success,
  loading,
  setDom
}