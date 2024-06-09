import {React, useEffect, useState} from 'react'
import {Tab, RadioGroup} from '@headlessui/react'
import Card from "../../component/Card";
import Carousel from "../../component/Carousel";
import Tabs from "../../component/Tabs";
// import Model from "../../component/Model";
import sport from '../../assets/sport.png'
import technology from '../../assets/technology.png'
import animal from '../../assets/animal.png'
import car from '../../assets/car.png'
import music from '../../assets/music.png'
import food from '../../assets/food.png';
import Http from '../../axios/Http';
import Auth from "../../auth/Auth";
import Login from "../login";
import Button from "../../component/Button";

function Home() {
    useEffect(() => {
        getCategories();
    }, []);
    const [categories, setCategories] = useState([]);
    // const [isFilterModal, setIsFilterModal] = useState(false)

    const getCategories = () => {
        Http.callApi('get', 'categories')
            .then(({ data }) => {
                setCategories(data.data);

            }).catch((error) => {
            console.log(error)
        });
    }

    const categoriesCarouselItem = () => {
        return (
            categories?.map((item, index) => (
                <a key={index}>
                    <div
                        className="lg:w-96 w-auto h-10 rounded-sm flex justify-center items-center cursor-pointer"
                    >
                        <div className="bg-white/80 p-1 px-3 rounded-md text-nowrap z-10 custom-font">
                            {item.name}
                        </div>
                    </div>
                </a>
            )));
    };
    return (
        <div>
            {/*<Carousel callback={categoriesCarouselItem()}/>*/}
            {/*<Button name="Filter" class="flex justify-end w-[80%] items-center mx-auto  py-2" click={() => setIsFilterModal(true)}/>*/}
            {/*<Model hidden={true} width={"max-w-xl p-6"} onClose={() => setIsFilterModal(false)} isOpen={isFilterModal} content={filterItems()} />*/}
            <Card/>
        </div>
    )
}

export default Home;

// const filterItems = () => {
//     const TabsName = ['Categories', 'Author', 'Source'];
//     const Panels = () => {
//         const [Categories] = useState({
//             Categories: [
//                 {
//                     name: 'animal',
//                     src: 'https://static.vecteezy.com/system/resources/previews/013/078/565/original/animal-cartoon-cute-fox-image-suitable-for-designing-children-s-books-about-the-introduction-of-foxes-free-png.png'
//                 },
//                 {
//                     name: 'war',
//                     src: 'https://static.vecteezy.com/system/resources/previews/013/078/565/original/animal-cartoon-cute-fox-image-suitable-for-designing-children-s-books-about-the-introduction-of-foxes-free-png.png'
//                 },
//                 {
//                     name: 'sport',
//                     src: 'https://static.vecteezy.com/system/resources/previews/013/078/565/original/animal-cartoon-cute-fox-image-suitable-for-designing-children-s-books-about-the-introduction-of-foxes-free-png.png'
//                 },
//                 {
//                     name: 'E-sport',
//                     src: 'https://static.vecteezy.com/system/resources/previews/013/078/565/original/animal-cartoon-cute-fox-image-suitable-for-designing-children-s-books-about-the-introduction-of-foxes-free-png.png'
//                 },
//                 {
//                     name: 'anime',
//                     src: 'https://static.vecteezy.com/system/resources/previews/013/078/565/original/animal-cartoon-cute-fox-image-suitable-for-designing-children-s-books-about-the-introduction-of-foxes-free-png.png'
//                 },
//                 {
//                     name: 'cartoon',
//                     src: 'https://static.vecteezy.com/system/resources/previews/013/078/565/original/animal-cartoon-cute-fox-image-suitable-for-designing-children-s-books-about-the-introduction-of-foxes-free-png.png'
//                 },
//             ],
//             Author: [{}],
//             Source: [{}]
//         })
//         return (
//             <>
//                 {Object.values(Categories).map((items, index) => (
//                     <Tab.Panel
//                         key={index}
//                     >
//                         <div className="grid grid-cols-3 gap-2">
//                             {items.map((item) => (
//                                 <div
//                                     className="w-auto flex justify-between items-center shadow p-2 flex-warp space-x-2">
//                                     <div className="flex justify-center items-center w-16 h-16 object-cover">
//                                         <img src={item.src} alt=""/>
//                                     </div>
//                                     <div>
//                                         <p className="custom-font text-nowrap">{item.name}</p>
//                                     </div>
//                                     <div>
//                                         <input type="radio" id="test3" name={item.name}/>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </Tab.Panel>
//                 ))}
//             </>
//         )
//     };
//
//     return (
//         <>
//             <Tabs tabsname={TabsName} tabsPanels={Panels()}/>
//         </>
//     )
// };
