/*
 * @Author: your name
 * @Date: 2021-01-18 15:21:44
 * @LastEditTime: 2021-03-12 14:58:24
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \group\template\template-admin\src\common\uploads.js
 */
import axios from '@/common/axios'
import urls from '@/common/urls'
import tips from '@/common/tips'
import html2canvas from 'html2canvas'

async function uploadFile(file,reg='jpg|jpeg|png|PNG|JPG',key,url=''){
  if(!file) return;
  let RegObj = new RegExp(`^(${reg})$`)
  
  let type = file.name.split('\.').slice(-1)
  if(!RegObj.test(type)){
    tips.error(null,{text:`类型必须是${reg.replace(/\|/g,',')}`})
    return '';
  }
  let data = await QuestFile(file,key,url)
  return url ? data : data.url;
}
async function QuestFile(file,key='file',url=''){
  let data = new FormData()
  data.append(key,file)
  url = url || urls.uploads.uploadFile;
  return new Promise(resolve=>{
    axios.post(url,data,(res)=>{
      resolve(res)
    })
  })
}

async function saveImg(dom){
  return new Promise(resolve=>{
    html2canvas(dom).then(canvas => {
      let file = canvas.toDataURL("image/png")
      resolve(file)
    });
  })
}
async function savePage(dom){
  let file = await saveImg(dom);
  let data = await QuestFile(file,'file',urls.uploads.uploadBase64);
  return data.url;
}

async function uploadBase64(file){
  let data = await QuestFile(file,'file',urls.uploads.uploadBase64);
  return data.url;
}

export default {
  uploadFile,
  QuestFile,
  uploadBase64,
  savePage
}