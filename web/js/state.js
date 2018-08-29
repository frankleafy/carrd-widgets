 //init
 var app;
 window.onload = function () {
        app = new Vue(
        {
            el: '#app',
            data: {
                name: 'Frank',
                items: []
            },
            mounted: function(){
               // this.loadItems(); 
               loadButtonsAndHomeContent();
            },
            methods: {               
                loadItems : function(JsonUrl){
                    loadItems(JsonUrl)
                }
                
            }
        })
    };

    

  
function loadItems(JsonUrl)
{
    // Init variables
    var self = app;
    this.items = []
    axios.get
    (
        JsonUrl, //google script, NOT Airtable
        { 
        }
    ).then(function(response)
    {
        self.items = response.data.records
    }).catch
    (
        function(error)
        {
        console.log(error)
        }
    )
}
