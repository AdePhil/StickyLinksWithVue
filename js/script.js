new Vue({
  el:"#app",
  data:{
    links: JSON.parse(localStorage.getItem('links')) || [],
    text:"",
    starIncrement:20,
    urlError: false
  },
  methods:{

    populateLinks:function(e){
       e.preventDefault();

        if(!this.isURL(this.text)){
          this.urlError = true;
          return;
        }
        const link = {
          text:this.text,
          timesClicked: 0
        }
        this.links.push(link);
        localStorage.setItem('links', JSON.stringify(this.links));

    },
    openInNewTab: function(index){
      var a = document.createElement('a');
      a.target = "_blank";
      a.href = (this.links[index].text.includes("://")) ? this.links[index].text : "http://" + (this.links[index].text).trim();
      //count times clicked
      this.links[index].timesClicked += 1;
      this.colorStar(index);
      localStorage.setItem('links', JSON.stringify(this.links));
      a.click();
    },
    close: function(index){
      this.links.splice(index,1);
      localStorage.setItem('links', JSON.stringify(this.links));
      console.log(this.links);
    },
    deleteAll: function(){
      this.links = [];
      localStorage.removeItem('links');

    },
    colorStar: function(index){
      const starPer = (this.links[index].timesClicked * this.starIncrement >= 100) ? 100 : this.links[index].timesClicked * this.starIncrement;
      console.log(starPer);
      return{
        width: starPer +'% !important'
      }
    },
    isURL: function (str) {
      var urlRegex = '^(?!mailto:)(?:(?:http|https|ftp)://)?(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$';
      var url = new RegExp(urlRegex, 'i');
      return str.startsWith(`file:///C:/`) || str.length < 2083 && url.test(str);
    }

  },
  computed:{

  }
});
