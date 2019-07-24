var $ul = document.getElementsByClassName("todo-list")[0];
var $text = document.getElementsByClassName("new-todo")[0];
var leftCount = document.querySelector('.todo-count>strong');
var storage = window.localStorage;
var datas = [];
var clearBtn = document.getElementsByClassName('clear-completed')[0];
var bottomBtn = document.querySelector('.filters');
var bottomA = document.querySelectorAll('.filters>li>a');
var label = document.getElementsByClassName('toggle-all')[0];
var hash = location.hash;
var btnAll = document.querySelectorAll('.filters li a')[0];
var btnActive = document.querySelectorAll('.filters li a')[1];
var btnCompleted = document.querySelectorAll('.filters li a')[2];
var Storage = {
    saveData: function () {
        $text.onkeyup = function (event) {
            if (event.keyCode == 13) {
                createTodo(); // 添加节点并且存储节点
                leftCount.innerText++;
            }

        };

    },
    writeData: function () {
        var count = 0;
        var value = "";
        datas = JSON.parse(storage.getItem('data'));
        if (hash == "#/active" ) {
            removeClass(btnAll,'selected');
            removeClass(btnCompleted,'selected');
            addClass(btnActive,'selected');
        }
        else if (hash == "#/completed") {
            removeClass(btnAll,'selected');
            removeClass(btnActive,'selected');
            addClass(btnCompleted,'selected');
        } else {
            removeClass(btnCompleted,'selected');
            removeClass(btnActive,'selected');
            addClass(btnAll,'selected');
        }
        if (datas) {
            var dataHtml = '';
           
            for (var k = 0; k < datas.length; k++) {
                var condition = "";
                if (datas[k].condition) {
                    condition = "checked";
                    if (hash == "#/active" ) {
                        value = " hide";
                       
                    }
                    else if (hash == "#/completed") {
                        value = "";
                      
                    }
                } else {
                    if (hash == "#/active" ) {
                        value = "";
                    }
                    else if (hash == "#/completed") {
                        value = " hide";
                    }
                    count++;
                    condition = "";
                }
                dataHtml += "<li class = " + datas[k].classname + ""+value+">" +
                    "<div class = 'view'>" +
                    "<button class ='destroy'>" +
                    "</button>" +
                    "<input class='toggle' type='checkbox'" + condition + ">" +
                    "<label>" +
                    datas[k].title +
                    "</label>" +
                   
                    "</div>" +
                    "</li>";

            }
            leftCount.innerText = count;
            $ul.innerHTML = dataHtml;
        }
        //拿到了剩下那些条的数目
        var $countBox = document.getElementsByClassName("toggle");
        var $count = $countBox.length;
        var $leftCountbox = document.getElementsByClassName('completed');
        var $leftCount = $leftCountbox.length;
        var finalCount = $count - $leftCount;

        leftCount.innerText = finalCount;
        //清除那些打勾状态的条

        if ($leftCount > 0) {
            clearBtn.style.display = 'block';
            clearBtn.innerText = "Clear completed";
        } else {
            clearBtn.style.display = 'none';
            clearBtn.innerText = "";
        }
    },

};
Storage.saveData();
Storage.writeData();

