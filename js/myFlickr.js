/*
//일정기간 가장 인기있는 사진들 출력 
https://www.flickr.com/services/rest/?method=flickr.interestingness.getList

//원하는 이미지 출력 
https://www.flickr.com/services/rest/?method=flickr.photos.search

"d61e30a1010fe3e1dab106d3a2df0f21"
*/
$.ajax({
    url:"https://www.flickr.com/services/rest/?method=flickr.photos.search",
    //url:"https://www.flickr.com/services/rest/?method=flickr.interestingness.getList", 
    dataType:"json", 
    data:{
        api_key:"6d2ca35639d1d6bc10f4e95dc29073a6", 
        per_page:5, 
        format:"json",
        nojsoncallback:1, //json객체를 감싸고 있는 wrapping 함수를 걷어냄
        privacy_filter : 5, 
        tags :"landscape" // 검색할 이미지 키워드 입력 - method가 photos.search일 때 (interestingnesss일때는 주석처리)
    }
})
.success(function(data){
    console.log(data.photos.photo);
    let items = data.photos.photo; 

    //#gallery프레임 안에 ul태그 생성
    $("#gallery").append("<ul>");

    //이미지 데이터 개수만큼 안쪽 코드 반복
    $(items).each(function(index,data){

        // 변수 text에 이미지 데이터의 title을 담음
        let text = data.title;

        //만약 해당 이미지 데이터에 제목 텍스트가 없다면
        if(!data.title){
            //변수 text에 임의의 텍스트를 저장하여 추후 발생할 수 있는 오류 방지
            text = "No description in this photo";
        }

        //#gallery ul 프레임에 이미지 데이터 개수만큼 반복을 돌면서 li생성
        $("#gallery ul")
            .append(
                $("<li>")
                    .append(
                        //a태그를 만들어서 큰 이미지의 주소를 href속성 대입
                        $("<a>").attr({
                            href : "https://live.staticflickr.com/"+data.server+"/"+data.id+"_"+data.secret+"_b.jpg"
                        })
                    )
                    .append(
                        $("<img>").attr({
                            src : "https://live.staticflickr.com/"+data.server+"/"+data.id+"_"+data.secret+"_m.jpg"
                        })
                    )
                    //다시 자식으로 p태그 생성해서 이미지 제목 출력
                    .append(
                        $("<p>").text(text)
                    )
            )
    })
})
.error(function(err){
    console.err("데이터를 호출하는데 실패했습니다"); 
})