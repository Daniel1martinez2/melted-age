// const loadJSON =() => {   
//   const xobj = new XMLHttpRequest();
//   xobj.overrideMimeType("application/json");
//   xobj.open('GET', '../database/Glaciars.JSON', true);
//   xobj.onreadystatechange = () => {
//         if (xobj.readyState == 4 && xobj.status == "200") {  
//          // callback(xobj.responseText);
//           console.log(JSON.parse(xobj.responseText));
//         }
//   };
//   xobj.send(null);  
// }

//loadJSON(); 

// function init() {
//   loadJSON(function(response) {
//      var actual_JSON = JSON.parse(response);
//   });
//  }
  
//===============================================================================
//the same above but using promises 
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
// getJson('../database/Glaciars.JSON').then(data => {
//   console.log(data.glaciars);
// }); 