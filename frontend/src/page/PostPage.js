import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import ModalPost from '../modal/ModalPost';
import { useAuth } from '../Auth/AuthContext';
import './PostPage.scss';

function PostPage() {
    const [visible, setVisible] = useState(false);
    const { currentUser } = useAuth();

    const onCreate = async (values) => {
        console.log("currentUser:", currentUser);
        console.log("values", values);

        if (!currentUser) {
            alert("Please log in to create a post.");
            return;
        }
        const postData = {
            ...values,
            author: currentUser.user.userID
        };

        try {
            console.log("postData:", postData)
            const response = await fetch('http://localhost:5000/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(postData)
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                console.log("Failed to create post", errorResponse);
                alert(`Failed to create post: ${errorResponse.error}`);
                return;
            }


            const result = await response.json();
            console.log("Post created successfully", result);
            alert("Post created successfully!");
            setVisible(false);
        } catch (error) {
            console.error("Error creating post:", error);
            alert("Error creating post.");
        }
    };



    return (
        <main>
            <div id="gallery">
                <button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => setVisible(true)}
                >
                    Add Post
                </button>
                <ModalPost
                    visible={visible}
                    onCreate={onCreate}
                    onCancel={() => setVisible(false)}
                />
            </div>
        </main>
    );
}

export default PostPage;
