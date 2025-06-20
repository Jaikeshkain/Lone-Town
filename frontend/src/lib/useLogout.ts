import { logoutAction } from "@/redux/slice/authSlice"
import { logoutAPI } from "@/services/UserService"
import { useMutation } from "@tanstack/react-query"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

export const useLogout=()=>{
    const dispatch=useDispatch()
    const navigate=useNavigate()
    return useMutation({
        mutationFn:()=>logoutAPI(),
        mutationKey:["logout"],
        onSuccess:()=>{
            dispatch(logoutAction())
            navigate("/login")
        }
    })
}