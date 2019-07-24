var $ul = document.getElementsByClassName("todo-list")[0]; 
var $text = document.getElementsByClassName("new-todo")[0];


var Storage = {
    //添加节点，保存数据(保存不了)
saveData: function () {
$text.onkeyup = function (event) {
    if (event.keyCode == 13) {
        // var $li = document.createElement("li");
        // $ul.appendChild($li);
        // var $div = document.createElement()


        // var $li = '';
        // $li += "<li class = 'completed'>"
        // + "<div class='view'>"
        // + "<input type='checkbox' class='toggle'>"
        // + '<label>'
        // + text
        // + '</label>'
        // + "<button class='destroy'>"
        // + "</button>"
        // + "</div>"
        // + "</li>";

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
        // $li.setAttribute('class','completed');
        $div.setAttribute('class','view');
        $input.setAttribute('class','toggle');
        $input.type = 'checkbox';//直接写属性即可
        $button.setAttribute('class','destroy');
        var inputText = $text.value;
        $label.innerText = inputText;
        (function () {
            var $btn = document.getElementsByClassName('destroy');
            var len = $btn.length;//遍历
            for (var i = 0; i < len; i++) {
                $btn[i].addEventListener('click',function () {
                    var $parent = this.parentNode.parentNode;
                    $ul.removeChild($parent);//奇怪，为啥报错
                }) 
            }
                    
            })();
         (function () {
            
            var len2 = $checkbox.length;
            for (var j = 0; j < len2; j++) {
                // var isClick = true;
                // if (isClick) {
                //     $checkbox[j].addEventListener('click',function () {
                //         var $parentNode = this.parentNode.parentNode;
                //         $parentNode.setAttribute('class','completed'); 
                //         isClick = false;    
                //     })
                // } else {
                //     $checkbox[j].addEventListener('click',function () {
                //     var $parentNode = this.parentNode.parentNode;
                //     $parentNode.removeAttribute('class','completed');
                //     }) 
                // }
                $checkbox[j].addEventListener('click',function () {
                        
                        var $parentNode = this.parentNode.parentNode;
                        if ($parentNode.className === 'completed') {
                            $parentNode.removeAttribute('class');
                        } else {
                            $parentNode.setAttribute('class','completed');
                        }
                        // console.log($parentNode.className);
                         
                        // isClick = false;
                    
                        // var $parentNode = this.parentNode.parentNode;
                        
                        // isClick = true;//开关
                        console.log($li.className);
                        
                    
                })
                
            }  

            
         })();
         
        //  var countCon = document.createTextNode(len2);
        //  $count.appendChild(countCon);   

//       for (var k = 0; $li.className != 'completed'; k++) {
//     // var countCon = document.createTextNode(k);
//     var $count = document.querySelector('.todo-count>strong');
//     $count.innerText = k;
//  }  
   }
   
};
    //    var time = new Date().getTime() + Math.random() * 5; //getTime是Date对象中的方法，作用是返回 1970年01月01日至今的毫秒数
    //    localStorage.setItem(time,JSON.stringify(inputText));
    //    console.log(JSON.stringify(inputText));
    
},

};
Storage.saveData();
