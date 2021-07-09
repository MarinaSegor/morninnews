export default function(wishList = [], action) {

   if(action.type === 'addArticle') { 

      // console.log('action', action.articleLiked)

      var wishListDef = [...wishList];

      wishListDef.push(action.articleLiked);

       return wishListDef;
   } else if (action.type === 'deleteArticle'){ 
      var wishListDef = [...wishList]
      var position = null
      for (let i=0; i<wishListDef.length ; i++){
      if(wishListDef[i].title === action.title){
              position = i
          }
      }
      if(position != null){
         wishListDef.splice(position,1) 
      }
      return wishListDef

   } else {}
      return wishList
 }
