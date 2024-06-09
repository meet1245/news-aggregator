import React from 'react';
import {Rings} from 'react-loader-spinner'

export default (props) => {
    return (
        props.visible ?
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Rings
                    visible={props.visible}
                    height="80"
                    width="80"
                    color="#F81539"
                    ariaLabel="rings-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                />
            </div>
            :
            ''
    );
};
