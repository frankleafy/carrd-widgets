 //init
 var app;


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
                    {title:"Apply", section:"apply", container:"apply", data:[], content:"https://airtable.com/embed/shrYAM0WCTEcpJFix", loaded:0},
                    {title:"Events", section:"events", container:"events", data:[], content:"bla5.json", loaded:0},
                    {title:"About", section:"about", container:"about", data:[], content:"bla6.json", loaded:0},
                    {title:"Contact Us", section:"contact", container:"contact", data:[], content:"bla7.json", loaded:0},
                    ]
            },
            mounted: function(){
               // this.loadItems(); 
               loadButtonsAndHomeContent();
      
               
            },
            methods: {               
                loadItems : function(target,JsonUrl){
                    loadItems(target,JsonUrl)
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
        //alert(response.data.records.length);
        self.menuItems[target].data=response.data.records;
        //self.menuItems[target].title = "terug";
        //self.items[0]=response.data.records;

        
    }).catch
    (
        function(error)
        {
        console.log(error)
        }
    )
}
