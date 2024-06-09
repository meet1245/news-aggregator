import React, { useEffect,useState } from 'react'
import MultiSelect from '../../component/MultiSelect';
import Button from '../../component/Button';
import Http from '../../axios/Http'
export default function Setting() {
    
    const [authors, setAuthors] = useState([]);
    const [categories, setCategories] = useState([]);
    
    const [selectedAuthor,setSelectedAuthor] = useState([]);
    const [selectedCategory,setSelectedCategory] = useState([]);

    useEffect(()=>{
        getAuthors();
        getCategories();
        getSetting();
    },[]);

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
    const getSetting = () => {
        Http.callApi('get', 'settings')
            .then(({data}) => {
                data.data.map(item => {
                    console.warn(item.value);
                    if(item.key === "categories"){
                        setSelectedCategory(JSON.parse(item.value));
                    }
                    if(item.key === "authors"){
                        setSelectedAuthor(JSON.parse(item.value));
                    }
                });
            
            }).catch((error) => {
            console.log(error)
        });

        
    }

    
    const handleSubmitSetting = ()  => {
            let payloads = {
                categories: selectedCategory,
                authors: selectedAuthor,
            }
        Http.callApi('post', 'settings/update',payloads)
        .then(({data}) => {
            console.warn(data);
        }).catch((error) => {    
        console.log(error)
    });
    }
    return (
        <>
        
        <div className="flex justify-center items-center space-x-5 py-10">
            {authors &&
            <MultiSelect name={"authors"}
            selectedOption={selectedAuthor}
            setSelectedOption={setSelectedAuthor} 
            items={authors} 
              /> }
             
             {
                categories && 
                <MultiSelect 
            name={"categories"}
             items={categories}
             selectedOption={selectedCategory}
             setSelectedOption={setSelectedCategory}
              />
             }
            <Button name="Save" click={handleSubmitSetting}></Button>
            </div>
        </>
    )
}