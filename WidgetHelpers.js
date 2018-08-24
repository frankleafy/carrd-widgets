
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
        methods: {
            loadItems: function(){
                
                // Init variables
                var self = this;
                this.items = []
                axios.get(
                    JsonUrl,//"https://script.google.com/macros/s/AKfycbx4cVgWqXOtoRqvX70nqhlP0N6dslt2uUoPTymyZwsB-cE81-H8/exec?view=Green%20Challenges",
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
