export default class Product {
 constructor(id,name,price,type,img,screen="",backCamera="",frontCamera="",desc=""){
  this.id=id;this.name=name;this.price=Number(price)||0;this.type=String(type||"").toLowerCase();this.img=img||"";this.screen=screen||"";this.backCamera=backCamera||"";this.frontCamera=frontCamera||"";this.desc=desc||"";
 }
}
