import { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import Layout from "../"
import {
  Landing,
  Category,
  SubCategory,
  Product,
  ViewProductDetail,
  Register,
  Login,
} from ".././routes/route";

const routePaths = [
  { path: "/", component: <Landing/> },
  { path: "/categories", component:<Category/>  },
  { path: "/subCategory", component: <SubCategory/> },
  { path: "/product", component: <Product/> },
  { path: "/viewProductDetails", component: <ViewProductDetail/> },
  { path: "/register", component: <Register/> },
  { path: "/login", component: <Login/> },
];


export const Root = () => {
    return (
        <BrowserRouter>
        
            <Suspense fallback={<div>{<CircularProgress />}</div>}>
                <Routes>
                     <Route path="" element={<Layout/>} >
                      {routePaths.map(({ path, component },index) => (
                        <Route key={index} path={path} element={component} />
                    ))}
                    
                     </Route>
                   
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
}