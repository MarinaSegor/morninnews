import React,{useState} from 'react';
import './App.css';
import { Card, Icon, Modal} from 'antd';
import Nav from './Nav'
import { connect } from 'react-redux';

const { Meta } = Card;

function ScreenMyArticles(props) {

  const [visible, setVisible] = useState(false) 
  const [title, setTitle] = useState('') 
  const [content, setContent] = useState('')       
  console.log(props.wishList)    
  var showModal = (title, content) => {     
      setVisible(true)     
      setTitle(title)     
      setContent(content)      }     
       var handleOk = e => {     
           console.log(e)     
           setVisible(false)   }     
            var handleCancel = e => {     
                console.log(e)     
                setVisible(false)   }    
                var noArticles  
                 if(props.myArticles === 0){    
                      noArticles = <div style={{marginTop:'50px'}}> No Articles Here </div>   }


   
  return (
    
    <div>
         
        <Nav/>

          <div className="Banner"/>
          
              
              <div className="Card">
                {props.wishList.map((article, i) => (

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
                              <Icon onClick={() => showModal(article.title, article.content)} type="read" key="ellipsis2" />,
                              <Icon onClick={() => {props.deleteToWishlist(article.title)}} type="delete" key="ellipsis"/>

                            ]}
                            >
                              
                            <Meta
                              title={article.title}
                              description={article.description}
                            />

                      </Card>
                      < Modal
                        title={title}
                        visible={visible}
                        onOk={handleOk}
                        onCancel={handleCancel}
                        >
                        <p>{title}</p>
                        <p>{content}</p>
                      </ Modal >



                    </div>
                    ))}
             </div>


    </div>
  );
}

function mapStateToProps(state){
  return {
    wishList: state.wishList
  }
}

function mapDispatchToProps(dispatch) {
  return {
    deleteToWishlist: function(articleTitle) { 
        dispatch({type: 'deleteArticle',
         title: articleTitle 
      }) 
    }
  }
}

export default connect(
  mapStateToProps, //je récupère le state (props pour wishList)
  mapDispatchToProps, //t'envoie qqc dans le store qui est à l'ecoute des mots clés, ici il envoie l'action articleTitle pr faire la suppression
  null
) (ScreenMyArticles);;
