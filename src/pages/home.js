import React, { useState, useEffect, useRef, useCallback } from 'react';
import '../styles/home.css'; 
import { Link } from 'react-router-dom';
import Navbar from './navbar';
import PostsList from './posts';

function Home() {
  const [data, setData] = useState({ posts: [], users: [], comments:[] });
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTQ4MzkyZmQ1NWFkNGI2ZTk2ZWRlOGMiLCJpYXQiOjE3MDA4NDQxMTMsImV4cCI6MTcwMDg0NzcxM30.2RYypAS8kNMQtbyo2hpquNMUlX0vX_UbV-nAxDj5dKw';
  useEffect(() => {
    const fetchData = async () => {
      try {
        const postsResponse = await fetch('https://administrador.modatextil.store/api/posts');
        const usersResponse = await fetch('https://administrador.modatextil.store/api/users');
		const commentsResponse = await fetch('https://administrador.modatextil.store/api/comments', {
          headers: {
            'Authorization': `Bearer ${token}`, // Agrega el token de autorización
            'Content-Type': 'application/json',
          },
        });
        const postsData = await postsResponse.json();
        const usersData = await usersResponse.json();
        const commentsData = await commentsResponse.json();
        setData(({ posts, users }) => ({
          posts: postsData,
          users: usersData,
		  comments: commentsData
        }));
        
        // Ahora puedes imprimir los valores actualizados
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const { posts, users, comments } = data;
  console.log(posts);
	  console.log(data);
  return (
    <div>
    <Navbar/>

    <main> 
		<div className="container"> 
			<div className="col-9"> 
        <div className="statuses"> 
					<div className="status"> 
						<div className="image"> 
							<img src= 
"https://media.geeksforgeeks.org/wp-content/uploads/20220604085434/GeeksForGeeks-300x243.png"
								alt="img3"/>
						</div> 
					</div> 
					<div className="status"> 
						<div className="image"> 
							<img src= 
"https://media.geeksforgeeks.org/wp-content/uploads/20220609093221/g2-200x200.jpg"
								alt="img4"/>
						</div> 
					</div> 
					<div className="status"> 
						<div className="image"> 
							<img src= 
"https://media.geeksforgeeks.org/wp-content/uploads/20220609093241/g3-200x200.png"
								alt="img5"/>
						</div> 
					</div> 
					<div className="status"> 
						<div className="image"> 
							<img src= 
"https://media.geeksforgeeks.org/wp-content/uploads/20220609093229/g-200x200.png"
								alt="img6"/>
						</div> 
					</div> 
					<div className="status"> 
						<div className="image"> 
							<img src= 
"https://media.geeksforgeeks.org/wp-content/uploads/20220609093221/g2-200x200.jpg"
								alt="img7"/>
						</div> 
					</div> 
					<div className="status"> 
						<div className="image"> 
							<img src= 
"https://media.geeksforgeeks.org/wp-content/uploads/20220604085434/GeeksForGeeks-300x243.png"
								alt="img8"/>
						</div> 
					</div> 
				</div> 
				<PostsList posts={posts} users={users} comments={comments} />
			</div> 
			<div className="col-3"> 
				<div className="card"> 
                    <div className="sug-ver">
					<h4>Sugerencias para ti</h4> 
                    <h4>Ver todo</h4>
                    </div>
					<div className="top"> 
						<div className="userDetails"> 
							<div className="profilepic"> 
								<div className="profile_img"> 
									<div className="image"> 
										<img src= 
"https://media.geeksforgeeks.org/wp-content/uploads/20220609093221/g2-200x200.jpg"
											alt="img12"/> 
									</div> 
								</div> 
							</div> 
							<h3>Aditya Verma<br></br> 
							<span>Te sigue</span> 
							</h3> 
						</div> 
						<div> 
							<a href="#"
							className="follow">Seguir 
							</a> 
						</div> 
					</div> 
					<div className="top"> 
						<div className="userDetails"> 
							<div className="profilepic"> 
								<div className="profile_img"> 
									<div className="image"> 
										<img src= 
"https://media.geeksforgeeks.org/wp-content/uploads/20220609093229/g-200x200.png"
											alt="img13"/> 
									</div> 
								</div> 
							</div> 
							<h3>Amit Singh<br/> 
							<span>Te sigue</span> 
						</h3> 
						</div> 
						<div> 
							<a href="#"
							className="follow">Seguir 
						</a> 
						</div> 
					</div> 
					<div className="top"> 
						<div className="userDetails"> 
							<div className="profilepic"> 
								<div className="profile_img"> 
									<div className="image"> 
										<img src= 
"https://media.geeksforgeeks.org/wp-content/uploads/20220609093221/g2-200x200.jpg"
											alt="img14"/> 
									</div> 
								</div> 
							</div> 
							<h3>Piyush Agarwal<br></br> 
								<span>Seguido por Keshav Agarwal</span> 
							</h3> 
						</div> 
						<div> 
							<a href="#"
							className="follow">Seguir</a> 
						</div> 
					</div> 
					<div className="top"> 
						<div className="userDetails"> 
							<div className="profilepic"> 
								<div className="profile_img"> 
									<div className="image"> 
										<img src= 
"https://media.geeksforgeeks.org/wp-content/uploads/20220609093229/g-200x200.png"
											alt="img15"/>  
									</div> 
								</div> 
							</div> 
							<h3>Amit Sharma<br></br> 
							<span>Te sigue</span> 
							</h3> 
						</div> 
						<div> 
							<a href="#"
							className="follow">Seguir 
						</a> 
						</div> 
					</div> 
					<div className="top"> 
						<div className="userDetails"> 
							<div className="profilepic"> 
								<div className="profile_img"> 
									<div className="image"> 
										<img src= 
"https://media.geeksforgeeks.org/wp-content/uploads/20220609093241/g3-200x200.png"
											alt="img16"
											className="cover"/> 
									</div> 
								</div> 
							</div> 
							<h3>Raj Goel<br></br> 
								<span>Seguido por Keshav Agarwal</span> 
							</h3> 
						</div> 
						<div> 
							<a href="#"
							className="follow">Seguir 
							</a> 
						</div> 
					</div> 
				</div> 
				
				<div className="footer"> 
					<a className="footer-section" href="#">About</a> 
					<a className="footer-section" href="#">Help</a> 
					<a className="footer-section" href="#">API</a> 
					<a className="footer-section" href="#">Jobs</a> 
					<a className="footer-section" href="#">Privacy</a> 
					<a className="footer-section" href="#">Terms</a> 
					<a className="footer-section" href="#">Locations</a> 
					<br></br> 
					<a className="footer-section" href="#">Top Accounts</a> 
					<a className="footer-section" href="#">Hashtag</a> 
					<a className="footer-section" href="#">Language</a> 
					<br></br><br></br> 
					<span className="footer-section"> 
						© 2023 INSTAGRAM FROM FACEBOOK 
					</span> 
				</div> 
			</div> 
		</div> 
	  </main>
    </div>
  );
}

export default Home;
