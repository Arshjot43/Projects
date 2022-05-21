import "./Container.css"
import Panel from "./components/Panel/Panel"
import Social from "./components/Social/Social"
import ForYouConnect from "./components/Data-Connector/ForYouConnect"
import { Redirect,useHistory} from "react-router-dom"
import {useSelector,useDispatch} from "react-redux"
import ChatScreen from "./components/Social/ChatScreen"
import { useEffect } from "react"
import {db} from "./components/firebase/index"
import { doc, getDoc } from "firebase/firestore"

let postData
let groupData
let chatData
const Container=(props)=>{
const dispatch=useDispatch()
const history=useHistory()

  // Redux if no community is clicked to show posts by friends
  // Redux when some community is clicked to show that community posts
  // Redux if some post is opened to show its details  
  // Redux if clicked on ony group to show its posts
  // Redux to check if any chat is open
  // Redux which returns the id of the setInterval function of chat to remove it when chat is not clicked

  const setPostData=useSelector(state=>state.setPostData)
  const isCommunityClicked=useSelector(state=>state.isCommunityClicked)
  const isPostOpen=useSelector(state=>state.isPostOpen)
  const isGroupOpen=useSelector(state=>state.isGroupOpen)
  const isChatOpen=useSelector(state=>state.isChatOpen)
  const intervalId=useSelector(state=>state.intervalId)


  // function that clears interval when chat is not opened

  if(!isChatOpen&&intervalId){
    clearInterval(intervalId)
    dispatch({type:"intervalId",value:null})
  }

  
// function which gets data from panel to show which Community was clicked and also checks if chat is open to make panel unaccessable

  const SendToConnect=(data,checkBool)=>{
    if(!isChatOpen){
      dispatch({type:"set-postData",value:data})
      dispatch({type:"getPrevData",value:data})
      dispatch({type:"click-community"})
    }
  }

  //  function which gives data to post Opener to show a post when clicked and also checks if chat is open to make panel unaccessable

  const clickHandler=(id)=>{
    dispatch({type:"toggle-post-opener",value:true}) 
    postData=id
  }

  // function which runs when a group is clciked to give its ID and also checks if chat is open to make panel unaccessable

  const groupHandler=(groupId)=>{
    if(!isChatOpen){
      groupData=groupId
      dispatch({type:"toggle-group"})
      dispatch({type:"toShowCommunityPost",value:groupId})
      
    }
  }

// function which runs when a chat is clicked

  const chatHandler=(userId,name,img)=>{
    dispatch({type:"toggleChat"})
    chatData={
      userId:userId,
      name:name,
      img:img
    }
  }


  // function that uses redux to show the posts of clicked community

  const showPostHandler=(data)=>{
    dispatch({type:"toShowPost",value:data})
  }

//  function that checks if user was logged in to refresh login


  const repeatLogin=async()=>{
    let getUser=localStorage.getItem("refresh")
    if(getUser){
      dispatch({type:"login",value:true})
      const docRef=doc(db,"users",getUser)
      const docSnap=await getDoc(docRef)
      if(docSnap.exists()){
        dispatch({type:"userDetails",value:{name:docSnap.data().name,userId:docSnap.data().userId,link:docSnap.data().link,userRef:docSnap.data().id}})
      }else{
        history.replace("/profile")
      }
    }else{
      return
    }
  }

  useEffect(()=>{
    repeatLogin()
  },[])

  return(
    <div className="container">
      <Panel getData={SendToConnect} groupHandler={groupHandler}/>
      {isChatOpen?<ChatScreen userData={chatData}/> :isPostOpen? <Redirect to={`/post/${postData}`}/>:isGroupOpen?<ForYouConnect openPost={clickHandler} id={groupData} />:<ForYouConnect openPost={clickHandler} id={isCommunityClicked ? showPostHandler(setPostData):showPostHandler("friend")}/>}
      <Social isOpen={props.openChatMenu} chatHandler={chatHandler} />
    </div>
  )
}
export default Container