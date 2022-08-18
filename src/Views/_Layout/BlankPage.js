import React,{useEffect} from 'react';
import { useNavigate} from "react-router-dom";
import useQuery from '../../Hooks/useQuery';
import { indexRequest } from '../../apiroute';

const BlankPage = ()=>{
    let navigate = useNavigate();
    let query = useQuery()
    useEffect(()=>{
        localStorage.setItem("account",query.account);
        indexRequest.get("/GetTableSchema",{params:{account:query.account}}).then(function(res){
            localStorage.setItem("tableschema",res.data);
            navigate("/home");
        });

    },[]);
    return (
        <div style={{backgroundColor:"white",width:"100vw",height:"100vh"}}>

        </div>
    );
}

export default BlankPage;