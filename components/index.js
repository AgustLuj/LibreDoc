class User{
    async getData(username,pass,fn){
        let querry = await fetch(`${global.uri}/users/login`, {
            method: 'POST',
            body: JSON.stringify({username,pass}),
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            }
        });
        
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
    }
    async searchUser(username,fn){
        let querry = await fetch(`${global.uri}/users/search`, {
            method: 'POST',
            body: JSON.stringify({username}),
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            }
        });
        
        const data = await querry.json();
        if(querry.status != 200){
            fn(false);            
        }else{
            fn(true);
        }
    }
    async setData(username,pass,fn){
        let querry = await fetch(`${global.uri}/users/register`, {
            method: 'POST',
            body: JSON.stringify({username,pass}),
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            }
        }).catch((e)=>{
            console.log(e)
        });
        
        const data = await querry.json();
        if(querry.status != 200){
            fn(false);
        }else{
            fn(true,data['username'])
        }
    }
    async addBook(id,fn){
        let querry = await fetch(`${global.uri}/users/${global.user}/add/${id}`, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            }
        }).then(async querry=>{
            const data = await querry.json();
            if(querry.status != 200){
                fn(false);          
            }else{
                if(data.biblio){
                    fn(true,true);       
                }else{
                    fn(false,true); 
                }
            }
        }).catch(e=> fn(false));
    }
    async addFavBook(id,fn){
        let querry = await fetch(`${global.uri}/users/${global.user}/fav/${id}`, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            }
        });
        
        const data = await querry.json();
        if(querry.status != 200){
            fn(false);          
        }else{
            //console.log(data)
            if(data.fav){
                fn(true,true);       
            }else{
                fn(false,true); 
            }
        }
    }
    async searchBook(id,fn){
        let querry = await fetch(`${global.uri}/users/${global.user}/search/${id}`, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            }
        });
        
        const data = await querry.json();
        if(querry.status != 200){
            fn(false);          
        }else{
            //console.log(data)
            fn(true,data);       
        } 
    }
    async startRead(){
        let querry = await fetch(`${global.uri}/users/${global.user}/search/${id}`, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            }
        });
        
        const data = await querry.json();
        if(querry.status != 200){
            fn(false);          
        }else{
            //console.log(data)
            fn(true,data);       
        } 
    }
    async savePage(id,pages,fn){
        let querry = await fetch(`${global.uri}/users/${global.user}/updatePage/${id}`, {
            method: 'POST',
            body:JSON.stringify({pages}),
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            }
        });
        
        const data = await querry.json();
        if(querry.status != 200){
            fn(false)
        }else{
            fn(true)     
        } 
    }
    async backPage(id,pages,fn){
        let querry = await fetch(`${global.uri}/users/${global.user}/updatePage/${id}`, {
            method: 'POST',
            body:JSON.stringify({pages}),
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            }
        });
        
        const data = await querry.json();
        if(querry.status != 200){
            fn(false)
        }else{
            fn(true)     
        } 
    }
    async getBookReading(fn){
        let querry = await fetch(`${global.uri}/users/${global.user}/bookReading/`, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            }
        });
        
        const data = await querry.json();
        if(querry.status != 200){
            fn(true)
        }else{
            fn(false,data)     
        } 
    }
}
class Books{
    async getBooks(skip,fn){
        setTimeout(()=>{fn(false)},5000)
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
                fn(false)     
            }else{
                fn(true,data)
            }
        }).catch(e=> fn(false));
        
        
        
    }
    async getDataBook(id,fn){
        let querry = await fetch(`${global.uri}/books/${id}/all`, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            }
        });
        
        const data = await querry.json();
        if(querry.status != 200){
            fn(false)     
        }else{
            fn(true,data)
        }
    }
    async getUsersBooks(type,fn){
        let querry = await fetch((type)?`${global.uri}/books/biblio/${global.user}`:`${global.uri}/books/favs/${global.user}`, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            }
        });
        
        const data = await querry.json();
        if(querry.status != 200){
            fn(false)     
        }else{
            fn(true,data)
        }
        fn(false) 
    }
    
}
let user = new User;
let books = new Books;
export {user,books};