function createTodo() {
    //创建并存储
    var $li = document.createElement('li');
    var $div = document.createElement('div');
    var $input = document.createElement('input');
    var $label = document.createElement('label');
    var $button = document.createElement('button');
    var $checkbox = document.getElementsByClassName('toggle');
    $ul.appendChild($li);
    $li.appendChild($div);
    $div.appendChild($input);
    $div.appendChild($label);
    $div.appendChild($button);
    $div.setAttribute('class', 'view');
    $input.setAttribute('class', 'toggle');
    $input.type = 'checkbox'; //直接写属性即可
    $button.setAttribute('class', 'destroy');
    var inputText = $text.value;
    $label.innerText = inputText;
    var data = {
        title: $label.innerText,
        condition: false,
        classname: ""
    };
    if (!datas) {
        datas = [];
    }
    datas.push(data);
    storage.setItem('data', JSON.stringify(datas));

}
//该函数用于向元素中添加class属性，obj代表元素，cn代表class属性名
function addClass(obj, cn) {
    if (!hasClass(obj, cn)) {
        obj.className += " " + cn;
    }
}
//该函数用于判断元素中是否含有对应的class样式名
function hasClass(obj, cn) {
    var reg = new RegExp("\\b" + cn + "\\b");
    return reg.test(obj.className);
}
//该函数用于移除对应的class样式名
function removeClass(obj, cn) {
    var reg = new RegExp("\\b" + cn + "\\b");
    obj.className = obj.className.replace(reg, "");
}
//该函数用于如果元素中含有对应的样式名，则删除该样式名，如果没有改样式名，则添加
function toggleClass(obj, cn) {
    if (hasClass(obj, cn)) {
        removeClass(obj, cn);
    } else {
        addClass(obj, cn);
    }
}
//事件委托,去掉节点的打勾状态
$ul.addEventListener("click", function (e) {
    var $countBox = document.getElementsByClassName("toggle");
    var $count = $countBox.length;
    var condition = e.target.checked
    if (e.target.className == "toggle") {
        var $parentNode = e.target.parentNode.parentNode;
        var $index = [].indexOf.call($parentNode.parentNode.querySelectorAll("li"), $parentNode);
        toggleClass($parentNode, 'completed');
        datas = JSON.parse(storage.getItem('data'));
        datas[$index].condition = e.target.checked;
        if (hasClass($parentNode, "completed")) {
            datas[$index].classname = "completed";
        } else {
            datas[$index].classname = "";
        }

        storage.setItem('data', JSON.stringify(datas));
        //拿到了剩下那些条的数目
        var $leftCountbox = document.getElementsByClassName('completed');
        var $leftCount = $leftCountbox.length;
        var finalCount = $count - $leftCount;

        leftCount.innerText = finalCount;
        //清除那些打勾状态的条

        if ($leftCount > 0) {
            clearBtn.style.display = 'block';
            clearBtn.innerText = "Clear completed";
        } else {
            clearBtn.style.display = 'none';
            clearBtn.innerText = "";
        }
    } else if (e.target.tagName == "BUTTON") {
        var $parent = e.target.parentNode.parentNode;
        var $index = [].indexOf.call($parent.parentNode.querySelectorAll("li"), $parent);
        $ul.removeChild($parent);
        datas = JSON.parse(storage.getItem('data'));
        var $lengthFirst = datas.length;
        datas.splice($index, 1);
        var $lengthLast = datas.length;
        var $length = $lengthFirst - $lengthLast;
        leftCount.innerText = $length;
        storage.setItem('data', JSON.stringify(datas));
        Storage.writeData();
    } 
    // else if (e.target.tagName == "LABEL") {
    //     var target = e.target.parentNode;
    //     e.target.style.background = '#ccc';
    //     target.removeChild(e.target);
    //     var input1 = document.createElement('input');
    //     target.appendChild(input1);
    //     addClass(input1,'new-todo1'); 
    // } 
    return false;
});
//清除的按钮
clearBtn.addEventListener('click', function () {
    var datas1 = JSON.parse(storage.getItem('data'));
    var $leftCountbox = $ul.getElementsByTagName("li");
    var $countBox = document.getElementsByClassName("toggle");
    var $leftCount = $leftCountbox.length;
    var finalCount = $count - $leftCount;
    var $count = $countBox.length;
    $leftCount.innerText = finalCount;
    
    for (var i = 0; i < $count; i++) {
        for (var j = 0; j < $count - i; j++) {
            if ($countBox[j].checked) {
                $ul.removeChild($leftCountbox[j]);
                datas1.splice(j, 1);
                break;
            }
        }
    }
    var clearLi = document.querySelectorAll('.todo-list>li');
    
    storage.setItem('data', JSON.stringify(datas1));
    // Storage.writeData();
})
//事件委托,底部高亮按钮
bottomBtn.addEventListener('click', function (ev) {
    for (var j = 0, len = bottomA.length; j < len; j++) {
        removeClass(bottomA[j], 'selected');
    }
    if (ev.target.tagName === 'A') {
        addClass(ev.target, 'selected');
        if (ev.target.innerText === 'All') {
            var bottomLi = document.querySelectorAll('.todo-list>li');
                for (var k = 0; k < bottomLi.length; k++) {
                   
                        bottomLi[k].style.display = 'block';    
                       
                }
        } else if (ev.target.innerText === 'Active') {
                var bottomLi = document.querySelectorAll('.todo-list>li');
                for (var k = 0; k < bottomLi.length; k++) {
                    if (bottomLi[k].className == 'completed') {
                        bottomLi[k].style.display = 'none';    
                    }     
                }
        } else if (ev.target.innerText === 'Completed') {
                var bottomLi = document.querySelectorAll('.todo-list>li');
                for (var k = 0; k < bottomLi.length; k++) {
                    if (bottomLi[k].className == '') {
                        bottomLi[k].style.display = 'none';                       
                    }  else {
                        bottomLi[k].style.display = 'block';
                    }                 
                }
        }
    }
})
//下拉按钮
var isTrue = true;
label.addEventListener('click',function() {
    var bottomLi = document.querySelectorAll('.todo-list>li');
    if (isTrue) {
        for (var k = 0; k < bottomLi.length; k++) {
            bottomLi[k].style.display = 'none';   
        }
        isTrue = false;   
    } else {
        for (var k = 0; k < bottomLi.length; k++) {
            bottomLi[k].style.display = 'block'; 
        }
        isTrue = true;
    }
})
//改变label有bug
var labelChange = document.querySelectorAll('.view>label');
for (var i = 0;i<labelChange.length;i++) {
    labelChange[i].addEventListener('click',function (event) {
        var targetText = this.innerText;
        
        var target = this.parentNode;
        this.style.background = '#ccc';
        target.removeChild(this);
        var input1 = document.createElement('input');
        target.appendChild(input1);
        console.log(targetText)
        input1.value= targetText;//注意input是value
        console.log(input1.innerText)

        addClass(input1,'new-todo1');
        
        input1.addEventListener('blur',function() {
            removeClass(input1,'new-todo1');
            var valueInput = input1.value;
            var inputParent = input1.parentNode;
            inputParent.removeChild(input1);
            var labelNew = document.createElement('label');
            inputParent.appendChild(labelNew);
            labelNew.innerText = valueInput;
            labelNew.style.zIndex = 9999;
        })
        
    })
 
    
}
