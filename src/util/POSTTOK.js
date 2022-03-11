const estadoPublicacion=async(data, url)=>{
 
  const dirSolve = `http://localhost:4000${url}`
      const response = await fetch(dirSolve,{
        method: 'POST',
        body: data,
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Autorizations': localStorage.getItem('token'),
        }
      })
      

      if (response.status===(200)){
        const json = await response.json();
        return json
      }else { 
        
        return false
        }
   
  }
export default estadoPublicacion;