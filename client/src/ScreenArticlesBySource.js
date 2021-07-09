import React,{useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import './App.css';
import { Card, Icon, Modal, Button } from 'antd';
import Nav from './Nav';
import {connect} from 'react-redux';

const { Meta } = Card;

function ScreenArticlesBySource(props) {

  const {id} = useParams()
  // useParams qui va récupérer le /:id déclaré ds la route screenarticlesbysource dans app.js
  console.log("id", id);

  // Mise en place du modal, une petite fenetre qui apparait losrqu'on clique sur le livre ----début
  const [articleList, setArticleList] = useState([]);
  const [visible, setVisible] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')


var showModal = (title, content) => {
  setVisible(true)
  setTitle(title)
  setContent(content)

}

var handleOk = e => {
  console.log(e)
  setVisible(false)
}

var handleCancel = e => {
  console.log(e)
  setVisible(false)
}

// Mise en place du modal, une petite fenetre qui apparait losrqu'on clique sur le livre ----fin

  useEffect(() => {
    const article = async () => {
      const data = await fetch(`https://newsapi.org/v2/top-headlines?sources=${id}&apiKey=d2120d2105874bc4bb575d6744d2ed97`)
      const body = await data.json()
      console.log("body", body);
      setArticleList(body.articles);
    }
    article()
    console.log("articleList", articleList)
  }, [])


  return (
    <div>
         
            <Nav/>

            <div className="Banner"/>

               <div className="Card">
                  {articleList.map((article, i) => (

                   <div  style={{display:'flex',justifyContent:'center'}}>

                        <Card
                          style={{ 
                          width: 300, 
                          margin:'15px', 
                          display:'flex',
                          flexDirection: 'column',
                          justifyContent:'space-between' }}
                          cover={
                          <img
                              alt="article"
                              src={article.urlToImage}
                          />
                          }
                          actions={[
                            // MODAL
                              <Icon type="read" key="ellipsis2" onClick= {() => showModal(article.content, article.title)} />,
                              // utilisation de redux 
                              <Icon type="like" key="ellipsis"  onClick= {() => {props.addToWishList(article)}}/>
                          ]}
                          >

                          <Meta
                            title={article.title}
                            description={article.description}
                          />
                          </Card>

                          {/* MODAL */}
                          <Modal
                            title={title}
                            visible={visible}
                            onOk={handleOk}
                            onCancel={handleCancel}
                           >
                            <p>{content}</p>
                          </Modal>
                    </div>
                   ))}
               </div>
            
      
        </div>
  );
}

// définissez un bloc de code nommé addToWishList. Cette fonction va devoir recevoir les informations de l’article (title, description, content) afin de déclencher une action nommée addArticle qui enverra ces informations auprès de Redux

function mapDispatchToProps(dispatch) {
  return {
    addToWishList: function(article) {
 
        dispatch({type: 'addArticle', articleLiked: article})
    }
  }
 }

export default connect (
  // valeur entrante
  null, 
  // valeur sortante
  mapDispatchToProps
)(ScreenArticlesBySource);;
