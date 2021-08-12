const http = new easyHTTP; 

const data = {
   title: 'Custom Post',
   body: 'This is a custom post'
};

// GET Posts
// http.get('https://jsonplaceholder.typicode.com/posts', function(error, posts){
//    if (error) {
//       console.log(error);
//    } else {
//       console.log(posts);
//    }
// })


// GET single Post
// http.get('https://jsonplaceholder.typicode.com/posts/1', function(error, posts){
//    if (error) {
//       console.log(error);
//    } else {
//       console.log(posts);
//    }
// })


// Create a Post 
// http.post("https://jsonplaceholder.typicode.com/posts", data,
//    function (error, post) {
//       if (error) {
//          console.log(error);
//       } else {
//          console.log(post);
//       }
//    }
// );


// Update Post 
// http.put('https://jsonplaceholder.typicode.com/posts/1', data, function (error, post) {  
//    if (error) {
//       console.log(error);
//    } else {
//       console.log(post);
//    }
// });

// Delete Post 
http.delete('https://jsonplaceholder.typicode.com/posts/1', function(error, posts){
   if (error) {
      console.log(error);
   } else {
      console.log(posts);
   }
})









// setTimeout(() => {
//    http.get('https://jsonplaceholder.typicode.com/posts', function(error, posts){
//    if (error) {
//       console.log(error);
//    } else {
//       console.log(posts);
//    }
// })
// }, 1000);



