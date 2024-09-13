
import {useState, useEffect,useContext,createContext} from 'react';
const SearchContext=createContext();



const SearchProvider=({children})=>{
    const [auth,setAuth]=useState({user:null,
        keyword:'',
        result: []
    });


   
    return (
        <SearchContext.Provider value={[auth,setAuth]}>
            {children}
        </SearchContext.Provider>
    )
}
//custom hook

// const useAuth=()=>useContext (AuthContext) ; // it automatically return the statement
const useSearch=()=>{
    return useContext (SearchContext) ;
    }
export {useSearch,SearchProvider}

