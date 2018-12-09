//init
var detailViewNumber = 5;
var baseUrl = "https://script.google.com/macros/s/AKfycbx4cVgWqXOtoRqvX70nqhlP0N6dslt2uUoPTymyZwsB-cE81-H8/exec"
var singleChallengeUrl = baseUrl + "?view=Current%20Challenges&filter=";
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


var applyFor = { "fields": { "Voornaam": "", "Tussenvoegsel": "", "Achternaam": "", "Opleiding": "", "Motivatie": "", "e-mail adres": "", "Telefoon": "", "Challenge Titel": "", "Code": "" } };

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
                status: { type: "", message: "" },
                errors: [],
                input: '# hello',
                currentPage: '',
                menuItems: [
                    { title: "Home", pageTitle: "__MBO__*Challenges*, purposeful learning", hidden: false, section: "home", container: "home", data: [], content: "", loaded: false, selected: true },
                    { title: "Duurzaamheid", pageTitle: "Duurzame challenges", hidden: false, section: "green", container: "green", data: [], content: baseUrl + "?view=Green%20Challenges", loaded: false, selected: false },
                    { title: "Sociaal", pageTitle: "Sociale challenges", hidden: false, section: "social", container: "social", data: [], content: baseUrl + "?view=Social%20Challenges", loaded: false, selected: false },
                    { title: "Commercieel", pageTitle: "Commerciële challenges", hidden: false, section: "commercial", container: "commercial", data: [], content: baseUrl + "?view=Commercial%20Challenges", loaded: false, selected: false },
                    { title: "Favorieten", pageTitle: "Jouw favorieten", hidden: false, section: "favorites", container: "favorites", data: [], content: "", loaded: false, selected: false },
                    { title: "Details", pageTitle: "Challenge details", hidden: true, section: "detail", container: "detail", data: [], content: singleChallengeUrl, loaded: false, selected: false },
                    { title: "Apply", pageTitle: "Meld je aan voor deze challenge", hidden: true, section: "apply", container: "apply", data: [], content: "", loaded: false, selected: false },
                    { title: "Events", pageTitle: "Aankomende evenementen", hidden: false, section: "events", container: "events", data: [], content: baseUrl + "?table=Events&view=Eventz", loaded: false, selected: false },
                    { title: "Bronnen", pageTitle: "Bronnen van de challenges", hidden: false, section: "bronnen", container: "bronnen", data: [], content: baseUrl + "?table=Bronnen&view=Bronnen", loaded: false, selected: false },
                    { title: "Partners", pageTitle: "Partner bedrijven", hidden: false, section: "partners", container: "partners", data: [], content: baseUrl + "?table=Company&view=Partners", loaded: false, selected: false },
                    { title: "Over", pageTitle: "Over MBO Challenges", hidden: false, section: "about", container: "about", data: [], content: "", loaded: false, selected: false },
                    { title: "Contact", pageTitle: "Contactgegevens", hidden: false, section: "contact", container: "contact", data: [], content: "", loaded: false, selected: false },
                ],
                itemDetails: -1,
                applyFor
            },
            mounted: function () {

                if (localStorage.bookmarks) this.menuItems[4].data = JSON.parse(localStorage.bookmarks);

                //read querystring
                var page = document.location.hash.substring(2) || "Home";
                app = this;
                preLoad(page);
                lightboxen();
            },
            methods:
            {
                loadItems: function (target) {
                    loadItems(target)
                },
                selectItem: function (challenge) {
                   
                    this.menuItems[4].data.push(challenge);
                    localStorage.bookmarks = JSON.stringify(this.menuItems[4].data);
                }
                ,
                deleteItem: function (challenge) {
                    this.$delete(this.menuItems[4].data, challenge)
                    localStorage.bookmarks = JSON.stringify(this.menuItems[4].data);

                },
                getItemDetails: function (challenge) {

                    
                    if (this.menuItems[5].data.length > 0) 
                    {
                      
                        if(challenge.fields.Code != this.menuItems[5].data[0].fields.Code)
                        {
                            this.menuItems[5].data.pop();                      
                            this.menuItems[5].data.push(challenge);
                        }
                    }

                    this.menuItems[5].content = singleChallengeUrl + challenge.fields.Code;

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

                },
                toApplicationForm: function toApplicationForm(code, titel) {
                    this.applyFor.fields.Code = code;
                    this.applyFor.fields['Challenge Titel'] = titel;
                    router.push({ path: 'Apply' });
                },
                applyNow: function applyNow()
                {
                    this.errors = [];
                    if(applyFor.fields['Voornaam'] == "") this.errors.push('Voornaam is een verplicht veld');
                    if(applyFor.fields['Achternaam'] == "") this.errors.push('Achternaam is een verplicht veld');
                    if(applyFor.fields['e-mail adres'] == "") this.errors.push('E-mailadres is een verplicht veld');
                    if(applyFor.fields['Opleiding'] == "") this.errors.push('Opleiding en jaar is een verplicht veld');
                    if(applyFor.fields['Motivatie'] == "") this.errors.push('Motivatie is een verplicht veld');
                             
                    if(this.errors.length == 0)
                    {
                    saveApplication();
                    }
                    else
                    {
                        document.getElementById('body').scrollIntoView();
                    }
                }



            },
            computed:
            {

            }
        });



    router.afterEach((to, from, next) => {
       // alert('rt = '+to);

        var rt = to.path.substring(1);
        preLoad(rt);
        

    })

};

