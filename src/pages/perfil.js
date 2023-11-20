import Navbar from './navbar';
import '../styles/perfil.css';
import React, { useState, useEffect} from 'react';
import UserProfileContainer from '../data/controller/userct';
import UserProfilePosts from '../data/controller/userposts';
function Perfil() {
    const userId= "6548392fd55ad4b6e96ede8c";
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTQ4MzkyZmQ1NWFkNGI2ZTk2ZWRlOGMiLCJpYXQiOjE3MDA0MTIxMDMsImV4cCI6MTcwMDQxNTcwM30.29r3_lcjfothwAqIXGHl_1OO0CvRfmzrZHW8XOgVlX4';
    const [userDetails, setUserDetails] = useState({
        id: "",
        username: "",
        fullName: "",
        category: "",
        profilePicture: "",
        bio: "",
        postsQuantity: "",
        followers: "",
        following: ""
      });
    const [loading, setLoading] = useState(true);
    const handleDataLoaded = (userData) => {
        setUserDetails({
            id: userData?.id || "",
            username: userData?.username || "",
            fullName: userData?.fullName || "",
            category: userData?.category || "",
            profilePicture: userData?.profilePicture || "",
            bio: userData?.bio || "",
            postsQuantity: userData?.postsQuantity || 0,
            followers: userData?.followers || 0,
            following: userData?.following || 0
        });
        if (loading) {
          setLoading(false); 
        }
      };

    const [posts, setPosts] = useState([]);
    const [loadingPosts, setLoadingPosts] = useState(true);

    const handlePostsLoaded = (postsData) => {
        if (Array.isArray(postsData)) {
            // Mapear los datos de las publicaciones y actualizar el estado
            const mappedPosts = postsData.map(post => ({
                id: post?.id || "",
                userId: post?.userId || "",
                image: post?.image || "",
                caption: post?.caption || "",
                likes: post?.likes || 0,
                comments: post?.comments || []
            }));

            setPosts(mappedPosts);
            console.log('Mapped posts:', mappedPosts);
            if (loadingPosts) {
                setLoadingPosts(false);
            }
        }
    };

    const [highlights, setHighlights] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://administrador.modatextil.store/api/storys/${userId}`, {
          headers: {
            Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTQ4MzkyZmQ1NWFkNGI2ZTk2ZWRlOGMiLCJpYXQiOjE3MDA0MTIxMDMsImV4cCI6MTcwMDQxNTcwM30.29r3_lcjfothwAqIXGHl_1OO0CvRfmzrZHW8XOgVlX4`,
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        setHighlights(data.slice(0, 6)); // Limitar a 6 elementos
      } catch (error) {
        console.error('Error fetching highlights:', error);
      }
    };

    fetchData();
  }, []);
    const cardElements = posts.map((post, index) => (
        <div key={post.id} className={`col-md-4 ${index === posts.length - 1 ? 'offset-md-0' : 'offset-md-4'}`}>
            <div className="card-c" style={{ width: "100%" }}>
                <img src={post.image} className="card-img-top" alt={`img${post.id}`} />
                <div className="card-body"></div>
            </div>
        </div>
    ));        

      
    console.log('Rendered card elements:', cardElements);
    return(
        <div>
        <Navbar/>
        <div className="main_content">
            <UserProfileContainer userId={userId} onDataLoaded={handleDataLoaded}/>
            <div className="header">
            <div className="dp"><img src={userDetails?.profilePicture} alt="random" /></div>
            <div className="info">
                <div className="id">
                {userDetails?.username}
                <div className="botones-per">
                <button className="badges" id="p-bad">Editar perfil</button>
                <button className="badges">Ver archivo</button>
                <i className="fa-solid fa-gear" id="fa-soli-fa-gear"></i></div>
                </div>
                <div className="follow">
                <div className="post">{userDetails?.postsQuantity} publicaciones</div>
                <div className="followers">{userDetails?.followers} seguidores</div>
                <div className="following">{userDetails?.following} seguidos</div>
                </div>
                <div className="name">
                <div className="rohan">{userDetails?.fullName}</div>
                <div className="writer">{userDetails?.category}</div>
                <div className="caption">
                
                </div>
                </div>
            </div>
            </div>
            <div className="highlights">
            {highlights.map((highlight, index) => (
                <div key={index} className="alfaaz">
                <img src={highlight.image} alt={highlight.alt} />
                {highlight.text}
                </div>
            ))}
            </div>
            <br></br><br></br>
            <div className="abajo">
            <div className="containerss">
            <UserProfilePosts userId={userId} token={token} onDataLoaded={handlePostsLoaded}/>
            <div className={`row text-center ${posts.length === 1 ? 'justify-content-start' : 'justify-content-evenly'}`}>
                {cardElements}
            </div>
            </div>
            </div>
        </div>
        </div>
    );
}
export default Perfil;
