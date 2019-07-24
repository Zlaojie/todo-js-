var $ul = document.getElementsByClassName("todo-list")[0];
var $text = document.getElementsByClassName("new-todo")[0];
var leftCount = document.querySelector('.todo-count>strong');
var storage = window.localStorage;
var datas = [];
var clearBtn = document.getElementsByClassName('clear-completed')[0];
var Storage = {
    
    saveData: function () {
        $text.onkeyup = function (event) {
            if (event.keyCode == 13) {
                createTodo();// 添加节点并且存储节点              
            }    
        };    
    },
    writeData: function () {

        // var $datas =JSON.parse(storage.getItem('data'));
        var count = 0;
        datas =JSON.parse(storage.getItem('data'));
        // console.log(datas)
        // datas = storage.getItem('data');
        if (datas) {
            var dataHtml = '';
        
            // for (var i = 0; i < storage.length; i++) {
            //     var key = storage.key(i);
            //     console.log(storage.getItem(key))
            //      data += '<li>'+storage.getItem(key)+'</li>';
            // }
            // console.log(datas.length)
            for (var k =0; k<datas.length;k++){
                var condition = "";
                if (datas[k].condition) {
                    condition = "checked";
                } else {
                    count++;
                    condition = "";
                }
                dataHtml += "<li class = "+datas[k].classname+">"
                +"<div class = 'view'>"
                +"<input class='toggle' type='checkbox'"+condition+">"
                +"<label>"
                +datas[k].title
                +"</label>"
                +"<button class ='destroy'>"
                +"</button>"
                +"</div>"
                +"</li>";
             
            }
            leftCount.innerText = count;
            $ul.innerHTML = dataHtml;
        }
        // console.log(JSON.parse($datas));
        
      
        
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
    storage.setItem('data',JSON.stringify(datas));
}
//事件委托删除节点并且把删除完节点之后再保存在本地
// $ul.addEventListener('click',function (ev) {
//     // console.log(ev.target.className)
//     // ev.target.className == "destory"

//         var $parent = ev.target.parentNode.parentNode;
//         var $index = [].indexOf.call($parent.parentNode.querySelectorAll("li"),$parent);
//         $ul.removeChild($parent);
//         datas =JSON.parse(storage.getItem('data'));
//         var $lengthFirst = datas.length;
//         datas.splice($index,1);
//         var $lengthLast = datas.length;
//         var $length = $lengthFirst - $lengthLast;
//         leftCount.innerText = $length;
//         storage.setItem('data',JSON.stringify(datas));
//         Storage.writeData();

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
   
// })

//事件委托,去掉节点的打勾状态
$ul.addEventListener("click",function (e) {
    var $countBox = document.getElementsByClassName("toggle");
    var $count = $countBox.length;
    var condition = e.target.checked
    if (e.target.className == "toggle") {   
        var $parentNode = e.target.parentNode.parentNode;
        var $index = [].indexOf.call($parentNode.parentNode.querySelectorAll("li"),$parentNode);
        // if (condition) {
        //    addClass($parentNode,'completed');
        //    e.target.checked = false; 
        //    console.log(1)

        // } else {
        //     console.log(0)
        //     e.target.checked = true; 
        //     removeClass($parentNode,'completed');
           
        // }
        toggleClass($parentNode,'completed');
        datas =JSON.parse(storage.getItem('data'));
        datas[$index].condition = e.target.checked;
        if (hasClass($parentNode,"completed")) {
            datas[$index].classname = "completed";
        } else {
            datas[$index].classname = "";
        }
        
        storage.setItem('data',JSON.stringify(datas));
        //拿到了剩下那些条的数目
        var $leftCountbox = document.getElementsByClassName('completed');
        var $leftCount = $leftCountbox.length;
        var finalCount = $count - $leftCount;
        
        leftCount.innerText = finalCount;
        //清除那些打勾状态的条
      
         if ($leftCount > 0) {
            clearBtn.style.display = 'block';
            clearBtn.innerText = "Clear completed";
         }
        }
        
     else if (e.target.tagName == "BUTTON") {
        var $parent = e.target.parentNode.parentNode;
        var $index = [].indexOf.call($parent.parentNode.querySelectorAll("li"),$parent);
        $ul.removeChild($parent);
        datas =JSON.parse(storage.getItem('data'));
        var $lengthFirst = datas.length;
        datas.splice($index,1);
        var $lengthLast = datas.length;
        var $length = $lengthFirst - $lengthLast;
        leftCount.innerText = $length;
        storage.setItem('data',JSON.stringify(datas));
        Storage.writeData();
    }
          return false;       
});
clearBtn.addEventListener('click',function () {
    var $leftCountbox = document.getElementsByClassName('completed');
    var $countBox = document.getElementsByClassName("toggle");
    // console.log($leftCountbox)
    var $leftCount = $leftCountbox.length;
    var finalCount = $count - $leftCount;
    var $count = $countBox.length;
    $leftCount.innerText = finalCount;
    for (var x in $leftCountbox) {
        if (x == "length"){
            break;
        }
     $leftCountbox[x].parentNode.removeChild($leftCountbox[x]); 
     console.log($leftCountbox[x].parentNode)
     console.log($leftCountbox[x])
    //  storage.removeItem('$leftCountbox[x]');
    //  Storage.writeData();
    }
  })  