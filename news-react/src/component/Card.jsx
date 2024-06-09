import React, {useEffect, useState} from "react";
import Http from "../axios/Http";
import Carousel from "./Carousel";
import useStore from '../storeData/store'
import moment from 'moment'
import Loader from '../component/Loader'

function Card() {
const [loader, setLoader] =useState(true)
    const {data,authorSearch} = useStore();

    useEffect(() => {
        getNews();
    }, [data, authorSearch]);
    const getNews = () => {
        let url = 'get-news';

        if(data && data?.trim()?.length > 0){
            url +=`?search=${data}`;
        }

        if (authorSearch) {
            url += authorSearch && data?.trim()?.length > 0 ? `&author_id=${authorSearch}` : `?author_id=${authorSearch}`;
        }

        Http.callApi('get', url)
            .then(({data}) => {
                let result = data?.data?.filter((item) => item.title !== '[Removed]');
                setCardData(result);
                setLoader(false);
            }).catch((error) => {
            console.log(error)
        });
    }

    const [cardData, setCardData] = useState([]);
    const [readMore, setReadMore] = useState(Array(cardData.length).fill(false));
    const toggleReadMore = (index) => {
        setReadMore((prev) => {
            const newExpanded = [...prev];
            newExpanded[index] = !newExpanded[index];
            return newExpanded;
        });
    };
    const isBookMark = (index) => {
        cardData[index].bookmark = !cardData[index].bookmark;
        setCardData([...cardData]);
    }
    const categoriesCard = () => {
        return (
                    cardData?.map((item, index) => (
                        <div>

                            {
                                <div key={index}
                                     className="max-w-sm ml-3 h-[100%] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700  ">
                                    <div style={{ height: "250px", width: "100%" }} className="relative">
                                        <img className="rounded-t-lg object-cover"
                                             src={item.image}
                                             style={{ height: "100%", width: "100%" }}
                                             alt=""/>
                                        <div  className="text-lg p-2 w-1/3 font-bold  dark:text-gray-400 bg-[#F94461] text-white absolute rounded-tr-lg top-0 right-0 text-center">{moment(item.publishAt).format('DD MMM')}</div>
                                    </div>
                                    <div className="p-5 space-y-2">
                                        <a  href={item.url} target="_blank">
                                            <h5 title={item.title} className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">{item.title.slice(0, 50) +( item.title.length > 50 ? ' ...' : '')}</h5>
                                        </a>
                                        <div>
                                        <span
                                            className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                                            {item.category_name}
                                        </span>
                                        </div>
                                        <p className=" font-normal text-gray-700 dark:text-gray-400">{readMore[index] ?  item.description  : item.description.slice(0, 59) + '...'  }
                                            <button onClick={() => toggleReadMore(index)}
                                                    className="text-blue-500 hover:underline">{readMore[index] ? ' Read less' : ' Read more'}</button>
                                        </p>

                                        <div className="flex items-center justify-between  bg-slate-100 p-4 rounded-lg" >
                                            <div className="flex items-center gap-4">
                                                {/*<img className="w-10 h-10 rounded-full"*/}
                                                {/*     src={item.authImage}*/}
                                                {/*     alt=""/>*/}
                                                <div className="font-medium dark:text-white">
                                                    <div>{item.author_name}</div>
                                                </div>
                                            </div>
                                            <div className="text-lg text-gray-500 dark:text-gray-400 float-end cursor-pointer" onClick={()=>isBookMark(index)}>
                                                <i className={item.bookmark ? "fa-solid fa-bookmark" : "fa-regular fa-bookmark"} />
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            }
                        </div>
                    ))
        )
    }

    return (
        <>
            {
                loader ?

                        <Loader visible={loader} />
                    :
                    <Carousel callback={categoriesCard()} xl={4}/>
            }

        </>
    )
}

export default Card