function saveApplication() {

    var self = app;
    app.status.type = "loading";
    app.status.message = "Saving..";

    axios.post
        (
        baseUrl, self.applyFor, //google script, NOT Airtable
        {
            headers: {
                'Content-type': 'application/x-www-form-urlencoded',
            }}
        ).then(function (response) {
            // document.getElementById("status").style.display = 'none';
            app.status.type = "ready";
            app.status.message = "Bedankt voor je aanvraag, je ontvangt een e-mail met daarin de verdere benodigde stappen";
            applyFor.fields['Challenge Titel'] = "";
 
        }).catch
        (
        function (error) {
            console.log(error)
            //app.status.type = "error";
           // app.status.message = "Er is wat mis gegaan tijdens het verzenden, neem contact op met.."

           //stiekem gaat het toch goed
           app.status.type = "ready";
           app.status.message = "Bedankt voor je aanvraag, je ontvangt een e-mail met daarin de verdere benodigde stappen";
           applyFor.fields['Challenge Titel'] = "";
           applyFor.fields['Motivatie']="";
        }
        )
 
}


function preLoad(rt)
{
  
    var details;
    app.status.type = "";
    app.status.message ="";
    if (rt.indexOf('_') > 0) 
    {
        details = rt.substring(rt.indexOf('_')+1);
        rt = rt.substring(0,rt.indexOf('_'));
        app.menuItems[5].content = singleChallengeUrl + details;
        app.itemDetails = details;
    }
    
    for (var i = 0; i < app.menuItems.length; i++) 
    {
        if (rt == app.menuItems[i].title) 
        {
            loadItems(i);
            document.getElementById('body').scrollIntoView();
            break;
        }
    }
}

function setContentContainer(target) {

    for (var i = 0; i < app.menuItems.length; i++) {
        var placeholder = document.getElementById(app.menuItems[i].container);

        if (i == target) {
            app.currentPage = app.menuItems[i].title;
            app.menuItems[i].selected = true;

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

    if (self.menuItems[target].content != "" && !self.menuItems[target].loaded ) {
        // document.getElementById("status").style.display = 'block';
        self.status.type = "loading";
        self.status.message = "Loading..."
        axios.get
            (
            self.menuItems[target].content, //google script, NOT Airtable
            {
            }
            ).then(function (response) {
                //document.getElementById("status").style.display = 'none';
                app.status.type = "";
                app.status.message = ""

                self.menuItems[target].data = response.data.records;
                self.menuItems[target].loaded = true;

            }).catch
            (
            function (error) {
                console.log(error)
                //document.getElementById("status").style.display = 'none';
                app.status.type = "error";
                app.status.message = "Er is wat fout gegaan tijdens het laden..."
            }
            )
    }
}



function lightboxen() {
    document.querySelectorAll('.thumbnail').forEach(function (elem) {

        elem.onclick = function (e) {

            const src = elem.getAttribute('data-src')
            const html = '<img src="' + src + '">'

            basicLightbox.create(html).show()

        }

    })

}
