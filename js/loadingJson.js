const getJson = (dataPath) => {
  return new Promise((resolve,reject)=>{
    const xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', dataPath, true);
    xobj.onreadystatechange = () => {
      if (xobj.readyState == 4 && xobj.status == "200") {  
        resolve(JSON.parse(xobj.responseText))
      }else if(xobj.readyState > 4){
        reject({
          error: 'sorry'
        })
      }
    };
    xobj.send(null); 
  })
}
//use it
// getJson('./database/Glaciars.JSON').then(data => {
//   console.log(data.glaciars);
// }); 

//await way

// const test = async () => {
//   getJson('./database/Glaciars.JSON').then(data => {
//     console.log(data.glaciars);
//   }); 

//   try{
//     const data = await getJson('');

//   }
// }


// switch (key) {
//   case value:
//     break;
//   default:
//     break;
// }