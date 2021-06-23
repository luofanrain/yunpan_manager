import config from '@/common/config'
const urls = {
    login:'/api/login',
    uploads:{
        uploadFile:'/public/uploadFile',
        uploadBase64:'/public/uploadBase64'
    },
    accounts:{
        list:'/api/admin',
        create:'/api/admin',
        update:'/api/admin',
        delete:'/api/admin',
        updatePermission:'/api/adminPermission',
        updatePassword:'/api/adminPassword'
    },
    permissions:{
        list:'/api/permission',
        create:'/api/permission',
        update:'/api/permission',
        delete:'/api/permission',
    },
    messages:{
        list:'/api/messages',
        create:'/api/messages',
        update:'/api/messages',
        delete:'/api/messages',
    }
}
for(let key in urls){
    if(typeof urls[key] == "object"){
        for(let i in urls[key]){
            urls[key][i] =   `${config.host}${urls[key][i]}`;
        }
        continue
    }
    urls[key] = `${config.host}${urls[key]}`;
}
export default urls;