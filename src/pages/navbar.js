import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css'

function Navbar (){
  const userId= "6548392fd55ad4b6e96ede8c";
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTQ4MzkyZmQ1NWFkNGI2ZTk2ZWRlOGMiLCJpYXQiOjE3MDA2NzM2NTcsImV4cCI6MTcwMDY3NzI1N30.UF0eqvFaxWxR7L_aZqM0FCe4DNr8zmHAow6_7FaSIRE';

    const [modalState, setModalState] = useState({
        currentStep: 'createPost',
      });
      const [selectedImage, setSelectedImage] = useState(null); // Nuevo estado para almacenar la URL de la imagen seleccionada
      const [selectedFile, setSelectedFile] = useState(null);
      // Create refs for DOM elements
      const modalContainerRef = document.getElementsByClassName("modal-container");
      const bodyRef = useRef(document.body);
      const [searchVisible, setSearchVisible] = useState(false);
    
      let handleFileChange = (event) => {
        const file = event.target.files[0];
      
        if (file) {
          // Convierte la imagen a Base64
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64String = reader.result;
            setSelectedFile({
              name: file.name,
              type: file.type,
              size: file.size,
              base64: base64String,
            });
            setSelectedImage(base64String);
          };
          reader.readAsDataURL(file);
        }
      };
    
      // Define mostrarCrear function
      const mostrarCrear = useCallback((step) => {
        bodyRef.current.classList.toggle('modal-open');
        modalContainerRef.current.style.display = 'block';
        setModalState((prevState) => ({ ...prevState, currentStep: step }));
      }, []);
    
      //Search
      const toggleSearch = () => {
        setSearchVisible((prevVisible) => !prevVisible);
      };
      
      //publicar posts
      const [postDescription, setPostDescription] = useState('');
      
      const handleDescriptionChange = (event) => {
        setPostDescription(event.target.value);
      };

      //Notifi
      const [notificacionVisible, setNotificacionVisible] = useState(false);
    
      const mostrarNotificacion = () => {
        setNotificacionVisible((prevVisible) => !prevVisible);
      };

      const handlePostClick = async () => {
        try {
          const requestBody = {
            caption: postDescription,
            image: selectedFile.base64,
            // Otros campos si es necesario
          };
          console.log(requestBody.image)
          const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          };
      
          const response = await fetch(`https://administrador.modatextil.store/api/posts/${userId}`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(requestBody),
          });
      
          if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
          }
      
          const responseData = await response.json();
          console.log('Server Response:', responseData);
      
          // Restablecer el estado después de publicar
          setSelectedFile(null);
          setSelectedImage(null);
          setPostDescription('');
      
          // Cerrar el modal u otras acciones necesarias
          // ...
        } catch (error) {
          console.error('Error posting data:', error);
        }
      };
      
      
      useEffect(() => {
        const modalContainer = modalContainerRef;
    
        if (!modalContainer || !bodyRef.current) {
          console.error("Modal container or body not found");
          return;
        }
    
        // Lógica para mostrar/ocultar el contenedor de búsqueda
        const searchContainer = document.getElementById("search-container");
        if (searchContainer) {
          searchContainer.style.display = searchVisible ? "block" : "none";
        }
    
        //Logica para notificaciones
        const notificacionContainer = document.getElementById("notification-sidebar");
        if (notificacionContainer) {
          notificacionContainer.style.display = notificacionVisible ? 'block' : 'none';
        }
        // Cleanup function
        return () => {
          // Remove event listeners or perform cleanup if needed
          // ...
          handleFileChange = null;
        };
      }, [searchVisible, notificacionVisible]); 

      const [notifications, setNotifications] = useState([]);

      useEffect(() => {
        const fetchCommentsByUserId = async () => {
          try {
            // Obtener los posts del usuario
            const responsePosts = await fetch(`https://administrador.modatextil.store/api/posts/user/${userId}`, {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${token}`,
              },
            });
    
            if (!responsePosts.ok) {
              throw new Error(`Error obteniendo posts: ${responsePosts.status}`);
            }
    
            const postsData = await responsePosts.json();
            console.log('postdata', postsData);
    
            // Verificar que postsData no sea undefined o null antes de mapearlo
            if (postsData && postsData.length > 0) {
              // Usar Promise.all para esperar que todas las solicitudes se completen
              const commentsPromises = postsData.map(async (post) => {
                const postId = post._id;
                const responseComments = await fetch(`https://administrador.modatextil.store/api/comments/${postId}`, {
                  method: 'GET',
                  headers: {
                    'Authorization': `Bearer ${token}`,
                  },
                });
    
                if (!responseComments.ok) {
                  throw new Error(`Error obteniendo comentarios: ${responseComments.status}`);
                }
    
                const data = await responseComments.json();
                console.log('data', data);
    
                // Verificar que data.content no sea undefined o null antes de devolverlo
                return Array.isArray(data) && data.length > 0 ? data : [];
              });
    
              // Esperar a que todas las solicitudes de comentarios se completen
              const allComments = await Promise.all(commentsPromises);
              // Unificar los comentarios en un solo array
              const mergedComments = [].concat(...allComments);
              console.log('todos',mergedComments);
              // Actualizar el estado con los comentarios unificados
              setNotifications(mergedComments);
            } else {
              console.error('No se encontraron posts para el usuario logeado.');
            }
          } catch (error) {
            console.error('Error obteniendo datos:', error);
          }
        };
    
        // Llama a la función para obtener los comentarios del usuario logeado
        fetchCommentsByUserId();
      }, []);
      
      

  return (
    <header>
      <div className="sidebar">
            <div className="insta">Instagram</div>
            <div className="nav">
              <Link to="/"><div className="home"><i className="fa-solid fa-house"></i>Inicio</div></Link>
              <div className="search" onClick={toggleSearch}>
                <i className="fa-solid fa-magnifying-glass"></i>Buscar
              </div>
              <div className="explore"><i className="fa-solid fa-compass"></i>Explorar</div>
              <div className="reels"><i className="fa-solid fa-play"></i>Reels</div>
              <div className="messages">
                <i className="fa-brands fa-facebook-messenger"></i>Mensajes
              </div>
              <div className="notification" onClick={mostrarNotificacion}>
                <i className="fa-regular fa-heart"></i>Notificaciones
              </div>
              <div className="create" onClick={() => mostrarCrear('createPost')}><i className="fa-regular fa-plus"></i>Crear</div>
              <Link to="/perfil"><div className="profile"><i className="fa-regular fa-user"></i>Perfil</div></Link>
              <div className="menu">
                <i className="fa-solid fa-bars"></i>Más
              </div> 
            </div>
          </div>
          <div className="modal-container" ref={modalContainerRef}>
          <div className="modal-body">
          {modalState.currentStep === 'createPost' && (
            <div>
              <div className="m-d-h"><h2>Crear un nueva publicación</h2><button onClick={() => mostrarCrear('imageDescription')}>
                Next
              </button></div>
              <div className="create-post-u">
              <img className="up_load" src="/assets/upload.png" alt="upload"></img>
              <p>Drag photos and videos here</p>
              <form id="upload-form">
                  <label for="image-upload" className="btn btn-primary btn_upload">
                      Select from your computer
                  </label>
                  <input
                    className="input_select"
                    type="file"
                    id="image-upload"
                    name="image-upload"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                  />
              </form>
              </div>      
            </div>
          )}
          {selectedImage && modalState.currentStep === 'imageDescription' && (
              <div className='img-post'>
              <div className="m-d-h"><h2>Crear un nueva publicación</h2><button onClick={() => {handlePostClick(); mostrarCrear('postPublished')}}>
                Post
              </button></div>
              <div id="image_description">
              <div className="img_p">
                {selectedImage && <img src={selectedImage} alt="Imagen seleccionada" />}
              </div>
              <div className="description">
                <div className="cart">
                  <div>
                    <div className="img-id">
                      <img src="https://media.geeksforgeeks.org/wp-content/uploads/20220609093221/g2-200x200.jpg" alt="Profile Image"></img>
                    </div>
                    <div className="info">
                      <p className="name">Zineb_essoussi</p>
                    </div>
                  </div>
                </div>
                <form>
                  <textarea type="text" id="emoji_create" placeholder="descripcion" value={postDescription}
                  onChange={handleDescriptionChange}></textarea>
                </form>
              </div>
            </div></div>
          )}
          {modalState.currentStep === 'postPublished' && (
            <div className='post_published'>
              <h3>Publicacion creada!</h3><img src="/assets/uploaded_post.gif" alt="Uploaded Post"></img>
            </div>
          )}
        </div>
        </div>
        <div className="search-container" id="search-container">
          <h2>Buscar</h2>
          <input type="text" placeholder="Buscar"></input>
        </div>
        <div className="notification-sidebar" id="notification-sidebar">
        <h2>Notificaciones</h2>
        {notifications.map((notification) => (
          <div key={notification._id} className="nueva-noti">
            <div className="p-nueva">
              <img src="https://media.geeksforgeeks.org/wp-content/uploads/20220609093229/g-200x200.png" alt={`user-${notification._id}`}></img>
              <p>{notification.content}</p>
            </div>
            <img src="../assets/corazon.png" alt="publi"></img>
          </div>
        ))}
      </div>

        </header> 
  );
};

export default Navbar;
