import classes from "./UserPostsRender.module.css"
import {db} from "../firebase/index"
import {useHistory} from "react-router-dom"
import { useSelector,useDispatch } from "react-redux"
import {collection,getDocs, loadBundle, query, where} from "firebase/firestore"
import { useEffect, useState } from "react"
const UserPostsRender=()=>{
  const [posts,setPosts]=useState([])
  const userDetails=useSelector(state=>state.userDetails)
  const history=useHistory()
  const dispatch=useDispatch()

const getPosts=async()=>{
  const userId=userDetails.userId
  const q=query(collection(db,"posts"),where("userId","==",userId))
  const docSnap=await getDocs(q)
  let loadedPosts=[]
  docSnap.forEach((doc)=>{
    loadedPosts.push({...doc.data(),id:doc.id})
  })
  setPosts(loadedPosts)
}

const backHandler=()=>{
  history.replace("/home")
}

useEffect(()=>{
  getPosts()
},[])

  return(
    <div className={classes['main-container']}>
      <img className={classes.img}  src="./images/for-you/back-arrow.png" height={30} width={25} onClick={backHandler}/>
      <ul className={classes['list-container']}>
        {
          posts.map((i)=>{
            return(
              <li onClick={()=>{history.push(`post/${i.id}`) ; dispatch({type:"toggle-post-opener",value:true})}} className={classes['list-item']} >{i.postHead}</li>
            ) 
          })
        }
      </ul>
    </div>
  )
}
export default UserPostsRender