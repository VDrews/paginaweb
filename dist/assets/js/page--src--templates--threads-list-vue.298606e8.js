(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{"3rUL":function(t,e,a){"use strict";a("VGx4")},GayM:function(t,e,a){"use strict";a("Oasf")},Oasf:function(t,e,a){},VGx4:function(t,e,a){},XIlZ:function(t,e,a){"use strict";a.r(e);var i=a("HaE+"),r=a("KQm4"),n=(a("rB9j"),a("UxlC"),a("ls82"),a("qePV"),a("6cQw"),a("ma9I"),a("R5XZ"),a("jo5s")),s=a.n(n),c={static:{interactMaxRotation:15,interactOutOfSightXCoordinate:500,interactOutOfSightYCoordinate:600,interactYThreshold:150,interactXThreshold:100},props:{card:{type:Object,required:!0},thread:{type:Object},index:{type:Number},swipes:{type:Number},isCurrent:{type:Boolean,required:!0}},data:function(){return{isShowing:!0,image:null,isInteractAnimating:!0,isInteractDragged:null,interactPosition:{x:0,y:0,rotation:0},count:JSON.parse(JSON.stringify(this.thread.content.length))}},computed:{transformString:function(){if(!this.isInteractAnimating||this.isInteractDragged){var t=this.interactPosition,e=t.x,a=t.y,i=t.rotation;return"translate3D(".concat(e,"px, ").concat(a,"px, 0) rotate(").concat(i,"deg)")}return null}},mounted:function(){var t=this,e=this.$refs.interactElement;s()(e).draggable({onstart:function(){t.isInteractAnimating=!1},onmove:function(e){var a=t.$options.static,i=a.interactMaxRotation,r=a.interactXThreshold,n=t.interactPosition.x+e.dx,s=t.interactPosition.y+e.dy,c=i*(n/r);c>i?c=i:c<-i&&(c=-i),t.interactSetPosition({x:n,y:s,rotation:c})},onend:function(){var e=t.interactPosition,a=e.x,i=e.y,r=t.$options.static,n=r.interactXThreshold,s=r.interactYThreshold;t.isInteractAnimating=!0,a>n?t.playCard("cardAccepted"):a<-n?t.playCard("cardRejected"):i>s?t.playCard("cardSkipped"):t.resetCardPosition()}})},beforeDestroy:function(){s()(this.$refs.interactElement).unset()},methods:{linkify:function(t){return t.replace(/(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim,'<a href="$1" target="_blank">$1</a>').replace(/(^|[^\/])(www\.[\S]+(\b|$))/gim,'$1<a href="http://$2" target="_blank">$2</a>').replace(/(([a-zA-Z0-9_\-\.]+)@[a-zA-Z_]+?(?:\.[a-zA-Z]{2,6}))+/gim,'<a href="mailto:$1">$1</a>').replace(/\n/g,"<br />")},hideCard:function(){var t=this;setTimeout((function(){t.isShowing=!1,t.$emit("hideCard",t.card)}),300)},playCard:function(t){var e=this.$options.static,a=e.interactOutOfSightXCoordinate,i=e.interactOutOfSightYCoordinate,r=e.interactMaxRotation;switch(this.interactUnsetElement(),t){case"cardAccepted":this.interactSetPosition({x:a,rotation:r}),this.$emit("cardAccepted");break;case"cardRejected":this.interactSetPosition({x:-a,rotation:-r}),this.$emit("cardRejected");break;case"cardSkipped":this.interactSetPosition({y:i}),this.$emit("cardSkipped")}this.hideCard()},interactSetPosition:function(t){var e=t.x,a=void 0===e?0:e,i=t.y,r=void 0===i?0:i,n=t.rotation,s=void 0===n?0:n;this.interactPosition={x:a,y:r,rotation:s}},interactUnsetElement:function(){s()(this.$refs.interactElement).unset(),this.isInteractDragged=!0},resetCardPosition:function(){this.interactSetPosition({x:0,y:0,rotation:0})}}},o=(a("3rUL"),a("KHd+")),d={components:{GameCard:Object(o.a)(c,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return t.isShowing?a("div",{ref:"interactElement",staticClass:"card",class:{isAnimating:t.isInteractAnimating,isCurrent:t.isCurrent},style:{transform:t.transformString}},[a("v-sheet",{staticStyle:{height:"100%",width:"100% border-radius: 24px"},attrs:{color:"primary"}},[a("div",[0==t.swipes&0==t.index?a("div",{staticClass:"ma-6"},[a("h1",[t._v(t._s(t.thread.title))]),a("i",[t._v("por "+t._s(t.thread.author)+" ")])]):a("div",[a("v-subheader",[t._v(t._s(t.thread.title))]),a("v-divider")],1),t.card.urls.length>0?a("img",{staticClass:"mb-n2",staticStyle:{"max-height":"200px",width:"100%","object-fit":"cover"},attrs:{src:t.card.urls[0]},on:{click:function(e){t.image=t.card.urls[0]}}}):t._e(),a("div",{directives:[{name:"g-image",rawName:"v-g-image"}],staticClass:"font-weight-bold mx-6 mt-6",staticStyle:{"font-size":"2vh"},domProps:{innerHTML:t._s(t.linkify(t.card.text))}})]),a("v-layout",{staticClass:"pb-6",staticStyle:{position:"absolute",bottom:"0",left:"0",right:"0",width:"100%"},attrs:{"justify-space-between":"","align-center":""}},[a("v-btn",{attrs:{icon:"",disabled:0==t.swipes},on:{click:function(e){return t.$emit("back")}}},[a("v-icon",{attrs:{color:"black"}},[t._v("mdi-chevron-left")])],1),a("v-progress-linear",{staticClass:"mx-3",attrs:{color:"black",height:10,value:100*t.swipes/(t.count-1)}}),a("v-btn",{attrs:{icon:""},on:{click:function(e){return t.playCard("cardAccepted")}}},[a("v-icon",{attrs:{color:"black"}},[t._v("mdi-chevron-right")])],1)],1)],1),a("v-dialog",{staticClass:"pa-12",attrs:{value:t.image}},[a("img",{staticStyle:{"max-height":"100%","max-width":"100%","object-fit":"cover"},attrs:{src:t.image},on:{click:function(e){t.image=t.card.urls[0]}}}),a("v-btn",{staticStyle:{position:"absolute",top:"48px",right:"32px"},attrs:{fab:"",dark:"",color:"secundary"},on:{click:function(e){t.image=null}}},[a("v-icon",[t._v("mdi-close")])],1)],1)],1):t._e()}),[],!1,null,"40c10474",null).exports},data:function(){return{swipes:0,backhistory:[]}},props:{cards:{type:Array,required:!0},thread:{type:Object,required:!0}},methods:{cardSkipped:function(){this.backhistory.push(this.cards.shift()),this.swipes+=1,this.$emit("cardSkipped")},goBack:function(){this.swipes-=1,this.cards.unshift(this.backhistory.pop())}}},l=(a("nU5o"),{metaInfo:function(){return{title:this.$page.threadsList.title,meta:[{name:"author",content:this.$page.threadsList.author},{name:"description",content:this.$page.threadsList.content[0].text}]}},components:{GamecardStack:Object(o.a)(d,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"cards"},t._l(t.cards,(function(e,i){return a("GameCard",{key:e.text,attrs:{card:e,thread:t.thread,index:i,swipes:t.swipes,"is-current":0===i},on:{back:t.goBack,cardAccepted:t.cardSkipped,cardRejected:t.cardSkipped,cardSkipped:t.cardSkipped,hideCard:t.cardSkipped}})})),1)}),[],!1,null,"5f3c5c46",null).exports},mounted:function(){this.cards=Object(r.a)(this.$page.threadsList.content)},data:function(){return{cards:[],rerender:0}},methods:{share:function(){var t=this;return Object(i.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,navigator.share({title:t.$page.threadsList.title,text:"",url:window.location.href});case 3:e.next=8;break;case 5:e.prev=5,e.t0=e.catch(0),console.error(e.t0);case 8:case"end":return e.stop()}}),e,null,[[0,5]])})))()},handleCardAccepted:function(){console.log("handleCardAccepted")},handleCardRejected:function(){console.log("handleCardRejected")},handleCardSkipped:function(){console.log("handleCardSkipped")},removeCardFromDeck:function(){},openTwitter:function(){window.open("https://twitter.com/Versymattic")},openLinkedin:function(){window.open("https://www.linkedin.com/in/andriugarcia/")},linkify:function(t){return t.replace(/(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim,"").replace(/(^|[^\/])(www\.[\S]+(\b|$))/gim,"").replace(/(([a-zA-Z0-9_\-\.]+)@[a-zA-Z_]+?(?:\.[a-zA-Z]{2,6}))+/gim,"").replace(/\n/g,"<br />")},resetCards:function(){this.cards=Object(r.a)(this.$page.threadsList.content),this.rerender++}}}),p=(a("GayM"),null),u=Object(o.a)(l,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("Layout",[t.$vuetify.breakpoint.mdAndUp?a("div",[a("v-layout",{staticClass:"px-12 mx-12",staticStyle:{"max-width":"100%","margin-top":"120px"},attrs:{"justify-space-between":""}},[a("v-flex",{attrs:{md7:""}},[a("v-card",{staticClass:"pa-6 mb-12",attrs:{outlined:"",rounded:""}},t._l(t.$page.threadsList.content,(function(e,i){return a("div",{key:i,staticClass:"mb-6"},[e.urls.length>0?a("img",{staticClass:"mb-4 mx-n6",staticStyle:{"max-height":"400px",width:"100%","object-fit":"contain"},attrs:{src:e.urls[0]}}):t._e(),0==i?a("div",{staticClass:"mb-4"},[a("h1",[t._v(t._s(t.$page.threadsList.title))]),a("i",[t._v("por "+t._s(t.$page.threadsList.author)+" ")]),a("v-layout",{attrs:{"justify-end":""}},[a("v-layout",{attrs:{"justify-end":"","align-center":""}},[a("v-icon",[t._v("mdi-heart-outline")]),a("span",{staticClass:"ml-2"},[t._v("\n                    "+t._s(t.$page.threadsList.content[0].public_metrics.like_count)+"\n                  ")])],1),a("v-btn",{attrs:{rounded:"",depressed:"",large:"",color:"red lighten-5"},on:{click:t.share}},[a("span",{staticClass:"mr-2 secundary--text text-capitalize"},[t._v("Compartir")]),a("v-icon",{attrs:{color:"secundary",size:"32"}},[t._v("mdi-share-variant")])],1)],1)],1):t._e(),a("p",{directives:[{name:"g-image",rawName:"v-g-image"}],staticStyle:{"font-size":"1.3em"},domProps:{innerHTML:t._s(t.linkify(e.text))}})])})),0)],1),a("v-flex",{attrs:{md4:""}},[a("v-card",{staticClass:"pa-6",attrs:{flat:"",color:"red lighten-5"}},[a("v-layout",{staticClass:"px-0",attrs:{"align-center":""}},[a("v-avatar",{staticStyle:{border:"3px solid #f0134d"},attrs:{size:"64"},on:{click:function(e){return t.$router.push({path:"/"})}}},[a("v-img",{attrs:{src:"https://pbs.twimg.com/profile_images/1442752801965232131/x2ovRWHQ_400x400.jpg"}})],1),a("span",{staticClass:"ml-4 font-weight-bold"},[t._v("Andriu Garcia")])],1),a("p",{staticClass:"font-weight-light mt-4"},[t._v("\n            Mi misión es crear para dar valor para las personas, hacer\n            realidad ideas que resuelvan diferentes necesidades y utilizar mis\n            conocimientos de desarrollo para maximizar el valor que les puedo\n            aportar.\n          ")])],1),a("v-subheader",{staticClass:"mt-6"},[t._v("Otras publicaciones")]),a("v-divider",{staticClass:"mx-4"}),t._l(t.$page.posts.edges,(function(e,i){return a("v-card",{key:i,staticClass:"ma-4 pa-3",staticStyle:{"-webkit-box-shadow":"10px 10px 0px 0px #000000","box-shadow":"10px 10px 0px 0px #000000"},attrs:{outlined:"",rounded:"",color:"primary"},on:{click:function(a){return t.$router.push({path:"/blog/"+e.node.id})}}},[a("h3",{staticClass:"my-1"},[t._v(t._s(e.node.title))]),a("p",[t._v(t._s(e.node.content[e.node.content.length-1].text))]),a("v-layout",{staticClass:"px-0",attrs:{"justify-space-between":""}},[a("span",[t._v(" "+t._s(e.node.content.length)+" Tarjetas ")]),a("i",[t._v(" por "+t._s(e.node.author)+" ")])])],1)}))],2)],1)],1):a("div",{attrs:{id:"mobile"}},[a("div",{staticClass:"pa-6",style:{position:"fixed",top:"80px",width:"100%"}},[a("v-card",{staticClass:"pa-3",attrs:{flat:"",color:"red lighten-5"}},[a("v-subheader",[t._v("Ver otra vez")]),a("v-btn",{attrs:{dark:"",depressed:"",block:"",color:"secundary"},on:{click:t.resetCards}},[t._v("Ver de nuevo")])],1),a("p",{staticClass:"mt-12"},[t._v("\n        Si te ha gustado la publicación, puedes seguirme a través de:\n      ")]),a("v-layout",{attrs:{"justify-space-around":""}},[a("v-btn",{attrs:{large:"",depressed:"",rounded:"",color:"blue lighten-5"},on:{click:t.openTwitter}},[a("v-icon",{attrs:{color:"twitter"}},[t._v("mdi-twitter")]),a("span",[t._v("Twitter")])],1),a("v-btn",{attrs:{large:"",depressed:"",rounded:"",color:"blue lighten-5"},on:{click:t.openLinkedin}},[a("v-icon",{attrs:{color:"linkedin"}},[t._v("mdi-linkedin")]),a("span",[t._v("Linkedin")])],1)],1)],1),0!==t.cards.length?a("GamecardStack",{key:t.rerender,style:{position:"fixed",top:"80px",bottom:"120px",left:"12px",right:"12px",width:"calc(100% - 24px)",height:"100%",borderRadius:"8px"},attrs:{cards:t.cards,thread:t.$page.threadsList},on:{cardSkipped:t.removeCardFromDeck}}):t._e(),a("v-layout",{staticStyle:{position:"fixed",bottom:"24px",left:"0",right:"0",width:"100%"},attrs:{"justify-space-between":""}},[a("v-layout",{attrs:{"align-center":""}},[a("v-icon",[t._v("mdi-heart-outline")]),a("span",{staticClass:"ml-2"},[t._v("\n          "+t._s(t.$page.threadsList.content[0].public_metrics.like_count)+"\n        ")])],1),a("v-btn",{attrs:{rounded:"",depressed:"",large:"",color:"red lighten-5"},on:{click:t.share}},[a("span",{staticClass:"mr-2 secundary--text text-capitalize"},[t._v("Compartir")]),a("v-icon",{attrs:{color:"secundary",size:"32"}},[t._v("mdi-share-variant")])],1)],1)],1)])}),[],!1,null,null,null);"function"==typeof p&&p(u);e.default=u.exports},jnuD:function(t,e,a){},nU5o:function(t,e,a){"use strict";a("jnuD")}}]);