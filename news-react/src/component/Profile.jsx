import {React} from 'react'
import Dropdown from './Dropdown'
import {Menu} from "@headlessui/react";
import {Link} from "react-router-dom";
function Profile(props) {
    console.log(props.items)
    return (
        <div className='flex justify-center items-center space-x-5'>
            <div className='w-10 h-10 object-cover'>
                <img src={props.img} alt="profile" className='w-10 h-10 rounded-xl object-cover'/>
            </div>
            <Dropdown name={props.name} position="right-0">
                {props.items?.map((item) => (
                    <Link to={item.href}>
                        <Menu.Item>
                            {({active}) => (
                                <button
                                    className={`${
                                        active ? "bg-neutral-200" : "text-gray-900 "
                                    } group flex w-full items-center rounded-md px-2 py-2 text-sm text-ellipsis`}
                                    onClick={() => item.onAction()}
                                >
                                    {active ? (
                                        <p className="mr-2 h-5 w-5 ">
                                            <i className={item.icon}/></p>
                                    ) : (
                                        <p className="mr-2 h-5 w-5">
                                            <i className={item.icon}/></p>
                                    )}
                                    {item.name}
                                </button>
                            )}
                        </Menu.Item>
                    </Link>
                ))}
            </Dropdown>
        </div>
    )
}

export default Profile
