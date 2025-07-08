import Cookies from "universal-cookie";

const cookies =new Cookies();

export const getCookies=(name)=>{
    return cookies.get(name)
}

export const setCookies=(name,value)=>{
    cookies.set(name, value, {path:'/',expires:new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),})
}

export const removeCookies=(name)=>{
    cookies.remove(name, {path:'/'})
}