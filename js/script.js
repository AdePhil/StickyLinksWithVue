new Vue({
  el:"#app",
  data:{
    links: JSON.parse(localStorage.getItem('links')) || [],
    text:"",
    starIncrement:20
  },
  methods:{
    populateLinks:function(e){
       e.preventDefault();

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
    }

  },
  computed:{

  }
});
