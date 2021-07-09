import React,{useState, useEffect} from 'react'; 
import './App.css'; 
import { List, Avatar} from 'antd'; 
import Nav from './Nav' 
import { Link } from 'react-router-dom';   


function ScreenSource() {      
  const [sourceList,setSourceList] = useState([])   
  const [languages, setLanguages] = useState(["fr"])   
  const [country, setCountry] = useState (["fr"])    
  
  useEffect(() => {     
    const APIResult = async () => {          
      const data = await fetch(`https://newsapi.org/v2/sources?language=${languages}&country=${country}&apiKey=d2120d2105874bc4bb575d6744d2ed97`)       
      const dataFromApi = await data.json()       
      setSourceList(dataFromApi.sources)       
      console.log("langue :", languages)       
      console.log("pays :", country)       
    }            
    APIResult()         
  }, [languages, country])


  return (
    <div>
        
        <Nav/>
       
       <div className="Banner center">
         <div className="flag">
            <Avatar style = {{cursor: "pointer"}}
                     size = {48} src='./images/Drapeau_francais.png' onClick={() => {
              setLanguages("fr"); setCountry("fr");
            }}
            />
            <p>&nbsp;&nbsp;</p>
            <Avatar style = {{cursor: "pointer"}}
                     size = {55} src='./images/United_Kingdom.png' onClick={() => {
              setLanguages("en"); setCountry("gb");
            }}
            />
            </div>
       
        </div>


       <div className="HomeThemes">
          
              <List
                  itemLayout="horizontal"
                  dataSource={sourceList}
                  renderItem={(source,i) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar src={`/images/${source.category}.png`} />}
                        title={<Link to={`/screenarticlesbysource/${source.id}`} key={i}><h3>{source.name}</h3></Link>}
                        description={source.description}
                      />
                    </List.Item>
                  )}
                />


          </div>
                 
      </div>
  );
}

export default ScreenSource;
