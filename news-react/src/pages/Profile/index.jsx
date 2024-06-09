import React, {useEffect, useState} from 'react';
import Input from "../../component/Input";
import FileInput from "../../component/FileInput";
import RichTextEditor from "../../component/RichTextEditor";
import Http from "../../axios/Http";
import Auth from "../../auth/Auth";
import Swal from "sweetalert2";

const Index = () => {
    const [user, setUser] = useState({})

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
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setUser({...user, [name]: value});
     };
    const getUser =()=>{
        Http.callApi('get', 'user')
            .then(({data}) => {
                console.log(data, 'profile')
                setUser(data)
             }).catch((error) => {
            console.log(error)

        });
    }

    useEffect(()=>{
        getUser()
    },[])

    return (
        <>
            <form action="" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-10  w-[30%] mx-auto my-10">
                <Input value={user.name} change={handleInputChange} type="text" name="name" label="Name" icon="fa-regular fa-user"  placeholder="First Name"/>
                <Input value={user.email} change={handleInputChange} type="text" name="email" label="E-mail" icon="fa-regular fa-user"  placeholder="First Name"/>
            </form>
        </>
    );
};

export default Index