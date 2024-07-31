import{a as X,d as Z,g as tt,j as et}from"./chunk-W2TK6E25.js";import{a as N,b as I,c as V,d as j,e as G,h as q,j as $,m as z,t as H,v as R}from"./chunk-QUJJTKVN.js";import{a as J}from"./chunk-SKGUGSP7.js";import{a as Q}from"./chunk-SOSAYNY5.js";import{a as K,b as U,c as W}from"./chunk-ENGQRYG2.js";import{$a as E,Fa as i,Ga as n,Ha as u,Ib as F,Ka as S,Ma as m,Na as f,P as h,U as P,Ub as Y,V as y,Va as s,Wa as _,Z as T,_ as C,bb as x,cb as w,g as M,ka as p,la as g,lb as O,mb as k,nb as B,pb as D,rb as L,tb as A,ua as v,wa as c}from"./chunk-7BGFEG6P.js";var ot=o=>({"is-invalid":o});function at(o,e){if(o&1){let d=S();i(0,"button",32),m("click",function(){T(d);let a=f().$implicit,r=f();return C(r.deleteType(a._id))}),s(1,"Delete"),n()}}function st(o,e){if(o&1){let d=S();i(0,"tr")(1,"td"),s(2),n(),i(3,"td"),s(4),x(5,"titlecase"),n(),i(6,"td"),s(7),x(8,"date"),n(),i(9,"td")(10,"button",30),m("click",function(){let a=T(d).$implicit,r=f();return C(r.editType(a))}),s(11," Edit "),n(),v(12,at,2,0,"button",31),n()()}if(o&2){let d=e.$implicit,t=e.index;p(2),_(t+1),p(2),_(w(5,4,d.type)),p(3),_(w(8,6,d.createdAt)),p(5),c("ngIf",d._id)}}var nt=(()=>{let e=class e{constructor(t,a,r){this.formBuilder=t,this.store=a,this.toastr=r,this.isDeleteSuccess=new M,this.typeForm=new G({}),this.getAllType=[],this.selectedType=null,this.searchType="",this.currentPage=1,this.limit=5,this.total=0,this.pages=[],this.sortByOrder="desc"}ngOnInit(){this.typeForm=this.formBuilder.group({type:["",I.required]}),this.getTypes(),this.isDeleteSuccess=this.store.select(t=>t.type.isDeleteSuccess),this.isDeleteSuccess.subscribe(t=>{t&&this.getTypes()})}handleChange(t){let a=t.target;a.type==="search"&&(this.searchType=a.value.toLowerCase()),this.currentPage=1,this.getTypes()}sortByDate(t){this.sortByOrder=t,this.getTypes()}onSubmit(){this.typeForm.valid?(this.selectedType?._id?this.store.dispatch(tt({id:this.selectedType._id,types:this.typeForm.value})):this.store.dispatch(X({types:this.typeForm.value})),this.typeForm.reset()):(this.typeForm.markAllAsTouched(),this.toastr.error("Type is required","Error",{timeOut:5e3,closeButton:!0,progressBar:!0}))}getTypes(){this.store.dispatch(Z({page:this.currentPage,limit:this.limit,searchType:this.searchType,sortByOrder:this.sortByOrder})),this.store.select(t=>t.type).subscribe(t=>{this.getAllType=t.types,this.total=t.total,this.currentPage=t.page})}deleteType(t){this.store.dispatch(et({id:t}))}editType(t){this.selectedType=t,this.typeForm.patchValue({type:t.type})}onPageChange(t){this.currentPage=t,this.getTypes()}};e.\u0275fac=function(a){return new(a||e)(g(H),g(Y),g(J))},e.\u0275cmp=P({type:e,selectors:[["app-type-list"]],decls:52,vars:8,consts:[[1,"container"],[1,"mt-5","d-flex","justify-content-between"],[1,"search-container"],["type","search","placeholder","Search",1,"form-control","me-3",3,"input"],[1,"fa-solid","fa-magnifying-glass"],["data-bs-toggle","modal","data-bs-target","#addModal",1,"btn","btn-primary"],[1,"mt-4"],[1,"dropdown"],["type","button","id","dropdownMenuButton1","data-bs-toggle","dropdown",1,"dropdown-toggle","dropdown_btn","no-arrow","fs-4"],[1,"fa-solid","fa-sort","text-primary"],[1,"dropdown-menu"],[1,"dropdown-item",3,"click"],[1,"row","my-4"],[1,"col"],[1,"table-responsive","card","shadow"],[1,"table"],[1,"table-dark"],[4,"ngFor","ngForOf"],[3,"pageChange","currentPage","limit","total"],["id","addModal","tabindex","-1","aria-labelledby","exampleModalLabel","aria-hidden","true",1,"modal","fade"],[1,"modal-dialog"],[1,"modal-content"],[1,"modal-header"],["id","exampleModalLabel",1,"modal-title"],["type","button","data-bs-dismiss","modal","aria-label","Close",1,"btn-close",3,"click"],[3,"ngSubmit","formGroup"],[1,"modal-body"],["type","text","formControlName","type","placeholder","Add Type...",1,"form-control",3,"ngClass"],[1,"invalid-feedback"],["type","submit","data-bs-dismiss","modal",1,"btn","btn-primary","mt-3","w-100"],["data-bs-toggle","modal","data-bs-target","#addModal",1,"btn","btn-outline-warning","btn-sm","mx-2",3,"click"],["class","btn btn-outline-danger btn-sm mx-2",3,"click",4,"ngIf"],[1,"btn","btn-outline-danger","btn-sm","mx-2",3,"click"]],template:function(a,r){if(a&1&&(u(0,"app-header"),i(1,"div",0)(2,"div",1)(3,"div",2)(4,"input",3),m("input",function(b){return r.handleChange(b)}),n(),u(5,"i",4),n(),i(6,"div")(7,"button",5),s(8," +Add Type "),n()()(),i(9,"div",6)(10,"h3"),s(11,"Sort By Date"),n(),i(12,"div",7)(13,"button",8),u(14,"i",9),n(),i(15,"ul",10)(16,"li",11),m("click",function(){return r.sortByDate("asc")}),s(17,"Ascending"),n(),i(18,"li",11),m("click",function(){return r.sortByDate("desc")}),s(19,"Descending"),n()()()(),i(20,"div",12)(21,"div",13)(22,"div",14)(23,"table",15)(24,"thead",16)(25,"tr")(26,"th"),s(27,"#"),n(),i(28,"th"),s(29,"Type"),n(),i(30,"th"),s(31,"Date Created"),n(),i(32,"th"),s(33,"Actions"),n()()(),i(34,"tbody"),v(35,st,13,8,"tr",17),n()(),i(36,"app-pagination",18),m("pageChange",function(b){return r.onPageChange(b)}),n()()()()(),i(37,"div",19)(38,"div",20)(39,"div",21)(40,"div",22)(41,"h5",23),s(42,"Add type"),n(),i(43,"button",24),m("click",function(){return r.typeForm.reset()}),n()(),i(44,"form",25),m("ngSubmit",function(){return r.onSubmit()}),i(45,"div",26)(46,"div"),u(47,"input",27),i(48,"small",28),s(49," *Type is a required field "),n()(),i(50,"button",29),s(51," Add type "),n()()()()()()),a&2){let l;p(35),c("ngForOf",r.getAllType),p(),c("currentPage",r.currentPage)("limit",r.limit)("total",r.total),p(8),c("formGroup",r.typeForm),p(3),c("ngClass",E(6,ot,((l=r.typeForm.get("type"))==null?null:l.touched)&&((l=r.typeForm.get("type"))==null?null:l.errors)))}},dependencies:[O,k,B,q,N,V,j,$,z,K,U,D,L],styles:[".inp-search[_ngcontent-%COMP%]{max-width:300px}.search-container[_ngcontent-%COMP%]{position:relative;width:fit-content;width:220px}.search-container[_ngcontent-%COMP%]   input[type=search][_ngcontent-%COMP%]{padding-right:30px}.search-container[_ngcontent-%COMP%]   .fa-magnifying-glass[_ngcontent-%COMP%]{font-size:20px;position:absolute;right:10px;top:50%;transform:translateY(-50%);color:#aaa}.fs-18[_ngcontent-%COMP%]{font-size:18px}@media screen and (min-width: 620px){.search-container[_ngcontent-%COMP%]{position:relative;width:fit-content;width:400px}}.dropdown_btn[_ngcontent-%COMP%]{background:none!important;border:none}.no-arrow[_ngcontent-%COMP%]:after{display:none}"]});let o=e;return o})();var lt=[{path:"",canActivate:[Q],component:nt,title:"Type"}],rt=(()=>{let e=class e{};e.\u0275fac=function(a){return new(a||e)},e.\u0275mod=y({type:e}),e.\u0275inj=h({imports:[F.forChild(lt),F]});let o=e;return o})();var Et=(()=>{let e=class e{};e.\u0275fac=function(a){return new(a||e)},e.\u0275mod=y({type:e}),e.\u0275inj=h({imports:[A,rt,R,W]});let o=e;return o})();export{Et as ExpenseTypeModule};