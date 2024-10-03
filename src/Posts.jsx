import { useParams,useLocation } from "react-router-dom";
export default function Posts(){
    const {id}=useParams();
    const urlstring = new URLSearchParams(useLocation().search);
    const fname = urlstring.get("fname");
    const lname = urlstring.get("lname");

    return (
        <h1> This is posts page Hello {fname}  {lname} {id}</h1>
        
    );
};