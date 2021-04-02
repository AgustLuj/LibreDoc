class User{
    async getData(username,pass,fn){
        await fetch(`${global.uri}/auth/login`, {
            method: 'POST',
            body: JSON.stringify({username,pass}),
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            }
        }).then(async querry=>{
            const data = await querry.json();
            if(querry.status != 200){
                fn(true,data);  
            }else{
                fn(false,data)
            }
        }).catch(e=> fn(true,e)); 
        
        /*
        }*/
    }
    sendIdToken = async(idToken) =>{
        const querry = await fetch(`${global.uri}/auth/google/`, {
          method: 'POST',
          body: JSON.stringify({idToken}),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
        });
        //console.log('data');
        const data = await querry.json();
        if(querry.status != 200){
            throw new Error('No pasa');
        }else{
            return data
        }
    }
    async setData(username,pass,fn){
        await fetch(`${global.uri}/auth/register`, {
            method: 'POST',
            body: JSON.stringify({username,pass}),
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            }
        }).then(async querry=>{
            const data = await querry.json();
            if(querry.status != 200){
                let {errors}=data;
                fn(true,errors[0]);
            }else{
                fn(false,data)
            }
        }).catch(e=> fn(true)); 
        
    }
    async addBook(id,fn){
        await fetch(`${global.uri}/users/${global.user.username}/add/${id}`, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'x-token':global.token
            }
        }).then(async querry=>{
            const data = await querry.json();
            if(querry.status != 200){
                fn(true);          
            }else{
                fn(false,data['biblio']); 
            }
        }).catch(e=> fn(true));
    }
    async addFavBook(id,fn){
        await fetch(`${global.uri}/users/${global.user.username}/fav/${id}`, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'x-token':global.token
            }
        }).then(async querry=>{
            const data = await querry.json();
            if(querry.status != 200){
                fn(true);          
            }else{
                fn(false,data['favorite']); 
            }
        }).catch(e=> fn(true));
        
    }
    async searchBook(id,fn){
        await fetch(`${global.uri}/users/${global.user.username}/search/${id}`, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'x-token':global.token
            }
        }).then(async querry=>{
            const data = await querry.json();
            if(querry.status != 200){
                fn(true);          
            }else{
                fn(false,data);       
            } 
        }).catch(e=> {
            console.log(e)
            fn(true)
        });
        
    }
    async savePage(id,pages,fn){
        await fetch(`${global.uri}/users/${global.user.username}/updatePage/${id}`, {
            method: 'POST',
            body:JSON.stringify({pages}),
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'x-token':global.token
            }
        }).then(async querry=>{
            const data = await querry.json();
            if(querry.status != 200){
                fn(true)
            }else{
                fn(false)     
            } 
           
        }).catch(e=> fn(true));
        
    }
    async backPage(id,pages,fn){
        await fetch(`${global.uri}/users/${global.user.username}/updatePage/${id}`, {
            method: 'POST',
            body:JSON.stringify({pages}),
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'x-token':global.token
            }
        }).then(async querry=>{
            const data = await querry.json();
            if(querry.status != 200){
                fn(true)
            }else{
                fn(false)     
            } 
           
        }).catch(e=> fn(true));
        
    }
    async getBookReading(fn){
        await fetch(`${global.uri}/users/${global.user.username}/bookReading/`, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'x-token':global.token
            }
        }).then(async querry=>{
            const data = await querry.json();
            if(querry.status != 200){
                fn(true)
            }else{
                fn(false,data)     
            } 
        }).catch(e=> fn(true));
        
    }
    async getBookRead(fn){
        await fetch(`${global.uri}/users/${global.user.username}/bookRead/`, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'x-token':global.token
            }
        }).then(async querry=>{
            const data = await querry.json();
            if(querry.status != 200){
                fn(true)
            }else{
                fn(false,data)     
            } 
        }).catch(e=> fn(true));
        
    }
    async setVote(vote,bookId,fn){
        await fetch(`${global.uri}/users/${global.user.username}/setVote/${bookId}`, {
            method: 'POST',
            body:JSON.stringify({vote}),
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'x-token':global.token
            }
        }).then(async querry=>{
            const data = await querry.json();
            if(querry.status != 200){
                fn(true)
            }else{
                fn(false)     
            } 
        }).catch(e=> fn(true));
        
    }
    async getFinish(bookId,fn){
        await fetch(`${global.uri}/users/${global.user.username}/getFinish/${bookId}`, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'x-token':global.token
            }
        }).then(async querry=>{
            const data = await querry.json();
            if(querry.status != 200){
                fn(true)
            }else{
                if(data['finish']){
                    fn(false,true);     
                }else{
                    fn(false,false)
                }
            } 
        }).catch(e=> fn(true));
        
    }
    async readAgain(bookId,fn){
        await fetch(`${global.uri}/users/${global.user.username}/readAgain/${bookId}`, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'x-token':global.token
            }
        }).then(async querry=>{
            const data = await querry.json();
            if(querry.status != 200){
                fn(true)
            }else{
                
                if(data['finish']){
                    fn(false,true);     
                }else{
                    fn(false,false)
                }
            } 
        }).catch(e=> fn(true));   
    }  
}
class Books{
    async getMoreBooks(skip,fn){
        await fetch(`${global.uri}/books/all`, {
            method: 'POST',
            body:JSON.stringify({skip}),
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            }
        }).then(async querry=>{
            const data = await querry.json();
            if(querry.status != 200){
                fn(true)     
            }else{
                fn(false,data)
            }
        }).catch(e=> fn(true)); 
    }
    async getBooks(skip,fn){
        await fetch(`${global.uri}/books`, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            }
        }).then(async querry=>{
            const data = await querry.json();
            if(querry.status != 200){
                fn(true)     
            }else{
                //console.log(data);
                fn(false,data)
            }
        }).catch(e=> fn(true)); 
    }
    async getDataBook(id,fn){
        await fetch(`${global.uri}/books/${id}/all`, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            }
        }).then(async querry=>{
            const data = await querry.json();
            if(querry.status != 200){
                fn(true)     
            }else{
                fn(false,data)
            }
        }).catch(e=> fn(true));
        
    }
    async getUsersBooks(type,fn){
        let querry = await fetch((type)?`${global.uri}/books/biblio/${global.user.username}`:`${global.uri}/books/favs/${global.user.username}`, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            }
        }).then(async querry=>{
            const data = await querry.json();
            if(querry.status != 200){
                fn(true)     
            }else{
                fn(false,data)
            }
           
        }).catch(e=> fn(true));
    }
    
}
let user = new User;
let books = new Books;
export {user,books};