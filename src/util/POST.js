const sendData=async(datos,url)=>{
  const dirSolve = `http://localhost:4000${url}`
    const response = await fetch(dirSolve, {
      method: 'POST',
      body: datos,
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      }   
  });
  
  if (response.status===(200)){
    const json = await response.json()
    return json
  }else { 
    
    return false
    }
  }
export default sendData