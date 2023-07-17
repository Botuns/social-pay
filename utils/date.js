 

//  returns current time stamp
 const getDate=()=>{
    const currentDate = new Date();
    const timestamp = currentDate.getTime().toString();
    return timestamp;
 }

 module.exports={getDate}