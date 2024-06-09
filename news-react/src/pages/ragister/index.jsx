import {Dialog, Transition} from '@headlessui/react'
import React, {Fragment, useEffect, useState} from 'react'
import Http from '../../axios/Http'
import Auth from '../../auth/Auth'
import Swal from "sweetalert2";
import Button from "../../component/Button";

export default function Login({closeModal}) {
    const [showPass, setShowPass] = useState(false);
    const [user, setUser] = useState({name: '', email: '', password: ''});
    const [errors, setErrors] = useState({name: '', email: '', password: ''});

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setUser({...user, [name]: value});
    };

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
        },
    });

    const EyeIcon = () => (
        <i className="fa-sharp fa-regular fa-eye" />
    );

    const EyeSlashIcon = () => (
        <i className="fa-sharp fa-regular fa-eye-slash"></i>
    );

    const handleSubmit = () => {
         Http.callApi('post', 'register', user)
            .then(({data}) => {
                console.log(data, 'regia')
                Auth.login(data.token, data.user);
                Http.setBearerToken(data.token);
                Toast.fire({
                    icon: "success",
                    title: 'register successfully!'
                });

                closeModal();
            }).catch((error) => {
            console.log(error)
            setErrors(error.response.data)
        });
    }

    return (
                <div className="selection:bg-rose-500 selection:text-white">
                    <div
                        className="flex justify-center w-full items-center">
                        <div className="flex-1">
                            <div
                                className="w-full bg-white rounded-3xl mx-auto overflow-hidden  ">
                                <div className="relative h-48 bg-rose-500 rounded--4xl">
                                    <div className="pb-3 text-center text-2xl font-bold text-white px-6 py-10">Register</div>
                                    <svg className="absolute bottom-0"
                                         xmlns="http://www.w3.org/2000/svg"
                                         viewBox="0 0 1440 320">
                                        <path fill="#ffffff" fill-opacity="1"
                                              d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,85.3C672,75,768,85,864,122.7C960,160,1056,224,1152,245.3C1248,267,1344,245,1392,234.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                                    </svg>
                                </div>
                                <div className="px-10 pt-4 pb-8 bg-white rounded-tr-4xl">
                                    <div className="mt-12" >
                                        <div className="relative">
                                            <input id="name" name="name" type="text"
                                                   className="peer rounded-lg px-3 h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-rose-600"
                                                   placeholder="john@doe.com"
                                                   value={user.name}
                                                   onChange={handleInputChange}
                                            />
                                            <label htmlFor="name"
                                                   className="absolute left-3 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Name</label>
                                            <div className="text-red-500 pl-3 pt-1">{errors.name}</div>
                                        </div>
                                        <div className="relative mt-10">
                                            <input id="email" name="email" type="text"
                                                   className="peer rounded-lg px-3 h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-rose-600"
                                                   placeholder="john@doe.com"
                                                   value={user.email}
                                                   onChange={handleInputChange}
                                            />
                                            <label htmlFor="email"
                                                   className="absolute left-3 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Email
                                                address</label>
                                            <div className="text-red-500 pl-3 pt-1">{errors.email}</div>

                                        </div>
                                        <div className="mt-10 relative">
                                            <input id="password" type={showPass ? 'text' : 'password'}
                                                   name="password"
                                                   className="peer rounded-lg px-3 h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-rose-600"
                                                   placeholder="Password"
                                                   value={user.password}
                                                   onChange={handleInputChange}
                                            />
                                            <label htmlFor="password"
                                                   className="absolute left-3 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Password</label>
                                            <button
                                                type="button"
                                                className="h-5 w-5 absolute top-[10px] right-2"
                                                onClick={() => setShowPass(!showPass)}
                                                aria-label={showPass ? 'Hide password' : 'Show password'}
                                            >
                                                {showPass ? <EyeSlashIcon/> :
                                                    <EyeIcon/>}
                                            </button>
                                            <div className="text-red-500 pl-3 pt-1">{errors.password}</div>

                                        </div>
                            <Button name="Register"   class="mt-20 w-full"  click={handleSubmit}/>
                                        {/*<button type="submit" onClick={handleSubmit} className="mt-20 px-4 py-2 rounded bg-rose-500 hover:bg-rose-400 text-white font-semibold text-center block w-full focus:outline-none focus:ring focus:ring-offset-2 focus:ring-rose-500 focus:ring-opacity-80 cursor-pointer">Login</button>*/}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    )
}
