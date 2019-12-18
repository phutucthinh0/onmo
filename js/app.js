let e_qa;
let json_qa = []
let count_qa = 0
let count = 0;
let list_qa = []
window.onload = function () {
    e_qa = document.getElementById("question")
    if (getCookie("login") == "") {
        $("button").remove();
        e_qa.innerText = "Xin lỗi bạn không phải là thành viên của tổ mình \u26A0 \nNếu đây là lỗi hãy báo cáo với admin\nCảm ơn"
        window.location.replace("login.html");
    }
    $("#1").click(function () {
        load(1)
        $("button").remove();
    });
    $("#2").click(function () {
        load(2)
        $("button").remove();
    });
    $("#3").click(function () {
        load(3)
        $("button").remove();
    });
    $("#4").click(function () {
        load(4)
        $("button").remove();
    });
    $("#5").click(function () {
        load(5)
        $("button").remove();
    });
}
function load(n) {
    $.getJSON("qa/" + n + ".json",
        function (data, textStatus, jqXHR) {
            data.forEach(element => {
                json_qa[count_qa] = element
                list_qa[count_qa] = count_qa
                count_qa++
            });
            list_qa = shuffle(list_qa)
            displayqa()
        }
    );
}
function displayqa() {
    e_qa.innerText = json_qa[count].q + "  (" + count + "/" + (count_qa - 1) + ")"
    if (json_qa[count].s != null){
        dislayimg(json_qa[count].s)
    }
    var span_a = document.createElement("span")
    span_a.innerText = json_qa[count].a
    var answer = document.createElement("button")
    answer.classList.add("btn")
    answer.appendChild(span_a)
    answer.addEventListener("click", function () {
        $("button").remove()
        $("img").remove()
        count++
        if (count <= (count_qa - 1)) {
            displayqa()
        } else {
            alert("Đã xong !")
            window.location.replace("index.html");
        }
    });
    var n = json_qa[count].n
    var n_c = 0;
    var n_a = [];
    n.forEach(element => {
        n_a[n_c] = n_c
        n_c++
    });
    n_a = shuffle(n_a)
    var random = Math.floor(Math.random() * (n_c + 1));
    // console.log(n)
    // console.log(n_c)
    // console.log(n_a)
    var dem = 0
    n_a.forEach(element => {
        if (dem == random) {
            document.body.appendChild(answer)
        }
        var span = document.createElement("span")
        span.innerText = n[element]
        var button = document.createElement("button")
        button.classList.add("btn")
        button.appendChild(span)
        button.addEventListener("click", function () {
            button.classList.add("red")
        });
        document.body.appendChild(button);
        dem++
        if ((dem == random) && (dem == n_c)) {
            document.body.appendChild(answer)
        }
    });
}

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
function dislayimg(number) {
    var img = $('<img class="image" style="margin: 0 auto; display: block;" width = "75%"">'); //Equivalent: $(document.createElement('img'))
    img.attr('src', "img/"+number+".jpg");
    img.appendTo('body');
}