var service=(function(url){
    const fetchService=function(path){
        return $.get(url+path);
    }

    const getUsers=function(){
        return fetchService("/users");
    }
    const getPosts=function(userId){
        return fetchService("/posts?userId="+userId);
    }
    const getComments=function(postId){
        return fetchService("/comments?postId="+postId);
    }

    return {
        getUsers:getUsers,
        getPosts:getPosts,
        getComments:getComments
    }

})("http://jsonplaceholder.typicode.com");