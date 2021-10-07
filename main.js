/*
사진경로 https://live.staticflickr.com/{server-id}/{id}_{secret}_{size-suffix}.jpg

https://live.staticflickr.com/7372/12502775644_acfd415fa7_w.jpg


데이터를 불러올 주소

https://www.flickr.com/services/rest/?method=flickr.test.echo&name=value

//일정기간동안 가장 인기있는 사진을 불러오는 메소드

https://www.flickr.com/services/rest/?method=flickr.interestingness.getList
 */

$.ajax({
    url:"https://www.flickr.com/services/rest/?method=flickr.interestingness.getList",
    dataType:"json",
    data:{
        api_key : "6d2ca35639d1d6bc10f4e95dc29073a6",
        per_page : 50,
        format : "json",
        nojsoncallback : 1
    }
})

.success(function(data){
    console.log(data.photos.photo);
    const item = data.photos.photo;

    $(item).each(function(index,data){
        $("#gallery .list")
            .append(
                $("<li>")
                    .append(
                        $("<div class='inner'>")
                            .append(
                                $("<a>")
                                    .attr({ href : "https://live.staticflickr.com/"+this.server+"/"+this.id+"_"+this.secret+"_b.jpg" })
                                    .append(
                                        $("<img>")
                                            .attr({
                                                src : "https://live.staticflickr.com/"+this.server+"/"+this.id+"_"+this.secret+"_m.jpg"
                                            })
                                    ),
                                $("<p>").text(this.title)
                            )
                    )
            )
    });
})
.error(function(err){
    console.err("데이터를 불러오는 데 실패했습니다.");
})