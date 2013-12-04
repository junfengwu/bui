/**
 * @fileOverview \u83dc\u5355\u547d\u540d\u7a7a\u95f4\u5165\u53e3\u6587\u4ef6
 * @ignore
 */define("bui/menu",["bui/common","bui/menu/menu","bui/menu/menuitem","bui/memu/contextmenu","bui/menu/popmenu","bui/menu/sidemenu"],function(e){var t=e("bui/common"),n=t.namespace("Menu");return t.mix(n,{Menu:e("bui/menu/menu"),MenuItem:e("bui/menu/menuitem"),ContextMenu:e("bui/memu/contextmenu"),PopMenu:e("bui/menu/popmenu"),SideMenu:e("bui/menu/sidemenu")}),n.ContextMenuItem=n.ContextMenu.Item,n}),define("bui/menu/menuitem",["bui/common"],function(e){var t=e("bui/common"),n=t.Component,r=n.UIBase,i=t.prefix,s=i+"menu-item-open",o="x-caret",u=i+"menu-item-collapsed",a="data-id",f=n.View.extend([r.ListItemView,r.CollapsableView],{_uiSetOpen:function(e){var t=this,n=t.getStatusCls("open");e?t.get("el").addClass(n):t.get("el").removeClass(n)}},{ATTRS:{}},{xclass:"menu-item-view"}),l=n.Controller.extend([r.ListItem,r.Collapsable],{renderUI:function(){var e=this,n=e.get("el"),r=e.get("id"),i=null;r||(r=t.guid("menu-item"),e.set("id",r)),n.attr(a,r)},handleMouseEnter:function(e){var t=this;this.get("subMenu")&&this.set("open",!0),l.superclass.handleMouseEnter.call(this,e)},handleMouseLeave:function(e){var t=this,n=t.get("subMenu"),r=e.toElement;r&&n&&n.containsElement(r)?t.set("open",!0):t.set("open",!1),l.superclass.handleMouseLeave.call(this,e)},containsElement:function(e){var t=this,n,r=l.superclass.containsElement.call(t,e);return r||(n=t.get("subMenu"),r=n&&n.containsElement(e)),r},_uiSetOpen:function(e){var t=this,n=t.get("subMenu"),r=t.get("subMenuAlign");if(n)if(e)r.node=t.get("el"),n.set("align",r),n.show();else{var i=n.get("align");(!i||i.node==t.get("el"))&&n.hide()}},_uiSetSubMenu:function(e){if(e){var t=this,n=t.get("el"),r=t.get("parent");e.get("parentMenu")||(e.set("parentMenu",r),r.get("autoHide")&&e.set("autoHide",!1)),$(t.get("arrowTpl")).appendTo(n)}},destructor:function(){var e=this,t=e.get("subMenu");t&&t.destroy()}},{ATTRS:{elTagName:{value:"li"},xview:{value:f},open:{view:!0,value:!1},subMenu:{view:!0},subMenuAlign:{valueFn:function(e){return{points:["tr","tl"],offset:[-5,0]}}},arrowTpl:{value:'<span class="'+o+" "+o+'-left"></span>'},events:{value:{afterOpenChange:!0}}}},{xclass:"menu-item",priority:0}),c=l.extend({},{ATTRS:{focusable:{value:!1},selectable:{value:!1},handleMouseEvents:{value:!1}}},{xclass:"menu-item-sparator"});return l.View=f,l.Separator=c,l}),define("bui/menu/menu",["bui/common"],function(e){var t=e("bui/common"),n=t.Component,r=n.UIBase,i=n.Controller.extend([r.ChildList],{bindUI:function(){var e=this;e.on("click",function(t){var n=t.target,r=e.get("multipleSelect");e!=n&&!r&&e.get("clickHide")&&!n.get("subMenu")&&e.getTopAutoHideMenu().hide()}),e.on("afterOpenChange",function(n){var r=n.target,i=n.newVal,s=e.get("children");i&&t.each(s,function(e){e!==r&&e.get("open")&&e.set("open",!1)})}),e.on("afterVisibleChange",function(t){var n=t.newVal,r=e.get("parentMenu");e._clearOpen()})},getTopAutoHideMenu:function(){var e=this,t=e.get("parentMenu"),n;return t&&t.get("autoHide")?t.getTopAutoHideMenu():e.get("autoHide")?e:null},_clearOpen:function(){var e=this,n=e.get("children");t.each(n,function(e){e.set&&e.set("open",!1)})},findItemById:function(e){return this.findItemByField("id",e)},_uiSetSelectedItem:function(e){e&&_self.setSelected(e)}},{ATTRS:{elTagName:{view:!0,value:"ul"},idField:{value:"id"},isDecorateChild:{value:!0},defaultChildClass:{value:"menu-item"},selectedItem:{},parentMenu:{}}},{xclass:"menu",priority:0});return i}),define("bui/menu/popmenu",["bui/common","bui/menu/menu"],function(e){var t=e("bui/common"),n=t.Component.UIBase,r=e("bui/menu/menu"),i=t.Component.View.extend([n.PositionView],{}),s=r.extend([n.Position,n.Align,n.AutoShow,,n.AutoHide],{},{ATTRS:{clickHide:{value:!0},align:{value:{points:["bl","tl"],offset:[0,0]}},visibleMode:{value:"visibility"},autoHide:{value:!0},visible:{value:!1},xview:{value:i}}},{xclass:"pop-menu"});return s}),define("bui/memu/contextmenu",["bui/common","bui/menu/menuitem","bui/menu/popmenu"],function(e){var t=e("bui/common"),n=e("bui/menu/menuitem"),r=e("bui/menu/popmenu"),i=t.prefix,s=i+"menu-item-link",o=i+"menu-item-icon",u=t.Component,a=u.UIBase,f=n.extend({bindUI:function(){var e=this;e.get("el").delegate("."+s,"click",function(e){e.preventDefault()})},_uiSetIconCls:function(e,t){var n=this,r=t.prevVal,i=n.get("el").find("."+o);i.removeClass(r),i.addClass(e)}},{ATTRS:{text:{veiw:!0,value:""},iconCls:{sync:!1,value:""},tpl:{value:'<a class="'+s+'" href="#">        <span class="'+o+' {iconCls}"></span><span class="'+i+'menu-item-text">{text}</span></a>'}}},{xclass:"context-menu-item"}),l=r.extend({},{ATTRS:{defaultChildClass:{value:"context-menu-item"},align:{value:null}}},{xclass:"context-menu"});return l.Item=f,l}),define("bui/menu/sidemenu",["bui/common","bui/menu/menu"],function(e){var t=e("bui/common"),n=e("bui/menu/menu"),r=t.Component,i=t.prefix+"menu-title",s="menu-leaf",o=n.extend({initializer:function(){var e=this,n=e.get("items"),r=e.get("children");t.each(n,function(t){var n=e._initMenuCfg(t);r.push(n)})},bindUI:function(){var e=this,n=e.get("children");t.each(n,function(e){var t=e.get("children")[0];t&&t.publish("click",{bubbles:1})}),e.get("el").delegate("a","click",function(e){e.preventDefault()}),e.on("itemclick",function(t){var n=t.item,r=$(t.domTarget).closest("."+i);if(r.length){var o=n.get("collapsed");n.set("collapsed",!o)}else n.get("el").hasClass(s)&&(e.fire("menuclick",{item:n}),e.clearSelection(),e.setSelected(n))})},getItems:function(){var e=this,n=[],r=e.get("children");return t.each(r,function(e){var t=e.get("children")[0];n=n.concat(t.get("children"))}),n},_initMenuCfg:function(e){var n=this,r=e.items,s=[],o={xclass:"menu-item",elCls:"menu-second",collapsed:e.collapsed,selectable:!1,children:[{xclass:"menu",children:s}],content:'<div class="'+i+'"><s></s><span class="'+i+'-text">'+e.text+"</span></div>"};return t.each(r,function(e){var t=n._initSubMenuCfg(e);s.push(t)}),o},_initSubMenuCfg:function(e){var n=this,r={xclass:"menu-item",elCls:"menu-leaf",tpl:'<a href="{href}"><em>{text}</em></a>'};return t.mix(r,e)}},{ATTRS:{autoInitItems:{value:!1},events:{value:{menuclick:!1}}}},{xclass:"side-menu"});return o});
