import React, { useEffect, useState } from "react";
import './App2.css'

const URL="https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

const Final=()=>{

    const[drinksData,setDrinksData]=useState([])
    const[searchTerm,setSearchTerm]=useState("");
    const[loading,setLoding]=useState(false)
    const [isError,setIsError]=useState({status:false,msg:''})


    const fetchDrink=async(apiURL)=>{
        setLoding(true)
        setIsError({status:false,msg:''})
      try {
        const response=await fetch(apiURL);
        const {drinks}=await response.json();
        setDrinksData(drinks)
        setLoding(false)
        setIsError({status:false,msg:''});
        if(!drinks){
            throw new Error("data not found")
        }
        
      } catch (error) {
        setLoding(false)
        setIsError({status:true,msg: error.message ||'something went wrong...'})
        
      };

    }
    useEffect(()=>{
        const correctUrl=`${URL}${searchTerm}`
        fetchDrink(correctUrl);
    }, [searchTerm] )


    return(
        <>
        <div>
        <div><h5 id="pk0">vydya pavankalyan</h5></div>
            <center>
                
                <div><h1 id="pk1"><marquee>Fruits'Names</marquee></h1></div>
           <form>
            <input type="text" name="search" id="search" placeholder="search something new..." 
            value={searchTerm}  onChange={(e)=>setSearchTerm(e.target.value)}/><hr></hr>

            {loading && isError?.status && <h3>Loading</h3>}
            {isError?.status && <h3 style={{color:"red"}}>{isError.msg}</h3>}
           {
            !loading && !isError?.status && (
               <ul className="cocktail-data">
            {
                drinksData.map((eachDrink)=>{
                    const{idDrink,strDrink,strDrinkThumb}=eachDrink;
                    return(
                    <li>
                        <div> <img src={strDrinkThumb} alt={strDrink} /></div>

                        <div className="text">
                        <h3>{strDrink}</h3> </div>
                    </li>
                    );
                })
            }
            
            
        </ul>
        )
           }
           </form>
           </center>
        </div>
        </>
    )
}
export default Final