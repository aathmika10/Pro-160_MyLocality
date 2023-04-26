AFRAME.registerComponent("tour",{
    schema:{
        state:{type:"string",default:"places-list"},
        selectedCard:{type:"string",default:"card1"}
    },
    init:function(){
        this.placesContainer=this.el
        this.createCards()
    },

    tick:function(){
        const{state}=this.el.getAttribute("tour");

        if(state=="view"){
            this.hideEl([this.placesContainer]);
            this.showView()
        }
    },
    hideEl:function(elList){
        elList.map(el=>{
            el.setAttribute("visible",false)
        })
    },
    showView:function(){
        const{selectedCard}=this.data
        const skyEl=document.querySelector("#main_container")
        skyEl.setAttribute("material",{
            src:`./assets/360_images/${selectedCard}/place-0.jpg`,
            color:'#ffffff'
        })
    },
    createCards:function(){
        const thumbnailRef=[
            {
                id:"gate",
                title:"Gate",
                url:"../assets/thumbnails/gate_logo.jpg"
            },
            {
                id:"house",
                title:"House",
                url:"./assets/thumbnails/home-logo.png"
            },
            {
                id:"garden",
                title:"Garden",
                url:"./assets/thumbnails/garden_logo.jpg"
            },
            {
                id:"room",
                title:"Room",
                url:"./assets/thumbnails/sofa_logo.jpg"
            },
            
        ]

        let previousXposition=-60;
    
        for (var item of thumbnailRef) {
          const posX = previousXposition + 25;
          const posY = 10;
          const posZ = -40;
          const position = { x: posX, y: posY, z: posZ };
          previousXposition = posX
    
          //Border Element
          const borderEl= this.createBorder(position,item.id);
    
          //thumbnail
          const thumbnailEl = this.createThumbnail(item);
          borderEl.appendChild(thumbnailEl)
          
          //Title
          const titleEl=this.createTitle(position,item);
          borderEl.appendChild(titleEl)
    
          this.placesContainer.appendChild(borderEl);
        }
    },
    createBorder:function(position,id){
        const entityEl = document.createElement("a-entity")
        entityEl.setAttribute("id", id)
        entityEl.setAttribute("visibile", true)
        entityEl.setAttribute("geometry", {
          primitive: "ring",
          radiusInner: 9,
          radiusOuter: 10,
        })
        entityEl.setAttribute("position", position)
        entityEl.setAttribute("material", {
          color: "#1e3066",
          opacity: 1,
        })
    
        entityEl.setAttribute("cursorlistener",{})
        return entityEl
    },
    createThumbnail:function(item){
        const entityEl=document.createElement("a-entity")
        entityEl.setAttribute("visible",true);
        entityEl.setAttribute("geometry",{
            primitive:"circle",
            radius:9,
        })
        entityEl.setAttribute("material",{src:item.url});
        return entityEl
    },
    createTitle:function(position,item){
        const entityEl=document.createElement("a-entity");
        entityEl.setAttribute("text",{
            font:"exo2bold",
            align:"center",
            width:70,
            color:"#e65100",
            value:item.title,
          })
          const elPosition = position;
          elPosition.y = -20;
          entityEl.setAttribute("position", elPosition);
          entityEl.setAttribute("visible", true);
          return entityEl;
    }
})