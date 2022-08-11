export function getRange(parameters, userData){
    let page = parameters.get('page');
    let perPage = parameters.get('perPage');
    if (page===null){
        const localStorageParams = JSON.parse(localStorage.getItem('RaStore.users.listParams'));
        if (localStorageParams!==null){
            page=localStorageParams['page'];
            perPage=localStorageParams['perPage']
        }else{
            page=1;
            perPage=10
        }
        // console.log(localStorageParams, 'localStorageParams')
    }
    let start = (page-1)*perPage
    let end = page*perPage
    if (end > userData.length){
        end = userData.length
    }
    // console.log(page, perPage)
    return {'start': start, 'end':end}
}