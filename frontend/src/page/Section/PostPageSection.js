import React, { useState, useEffect, useRef } from 'react';
import { Pagination } from 'antd';
import "./PostPageSection.scss"

const PostPageSection = () => {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [animating, setAnimating] = useState(false);
    const pageSize = 2;
    const totalPosts = posts.length;
    const currentPosts = posts.slice((currentPage - 1) * pageSize, currentPage * pageSize);
    const prevPageRef = useRef();


    useEffect(() => {
        fetch('http://localhost:5000/api/posts', {
            method: 'GET',
            credentials: 'include',
        })
            .then(response => response.json())
            .then(data => {
                setPosts(data);
                console.log("data:", data)
            })

            .catch(error => {
                console.error('Error fetching posts:', error);
            });
    }, [currentPage]);


    useEffect(() => {
        prevPageRef.current = currentPage;
        console.log()


        const leftPage = document.querySelector('.left-page');
        const rightPage = document.querySelector('.right-page');

        if (leftPage && rightPage) {

            leftPage.classList.add('flip-animation');
            rightPage.classList.add('flip-animation');


            setTimeout(() => {
                leftPage.classList.remove('flip-animation');
                rightPage.classList.remove('flip-animation');
            }, 1000);
        }
    }, [currentPage]);


    const handlePageChange = page => {
        setCurrentPage(page);
    };

    return (
        <main>
            <div id="gallery" className={animating ? 'flipPage' : ''}>
                {currentPosts.map((post, index) => (
                    <div className={`post-container ${index % 2 === 0 ? 'left-page' : 'right-page'}`} key={index}>
                        <figure key={index}>

                            <h1>{post.title}</h1>
                            <p><small>{post.author}</small></p>
                            <img src={post.imageUrl} />
                            <p>{post.content.split('.').map((item, key) => (
                                <React.Fragment key={key}>
                                    {item}.{key < post.content.split('.').length - 2 ? <br /> : null}
                                </React.Fragment>
                            ))}</p>

                        </figure>
                    </div>
                ))}

            </div>

            <div className="pagination-container" style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <Pagination
                    current={currentPage}
                    total={totalPosts}
                    pageSize={pageSize}
                    onChange={handlePageChange}
                />
            </div>
        </main>

    );
};

export default PostPageSection;
