import config from '@/common/config'
const urls = {
    login:'/api/login',
    uploads:{
        uploadFile:'/public/uploadFile',
        uploadBase64:'/public/uploadBase64'
    },
    collect:{
        list:'/api/collect',
        create:'/api/collect',
        update:'/api/collect',
        delete:'/api/collect',
    },
    users:{
        list:'/api/users',
        create:'/api/users',
        update:'/api/users',
        delete:'/api/users'
    },
    collectType:{
        list:'/api/collectType',
        create:'/api/collectType',
        update:'/api/collectType',
        delete:'/api/collectType',
        import:'/api/collectImport'
    },
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