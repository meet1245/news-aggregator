import React,{useEffect} from 'react'
import {Menu} from "@headlessui/react";
import Http from '../axios/Http'
import Dropdown from './Dropdown'
import Search from './Search';
import Profile from './Profile';
import {Outlet, Link, useNavigate} from 'react-router-dom';
import {useState} from 'react'
import Login from "../pages/login/index";
import Register from "../pages/ragister/index";
import  Model from './Model.jsx';
import Button from "./Button";
import Input from "./Input";
import useStore from '../storeData/store'

function Header() {
    const store = useStore((state) => state.search)
    const authorSearch = useStore((state) => state.authorId)
    const [isLoginModal, setIsLoginModal] = useState(false)
    const [isRegisterModal, setIsRegisterModal] = useState(false)
    const [open, setOpen] = React.useState(false);
    const [categories, setCategories] = useState([]);
    const [authors, setAuthors] = useState([]);
    const local = localStorage.getItem('token')
    const [authorId, setAuthorId] = useState('');
    const navigate = useNavigate();
    const navigation = [
        {
            name: 'Contact Us',
            href: '#',
            active: false
        },
        {
            name: 'About Us',
            href: '#',
            active: false
        },
    ];
    const UserProfile = [
        {
            name: 'Profile',
            icon: 'fa-regular fa-user',
            href: '/profile',
            onAction: ()=>{
                console.log('profile')
            }
        },
        {
            name: 'Change Password',
            icon: 'fa-solid fa-lock',
            href: '#',
            onAction: ()=>{
                console.log('Change Password')
            }
        },
        {
            name:'Setting',
            icon: 'fa-solid fa-gear',
            href: '/setting',
            onAction: ()=>{
                console.log('setting')
            }

        },
        {
            name: 'Logout',
            icon: 'fa-solid fa-right-from-bracket',
            href: '#',
            onAction: ()=>{
                navigate("/")
                localStorage.clear();
                window.location.reload();
            }
        },
    ];
    const handleSearch = (e) =>{
        e.preventDefault();
        let search =  e.target.value;
        store(search)
    }
    useEffect(() => {
        if (!localStorage.getItem("token")) navigate("/")
        getCategories();
        getAuthors();
    }, []);
    const getCategories = () => {
        Http.callApi('get', 'categories')
            .then(({data}) => {
                setCategories(data.data)
            }).catch((error) => {
            console.log(error)
        });
    }
    const getAuthors = () => {
        Http.callApi('get', 'authors')
            .then(({data}) => {
                setAuthors(data.data)
            }).catch((error) => {
            console.log(error)
        });
    }
    const searchByAuthors = (id) => {
        authorSearch(id)
        setAuthorId(id);
        // Http.callApi('get',`get-news?author_id=${id}`)
        //     .then((data)=>{
        //         console.log(data,'author_id')
        //
        //     })
        //     .catch((error)=>{
        //         console.log(error)
        //     })
    }
    return (
        <>
        <div className="bg-white  mx-auto">
            <div className="max-w-full mx-auto px-4 top-0 w-full z-50 bg-white sm:px-6">
                <div
                    className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10 ">
                    <div className="flex justify-start lg:w-0 lg:flex-1">
                        <Link to="/">
                            <span className="sr-only">Workflow</span>
                            <h4 className="text-amber-700 text-2xl">MEGA.news</h4>
                        </Link>
                    </div>
                    <div className="-mr-2 -my-2 md:hidden">
                        <button
                            type="button"
                            className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                            onClick={() => setOpen(!open)}
                        >
                            <span className="sr-only">Open menu</span>
                            {/* Heroicon name: outline/menu */}
                            <svg
                                className="h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </button>
                    </div>
                    <nav className="hidden md:flex items-center space-x-6 text-nowrap">
                        <Dropdown name="Categories">
                            {categories?.map((item)=>(
                                    <Menu.Item className=" overflow-x-hidden">
                                        {({active}) => (
                                            <button
                                                className={`${
                                                    active ? "bg-neutral-200" : "text-gray-900 "
                                                } group flex w-full items-center rounded-md px-2 py-2 text-sm text-ellipsis`}

                                            >
                                                {active ? (
                                                    <p className="mr-2 h-5 w-5 ">
                                                        <i className={item.icon} /></p>
                                                ) : (
                                                    <p className="mr-2 h-5 w-5">
                                                        <i className={item.icon} /></p>
                                                )}
                                                {item.name.slice(0,20)+(item.name.length > 20 ? '...' : '')}
                                            </button>
                                        )}
                                    </Menu.Item>
                            ))}
                        </Dropdown>
                        <Dropdown name="Authors">
                            {authors?.map((item)=>(
                                    <Menu.Item className={`${3} === ${item.id} ? 'bg-button/50 text-white' : 'text-red-500'`+ " overflow-x-hidden"}>
                                        {({active}) => (
                                            <button
                                                className={`${
                                                    active ? "bg-neutral-200" : "text-gray-900 "
                                                } group flex w-full items-center rounded-md px-2 py-2 text-sm text-ellipsis`}
                                                onClick={() => searchByAuthors(item.id)}
                                            >
                                                {active ? (
                                                    <p className="mr-2 h-5 w-5 ">
                                                        <i className={item.icon} /></p>
                                                ) : (
                                                    <p className="mr-2 h-5 w-5">
                                                        <i className={item.icon} /></p>
                                                )}
                                                {item.name.slice(0,20)+(item.name.length > 20 ? '...' : '')}
                                            </button>
                                        )}
                                    </Menu.Item>
                            ))}
                        </Dropdown>
                        {navigation.map((items, index) => (
                            <a key={index} href={items.href} className={items.active ? "" : ""}>
                                {items.name}
                            </a>
                        ))}
                        <div className="relative">

                        </div>
                    </nav>
                    <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
                        <div className="flex items-center text-nowrap gap-3">
                            <Input type="text" change={handleSearch} placeholder="search" icon="fa-solid fa-magnifying-glass" />
                            {
                                local ?
                                    <Profile
                                    img="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                    name="user"
                                    items={UserProfile}
                                />
                                :
                                    '' }

                            {
                                local ? '' :
                               <div className="flex gap-4">
                                   <Button name="Login" class="flex justify-end w-[80%] items-center mx-auto  py-2" click={() => setIsLoginModal(true)}/>
                                   <Button name="Register" class="flex justify-end w-[80%] items-center mx-auto  py-2" click={() => setIsRegisterModal(true)}/>
                                   <Model hidden={true} onClose={() => setIsLoginModal(false)} isOpen={isLoginModal} content={<Login closeModal={() => setIsLoginModal(false)}/>} />
                                   <Model hidden={true} onClose={() => setIsRegisterModal(false)} isOpen={isRegisterModal} content={<Register closeModal={() => setIsRegisterModal(false)}/>} />
                               </div>
                            }

                        </div>
                    </div>
                </div>
            </div>

            <div
                className={
                    open
                        ? "opacity-100 scale-100 transition ease-out duration-200 absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden z-50 fixed top-0"
                        : "opacity-0 scale-95 absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
                }
                style={{ "position": 'fixed' }}
            >
                <div
                    className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
                    <div className="pt-5 pb-6 px-5">
                        <div className="flex items-center justify-between">
                            <div>
                                <h4 className="text-amber-700 text-2xl">MEGA.news</h4>
                            </div>
                            <div className="-mr-2">
                                <button
                                    type="button"
                                    className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                                    onClick={() => setOpen(!open)}
                                >

                                    <span className="sr-only">Close menu</span>
                                    {/* Heroicon name: outline/x */}
                                    <svg
                                        className="h-6 w-6"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="mt-6">
                            <nav className="grid gap-y-8 -m-3 p-3 items-center rounded-md hover:bg-gray-50">
                                <div className="xl:block mr-10 w-full"><Search placeHolder="Search anything"/></div>
                                <Dropdown name="Categories">
                                    {categories?.map((item)=>(
                                        <Menu.Item className=" overflow-x-hidden">
                                            {({active}) => (
                                                <button
                                                    className={`${
                                                        active ? "bg-neutral-200" : "text-gray-900 "
                                                    } group flex w-full items-center rounded-md px-2 py-2 text-sm text-ellipsis`}

                                                >
                                                    {active ? (
                                                        <p className="mr-2 h-5 w-5 ">
                                                            <i className={item.icon} /></p>
                                                    ) : (
                                                        <p className="mr-2 h-5 w-5">
                                                            <i className={item.icon} /></p>
                                                    )}
                                                    {item.name.slice(0,20)+(item.name.length > 20 ? '...' : '')}
                                                </button>
                                            )}
                                        </Menu.Item>
                                    ))}
                                </Dropdown>
                                <Dropdown name="Authors" >
                                    {authors?.map((item)=>(
                                        <Menu.Item className=" overflow-x-hidden">
                                            {({active}) => (
                                                <button
                                                    className={`${
                                                        active ? "bg-neutral-200" : "text-gray-900 "
                                                    } group flex w-full items-center rounded-md px-2 py-2 text-sm text-ellipsis`}
                                                    onClick={() => searchByAuthors(item.id)}
                                                >
                                                    {active ? (
                                                        <p className="mr-2 h-5 w-5 ">
                                                            <i className={item.icon} /></p>
                                                    ) : (
                                                        <p className="mr-2 h-5 w-5">
                                                            <i className={item.icon} /></p>
                                                    )}
                                                    {item.name.slice(0,20)+(item.name.length > 20 ? '...' : '')}
                                                </button>
                                            )}
                                        </Menu.Item>
                                    ))}
                                </Dropdown>
                                {navigation.map((items, index) => (
                                    <a key={index} href={items.href}
                                       className={`${items.active ? "" : ""} , -m-3 p-3 flex items-center rounded-md hover:bg-gray-50`}>
                                        {items.name}
                                    </a>
                                ))}
                            </nav>
                        </div>
                    </div>
                    <div className="py-6 px-5 space-y-6">
                        <div className="flex justify-between items-center text-nowrap gap-3">
                            {
                                local ? <Profile
                                        img="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                        name="user"
                                        items={UserProfile}
                                    />
                                    :
                                    '' }

                            {
                                local ? '' :
                                    <div>
                                        <Button name="Login" class="flex justify-end w-[80%] items-center mx-auto  py-2" click={() => setIsLoginModal(true)}/>
                                        <Button name="Register" class="flex justify-end w-[80%] items-center mx-auto  py-2" click={() => setIsRegisterModal(true)}/>
                                    </div>

                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
            <Outlet/>
        </>
    );
}

export default Header
