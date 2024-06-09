import React, { useEffect, useState } from "react";

const URl="https://jsonplaceholder.typicode.com/users";

function App(){

    const [usersData,setUsersData]=useState([]);

    const [loading,setLoding]=useState(false);
    const[isError,setIsError]=useState({status:false,msg:''})

    const fetchUsersData= async(apiurl)=>{
        setLoding(true)
        setIsError({status:false,msg:''})
        
       try{

        const response= await fetch(apiurl);
        const data= await response.json();
        setUsersData(data);
        setLoding(false)
        setIsError({status:false,msg:''})
        if(response.status === 404){
            throw new Error("data not found");
        }
       }
       catch(error){
        setLoding(false)
        setIsError({status:true,
            msg: error.message || "some thing fishing pls try again!",})


       }
    }

    useEffect(()=>{
        fetchUsersData(URl)

    }, [] )
    
    if(loading){
        return(
            <div>
                <h3 style={{color:"green"}}>Loading....</h3>
            </div>
        )
    }
    if(isError && isError.status){
     //(isError?.status)
     return<div>
        <h3 style={{color:"red"}}>{isError?.msg}</h3>
     </div>
    }

    return(
        <>
        <div>
            <h1>UseEffect Example -1</h1>
            <ul>
                {
                    usersData.map((eachUsear)=>{
                        const{ id,name,email,}=eachUsear
                        return<li key={id}>
                            <div>{name}</div>
                            <div>{email}</div>
                            <div>^^^^^^^^^^^^^^^^^^^^^^^^^<hr></hr></div>
                        </li>
                    }
                        
                    )
                }
            </ul>
        </div>
        </>
    )
}export default App