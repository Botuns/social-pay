 

//  returns current time stamp
 export const getDate=()=>{
    const currentDate = new Date();
    const timestamp = currentDate.getTime().toString();
    return timestamp;
 }