class User{
    async getData(username,pass,fn){
        await fetch(`${global.uri}/users/login`, {
            method: 'POST',
            body: JSON.stringify({username,pass}),
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            }
        }).then(async querry=>{
            const data = await querry.json();
            if(querry.status != 200){
                if(data['err']){
                    fn(true,data);
                }else if(!data['login']){
                    fn(true,data);
                }   
            }else{
                if(data['login']){
                    fn(false,true)
                }
            }
        }).catch(e=> fn(true,e)); 
        
        /*
        }*/
    }
    async searchUser(username,fn){
        await fetch(`${global.uri}/users/search`, {
            method: 'POST',
            body: JSON.stringify({username}),
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            }
        }).then(async querry=>{
            const data = await querry.json();
            if(querry.status != 200){
                fn(true);            
            }else{
                fn(false);
            }
        }).catch(e=> fn(true)); 
    }
    async setData(username,pass,fn){
        await fetch(`${global.uri}/users/register`, {
            method: 'POST',
            body: JSON.stringify({username,pass}),
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            }
        }).then(async querry=>{
            const data = await querry.json();
            if(querry.status != 200){
                fn(true);
            }else{
                fn(false,data['username'])
            }
        }).catch(e=> fn(true)); 
        
    }
    async addBook(id,fn){
        await fetch(`${global.uri}/users/${global.user}/add/${id}`, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            }
        }).then(async querry=>{
            const data = await querry.json();
            if(querry.status != 200){
                fn(true);          
            }else{
                if(data.biblio){
                    fn(false,true);       
                }else{
                    fn(true,true); 
                }
            }
        }).catch(e=> fn(true));
    }
    async addFavBook(id,fn){
        await fetch(`${global.uri}/users/${global.user}/fav/${id}`, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            }
        }).then(async querry=>{
            const data = await querry.json();
            if(querry.status != 200){
                fn(true);          
            }else{
                //console.log(data)
                if(data.fav){
                    fn(false,true);       
                }else{
                    fn(true,true); 
                }
            }
        }).catch(e=> fn(true));
        
    }
    async searchBook(id,fn){
        await fetch(`${global.uri}/users/${global.user}/search/${id}`, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            }
        }).then(async querry=>{
            const data = await querry.json();
            if(querry.status != 200){
                fn(true);          
            }else{
                //console.log(data)
                fn(false,data);       
            } 
        }).catch(e=> fn(true));
        
    }
    async savePage(id,pages,fn){
        await fetch(`${global.uri}/users/${global.user}/updatePage/${id}`, {
            method: 'POST',
            body:JSON.stringify({pages}),
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
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
        await fetch(`${global.uri}/users/${global.user}/updatePage/${id}`, {
            method: 'POST',
            body:JSON.stringify({pages}),
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
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
        await fetch(`${global.uri}/users/${global.user}/bookReading/`, {
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
    async getBookRead(fn){
        await fetch(`${global.uri}/users/${global.user}/bookRead/`, {
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
    async setVote(vote,bookId,fn){
        await fetch(`${global.uri}/users/${global.user}/setVote/${bookId}`, {
            method: 'POST',
            body:JSON.stringify({vote}),
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
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
        await fetch(`${global.uri}/users/${global.user}/getFinish/${bookId}`, {
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
                console.log(data)
                if(data['finish']){
                    fn(false,true);     
                }else{
                    fn(false,false)
                }
            } 
        }).catch(e=> fn(true));
        
    }
    async readAgain(bookId,fn){
        await fetch(`${global.uri}/users/${global.user}/readAgain/${bookId}`, {
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
        let querry = await fetch((type)?`${global.uri}/books/biblio/${global.user}`:`${global.uri}/books/favs/${global.user}`, {
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