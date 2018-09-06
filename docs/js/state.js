//init
var detailViewNumber = 5;
var singleChallengeUrl = "https://script.google.com/macros/s/AKfycbx4cVgWqXOtoRqvX70nqhlP0N6dslt2uUoPTymyZwsB-cE81-H8/exec?view=Current%20Challenges&filter=";
var app;
var md = new Remarkable();

//const Foo = { template: "a" };
//const Bar = { template: "b" };
//{ path: '/green', component: Foo },
//{ path: '/social', component: Bar } 
const routes = [

]
const router = new VueRouter({
    routes,
    scrollBehavior(to, from, savedPosition) {
        return { x: 0, y: 0 }
    }
})


//Capture back/forward button clicks
/*
window.onhashchange = function() 
{ 
   if(app.currentPage != "" && "#"+ app.currentPage != document.location.hash)
   {
      var page = document.location.hash.substring(1);
       for (var i = 0; i < app.menuItems.length; i++) 
       { 
           if(app.menuItems[i].title == page)
           {
               setContentContainer(i);
               break;
           }
       }
   }
}
*/

window.onload = function () {
    /*    const Foo = { template: "<div>fs</div>" };
       const Bar = { template: '<div>bar</div>' };
       
           const routes = [
               { path: '/foo', component: Foo },
               { path: '/bar', component: Bar }
             ]    
           const router = new VueRouter({
               routes
             }) */

    // Get the modal

    app = new Vue(
        {
            router,
            el: '#app',
            data: {
                input: '# hello',
                currentPage: '',
                menuItems: [
                    { title: "Home", pageTitle: "__MBO__*Challenges*, purposeful learning", hidden: false, section: "home", container: "home", data: [], content: "", loaded: false, selected: true },
                    { title: "Green", pageTitle: "Sustainability challenges", hidden: false, section: "green", container: "green", data: [], content: "https://script.google.com/macros/s/AKfycbx4cVgWqXOtoRqvX70nqhlP0N6dslt2uUoPTymyZwsB-cE81-H8/exec?view=Green%20Challenges", loaded: false, selected: false },
                    { title: "Social", pageTitle: "Social challenges", hidden: false, section: "social", container: "social", data: [], content: "https://script.google.com/macros/s/AKfycbx4cVgWqXOtoRqvX70nqhlP0N6dslt2uUoPTymyZwsB-cE81-H8/exec?view=Social%20Challenges", loaded: false, selected: false },
                    { title: "Commercial", pageTitle: "Commercial challenges", hidden: false, section: "commercial", container: "commercial", data: [], content: "https://script.google.com/macros/s/AKfycbx4cVgWqXOtoRqvX70nqhlP0N6dslt2uUoPTymyZwsB-cE81-H8/exec?view=Commercial%20Challenges", loaded: false, selected: false },
                    { title: "Favorites", pageTitle: "Your favorites", hidden: false, section: "favorites", container: "favorites", data: [], content: "", loaded: false, selected: false },
                    { title: "Details", pageTitle: "Details of this challenge", hidden: true, section: "detail", container: "detail", data: [], content: "", loaded: false, selected: false },
                    { title: "Apply", pageTitle: "Apply for a challenge", hidden: false, section: "apply", container: "apply", data: [], content: "", loaded: false, selected: false },
                    { title: "Events", pageTitle: "Oncoming events", hidden: false, section: "events", container: "events", data: [], content: "", loaded: false, selected: false },
                    { title: "About", pageTitle: "About MBO Challenges", hidden: false, section: "about", container: "about", data: [], content: "", loaded: false, selected: false },
                    { title: "Contact", pageTitle: "Contact us", hidden: false, section: "contact", container: "contact", data: [], content: "", loaded: false, selected: false },
                ],
                selectedItems: [],
                itemDetails: []
            },
            mounted: function () {
                if (localStorage.bookmarks) this.menuItems[4].data = JSON.parse(localStorage.bookmarks);
                var page = document.location.hash.substring(2);

                for (var i = 0; i < this.menuItems.length; i++) {
                    if (this.menuItems[i].title == page) {
                        app = this;
                        loadItems(i);
                        break;
                    }
                }
                lightboxen();

            },
            methods:
            {
                loadItems: function (target) {
                    loadItems(target)
                },
                selectItem: function (challenge) {
                    //this.selectedItems.push(challenge);
                    this.menuItems[4].data.push(challenge);
                    localStorage.bookmarks = JSON.stringify(this.menuItems[4].data);
                }
                ,
                deleteItem: function (challenge) {
                    this.$delete(this.menuItems[4].data, challenge)
                    localStorage.bookmarks = JSON.stringify(this.menuItems[4].data);

                },
                getItemDetails: function (challenge) {

                    if (this.menuItems[5].data.length > 0) this.menuItems[5].data.pop();
                    this.menuItems[5].data.push(challenge);
                    // alert(this.menuItems[5].data.length); 

                },
                compiledMarkdown: function (source) {
                    return marked(source, { sanitize: true })
                },
                formatDate: function (source) {
                    // 2018-09-14
                    var year = source.substring(0, 4);
                    var month = source.substring(5, 7);
                    var day = source.substring(8)
                    return day + "-" + month + "-" + year;
                },
                castToString: function castToString(source) {
                    return "" + source;

                }

            },
            computed:
            {

            }
        });



    router.afterEach((to, from, next) => {

        for (var i = 0; i < app.menuItems.length; i++) {
            if (to.path.substring(1) == app.menuItems[i].title) {
                //   alert('load '+i);
                loadItems(i);
                document.getElementById('body').scrollIntoView();
                break;
            }
        }


    })

};

function setContentContainer(target) {
    //document.getElementById("titleHeader").innerText = app.menuItems[target].pageTitle;
    for (var i = 0; i < app.menuItems.length; i++) {
        var placeholder = document.getElementById(app.menuItems[i].container);

        if (i == target) {
            app.currentPage = app.menuItems[i].title;
            app.menuItems[i].selected = true;
            //alert('update:'+app.menuItems[i].title);
            if (placeholder) placeholder.style.cssText = 'block';
        }
        else {
            if (placeholder) placeholder.style.display = 'none';
            app.menuItems[i].selected = false;
        }
    }

}


function loadItems(target) {
    // Init variables
    var self = app;

    setContentContainer(target)

    if (self.menuItems[target].content != "" && !self.menuItems[target].loaded) {
        document.getElementById("status").style.display = 'block';
        axios.get
            (
            self.menuItems[target].content, //google script, NOT Airtable
            {
            }
            ).then(function (response) {
                document.getElementById("status").style.display = 'none';
                self.menuItems[target].data = response.data.records;
                self.menuItems[target].loaded = true;

            }).catch
            (
            function (error) {
                console.log(error)
                document.getElementById("status").style.display = 'none';
            }
            )
    }
}



function lightboxen()
{
    document.querySelectorAll('.thumbnail').forEach(function(elem) {

        elem.onclick = function(e) {

            const src = elem.getAttribute('data-src')
            const html = '<img src="' + src + '">'

            basicLightbox.create(html).show()

        }

    })

}
