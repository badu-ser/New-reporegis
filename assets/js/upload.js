function reportInfo(vars, showType = false) {
    if (showType === true) console.log(typeof vars);
    console.log(vars);
}

function addImg(ele, content) {
    var myDIV = document.querySelector(ele);
    var newContent = document.createElement('div');
    newContent.innerHTML = content;

    while (newContent.firstChild) {
        myDIV.appendChild(newContent.firstChild);
    }
}
var feedback = function (res) {
    reportInfo(res, true);
    if (res.success === true) {
        var get_link = res.data.link.replace(/^http:\/\//i, 'https://');

        // Store URL in hidden input field
        document.getElementById("url").value = get_link;

        document.querySelector('.status').classList.add('bg-image', 'center', 'mt-2', 'py-2');
       var content = `<p style="color: black;"> Payment Screenshot uploaded successfully! </p> <style>#myTab {
    position: static !important; /* Prevents floating */
    width: 100%; /* Ensures it stays within the container */
}
#myTabContent {
    position: relative !important; /* Keeps content anchored */
} </style> <!-- <div style="width: 95%;">
        <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item">
                <a class="nav-link active" data-toggle="tab" href="#url" role="tab" aria-controls="url" aria-selected="true">URL</a>
            </li>
        </ul>
        <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade show active" id="url" role="tabpanel" aria-labelledby="url-tab">
                <div class="my-2"><input class="form-control" value="${get_link}" onclick="this.select();"/></div>
            </div>
            
            </div>
        </div> -->
        <hr><p><img class="img rounded mx-auto d-block" src="${get_link}" alt="Image"/></p>
        </div> -->`;
        addImg('.status', content);
    }
}; 

new Imgur({
    clientid: '146def7f79c7a87', //You can change this ClientID
    callback: feedback
});
