import LEditablePolyline from "./LEditablePolyline.vue";

function install(Vue) {
  if (install.installed) return;
  install.installed = true;
  Vue.component("l-editable-polyline", LEditablePolyline);
}

const plugin = {
  install
};

let GlobalVue = null;
if (typeof window !== "undefined") {
  GlobalVue = window.Vue;
} else if (typeof global !== "undefined") {
  GlobalVue = global.vue;
}
if (GlobalVue) {
  GlobalVue.use(plugin);
}

LEditablePolyline.install = install;

export default LEditablePolyline;