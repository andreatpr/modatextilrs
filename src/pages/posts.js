import React, {useState, useEffect} from 'react';

const Post = ({ post, user, openModal, comments}) => {
	const [comment, setComment] = useState('');
	const [postComments, setPostComments] = useState([]);
	const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTQ4MzkyZmQ1NWFkNGI2ZTk2ZWRlOGMiLCJpYXQiOjE3MDA4NDQxMTMsImV4cCI6MTcwMDg0NzcxM30.2RYypAS8kNMQtbyo2hpquNMUlX0vX_UbV-nAxDj5dKw';
	console.log(user)
    if (!user || !user.profilePicture) {
        return null;
      }

	const handleCommentChange = (event) => {
		setComment(event.target.value);
	};
	
	const handlePostComment = () => {
		fetch(`https://administrador.modatextil.store/api/comments/${post._id}`, {
		method: 'POST',
		headers: {
			'Authorization': `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			userId: user._id,
			content: comment,
		}),
		})
		setComment('');
	};
	const handleShowComment = (_id) => {
		fetch(`https://administrador.modatextil.store/api/comments/${_id}`, {
		  method: 'GET',
		  headers: {
			'Authorization': `Bearer ${token}`,
			'Content-Type': 'application/json',
		  },
		})
		.then(response => response.json())
		.then(data => {
			setPostComments(data);
			console.log('aqui',data)
			openModal();
		})
		.catch(error => {
		  console.error('Error fetching comments:', error);
		});
	  };
	  
	
  return (
    <div className="card">
      <div className="top">
        <div className="userDetails">
          <div className="profilepic">
            <div className="profile_img">
              <div className="image">
                <img src={user.profilePicture} alt={user.username} />
              </div>
            </div>
          </div>
          <h3>
            {user.fullName}
            <br />
            <span>{user.bio}</span>
          </h3>
        </div>
        <div>
          <span className="dot">
            <i className="fas fa-ellipsis-h"></i>
          </span>
        </div>
      </div>
      <div className="imgBx">
        <img src={post.image} alt={`post-${post.id}`} className="cover" />
      </div>
      <div className="bottom"> 
						<div className="actionBtns"> 
							<div className="left"> 
								<span className="heart"
									onclick="addlike()"> 
									<span> 
										<svg aria-label="Like"
											color="#262626"
											fill="white"
											height="24"
											role="img"
											viewBox="0 0 48 48"
											width="24"> 

											<path
												d="M34.6 6.1c5.7 0 10.4 5.2 10.4 
												11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 
												41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 
												11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 
												1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 
												1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 
												1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 
												0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 
												1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 
												1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 
												7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 
												48 25 48 17.6c0-8-6-14.5-13.4-14.5z"> 
											</path> 
										</svg> 
									</span> 
								</span> 
								<svg aria-label="Comment"
									className="_8-yf5 "
									color="#262626"
									fill="white"
									height="24"
									role="img"
									viewBox="0 0 48 48"
									width="24"
									onClick={openModal}
									> 
									
									<path clip-rule="evenodd"
										d="M47.5 46.1l-2.8-11c1.8-3.3 2.8-7.1 2.8-11.1C47.5 
										11 37 .5 24 .5S.5 11 .5 24 11 47.5 24 47.5c4 0 
										7.8-1 11.1-2.8l11 2.8c.8.2 1.6-.6 1.4-1.4zm-3-22.1c0 
										4-1 7-2.6 10-.2.4-.3.9-.2 1.4l2.1 
										8.4-8.3-2.1c-.5-.1-1-.1-1.4.2-1.8 1-5.2 2.6-10 
										2.6-11.4 0-20.6-9.2-20.6-20.5S12.7 3.5 24 3.5 
										44.5 12.7 44.5 24z" 
										fill-rule="evenodd"> 
								</path> 
								</svg> 
								<svg aria-label="Share Post"
									className="_8-yf5 "
									color="#262626"
									fill="white"
									height="24"
									role="img"
									viewBox="0 0 48 48"
									width="24"> 
									<path
										d="M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3 
										3.5.1 4S0 5.2.4 5.7l15.9 15.6 5.5 22.6c.1.6.6 
										1 1.2 1.1h.2c.5 0 1-.3 
										1.3-.7l23.2-39c.4-.4.4-1 .1-1.5zM5.2 
										6.1h35.5L18 18.7 5.2 6.1zm18.7 
										33.6l-4.4-18.4L42.4 8.6 23.9 39.7z"> 
									</path> 
								</svg> 
							</div> 
							<div className="right"> 
								<svg aria-label="Save"
									className="_8-yf5 "
									color="#262626"
									fill="white"
									height="24"
									role="img"
									viewBox="0 0 48 48"
									width="24"> 
															
									<path
										d="M43.5 48c-.4 0-.8-.2-1.1-.4L24 29 5.6 
										47.6c-.4.4-1.1.6-1.6.3-.6-.2-1-.8-1-1.4v-45C3 .7 
										3.7 0 4.5 0h39c.8 0 1.5.7 1.5 1.5v45c0 .6-.4 
										1.2-.9 1.4-.2.1-.4.1-.6.1zM24 26c.8 
										0 1.6.3 2.2.9l15.8 16V3H6v39.9l15.8-16c.6-.6 
										1.4-.9 2.2-.9z"> 
									</path> 
								</svg> 
							</div> 
						</div> 
						<a href="#"> 
							<p className="likes">{post.likes} likes</p> 

						</a> 
						<a href="#"> 
							<p className="message"> 
							<b>{user.username}</b>
							<br></br>
							<b>{post.caption}</b>  
							</p> 

						</a> 
						<a onClick={() => handleShowComment(post._id)}>
						<h4 className="comments">View all comments</h4>
						</a>
						<a href="#"> 
							<h5 className="postTime">2 hours ago</h5> 
						</a> 
						<div className="addComments"> 
							<input type="text"
								className="text"
								placeholder="Agrega un comentario..."
								value={comment}
          						onChange={handleCommentChange}/> 
								
                                <div className="reaction"> 
                                    <h3> 
                                    <i className="far fa-smile"></i> 
                                    </h3> 
                                </div>
                                <button onClick={handlePostComment} className='post-but'>Post</button>
						</div> 
					</div> 
    </div>
  );
};

const PostsList = ({ posts, users, comments }) => {
	const [showModal, setShowModal] = useState(false);
	const [selectedPost, setSelectedPost] = useState(null);
	const [comment, setComments] = useState([]); 
	const openModal = (post) => {
	  setSelectedPost(post);
	  setShowModal(true);
	};
  
	const closeModal = () => {
	  setSelectedPost(null);
	  setShowModal(false);
	};
  
	return (
		<div>
		{posts.map((post) => {
		  const user = users.find((u) => u._id === post.userId);
		  return (
			<div key={post.id}>
			  <Post post={post} user={user} openModal={() => openModal(post)} comment={comments} />
			</div>
		  );
		})}
		{showModal && selectedPost && (
		  <Modal post={selectedPost} users={users.find(u => u._id === selectedPost.userId)} closeModal={closeModal} comments={comments}/>
		)}
	  </div>
	);
  };

  const Modal = ({ post, users, closeModal, comments }) => {
	const [localComments, setLocalComments] = useState([]); // Use a different name for local state
	const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTQ4MzkyZmQ1NWFkNGI2ZTk2ZWRlOGMiLCJpYXQiOjE3MDA2NzM2NTcsImV4cCI6MTcwMDY3NzI1N30.UF0eqvFaxWxR7L_aZqM0FCe4DNr8zmHAow6_7FaSIRE';
	// Fetch comments when the Modal component mounts
	useEffect(() => {
	  fetch(`https://administrador.modatextil.store/api/comments/${post._id}`, {
		method: 'GET',
		headers: {
		  'Authorization': `Bearer ${token} `, // Replace with your actual token
		  'Content-Type': 'application/json',
		},
	  })
		.then(response => response.json())
		.then(data => {
		  setLocalComments(data);
		})
		.catch(error => {
		  console.error('Error fetching comments:', error);
		});
	}, [post._id]);
  
	console.log(localComments);
	console.log('hh', users);
	return (
	  <div className="modal">
		<div className="modal-content">
		  <span className="close" onClick={closeModal}>&times;</span>
		  <div className="userDetails">
			<div className="profilepic">
			  <div className="profile_img">
				<div className="image">
				  <img src={users.profilePicture} alt={users.username} />
				</div>
			  </div>
			  <h3>
				{users.username}
				<br />
				<span>{users.bio}</span>
			  </h3>
			</div>
		  </div>
		  <div className="modal-sub-content">
			<img src={post.image} alt={`post-${post._id}`} className="modal-image" />
			<div className="modal-comments">
			  <h6>{post.caption}</h6>
			  {localComments.map(comment => (
				<div style={{ marginBottom: '40px' }} key={comment._id}>{comment.content}</div>
			  ))}
			</div>
		  </div>
		</div>
	  </div>
	);
  };
  
export default PostsList;
