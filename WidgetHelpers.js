
function loadJsonIntoTemplate(templateContainer, JsonUrl)
{
    var app = new Vue({
        el: '#'+templateContainer,
        data: {
            items: []
        },
        mounted: function(){
           this.loadItems(); 
        },
        updated: function(){
            this.loadItems(); 
         },
        methods: {
            loadItems: function(){
                
                // Init variables
                var self = this;
                this.items = []
                axios.get(
                    JsonUrl, //google script, NOT Airtable
                    { 
                    }
                ).then(function(response){
                    self.items = response.data.records
                }).catch(function(error){
                    console.log(error)
                })
            }
        }
    })
}
