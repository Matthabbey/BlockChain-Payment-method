import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main";
import Signup from "./components/Singup";
import Login from "./components/Login";
import Admin from "./components/Admin"

const USER_TYPES = {
	PUBLIC_USERS: "public_users",
	NORMAL_USERS: "normal_users",
	ADMIN_USERS: "admin_user"
}

const CURRENT_USER_TYPES = USER_TYPES.ADMIN_USERS

function App() {
	const user = localStorage.getItem("token");

	return (
		<Routes>
			{user && <Route path="/" exact element={<Main />} />}
			<Route path="/signup" exact element={<Signup />} />
			<Route path="/login" exact element={<Login />} />
			<Route path="/" element={<Navigate replace to="/login" />} />
			<Route path="/admin" exact element={<AdminElement><Admin /></AdminElement>}/>
			<Route path="*" element={<div>ERROR 404 PAGE NOT FOUND</div>}/>
		</Routes>
	);
}
const UserElement = ({children}) =>{
	if(CURRENT_USER_TYPES === USER_TYPES.NORMAL_USERS || USER_TYPES.ADMIN_USERS){
		return (<>{children}</>)
	}else{
		return <div>You do not have access to this page</div>
	}
}
const AdminElement = ({children})=>{

	if(CURRENT_USER_TYPES === USER_TYPES.ADMIN_USERS){
		return (<>{children}</>)
	}else{
		return <div>You do not have access to this page</div>
	}
}


export default App;
