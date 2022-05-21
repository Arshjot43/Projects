import { useEffect,useState } from "react"
import { useParams } from "react-router-dom"
import PostOpener from "../components/For-you/PostOpener"
import { db } from "../components/firebase"
import { query,collection,getDoc,getDocs, doc } from "firebase/firestore"
const Post=()=>{  
  return(
    <PostOpener/>
  )
}
export default Post