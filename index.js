const data = fetch('https://github.com/yZipperer/item-api.git')
.then(res=>res.json())
.then(json=>console.log(json))
