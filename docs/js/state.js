 //init
 var singleChallengeUrl = "https://script.google.com/macros/s/AKfycbx4cVgWqXOtoRqvX70nqhlP0N6dslt2uUoPTymyZwsB-cE81-H8/exec?view=Current%20Challenges&filter=";
 var app;

 window.onhashchange = function() { 
    //code  
    this.alert(window.location.pathname);
}

 window.onload = function () {
        app = new Vue(
        {
            el: '#app',
            data: {
                name: 'Frank',
                menuItems :[
                    {title:"Home", pageTitle:"Home", hidden:false, section:"home", container:"home", data:[], content:"", loaded:false},
                    {title:"Green", pageTitle:"Sustainability challenges", hidden:false, section:"green", container:"green", data:[], content:"https://script.google.com/macros/s/AKfycbx4cVgWqXOtoRqvX70nqhlP0N6dslt2uUoPTymyZwsB-cE81-H8/exec?view=Green%20Challenges", loaded:false},
                    {title:"Social", pageTitle:"Social challenges", hidden:false, section:"social", container:"social", data:[], content:"https://script.google.com/macros/s/AKfycbx4cVgWqXOtoRqvX70nqhlP0N6dslt2uUoPTymyZwsB-cE81-H8/exec?view=Social%20Challenges", loaded:false},
                    {title:"Commercial", pageTitle:"Commercial challenges", hidden:false, section:"commercial", container:"commercial", data:[], content:"https://script.google.com/macros/s/AKfycbx4cVgWqXOtoRqvX70nqhlP0N6dslt2uUoPTymyZwsB-cE81-H8/exec?view=Commercial%20Challenges", loaded:false},
                    {title:"Favorites", pageTitle:"Your favorites", hidden:false, section:"favorites", container:"favorites", data:[], content:"", loaded:false},
                    {title:"Details", pageTitle:"Details of this challenge", hidden:true, section:"detail", container:"detail", data:[], content:"", loaded:false},
                    {title:"Apply", pageTitle:"Apply for a challenge", hidden:false, section:"apply", container:"apply", data:[], content:"", loaded:false},
                    {title:"Events", pageTitle:"Oncoming events", hidden:false, section:"events", container:"events", data:[], content:"", loaded:false},
                    {title:"About", pageTitle:"About MBO Challenges", hidden:false, section:"about", container:"about", data:[], content:"", loaded:false},
                    {title:"Contact", pageTitle:"Contact us", hidden:false, section:"contact", container:"contact", data:[], content:"", loaded:false},
                    ],
                selectedItems: [],
                itemDetails:[]
            },
            mounted: function(){
                   // alert(localStorage.getItem('selected')[2]);
                   if(localStorage.bookmarks) this.selectedItems = JSON.parse(localStorage.bookmarks);
                
            },
            methods: {               
                loadItems : function(target)
                {
                    loadItems(target)
                },
                selectItem : function(challenge)
                {
                    this.selectedItems.push(challenge);
                    localStorage.bookmarks = JSON.stringify(this.selectedItems);
                }
                ,
                deleteItem : function(challenge)
                {
                    this.$delete(this.selectedItems, challenge);     
                    localStorage.bookmarks = JSON.stringify(this.selectedItems);               
                    
                },
                getItemDetails: function(challenge)
                {
                    if(this.itemDetails.length > 0)this.itemDetails.pop();
                    this.itemDetails.push(challenge);      
                    setContentContainer(5);  
                }
                
            }
        });


       
        
    };

function setContentContainer(target)
{
    document.getElementById("titleHeader").innerText = app.menuItems[target].pageTitle;
    for (var i = 0; i < app.menuItems.length; i++) 
    { 
        var placeholder = document.getElementById(app.menuItems[i].container);
        
        if(i == target)
        {
            if(placeholder)placeholder.style.cssText = 'block';
            var stateObj = { foo: "bar" };
            window.history.pushState(stateObj, "page "+i, "#"+app.menuItems[i].title);
        }
        else
        {
            if(placeholder)placeholder.style.display = 'none';
        }
    }
}

  
function loadItems(target)
{
    // Init variables
    var self = app;

    setContentContainer(target)

    if(self.menuItems[target].content !="" && !self.menuItems[target].loaded)
    {
        document.getElementById("status").style.display = 'block';
        axios.get
        (
            self.menuItems[target].content, //google script, NOT Airtable
            { 
            }
        ).then(function(response)
        {
            document.getElementById("status").style.display = 'none';
            self.menuItems[target].data=response.data.records;
            self.menuItems[target].loaded = true;
            
        }).catch
        (
            function(error)
            {
            console.log(error)
            document.getElementById("status").style.display = 'none';
            }
        )
    }
}
