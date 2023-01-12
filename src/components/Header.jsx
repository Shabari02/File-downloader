import React from 'react';

const Header = () => {
    return (
        <div>
            <h1 className="my-6 text-5xl font-extrabold leading-none tracking-tight text-gray-700 md:text-5xl lg:text-6xl dark:text-white uppercase">File <mark className="px-2 text-white  rounded bg-sec">Downloader</mark></h1>
            <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 text-center">Paste url of image or pdf to download</p>
        </div>
    );
};

export default Header;
