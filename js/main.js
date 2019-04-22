$(function () {
    $("#btnLoad").click(function () {
        service.getUsers()
            .done(data => {
                let continer = $("#content");
                let table = $("<table>").append("<tr><th></th><th>Id</th><th>Name</th><th>User Name</th><th>Email</th></tr>");
                data.forEach(element => {
                    table.append("<tr><td><i class='icon-chevron-right' data-id=" + element.id + "></i></td><td>" + element.id + "</td><td>" + element.name + "</td><td>" + element.userName + "</td><td>" + element.email + "</td> </tr>");
                });
                continer.empty();
                table.appendTo(continer);
                table.find("i").click(function(){
                    let userId=$(this).attr("data-id");
                    let parentTr=$(this).parents().parents()[0];
                    let nextTr=$( parentTr).next()[0];
                    let drawPosts=function(){
                        service.getPosts(userId)
                        .done(posts=>{
                           let postTable= "<td colspan='5'><table><tr><th></th><th>Id</th><th>Title</th><th>Body</th></tr>";
                           posts.forEach(element=>{
                            postTable+="<tr><td><i class='icon-chevron-right' data-id=" + element.id + "></i></td><td>" + element.id + "</td><td>" + element.title + "</td><td>" + element.body + "</td> </tr>";
                           });
                           postTable+="</table></td>";
                           let PostTr=$("<tr id='postsTr'>").append(postTable);
                          $( parentTr).after(PostTr);
                          PostTr.find("i").click(function(){
                            let postId=$(this).attr("data-id");
                            let parentTr=$(this).parents().parents()[0];
                            let nextTr=$( parentTr).next()[0];
                            let drawPosts=function(){
                                service.getComments(postId)
                                .done(posts=>{
                                   let postTable= "<td colspan='4'><table><tr><th></th><th>Id</th><th>Name</th><th>Email</th><th>Body</th></tr>";
                                   posts.forEach(element=>{
                                    postTable+="<tr><td><i class='icon-chevron-right' data-id=" + element.id + "></i></td><td>" + element.id + "</td><td>" + element.name + "</td><td>" + element.email + "</td><td>" + element.body + "</td> </tr>";
                                   });
                                   postTable+="</table></td>";
                                   let PostTr=$("<tr id='commantsTr'>").append(postTable);
                                  $( parentTr).after(PostTr);
                                });
                            }

                            if(nextTr!=undefined ){
                                if(nextTr.id==="commantsTr"){
                                    $(nextTr).toggle("slow");
                                   }
                                   else{
                                    drawPosts();
                                   }
                               }else{
                                drawPosts();
                               }
                          });


                        });
                    }
                   if(nextTr!=undefined ){
                    if(nextTr.id==="postsTr"){
                        $(nextTr).toggle("slow");
                       }
                       else{
                        drawPosts();
                       }
                   }else{
                    drawPosts();
                   }
                   
                });
            });

    });
});