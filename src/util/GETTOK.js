const usuarios=async(url)=>{
 
  const dirSolve =  `http://localhost:4000${url}`
    const response = await fetch(dirSolve, {
      method: 'GET',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Autorizations': localStorage.getItem('token'),
      }   
  }); 
  
  console.log(response.status)
  if (response.status===200){
    const json = await response.json()
    return json
  }else if(response.status!==200){ 
    return false
    }
 
}
export default usuarios