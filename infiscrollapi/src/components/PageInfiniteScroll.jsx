import React, { useEffect, useState } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

const PageInfiniteScroll = () => {
    const [cards, setCards] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const getData = async () => {
       
        try {
            const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=9&_page=${page}`);
            const response = await res.json();
            if (response.length ==0) {
                setHasMore(false); // No more data if less than the limit is returned
            }
          
            setCards((prev) => [...prev, ...response]);
        } catch (err) {
            console.log(err);
        }
        setIsLoading(false);
    };

    const handleInfiniteScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
            setIsLoading(true)
            setPage((prev) => prev + 1);
        }
    };

    useEffect(() => {
        getData();
    }, [page]);

    useEffect(() => {
        window.addEventListener('scroll', handleInfiniteScroll);
        return () => window.removeEventListener('scroll', handleInfiniteScroll);
    }, []);

    return (
        <div className='container'>
            <div className="row">
                {cards.map((item) => (
                    <div className="card" style={{ width: '300px', margin: '15px' }} key={item.id}>
                        <h1>{item.id}</h1>
                        <div className="card-body">
                            <h5 className="card-title">{item.title}</h5>
                            <p className="card-text">{item.body}</p>
                            <a href="#" className="btn btn-primary">Go somewhere</a>
                        </div>
                    </div>
                ))}
            </div>
            {isLoading && (
                <div style={{ textAlign: 'center', margin: '20px' }}>
                    <ClipLoader size={50} color={"#123abc"} loading={isLoading} />
                </div>
            )}
              {!hasMore && !isLoading && (
                <div style={{ textAlign: 'center', margin: '20px' }}>
                    <p>No more data</p>
                </div>
            )}
        </div>
        
    );
};

export default PageInfiniteScroll;