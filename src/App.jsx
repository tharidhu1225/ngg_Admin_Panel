import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import Header from './Components/Header';
import Sidebar from './Components/Sidebar';
import React, { createContext, useState } from 'react';
import Login from './Pages/Login';


import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { MdOutlineClose } from "react-icons/md";
import Slide from '@mui/material/Slide';
import HomeSliderBanners from './Pages/HomeSliderBanners';
import AddHomeSlide from './Pages/HomeSliderBanners/addHomeSlide';
import Users from './Pages/Users';
import Orders from './Pages/Oders';
import AddGemCat from './Pages/Category/addGemsCat';
import GemCategoryList from './Pages/Category/gemCategoryList';
import { Toaster } from 'react-hot-toast';
import AddGems from './Pages/gems/addGems';
import Gems from './Pages/gems';
import AddJuwellerryCat from './Pages/Category/addJuwelleryCat';
import JuwellerryCatList from './Pages/Category/juwellerryCatList';
import AddJuwellery from './Pages/Juwellery/addJuwellery';
import JewelleryList from './Pages/Juwellery';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const Mycontext = createContext();

function App() {

  const [isLogin , setIsLogin] = useState(false);
  const [user, setUser] = useState(null);

  const [isOpentFullScreenPanel , setIsOpentFullScreenPanel] = useState({
    open:false,
    model:''
  });

  const router =createBrowserRouter([
    {
      path:"/",
      exact:true,
      element: (
        <>
          <section className='main'>
            <Header/>
            <div className='contentMain flex'>
              <div className={`sidebarWrapper w-[18%]`}>
                <Sidebar/>
              </div>
              <div className='contentRight py-4 px-4 w-[82%]'>
                <Dashboard/>
              </div>
            </div>
          </section>
        </>
      ),
    },

    {
      path:"/login",
      exact:true,
      element: (
        <>
          <Login/>
        </>
      ),
    },

    {
      path:"/gems",
      exact:true,
      element: (
        <>
          <section className='main'>
            <Header/>
            <div className='contentMain flex'>
              <div className={`sidebarWrapper w-[18%]`}>
                <Sidebar/>
              </div>
              <div className='contentRight py-4 px-4 w-[82%]'>
                <Gems/>
              </div>
            </div>
          </section>
        </>
      ),
    },
    {
      path:"/juwellery",
      exact:true,
      element: (
        <>
          <section className='main'>
            <Header/>
            <div className='contentMain flex'>
              <div className={`sidebarWrapper w-[18%]`}>
                <Sidebar/>
              </div>
              <div className='contentRight py-4 px-4 w-[82%]'>
                <JewelleryList/>
              </div>
            </div>
          </section>
        </>
      ),
    },

    {
      path:"/homeSlider/list",
      exact:true,
      element: (
        <>
          <section className='main'>
            <Header/>
            <div className='contentMain flex'>
              <div className={`sidebarWrapper w-[18%]`}>
                <Sidebar/>
              </div>
              <div className='contentRight py-4 px-4 w-[82%]'>
                <HomeSliderBanners/>
              </div>
            </div>
          </section>
        </>
      ),
    },

    {
      path:"/gemCategory/list",
      exact:true,
      element: (
        <>
          <section className='main'>
            <Header/>
            <div className='contentMain flex'>
              <div className={`sidebarWrapper w-[18%]`}>
                <Sidebar/>
              </div>
              <div className='contentRight py-4 px-4 w-[82%]'>
                <GemCategoryList/>
              </div>
            </div>
          </section>
        </>
      ),
    },

    {
      path:"/juwellerryCat/list",
      exact:true,
      element: (
        <>
          <section className='main'>
            <Header/>
            <div className='contentMain flex'>
              <div className={`sidebarWrapper w-[18%]`}>
                <Sidebar/>
              </div>
              <div className='contentRight py-4 px-4 w-[82%]'>
                <JuwellerryCatList/>
              </div>
            </div>
          </section>
        </>
      ),
    },

    {
      path:"/users",
      exact:true,
      element: (
        <>
          <section className='main'>
            <Header/>
            <div className='contentMain flex'>
              <div className={`sidebarWrapper w-[18%]`}>
                <Sidebar/>
              </div>
              <div className='contentRight py-4 px-4 w-[82%]'>
                <Users/>
              </div>
            </div>
          </section>
        </>
      ),
    },

    {
      path:"/orders",
      exact:true,
      element: (
        <>
          <section className='main'>
            <Header/>
            <div className='contentMain flex'>
              <div className={`sidebarWrapper w-[18%]`}>
                <Sidebar/>
              </div>
              <div className='contentRight py-4 px-4 w-[82%]'>
                <Orders/>
              </div>
            </div>
          </section>
        </>
      ),
    },
  ])

  const values = {
    isLogin,
    setIsLogin,
    isOpentFullScreenPanel,
    setIsOpentFullScreenPanel,
    user,
    setUser
  };
  
  return (
    <>
    <Mycontext.Provider value={values}>
      <RouterProvider router={router} />

      <Toaster/>

      <Dialog
        fullScreen
        open={isOpentFullScreenPanel.open}
        onClose={()=>setIsOpentFullScreenPanel({
          open: false
        })}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={()=>setIsOpentFullScreenPanel({
              open: false
              })}
              aria-label="close"
            >
              <MdOutlineClose className='text-gray-800'/>
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              <span className='text-gray-800'>{isOpentFullScreenPanel?.model}</span>
            </Typography>

          </Toolbar>
        </AppBar>

            {
              isOpentFullScreenPanel?.model === "Add Gems" && <AddGems/>
            }
            {
              isOpentFullScreenPanel?.model === "Add Juwellery" && <AddJuwellery/>
            }

            {
              isOpentFullScreenPanel?.model === "Add Home Slide" && <AddHomeSlide/>
            }

            {
              isOpentFullScreenPanel?.model === "Add New Gem Category" && <AddGemCat/>
            }

            {
              isOpentFullScreenPanel?.model === "Add New Juwellery Category" && <AddJuwellerryCat/>
            }

      </Dialog>


    </Mycontext.Provider>
    </>
  )
}

export default App;

export {Mycontext};
