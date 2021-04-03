class User{
    getData = async(username,pass) =>{
        const querry = await fetch(`${global.uri}/auth/login`, {
            method: 'POST',
            body: JSON.stringify({username,pass}),
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            }
        })
        const data = await querry.json();
        if(querry.status == 500){
            console.log(data)
            throw new Error("Ocurrio un error interno");
        }
        if(querry.status != 200){
            throw new Error(data.msg)
        }else{
            return data;
        }
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
        if(querry.status == 500){
            console.log(data)
            throw new Error("Ocurrio un error interno");
        }
        if(querry.status != 200){
            throw new Error(data.msg);
        }else{
            return data
        }
    }
    setData = async(username,pass) =>{
        const querry = await fetch(`${global.uri}/auth/register`, {
            method: 'POST',
            body: JSON.stringify({username,pass}),
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            }
        })
        const data = await querry.json();
        if(querry.status == 500){
            console.log(data)
            throw new Error("Ocurrio un error interno");
        }
        if(querry.status != 200){
            let {errors}=data;
            fn(true,errors[0]);
        }else{
            fn(false,data)
        }
        
    }
    async addBook(id,fn){
        let querry = await fetch(`${global.uri}/users/${global.user.username}/add/${id}`, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'x-token':global.token
            }
        })
        const data = await querry.json();
        if(querry.status == 500){
            console.log(data)
            throw new Error("Ocurrio un error interno");
        }
        if(querry.status != 200){
            throw new Error(data.msg);          
        }else{
            return data['biblio']
        }
    }
    addFavBook = async(id,fn) =>{
        let querry = await fetch(`${global.uri}/users/${global.user.username}/fav/${id}`, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'x-token':global.token
            }
        }) 
        const data = await querry.json();
        if(querry.status == 500){
            console.log(data)
            throw new Error("Ocurrio un error interno");
        }
        if(querry.status != 200){
            throw new Error(data.msg);          
        }else{
            return data['favorite']
        }      
    }
    searchBook = async(id,fn) =>{
        let querry = await fetch(`${global.uri}/users/${global.user.username}/search/${id}`, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'x-token':global.token
            }
        })
        const data = await querry.json();
        if(querry.status == 500){
            console.log(data)
            throw new Error("Ocurrio un error interno");
        }
        if(querry.status != 200){
            throw new Error(data.msg);          
        }else{
            return data
        }    
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
    getFinish = async(bookId) =>{
        let querry = await fetch(`${global.uri}/users/${global.user.username}/getFinish/${bookId}`, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'x-token':global.token
            }
        })
        const data = await querry.json();
        if(querry.status == 500){
            console.log(data)
            throw new Error("Ocurrio un error interno");
        }
        if(querry.status != 200){
            throw new Error(data.msg);          
        }else{
            return data['finish']
        } 
        
    }
    readAgain = async(bookId) =>{
        let querry = await fetch(`${global.uri}/users/${global.user.username}/readAgain/${bookId}`, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'x-token':global.token
            }
        })
        const data = await querry.json();
        if(querry.status == 500){
            console.log(data)
            throw new Error("Ocurrio un error interno");
        }
        if(querry.status != 200){
            throw new Error(data.msg);          
        }else{
            return data['finish']
        } 
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
    getBooks = async() =>{
        let querry = await fetch(`${global.uri}/books`, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            }
        })
        const data = await querry.json();
        if(querry.status == 500){
            console.log(data)
            throw new Error("Ocurrio un error interno");
        }
        if(querry.status != 200){
            throw new Error(data.msg);          
        }else{
            return data
        }
    }
    getDataBook = async(id) =>{
        let querry = await fetch(`${global.uri}/books/${id}/all`, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            }
        })
        const data = await querry.json();
        if(querry.status == 500){
            console.log(data)
            throw new Error("Ocurrio un error interno");
        }
        if(querry.status != 200){
            throw new Error(data.msg);          
        }else{
            return data
        }
    }
    getUsersBooks = async(type)=>{
        let querry = await fetch((type)?`${global.uri}/books/biblio/${global.user.username}`:`${global.uri}/books/favs/${global.user.username}`, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'x-token':global.token
            }
        })
        const data = await querry.json();
        if(querry.status == 500){
            console.log(data)
            throw new Error("Ocurrio un error interno");
        }
        if(querry.status != 200){
            throw new Error(data.msg);          
        }else{
            return data
        }
        
    }
    
}
let user = new User;
let books = new Books;
export {user,books};