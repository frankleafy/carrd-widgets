function updateButtons(btn)
{
    for (var i = 0; i < menuItems.length; i++) 
    { 

        if(i == btn)
        {

            //2Do: Replace with css classes 'selected' and 'notselected'
            document.getElementById("button"+i).style.borderBottom = "1px solid grey";
            document.getElementById(menuItems[i].container).style.display = 'block';
            if(menuItems[i].loaded == 0 && menuItems[i].content !="")
            {
                //alert(i);
                
                loadItems(i,app.menuItems[i].content);
              
            }
            menuItems[i].loaded = 1;
        }
        else
        {
            document.getElementById(menuItems[i].container).style.display = 'none';
            document.getElementById("button"+i).style.borderBottom = "1px solid white";

        }
    }
}

function addMenuItem(item)
{
    var ul = document.getElementById("menuItems");
    var li = document.createElement("li");
    var children = ul.children.length;
    li.setAttribute("id", "button"+children);
    if(item == 0)
    {
        li.setAttribute("style", "border-bottom:1px solid grey");
    }
    var link = document.createElement("a");

    var linkText = document.createTextNode(menuItems[item].title);
    link.appendChild(linkText);
    link.title = menuItems[item].title;
    link.addEventListener("click", function(){ updateButtons(item); });

   
    li.appendChild(link);
    ul.appendChild(li);
}

function loadButtonsAndHomeContent()
{

    for (var i = 0; i < menuItems.length; i++) 
    {
        addMenuItem(i);
    } 
}