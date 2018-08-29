 //init
 var singleChallengeUrl = "https://script.google.com/macros/s/AKfycbx4cVgWqXOtoRqvX70nqhlP0N6dslt2uUoPTymyZwsB-cE81-H8/exec?view=Current%20Challenges&filter=";
 var app;
 var menuItems;

 window.onload = function () {

        app = new Vue(
        {
            el: '#app',
            data: {
                name: 'Frank',
                menuItems :[
                    {title:"Home", section:"home", container:"home", data:[], content:"bla1.json"},
                    {title:"Green", section:"green", container:"green", data:[], content:"https://script.google.com/macros/s/AKfycbx4cVgWqXOtoRqvX70nqhlP0N6dslt2uUoPTymyZwsB-cE81-H8/exec?view=Green%20Challenges", loaded:0},
                    {title:"Social", section:"social", container:"social", data:[], content:"https://script.google.com/macros/s/AKfycbx4cVgWqXOtoRqvX70nqhlP0N6dslt2uUoPTymyZwsB-cE81-H8/exec?view=Social%20Challenges", loaded:0},
                    {title:"Commercial", section:"commercial", container:"commercial", data:[], content:"https://script.google.com/macros/s/AKfycbx4cVgWqXOtoRqvX70nqhlP0N6dslt2uUoPTymyZwsB-cE81-H8/exec?view=Commercial%20Challenges", loaded:0},
                    {title:"Apply", section:"apply", container:"apply", data:[], content:"", loaded:0},
                    {title:"Events", section:"events", container:"events", data:[], content:"bla5.json", loaded:0},
                    {title:"About", section:"about", container:"about", data:[], content:"bla6.json", loaded:0},
                    {title:"Contact Us", section:"contact", container:"contact", data:[], content:"bla7.json", loaded:0},
                    ],
                selectedItem: []
            },
            mounted: function(){
                menuItems =this.menuItems;
               loadButtonsAndHomeContent(); //to be rebuild to Vue.js

            },
            methods: {               
                loadItems : function(target,JsonUrl)
                {
                    loadItems(target,JsonUrl)
                },
                selectItem : function(challenge)
                {
                    this.selectedItem.push(challenge);
                    updateButtons(4);
                   // alert(this.selectedItem[0].fields.Titel);
                }
                ,
                deleteItem : function(challenge)
                {
                    this.$delete(this.selectedItem, challenge)                    
                    updateButtons(4);
                    
                }
                
            }
        });

       
        
    };

    

  
function loadItems(target, JsonUrl)
{
    // Init variables
    var self = app;
    
    axios.get
    (
        JsonUrl, //google script, NOT Airtable
        { 
        }
    ).then(function(response)
    {
        self.menuItems[target].data=response.data.records;
        
    }).catch
    (
        function(error)
        {
        console.log(error)
        }
    )
}
