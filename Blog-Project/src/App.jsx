import { useEffect, useState } from 'react';
import './App.css';
import Header from './assets/Header';
import api from './api'; // axios'u buradan alıyoruz
import { FaTrash, FaEdit } from 'react-icons/fa';

function App() {
  const [posts, setPosts] = useState([]);
  const [editModeId, setEditModeId] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");

  const getAllPosts = async () => {
    try {
      const response = await api.get('/posts');
      setPosts(response.data);
    } catch (error) {
      console.error("Veri çekme hatası:", error);
    }
  };

  const deleteUsingById = async (id) => {
    try {
      await api.delete(`/posts/${id}`);
      setPosts(posts.filter(post => post.id !== id));
      console.log(`Post with ID ${id} deleted successfully.`);
    } catch (error) {
      console.error(`Post with ID ${id} could not be deleted:`, error);
    }
  };

  const updatePost = async (id, updatedPostData) => {
    try {
      const request = {
        id: id,
        title: updatedPostData.title,
        content: updatedPostData.content,
        image: updatedPostData.image
      };

      const response = await api.put(`/posts/${id}`, request);
      setPosts(posts.map(post => (post.id === id ? response.data : post)));
      setEditModeId(null);
      console.log(`Post with ID ${id} updated successfully.`);
    } catch (error) {
      console.error(`Post with ID ${id} could not be updated:`, error);
    }
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <div>
      <Header />
      <h2 style={{ textAlign: 'center', marginTop: '20px' }}>Posts</h2>
      <div className="card-container">
        {posts.map(post => (
          <div className="card" key={post.id}>
            {post.image && <img src={post.image} alt={post.title} />}
            <div className="card-body">
              {editModeId === post.id ? (
                <>
                  <input
                    type="text"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                  />
                  <textarea
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                  />
                  <button
                    className="icon save-icon"
                    onClick={() =>
                      updatePost(post.id, {
                        id: post.id,
                        title: editedTitle,
                        content: editedContent,
                        image: post.image
                      })
                    }
                    title="Save"
                  >
                    💾
                  </button>
                </>
              ) : (
                <>
                  <h3 className="card-title">{post.title}</h3>
                  <p className="card-text">{post.content}</p>
                  <FaEdit
                    className="icon edit-icon"
                    onClick={() => {
                      setEditModeId(post.id);
                      setEditedTitle(post.title);
                      setEditedContent(post.content);
                    }}
                    title="Edit"
                  />
                </>
              )}

              <FaTrash
                className="icon delete-icon"
                onClick={() => deleteUsingById(post.id)}
                title="Delete"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;